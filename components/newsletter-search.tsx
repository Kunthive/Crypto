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
      return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    })
  }, [query, initialNewsletters])

  return (
    <div>
      <label htmlFor="newsletter-search" className="sr-only">
        Search reports
      </label>
      <div className="relative max-w-2xl">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary text-lg">🔍</span>
        <input
          id="newsletter-search"
          type="search"
          inputMode="search"
          placeholder="Search reports..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search reports"
          className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-foreground placeholder-secondary"
        />
      </div>

      <p className="text-sm text-secondary mt-3" aria-live="polite">
        Showing {filtered.length} of {initialNewsletters.length} reports
      </p>

      <section className="mt-6" aria-label="Search results">
        {filtered.length > 0 ? (
          <div className="space-y-4" role="list">
            {filtered.map((n) => (
              <div role="listitem" key={n.id}>
                <NewsletterCard id={n.id} title={n.title} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-secondary">No results found. Try a different search.</p>
          </div>
        )}
      </section>
    </div>
  )
}
