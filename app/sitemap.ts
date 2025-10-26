import { getAllNewsletters } from "@/lib/newsletters"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const newsletters = getAllNewsletters()

  const newsletterEntries = newsletters.map((newsletter) => ({
    url: `https://milkroad-archive.vercel.app/newsletter/${newsletter.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: "https://milkroad-archive.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "https://milkroad-archive.vercel.app/archive",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: "https://milkroad-archive.vercel.app/intent",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: "https://milkroad-archive.vercel.app/contact",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...newsletterEntries,
  ]
}
