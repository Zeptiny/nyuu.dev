import { isLanguage, type Language } from "@/i18n/languages";

/** The longest each field may be; the form stops typing there and the route refuses anything longer. */
export const CONTACT_LIMITS = { name: 100, email: 254, subject: 200, message: 5000 } as const;

/** What /api/contact answers when it refuses a message; the form words each one (locales). */
export type ContactError = "invalid" | "captcha" | "captchaFailed" | "unavailable" | "unexpected";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  token: string | null;
  language: Language;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, limit: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && value.length <= limit ? trimmed : null;
}

/** A request body as a message, or null when a field is missing, empty, too long, or malformed. */
export function parseContact(body: unknown): ContactMessage | null {
  if (typeof body !== "object" || body === null) return null;
  const fields = body as Record<string, unknown>;
  const name = text(fields.name, CONTACT_LIMITS.name);
  const email = text(fields.email, CONTACT_LIMITS.email);
  const subject = text(fields.subject, CONTACT_LIMITS.subject);
  const message = text(fields.message, CONTACT_LIMITS.message);
  if (!name || !email || !EMAIL_PATTERN.test(email) || !subject || !message) return null;
  return {
    name,
    email,
    subject,
    message,
    token: typeof fields.token === "string" && fields.token ? fields.token : null,
    language: isLanguage(fields.language) ? fields.language : "en",
  };
}
