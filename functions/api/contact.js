import { Resend } from 'resend';

export async function onRequestPost(context) {
  try {
    return await handleRequest(context);
  } catch (e) {
    console.error(e);
    return new Response("Error sending message", { status: 500 });
  }
}

async function handleRequest(context) {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP");

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const token = formData.get("cf-turnstile-response");

  const tokenValidated = await validateToken(ip, token, env);

  if (!tokenValidated) {
    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = '/';
    redirectUrl.hash = '#status';
    redirectUrl.searchParams.set('status', 'failure');
    return Response.redirect(redirectUrl.toString(), 303);
  }

  const { success } = await forwardMessage(name, email, message, env);

  const status = success ? "success" : "failure";
  const redirectUrl = new URL(request.url);
  redirectUrl.pathname = '/';
  redirectUrl.hash = '#status';
  redirectUrl.searchParams.set('status', status);

  return Response.redirect(redirectUrl.toString(), 303);
}

async function validateToken(ip, token, env) {
  const formData = new FormData();
  formData.append("secret", env.TURNSTILE_SECRET_KEY);
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

async function forwardMessage(name, email, message, env) {
  const resend = new Resend(env.RESEND_API_KEY);

  const { data, error } = await resend.batch.send([
    {
      from: env.RESEND_FROM_EMAIL,
      to: env.RESEND_TO_EMAIL,
      subject: 'New contact: ' + name + ' ' + email,
      html: message,
    },
    {
      from: env.RESEND_FROM_EMAIL,
      to: email,
      subject: 'Obrigado, contato, teste',
      html: message,
    }
  ]);

  return { success: !error };
}