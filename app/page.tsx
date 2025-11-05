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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      {/* Hero Section */}
      <section className="mb-16 sm:mb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
          Milkroad Pro Archive
        </h1>
        <p className="text-lg sm:text-xl text-secondary max-w-2xl leading-relaxed font-medium">
          Access all Milkroad Pro reports. Comprehensive cryptocurrency market analyses and insights.
        </p>
      </section>

      {/* Stats Section - Minimal & Bold */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16">
        <div className="border-3 border-foreground rounded-md p-6 sm:p-8 neo-shadow-sm hover:neo-shadow hover:-translate-y-1 transition-all bg-background">
          <div className="text-4xl sm:text-5xl font-black text-foreground mb-2">{latestNewsletters.length > 0 ? '127+' : '0'}</div>
          <div className="text-sm sm:text-base text-secondary font-bold uppercase tracking-wide">Reports</div>
        </div>
        <div className="border-3 border-foreground rounded-md p-6 sm:p-8 neo-shadow-sm hover:neo-shadow hover:-translate-y-1 transition-all bg-background">
          <div className="text-4xl sm:text-5xl font-black text-foreground mb-2">100%</div>
          <div className="text-sm sm:text-base text-secondary font-bold uppercase tracking-wide">Complete</div>
        </div>
        <div className="border-3 border-foreground rounded-md p-6 sm:p-8 neo-shadow-sm hover:neo-shadow hover:-translate-y-1 transition-all bg-background">
          <div className="text-4xl sm:text-5xl font-black text-foreground mb-2">Free</div>
          <div className="text-sm sm:text-base text-secondary font-bold uppercase tracking-wide">Access</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <Link href="/archive" className="inline-block">
          <button className="bg-foreground text-background px-8 sm:px-12 py-4 rounded-md font-black uppercase tracking-wide text-sm sm:text-base neo-shadow hover:neo-shadow-lg hover:-translate-y-1 active:translate-y-1 transition-all border-3 border-foreground">
            Browse All Reports →
          </button>
        </Link>
      </section>
    </div>
  )
}
