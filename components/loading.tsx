"use client"

import { useEffect, useState } from "react"

export default function Loading() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-foreground/10 border-t-foreground rounded-full animate-spin" />
        </div>
        <p className="text-sm font-medium text-secondary">Loading...</p>
      </div>
    </div>
  )
}

