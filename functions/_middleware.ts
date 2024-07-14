import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = mailchannelsPlugin({
  personalizations: [
    {
      to: [{ name: "ACME Support", email: "me@artbenedetti.com" }],
    },
  ],
  from: { name: "Enquiry", email: "no-reply@nyuu.dev" },
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    }),
});