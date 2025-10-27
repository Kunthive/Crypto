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
    <article aria-labelledby={`newsletter-${id}`} className="rounded-lg">
      <Link 
        href={`/newsletter/${encodeURIComponent(id)}`} 
        className="block focus:outline-none focus:ring-2 focus:ring-foreground rounded-lg" 
        aria-label={`Open report ${title}`}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => {
          setIsPressed(false)
          setIsHovered(false)
        }}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Retro 3D raised card effect with mechanical keyboard feel */}
        <div 
          className={`relative bg-gradient-to-b from-background to-background/50 rounded-lg ${
            isPressed 
              ? 'shadow-inner border-2 border-foreground/20' 
              : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] border-2 border-foreground/40 hover:border-foreground'
          }`}
          style={{
            transform: isPressed 
              ? 'translateY(3px) scale(0.99)' 
              : isHovered 
                ? 'translateY(-2px) scale(1)' 
                : 'translateY(0) scale(1)',
            transition: 'all 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)'
          }}
        >
          {/* Inner highlight for 3D effect */}
          {!isPressed && (
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-foreground/5 to-transparent rounded-t-lg pointer-events-none opacity-50" />
          )}
          
          {/* Subtle glow on hover */}
          {isHovered && !isPressed && (
            <div className="absolute -inset-0.5 bg-foreground/10 rounded-lg blur-sm opacity-50 animate-pulse pointer-events-none" />
          )}
          
          {/* Content - Title and Date */}
          <div className="relative p-6 sm:p-8 py-7 sm:py-9">
            {/* Title and Date on same line */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h3 
                id={`newsletter-${id}`} 
                className="text-lg sm:text-xl font-semibold text-foreground flex-1"
              >
                {title}
              </h3>
              
              {/* Date */}
              {date && (
                <span 
                  className="text-xs sm:text-sm text-secondary/60 font-medium whitespace-nowrap"
                >
                  {date}
                </span>
              )}
            </div>
            
            {/* Read more indicator */}
            <div className="flex items-center gap-2 text-sm font-medium text-foreground opacity-70">
              <span>Read full report</span>
              <svg 
                className="w-4 h-4 inline-block transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{
                  transform: isHovered ? 'translateX(2px)' : 'translateX(0)'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
