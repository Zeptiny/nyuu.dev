import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nyuu.dev",
  description: "Personal website - Site Reliability Engineer & Technology Enthusiast",
  metadataBase: new URL('https://nyuu.dev'),
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/api/rss?lang=en', title: 'nyuu.dev Blog (English)' },
        { url: '/api/rss?lang=pt', title: 'nyuu.dev Blog (Português)' },
        { url: '/api/rss?lang=ca', title: 'nyuu.dev Blog (Català)' },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
