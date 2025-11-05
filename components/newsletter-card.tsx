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
        className="group block focus:outline-none focus:ring-4 focus:ring-foreground/50 rounded-md transition-all duration-200"
        aria-label={`Read: ${title}`}
      >
        {/* Improved Neo-Brutalism Card */}
        <div className="relative bg-background rounded-md border-3 border-foreground overflow-hidden transition-all duration-300 ease-out hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0">
          {/* Content */}
          <div className="relative p-6 sm:p-8">
            {/* Title and Date */}
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex items-start justify-between gap-4">
                <h3
                  id={`newsletter-${id}`}
                  className="text-xl sm:text-2xl font-black text-foreground leading-tight group-hover:underline decoration-3 underline-offset-4 transition-all"
                >
                  {title}
                </h3>
              </div>

              {/* Date badge */}
              {date && (
                <div className="inline-flex">
                  <span className="px-3 py-1 bg-foreground text-background text-xs font-bold uppercase tracking-wider rounded-sm">
                    {date}
                  </span>
                </div>
              )}
            </div>

            {/* Read more indicator with arrow animation */}
            <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
              <span>Read Report</span>
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-2">→</span>
            </div>
          </div>

          {/* Accent line at bottom */}
          <div className="h-1 bg-foreground transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
        </div>
      </Link>
    </article>
  )
}
