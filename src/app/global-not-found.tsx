import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@/app/styles.css";
import type { Metadata } from "next";
import Link from "next/link";
import { BOOT_SCRIPT } from "@/app/boot-script";
import { Brand } from "@/shared/components/brand";
import { Eyebrow } from "@/shared/components/page";
import { Button } from "@/shared/ui/button";

export const metadata: Metadata = {
  title: "Not found · nyuu.dev",
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
};

/**
 * Any address no page matches. It renders outside app/[lang], so it brings its own styles and the
 * boot script for the theme; with no language in the address, it's in English.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <div className="flex min-h-dvh flex-col">
          <header className="border-b border-rule px-4 py-4 sm:px-10">
            <Link href="/" aria-label="nyuu.dev, home">
              <Brand />
            </Link>
          </header>
          <main className="flex flex-1 justify-center px-4 py-14 sm:py-20">
            <div className="flex w-full max-w-sm flex-col gap-6">
              <div className="flex flex-col gap-2 border-b border-ink pb-5">
                <Eyebrow>404</Eyebrow>
                <h1 className="m-0 text-34 font-normal tracking-num">Nothing here</h1>
                <p className="m-0 text-14 leading-[1.5] text-muted">
                  This address doesn’t match any page. It may have moved, or the link has a typo.
                </p>
              </div>
              <div>
                <Button asChild variant="primary" size="lg">
                  <Link href="/">Back to nyuu.dev</Link>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
