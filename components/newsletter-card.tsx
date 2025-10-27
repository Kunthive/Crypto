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
  const [isHovered, setIsHovered] = useState(false)
  
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
        onMouseLeave={() => {
          setIsPressed(false)
          setIsHovered(false)
        }}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Retro 3D raised card effect */}
        <div 
          className={`relative bg-gradient-to-b from-background to-background/50 rounded-lg transition-all duration-300 ${
            isPressed 
              ? 'translate-y-2 shadow-inner border-2 border-foreground/20' 
              : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] border-2 border-foreground/40 hover:border-foreground'
          }`}
          style={{
            transform: isPressed ? 'translateY(4px)' : isHovered ? 'translateY(-2px)' : 'translateY(0px)',
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
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
          
          {/* Content */}
          <div className="relative p-6 sm:p-8 overflow-hidden">
            {/* Title */}
            <h3 
              id={`newsletter-${id}`} 
              className="text-lg sm:text-xl font-semibold text-foreground mb-3 transition-all"
              style={{
                transform: isPressed ? 'translateY(2px)' : 'translateY(0)',
                transition: 'transform 0.2s ease'
              }}
            >
              {title}
            </h3>
            
            {/* Preview text with fade out */}
            {preview && (
              <div className="relative h-24 overflow-hidden">
                <p 
                  className="text-sm text-secondary/80 leading-relaxed line-clamp-4 transition-all"
                  style={{
                    transform: isPressed ? 'translateY(2px)' : 'translateY(0)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  {getPreview()}
                </p>
                {/* Enhanced fade effect at bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-background pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent, var(--background))'
                  }}
                />
              </div>
            )}
            
            {/* Read more indicator */}
            <div 
              className="flex items-center gap-2 text-sm font-medium text-foreground opacity-70 mt-4 transition-all"
              style={{
                transform: isPressed ? 'translateX(2px) translateY(2px)' : 'translateX(0) translateY(0)',
                transition: 'transform 0.2s ease'
              }}
            >
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
