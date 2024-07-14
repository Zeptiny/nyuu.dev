export async function onRequestPost(context) {
  try {
    return await handleRequest(context);
  } catch (e) {
    console.error(e);
    return new Response("Error sending message", { status: 500 });
  }
}

async function handleRequest({ request }) {
  const ip = request.headers.get("CF-Connecting-IP");

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const token = formData.get("cf-turnstile-response");

  const tokenValidated = await validateToken(ip, token);

  if (!tokenValidated) {
    return new Response("Token validation failed", { status: 403 });
  }

  await composeRequest(name, email, message);

  return new Response("OK", { status: 200 });
}

async function validateToken(ip, token) {
  const TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA";

  const formData = new FormData();
  formData.append("secret", TURNSTILE_SECRET_KEY);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome = await result.json();

  return outcome.success;
}

async function composeRequest(name, email, message) {
  return {
    from: {
      email: SENDGRID_EMAIL_SENDER,
      name: "Nyuu.dev",
    },
    replyTo: {
      email: `${email}`,
      name: `${name}`,
    },
    subject: "Nova mensagem",
    content: [
      {
        type: "text/plain",
        value: `New message from ${name} (${email}): "${message}"`,
      },
    ],
    personalizations: [
      {
        from: {
          email: SENDGRID_EMAIL_SENDER,
          name: "nyuu.dev",
        },
        to: [
          {
            email: SENDGRID_EMAIL_RECIPIENT,
            name: "Recipient",
          },
        ],
      },
    ],
  };
}

async function sendEmail(messageBody, env) {
  try {
    const email = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });
    return email;
  } catch (error) {
    return { status: 500, statusText: error };
  }
}

let emailResponse = await sendEmail(requestBody, env);

if (emailResponse.status > 299) {
  return Response.redirect(
    `${returnUrl}?success=false&reason=SendGrid%20API%20returned%20${emailResponse.statusText}%20(statusCode: ${emailResponse.status}))`
  );
}
return Response.redirect(`${returnUrl}?success=true`);
