import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dexa-portfolio.vercel.app",
      lastModified: new Date("2026-10-30"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
