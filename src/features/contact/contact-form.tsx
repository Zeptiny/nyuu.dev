"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { CONTACT_LIMITS, type ContactError } from "@/features/contact/contact-rules";
import { useTurnstile } from "@/features/contact/turnstile";
import { Alert } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Input, Label, Textarea } from "@/shared/ui/input";

type Labels = {
  name: string;
  email: string;
  emailPlaceholder: string;
  subject: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sent: string;
  errors: Record<ContactError | "captchaPending" | "captchaLoad", string>;
};

type Outcome = { tone: "accent" | "danger"; text: string } | null;

/** One labelled field, the Ledger way: the label above, muted. */
function Field({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children(id)}
    </div>
  );
}

/**
 * Sends a message through /api/contact. Without a Turnstile site key at build time the form can't
 * be sent, so it says where to write instead.
 */
export function ContactForm({
  language,
  turnstileLanguage,
  siteKey,
  labels,
}: {
  language: string;
  turnstileLanguage: string;
  siteKey: string | null;
  labels: Labels;
}) {
  if (!siteKey) return <Alert tone="warning">{labels.errors.unavailable}</Alert>;
  return (
    <Form
      language={language}
      turnstileLanguage={turnstileLanguage}
      siteKey={siteKey}
      labels={labels}
    />
  );
}

function Form({
  language,
  turnstileLanguage,
  siteKey,
  labels,
}: {
  language: string;
  turnstileLanguage: string;
  siteKey: string;
  labels: Labels;
}) {
  const turnstile = useTurnstile(siteKey, turnstileLanguage);
  const [pending, setPending] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>(null);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setOutcome(null);
    try {
      const token = await turnstile.token();
      if (!token) {
        setOutcome({ tone: "danger", text: labels.errors.captchaPending });
        return;
      }
      const fields = Object.fromEntries(new FormData(form));
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, token, language }),
      });
      if (response.ok) {
        form.reset();
        setOutcome({ tone: "accent", text: labels.sent });
        return;
      }
      const body = (await response.json().catch(() => null)) as { error?: ContactError } | null;
      const code = body?.error;
      setOutcome({
        tone: "danger",
        text: code && code in labels.errors ? labels.errors[code] : labels.errors.unexpected,
      });
    } catch {
      setOutcome({ tone: "danger", text: labels.errors.unexpected });
    } finally {
      turnstile.reset();
      setPending(false);
    }
  }

  return (
    <form onSubmit={(event) => void send(event)} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={labels.name}>
          {(id) => (
            <Input
              id={id}
              name="name"
              autoComplete="name"
              required
              maxLength={CONTACT_LIMITS.name}
            />
          )}
        </Field>
        <Field label={labels.email}>
          {(id) => (
            <Input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              placeholder={labels.emailPlaceholder}
              required
              maxLength={CONTACT_LIMITS.email}
            />
          )}
        </Field>
      </div>
      <Field label={labels.subject}>
        {(id) => <Input id={id} name="subject" required maxLength={CONTACT_LIMITS.subject} />}
      </Field>
      <Field label={labels.message}>
        {(id) => (
          <Textarea
            id={id}
            name="message"
            placeholder={labels.messagePlaceholder}
            required
            maxLength={CONTACT_LIMITS.message}
            className="min-h-40"
          />
        )}
      </Field>
      {turnstile.widget}
      {turnstile.failed && (
        <p className="m-0 -mt-2 text-12 text-bad">{labels.errors.captchaLoad}</p>
      )}
      {outcome && <Alert tone={outcome.tone}>{outcome.text}</Alert>}
      <div>
        <Button type="submit" variant="primary" size="lg" pending={pending} className="px-5">
          {labels.submit}
        </Button>
      </div>
    </form>
  );
}
