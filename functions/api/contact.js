import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey("YOUR_SENDGRID_API_KEY");

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
  const msg = {
    to: "me@artbenedetti.com", // Change to your recipient
    from: "no-reply@nyuu.dev", // Change to your verified sender
    subject: `Message from ${name} | ${email}`,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await sendgrid.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
