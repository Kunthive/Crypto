import NewsletterSearch from "@/components/newsletter-search"
import { getAllNewsletters } from "@/lib/newsletters"

export default function ArchivePage() {
  const newsletters = getAllNewsletters()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <section className="mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 sm:mb-8 text-balance">Complete Archive</h1>
        <p className="text-base sm:text-lg text-secondary/70 mb-6">Search and browse all past reports.</p>
        <NewsletterSearch initialNewsletters={newsletters} />
      </section>

      {/* If JavaScript is disabled, show a simple list of newsletters */}
      <noscript>
        <div className="space-y-4 mt-8">
          {newsletters.map((n) => (
            // eslint-disable-next-line react/jsx-key
            <div key={n.id} className="p-8 border border-border rounded-lg">
              <a href={`/newsletter/${n.id}`} className="text-xl font-semibold text-foreground">
                {n.title}
              </a>
            </div>
          ))}
        </div>
      </noscript>
    </div>
  )
}
