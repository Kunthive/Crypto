"use client"

import Link from "next/link"
import { useState } from "react"

interface NewsletterCardProps {
  id: string
  title: string
  date?: string
}

export default function NewsletterCard({ id, title, date }: NewsletterCardProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article aria-labelledby={`newsletter-${id}`}>
      <Link
        href={`/newsletter/${encodeURIComponent(id)}`}
        className="block focus:outline-none focus:ring-4 focus:ring-foreground rounded-md"
        aria-label={`Open report ${title}`}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => {
          setIsPressed(false)
          setIsHovered(false)
        }}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Neo-Brutalism Card */}
        <div
          className={`relative bg-background rounded-md ${
            isPressed
              ? 'border-4 border-foreground translate-y-2'
              : isHovered
                ? 'border-4 border-foreground -translate-y-1 neo-shadow'
                : 'border-3 border-foreground/60 neo-shadow-sm'
          }`}
          style={{
            transition: 'all 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)'
          }}
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
