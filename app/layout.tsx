import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nyuu.dev — SRE & Infrastructure",
  description: "Site Reliability Engineer specializing in managed hosting, Docker, Kubernetes, and Linux infrastructure.",
  metadataBase: new URL("https://nyuu.dev"),
  openGraph: {
    title: "nyuu.dev — SRE & Infrastructure",
    description: "Site Reliability Engineer specializing in managed hosting, Docker, Kubernetes, and Linux infrastructure.",
    url: "https://nyuu.dev",
    siteName: "nyuu.dev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "nyuu.dev — SRE & Infrastructure",
    description: "Site Reliability Engineer specializing in managed hosting, Docker, Kubernetes, and Linux infrastructure.",
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
        <link rel="preload" href="/devicon.min.css" as="style" />
        <link rel="stylesheet" href="/devicon.min.css" media="print" onLoad="this.media='all'" />
        <noscript><link rel="stylesheet" href="/devicon.min.css" /></noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
