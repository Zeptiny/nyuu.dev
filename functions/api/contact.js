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
  
  async function forwardMessage(name, email, message, env) {
    const resend = new Resend(env.RESEND_API_KEY);
  
    const { data, error } = await resend.emails.send({
      from: 'test@no-reply.nyuu.dev',
      to: 'me@artbenedetti.com',
      subject: 'New contact: ' + name + ' ' + email,
      html: message,
    });
  
    return new Response(JSON.stringify({ data, error }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }