"use client"

import Link from "next/link"
import { useState } from "react"

interface NewsletterCardProps {
  id: string
  title: string
  preview?: string
}

export default function NewsletterCard({ id, title, preview }: NewsletterCardProps) {
  const [isPressed, setIsPressed] = useState(false)
  
  // Extract first few sentences for preview
  const getPreview = () => {
    if (preview) {
      // Get first 200 characters
      const truncated = preview.substring(0, 200).trim()
      return truncated.length < preview.length ? truncated + "..." : truncated
    }
    return ""
  }

  return (
    <article aria-labelledby={`newsletter-${id}`} className="rounded-lg">
      <Link 
        href={`/newsletter/${encodeURIComponent(id)}`} 
        className="block focus:outline-none focus:ring-2 focus:ring-foreground rounded-lg" 
        aria-label={`Open report ${title}`}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        <div 
          className={`relative p-6 sm:p-8 border-2 border-border rounded-lg hover:border-foreground transition-all bg-gradient-to-b from-background to-background/50 ${
            isPressed ? 'translate-y-1 shadow-sm' : 'shadow-lg hover:shadow-xl'
          }`}
          style={{
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Retro 3D effect border */}
          <div 
            className={`absolute inset-0 rounded-lg border-2 transition-all ${
              isPressed 
                ? 'border-t-border/50 border-r-border/30 border-b-border border-l-border/50' 
                : 'border-t-border/20 border-r-border border-b-border/20 border-l-border'
            }`}
            style={{
              pointerEvents: 'none'
            }}
          />
          
          <div className="relative overflow-hidden">
            {/* Title */}
            <h3 id={`newsletter-${id}`} className="text-lg sm:text-xl font-semibold text-foreground mb-3 transition-colors">
              {title}
            </h3>
            
            {/* Preview text with fade out */}
            {preview && (
              <div className="relative">
                <p className="text-sm text-secondary/80 leading-relaxed mb-4 line-clamp-3">
                  {getPreview()}
                </p>
                {/* Fade effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </div>
            )}
            
            {/* Read more indicator */}
            <div className="flex items-center gap-2 text-sm font-medium text-foreground opacity-70">
              <span>Read full report</span>
              <svg 
                className="w-4 h-4 inline-block transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
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
