import Link from "next/link"
import { getLatestNewsletters } from "@/lib/newsletters"

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
          <Link href="/archive">
            <button className="bg-primary text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-primary-hover transition-all shadow-md hover:shadow-lg hover:scale-105 text-sm sm:text-base">
              Browse All Reports
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-3xl font-bold text-primary mb-2">{latestNewsletters.length > 0 ? '127+' : '0'}</div>
          <div className="text-secondary">Total Reports</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-3xl font-bold text-primary mb-2">100%</div>
          <div className="text-secondary">Complete Archive</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-3xl font-bold text-primary mb-2">Free</div>
          <div className="text-secondary">Public Access</div>
        </div>
      </section>
    </div>
  )
}
