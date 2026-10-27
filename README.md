# nyuu.dev

The personal site: services, projects, the tech stack, education, and a contact form. One page per
language (English at `/`, Portuguese at `/pt`, Catalan at `/ca`), rendered at build time and served
from a Cloudflare Worker. It uses the **Ledger** design of the Whiskers dashboard
(`inference_frontend`): the same tokens, type scale, and primitives.

## Running locally

```bash
npm install
cp .env.local.example .env.local   # Turnstile's test keys work on localhost
npm run dev                        # http://localhost:3000
```

`npm run check` runs the type check, ESLint, and Prettier. `npm run preview` builds the Worker with
OpenNext and runs it in workerd, as production does.

## Where things are

```text
src/
  app/          the [lang] layout and page, the contact route, sitemap, robots, the 404,
                styles.css (the Ledger tokens) and the boot script
  content/      what the page lists: services, projects, stack, education, contact details,
                and the brand marks (Simple Icons)
  locales/      every text, one file per language; en.json is the shape the others must match
  i18n/         the languages, their addresses, and filling templates
  features/     the page's sections; contact/ and education/ hold the interactive parts
  shared/       ui/ primitives and components/ ported from inference_frontend, lib/ (cn, theme)
public/         persona drawings, service screenshots (one per theme), certificates
```

- **Adding a course, project, or tool:** add it to `src/content/`, and its text under the same id in
  each file in `src/locales/`. A key missing from Portuguese or Catalan fails the type check. The
  education totals and the hero's "Now" panel are counted from the lists.
- **Text people read** is never written in a component; it comes from the locales. Only the client
  components (theme, language, education filters, contact form) run in the browser, and they get
  their strings as props.
- **Styling** uses the Ledger tokens only (`bg-panel`, `text-muted`, `border-rule`, `text-13`), so
  dark mode is a token swap. The accent hue is `--hue` in `styles.css`.

## How the page works

- `next.config.ts` rewrites `/` to `/en` and redirects `/en` to `/`, so English has no prefix.
- `src/app/boot-script.ts` runs before the first paint: it applies the saved theme (or the
  system's), and at `/` it sends a visitor who chose, or whose browser prefers, Portuguese or
  Catalan to that page. The choices are kept in `localStorage` under the same keys as before
  (`theme`, `language`).
- The contact form gets a Turnstile token, then `POST /api/contact` checks the fields
  (`src/features/contact/contact-rules.ts`), verifies the token, emails the message to
  `CONTACT_EMAIL_TO` with the sender as reply-to, and sends the sender a confirmation in their
  language. Refusals answer with a code the form words.

## Deploying

```bash
npm run deploy
```

It builds with OpenNext and deploys the `nyuu` Worker (`wrangler.jsonc`).
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` is read at build time from `.env.production`; `RESEND_API_KEY` and
`TURNSTILE_SECRET_KEY` are Worker secrets (`npx wrangler secret put NAME`). After changing
`wrangler.jsonc`, run `npm run cf-typegen`.
