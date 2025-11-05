"use client"

import { useState, useMemo } from "react"
import NewsletterCard from "@/components/newsletter-card"
import type { Newsletter } from "@/lib/newsletters"

interface Props {
  initialNewsletters: Newsletter[]
}

export default function NewsletterSearch({ initialNewsletters }: Props) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return initialNewsletters
    return initialNewsletters.filter((n) => {
      return (
        n.title.toLowerCase().includes(q) || 
        n.content.toLowerCase().includes(q) ||
        (n.date && n.date.toLowerCase().includes(q))
      )
    })
  }, [query, initialNewsletters])

  return (
    <div>
      <label htmlFor="newsletter-search" className="sr-only">
        Search reports
      </label>
      <div className="relative max-w-2xl mb-8">
        <input
          id="newsletter-search"
          type="search"
          inputMode="search"
          placeholder="Search by title, content, or date..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search reports"
          className="w-full px-5 py-4 bg-background border-3 border-foreground rounded-md focus:outline-none focus:ring-4 focus:ring-foreground/20 transition-all text-foreground placeholder:text-secondary font-medium text-base neo-shadow-sm"
        />
      </div>

      <p className="text-sm text-secondary font-bold mb-8 uppercase tracking-wide" aria-live="polite">
        {filtered.length === initialNewsletters.length
          ? `Showing all ${initialNewsletters.length} reports`
          : `Found ${filtered.length} of ${initialNewsletters.length} reports`}
      </p>

      <section className="mt-6" aria-label="Search results">
        {filtered.length > 0 ? (
          <div className="space-y-6" role="list">
            {filtered.map((n) => (
              <div role="listitem" key={n.id}>
                <NewsletterCard id={n.id} title={n.title} date={n.date} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 border-3 border-foreground border-dashed rounded-md neo-shadow-sm">
            <p className="text-xl font-black text-foreground mb-2">No results found</p>
            <p className="text-sm text-secondary font-bold">Try searching with different keywords</p>
          </div>
        )}
      </section>
    </div>
  )
}
