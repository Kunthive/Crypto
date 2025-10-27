import { getAllNewsletters } from "@/lib/newsletters"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const newsletters = getAllNewsletters()
  const baseUrl = "https://milkroad-archive.vercel.app"

  // Enhanced newsletter entries with better metadata
  const newsletterEntries = newsletters.map((newsletter) => ({
    url: `${baseUrl}/newsletter/${encodeURIComponent(newsletter.id)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85, // High priority for content pages
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0, // Maximum priority for homepage
      alternates: {
        canonical: baseUrl,
      },
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.95, // Very high priority for main archive
      alternates: {
        canonical: `${baseUrl}/archive`,
      },
    },
    {
      url: `${baseUrl}/intent`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
      alternates: {
        canonical: `${baseUrl}/intent`,
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3, // Lower priority for contact page
      alternates: {
        canonical: `${baseUrl}/contact`,
      },
    },
    ...newsletterEntries,
  ]
}
