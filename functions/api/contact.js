export async function onRequestPost(context) {
    return await handleRequest(context);
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

  await forwardMessage(name, email, message);

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

async function forwardMessage(name, email, message) {
  const SENDGRID_API_KEY_VAR = process.env.SENDGRID_API_KEY
  const SENDGRID_EMAIL_RECIPIENT_VAR = process.env.SENDGRID_EMAIL_RECIPIENT
  const SENDGRID_EMAIL_SENDER_VAR = process.env.SENDGRID_EMAIL_SENDER
  const msg = {
    personalizations: [{
      to: [{ email: SENDGRID_EMAIL_RECIPIENT_VAR }]
    }],
    from: { email: SENDGRID_EMAIL_SENDER_VAR },
    subject: `Message from ${name} | ${email}`,
    content: [{
      type: 'text/plain',
      value: message
    }, {
      type: 'text/html',
      value: `<p>${message}</p>`
    }]
  };

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY_VAR}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msg)
    });

    if (!response.ok) {
      throw new Error(`Error sending email: ${response.statusText}`);
    }

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
