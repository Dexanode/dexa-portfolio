import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/content";
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
  "0xDexa is a web3 builder, community manager, and content creator with about 5 years in crypto community work.";

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
  title: "0xDexa",
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
