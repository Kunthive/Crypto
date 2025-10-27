import { generateSEOMetadata, SEO_CONFIG, SEO_KEYWORDS } from "@/lib/seo"
import type { Metadata } from "next"

export const dynamic = 'force-static'

export const metadata: Metadata = generateSEOMetadata({
  title: "About This Archive - Our Intent and Purpose",
  description:
    "Learn about the purpose and philosophy behind the Milkroad Pro Archive. Discover why we made premium cryptocurrency reports publicly accessible for the crypto community.",
  keywords: [...SEO_KEYWORDS, "about", "purpose", "mission", "philosophy", "open access"],
  canonical: `${SEO_CONFIG.siteUrl}/intent`,
})

export default function IntentPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <article>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 sm:mb-8 text-balance">Why This Archive Exists</h1>

        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground">
          <p>
            Milkroad Pro provides valuable insights into the cryptocurrency market, but access requires a paid
            subscription. During my week-long Pro membership, I collected these reports and decided to make them
            publicly available.
          </p>

          <p>
            The crypto community thrives on accessible information and shared knowledge. By making these reports public,
            I hope to help others interested in cryptocurrencies stay informed and make better decisions.
          </p>

          <p>
            This archive contains reports that were previously behind a paywall. All content is originally from Milkroad
            Pro and is shared here for educational purposes.
          </p>

          <div className="bg-card p-6 rounded-lg border border-border mt-8">
            <p className="text-sm text-secondary/70">
              <strong>Disclaimer:</strong> This archive is provided for educational purposes only. All content is the
              intellectual property of Milkroad Pro. If you find value in these reports, please consider supporting
              Milkroad Pro directly by subscribing to their service.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
