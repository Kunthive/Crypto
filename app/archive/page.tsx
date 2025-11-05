import NewsletterSearch from "@/components/newsletter-search"
import { getAllNewsletters } from "@/lib/newsletters"
import { generateSEOMetadata, generateCollectionPageStructuredData, SEO_KEYWORDS, SEO_CONFIG } from "@/lib/seo"
import type { Metadata } from "next"

export const dynamic = 'force-static'

export const metadata: Metadata = generateSEOMetadata({
  title: "Complete Archive - All Milkroad Pro Reports",
  description:
    "Browse and search the complete archive of all Milkroad Pro reports. Access premium cryptocurrency market analysis, insights, and newsletters. Search by keyword, date, or topic.",
  keywords: [
    ...SEO_KEYWORDS,
    "newsletter archive",
    "report collection",
    "crypto reports",
    "market insights archive",
  ],
  canonical: `${SEO_CONFIG.siteUrl}/archive`,
})

export default function ArchivePage() {
  const newsletters = getAllNewsletters()

  const collectionStructuredData = generateCollectionPageStructuredData({
    name: "Milkroad Pro Reports Archive",
    description: "Complete collection of all Milkroad Pro cryptocurrency reports and newsletters",
    url: `${SEO_CONFIG.siteUrl}/archive`,
    numberOfItems: newsletters.length,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <section className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">Complete Archive</h1>
          <p className="text-lg text-secondary font-medium mb-8">Search and browse all past reports.</p>
          <NewsletterSearch initialNewsletters={newsletters} />
        </section>

        {/* If JavaScript is disabled, show a simple list of newsletters */}
        <noscript>
          <div className="space-y-4 mt-8">
            {newsletters.map((n) => (
              // eslint-disable-next-line react/jsx-key
              <div key={n.id} className="p-8 border border-border rounded-lg">
                <a href={`/newsletter/${encodeURIComponent(n.id)}`} className="text-xl font-semibold text-foreground">
                  {n.title}
                </a>
              </div>
            ))}
          </div>
        </noscript>
      </div>
    </>
  )
}
