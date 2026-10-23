import type { Metadata } from "next";
import { profile } from "@/content";
import "./globals.css";

const description =
  "Chaerul Oemar Kusnaedi (0xDexa) is a web3 builder, community manager, and content creator with about 5 years in crypto community work.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
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
  title: "Chaerul Oemar Kusnaedi (0xDexa)",
  description,
  authors: [{ name: profile.name }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
