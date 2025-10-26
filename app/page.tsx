import NewsletterCard from "@/components/newsletter-card"
import { getLatestNewsletters } from "@/lib/newsletters"
import Link from "next/link"

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

      {/* Latest Reports Section */}
      <section className="mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Latest Reports</h2>
        {latestNewsletters.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 mb-8">
            {latestNewsletters.map((newsletter) => (
              <NewsletterCard key={newsletter.id} id={newsletter.id} title={newsletter.title} />
            ))}
          </div>
        ) : (
          <p className="text-secondary/70">No newsletters available yet.</p>
        )}

        <Link href="/archive">
          <button className="bg-primary text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-primary-hover transition-all shadow-md hover:shadow-lg hover:scale-105 text-sm sm:text-base">
            View All Reports
          </button>
        </Link>
      </section>
    </div>
  )
}
