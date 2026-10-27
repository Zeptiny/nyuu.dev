import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { EMAIL } from "@/content/site";
import {
  type ContactError,
  type ContactMessage,
  parseContact,
} from "@/features/contact/contact-rules";
import { fill, getDictionary } from "@/i18n/dictionaries";

const FROM = "contact@nyuu.dev";

function refuse(error: ContactError, status: number) {
  return NextResponse.json({ error }, { status });
}

/** Asks Cloudflare whether the visitor solved the widget. */
async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const body: Record<string, string> = { secret, response: token };
  if (ip) body.remoteip = ip;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return false;
  }
}

/**
 * A message from the contact form: checked, verified with Turnstile, sent to the owner with the
 * sender as reply-to, and confirmed to the sender in their language. Refusals answer with a
 * ContactError code, which the form words.
 */
export async function POST(request: NextRequest) {
  const contact = parseContact(await request.json().catch(() => null));
  if (!contact) return refuse("invalid", 400);
  if (!contact.token) return refuse("captcha", 400);

  const secret = process.env.TURNSTILE_SECRET_KEY;
  const apiKey = process.env.RESEND_API_KEY;
  if (!secret || !apiKey) {
    console.error("TURNSTILE_SECRET_KEY or RESEND_API_KEY is not set.");
    return refuse("unavailable", 503);
  }
  const ip = request.headers.get("cf-connecting-ip");
  if (!(await verifyTurnstile(contact.token, secret, ip))) return refuse("captchaFailed", 400);

  try {
    const resend = new Resend(apiKey);
    const owner = await resend.emails.send({
      from: FROM,
      to: process.env.CONTACT_EMAIL_TO || EMAIL,
      replyTo: contact.email,
      subject: `New contact form submission: ${contact.subject}`,
      html: ownerEmail(contact),
    });
    if (owner.error) {
      console.error("Sending the message failed:", owner.error);
      return refuse("unavailable", 502);
    }

    const t = getDictionary(contact.language).email;
    const confirmation = await resend.emails.send({
      from: FROM,
      to: contact.email,
      subject: t.subject,
      html: senderEmail(contact),
    });
    // The message reached its owner; a confirmation that didn't go out isn't the sender's problem.
    if (confirmation.error) console.error("Sending the confirmation failed:", confirmation.error);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("The contact form failed:", error);
    return refuse("unexpected", 500);
  }
}

function escapeHtml(text: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => entities[char] ?? char);
}

/*
 * The emails in the site's Ledger look, inline-styled for mail clients: paper, ink, a heavy rule on
 * top, and mono labels.
 */
const PAPER = "#f5f3ee";
const PANEL = "#efece5";
const INK = "#1d1c1a";
const MUTED = "#6b6862";
const RULE = "rgba(29,28,26,0.12)";
const SANS = "'IBM Plex Sans',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "'IBM Plex Mono',ui-monospace,Menlo,Consolas,monospace";

function frame(lang: string, eyebrow: string, title: string, body: string): string {
  return `<!doctype html>
<html lang="${lang}">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
  <body style="margin:0;background:${PAPER};color:${INK};font-family:${SANS};font-size:14px;line-height:1.5">
    <div style="max-width:560px;margin:0 auto;padding:32px 20px">
      <div style="font-family:${MONO};font-size:14px;font-weight:500;margin-bottom:28px">nyuu<span style="color:${MUTED}">.dev</span></div>
      <div style="border-top:2px solid ${INK};background:${PANEL};padding:20px">
        <div style="font-family:${MONO};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED}">${eyebrow}</div>
        <h1 style="margin:8px 0 16px;font-size:22px;font-weight:400;letter-spacing:-0.02em">${title}</h1>
        ${body}
      </div>
    </div>
  </body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px 8px 0;border-top:1px solid ${RULE};color:${MUTED};font-size:12px;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:8px 0;border-top:1px solid ${RULE};font-family:${MONO};font-size:13px">${value}</td>
  </tr>`;
}

/** To the owner: who wrote, from where, and what they said. */
function ownerEmail(contact: ContactMessage): string {
  const email = escapeHtml(contact.email);
  const body = `<table style="width:100%;border-collapse:collapse;margin-bottom:16px">
      ${row("Name", escapeHtml(contact.name))}
      ${row("Email", `<a href="mailto:${email}" style="color:${INK}">${email}</a>`)}
      ${row("Language", contact.language)}
      ${row("Subject", escapeHtml(contact.subject))}
    </table>
    <div style="border-top:1px solid ${RULE};padding-top:12px;white-space:pre-wrap;word-wrap:break-word">${escapeHtml(contact.message)}</div>`;
  return frame("en", "Contact form", "New message", body);
}

/** To the sender, in their language: it arrived, and the subject they wrote. */
function senderEmail(contact: ContactMessage): string {
  const t = getDictionary(contact.language).email;
  const body = `<p style="margin:0 0 12px">${escapeHtml(fill(t.greeting, { name: contact.name }))}</p>
    <p style="margin:0 0 16px">${t.body}</p>
    <div style="border-top:1px solid ${RULE};padding-top:12px">
      <div style="color:${MUTED};font-size:12px">${t.yourMessage}</div>
      <div style="font-family:${MONO};font-size:13px;margin-top:4px">${escapeHtml(contact.subject)}</div>
    </div>
    <p style="margin:20px 0 0;color:${MUTED}">${t.signoff}<br />nyuu.dev</p>`;
  return frame(contact.language, "nyuu.dev", t.subject, body);
}
