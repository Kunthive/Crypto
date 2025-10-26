"use client"

import { useState, useMemo } from "react"
import NewsletterCard from "@/components/newsletter-card"
import { getAllNewsletters } from "@/lib/newsletters"

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const newsletters = getAllNewsletters()

  const filteredNewsletters = useMemo(() => {
    if (!searchQuery.trim()) return newsletters

    const query = searchQuery.toLowerCase()
    return newsletters.filter(
      (newsletter) =>
        newsletter.title.toLowerCase().includes(query) || newsletter.content.toLowerCase().includes(query),
    )
  }, [searchQuery, newsletters])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Page Header */}
      <section className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 text-balance">Complete Archive</h1>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors text-foreground placeholder-secondary"
          />
        </div>
      </section>

      {/* Newsletter List */}
      <section>
        {filteredNewsletters.length > 0 ? (
          <div className="space-y-4">
            {filteredNewsletters.map((newsletter) => (
              <NewsletterCard key={newsletter.id} id={newsletter.id} title={newsletter.title} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-secondary">
              {newsletters.length === 0 ? "No newsletters available yet." : "No results found. Try a different search."}
            </p>
          </div>
        )}
      </section>

      {/* Results Count */}
      {searchQuery && (
        <p className="text-sm text-secondary mt-8">
          Found {filteredNewsletters.length} of {newsletters.length} reports
        </p>
      )}
    </div>
  )
}
