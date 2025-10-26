"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/archive", label: "Archive" },
    { href: "/intent", label: "Intent" },
    { href: "/contact", label: "Contact" },
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
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link 
              href="/" 
              className="text-xl sm:text-2xl font-bold text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Milkroad Pro Archive
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-secondary/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Floating Mobile Menu Button */}
            <button 
              className="md:hidden fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-primary text-white shadow-lg hover:bg-primary-hover transition-all duration-200 flex items-center justify-center group"
              onClick={() => setIsOpen(!isOpen)} 
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
                {isOpen ? "✕" : "☰"}
              </span>
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
        className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-card border-l border-border z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Menu</h2>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${
                    isActive(link.href) 
                      ? "text-primary bg-highlight" 
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-6 border-t border-border">
            <p className="text-sm text-secondary/70 text-center">
              Milkroad Pro Archive
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
