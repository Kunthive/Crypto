"use client"

import Link from "next/link"
interface NewsletterCardProps {
  id: string
  title: string
  date?: string
}

export default function NewsletterCard({ id, title, date }: NewsletterCardProps) {
  return (
    <article aria-labelledby={`newsletter-${id}`}>
      <Link
        href={`/newsletter/${encodeURIComponent(id)}`}
        className="group block focus:outline-none focus-visible:ring-4 focus-visible:ring-foreground/40 rounded-md"
        aria-label={`Open report ${title}`}
      >
        {/* Neo-Brutalism Card */}
        <div
          className="relative bg-background rounded-md border-3 border-foreground/60 neo-shadow-sm transition-all duration-150 ease-out group-hover:-translate-y-1 group-hover:border-foreground group-hover:neo-shadow group-active:translate-y-1 group-active:border-foreground"
        >
          {/* Content - Minimal & Bold */}
          <div className="relative p-5 sm:p-7">
            {/* Title and Date */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <h3
                id={`newsletter-${id}`}
                className="text-lg sm:text-xl font-bold text-foreground flex-1 leading-tight"
              >
                {title}
              </h3>

              {/* Date */}
              {date && (
                <span
                  className="text-xs sm:text-sm text-secondary font-bold whitespace-nowrap uppercase tracking-wide"
                >
                  {date}
                </span>
              )}
            </div>

            {/* Read more indicator */}
            <div className="flex items-center gap-2 text-sm font-bold text-foreground/70 uppercase tracking-wide">
              <span>Read →</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
