"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/archive", label: "Archive", icon: "📚" },
    { href: "/intent", label: "Intent", icon: "🎯" },
    { href: "/contact", label: "Contact", icon: "💬" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/98 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <Link 
              href="/" 
              className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground transition-all hover:opacity-70"
              onClick={() => setIsOpen(false)}
            >
              <span className="inline-block">
                <span className="font-light">Milkroad</span>
                <span className="font-normal ml-1">Pro</span>
                <span className="font-light ml-1">Archive</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 text-sm font-normal transition-all tracking-wide group ${
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-secondary hover:text-foreground"
                  }`}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button - Positioned in header */}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border hover:border-foreground transition-all bg-gradient-to-b from-background to-background/50 active:translate-y-0.5 active:shadow-sm"
              onClick={() => setIsOpen(!isOpen)} 
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg
                className="w-7 h-7 stroke-foreground"
                fill="none"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-background z-40 transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full border-l border-border">
          <div className="p-8 border-b border-border">
            <h2 className="text-lg font-light tracking-wide text-foreground">Menu</h2>
          </div>
          
          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 py-3 text-base font-normal transition-all tracking-wide group ${
                    isActive(link.href) 
                      ? "text-foreground" 
                      : "text-secondary hover:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive(link.href) && <span className="inline-block w-2 h-2 bg-foreground rounded-full ml-auto" />}
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-8 border-t border-border">
            <p className="text-xs text-secondary/60 text-center tracking-wider">
              © 2024
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
