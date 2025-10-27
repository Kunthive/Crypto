import Link from "next/link"
import { getLatestNewsletters } from "@/lib/newsletters"
import { generateSEOMetadata, SEO_KEYWORDS, SEO_CONFIG } from "@/lib/seo"
import type { Metadata } from "next"

export const dynamic = 'force-static'

export const metadata: Metadata = generateSEOMetadata({
  title: "Milkroad Pro Archive - Premium Cryptocurrency Reports Collection",
  description:
    "Access the complete archive of Milkroad Pro reports featuring premium cryptocurrency market analysis, insights, and investment intelligence. Free public access to all historical Milkroad Pro newsletters.",
  keywords: SEO_KEYWORDS,
  canonical: SEO_CONFIG.siteUrl,
})

export default function Home() {
  const latestNewsletters = getLatestNewsletters(3)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      {/* Hero Section */}
      <section className="mb-12 sm:mb-16 lg:mb-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Milkroad Pro Archive</h1>
        <p className="text-base sm:text-lg lg:text-xl text-secondary/80 mb-6 max-w-2xl text-pretty">
          Access all Milkroad Pro reports at your convenience. Browse comprehensive cryptocurrency market analyses and
          insights previously available only to Pro subscribers.
        </p>
      </section>

      {/* Information Section */}
      <section className="mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">About This Archive</h2>
        <div className="space-y-4 text-base sm:text-lg text-secondary/80 max-w-3xl">
          <p className="text-pretty">
            This archive contains all historical Milkroad Pro reports, providing you with comprehensive 
            cryptocurrency market analyses and insights.
          </p>
          <p className="text-pretty">
            Each report includes detailed market analysis, trends, and actionable insights that were 
            previously available only to Pro subscribers.
          </p>
          <p className="text-pretty">
            Browse the complete collection in the Archive section, where you can search and filter 
            reports to find the information you need.
          </p>
        </div>
        
        <div className="mt-8">
          <Link href="/archive" className="inline-block">
            <button className="bg-foreground text-background px-6 sm:px-8 py-3 rounded-lg font-medium transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] active:shadow-inner active:translate-y-[3px] active:scale-[0.99] text-sm sm:text-base">
              Browse All Reports
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-border rounded-lg p-6 hover:border-foreground transition-colors">
          <div className="text-3xl font-bold text-foreground mb-2">{latestNewsletters.length > 0 ? '127+' : '0'}</div>
          <div className="text-secondary">Total Reports</div>
        </div>
        <div className="border border-border rounded-lg p-6 hover:border-foreground transition-colors">
          <div className="text-3xl font-bold text-foreground mb-2">100%</div>
          <div className="text-secondary">Complete Archive</div>
        </div>
        <div className="border border-border rounded-lg p-6 hover:border-foreground transition-colors">
          <div className="text-3xl font-bold text-foreground mb-2">Free</div>
          <div className="text-secondary">Public Access</div>
        </div>
      </section>
    </div>
  )
}
