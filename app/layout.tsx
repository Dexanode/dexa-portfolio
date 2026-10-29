import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/content";
import { ThemeProvider } from "./theme";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "DEXA is a web3 builder, community manager, and content creator with about 5 years in crypto community work.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.handle,
  email: profile.email,
  jobTitle: [...profile.roles],
  sameAs: [profile.github, profile.x, profile.telegram],
  knowsAbout: [
    "Rust",
    "Python",
    "Auto-trading bot development",
    "Smart contract auditing",
    "DeFi",
    "Solana",
    "On-chain analytics",
    "Risk management",
    "Community marketing",
    "Content planning",
    "AI training",
  ],
};

export const metadata: Metadata = {
  title: "DEXA",
  description,
  authors: [{ name: profile.handle }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('dexa-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.preloader{display:none !important}`}</style>
        </noscript>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
