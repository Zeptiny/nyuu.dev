"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/shared/lib/theme";

type TurnstileOptions = {
  sitekey: string;
  action: string;
  theme: "light" | "dark";
  language: string;
  size: "flexible";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

type Turnstile = {
  render: (container: HTMLElement, options: TurnstileOptions) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let loading: Promise<Turnstile> | null = null;

/** Cloudflare's script, added once and only when the form is on screen. */
function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile did not load."));
    };
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("Turnstile did not load."));
    };
    document.head.appendChild(script);
  });
  return loading;
}

/** How long a send waits for a check still running (managed mode usually takes a second or two). */
const WAIT_MS = 5000;

/**
 * Cloudflare Turnstile for the contact form. Render `widget` above the send button, get the token
 * with `await turnstile.token()` when sending (null if it never finished), and call `reset()` once
 * the request is done: a token is good once.
 */
export function useTurnstile(siteKey: string, language: string) {
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const current = useRef<string | null>(null);
  const waiting = useRef<((token: string) => void)[]>([]);

  const onToken = useCallback((token: string | null) => {
    current.current = token;
    if (!token) return;
    for (const resolve of waiting.current.splice(0)) resolve(token);
  }, []);

  const token = useCallback(async (): Promise<string | null> => {
    if (current.current) return current.current;
    return Promise.race([
      new Promise<string>((resolve) => waiting.current.push(resolve)),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), WAIT_MS)),
    ]);
  }, []);

  const reset = useCallback(() => {
    current.current = null;
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  }, [widgetId]);

  // The widget renders again whenever a callback changes, so each one is stable.
  const onFail = useCallback(() => setFailed(true), []);

  const widget = (
    <TurnstileWidget
      siteKey={siteKey}
      language={language}
      onToken={onToken}
      onReady={setWidgetId}
      onFail={onFail}
    />
  );

  return { widget, token, reset, failed };
}

function TurnstileWidget({
  siteKey,
  language,
  onToken,
  onReady,
  onFail,
}: {
  siteKey: string;
  language: string;
  onToken: (token: string | null) => void;
  onReady: (widgetId: string | null) => void;
  onFail: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const { resolved: theme } = useTheme();

  useEffect(() => {
    let id: string | undefined;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !container.current) return;
        id = turnstile.render(container.current, {
          sitekey: siteKey,
          action: "contact",
          theme,
          language,
          size: "flexible",
          callback: (token) => onToken(token),
          "expired-callback": () => onToken(null),
          "error-callback": () => onToken(null),
        });
        onReady(id ?? null);
      })
      .catch(() => {
        if (!cancelled) onFail();
      });
    return () => {
      cancelled = true;
      onToken(null);
      onReady(null);
      if (id && window.turnstile) window.turnstile.remove(id);
    };
  }, [siteKey, theme, language, onToken, onReady, onFail]);

  // Turnstile's widget is 65px tall; holding the space keeps the button from jumping.
  return <div ref={container} className="min-h-[65px]" />;
}
