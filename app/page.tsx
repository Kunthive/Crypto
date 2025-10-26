import NewsletterCard from "@/components/newsletter-card"
import { getLatestNewsletters } from "@/lib/newsletters"
import Link from "next/link"

export default function Home() {
  const latestNewsletters = getLatestNewsletters(3)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Milkroad Pro Archive</h1>
        <p className="text-lg sm:text-xl text-secondary mb-6 max-w-2xl text-pretty">
          Access all Milkroad Pro reports at your convenience. Browse comprehensive cryptocurrency market analyses and
          insights previously available only to Pro subscribers.
        </p>
      </section>

      {/* Latest Reports Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-foreground mb-8">Latest Reports</h2>
        {latestNewsletters.length > 0 ? (
          <div className="grid gap-6 mb-8">
            {latestNewsletters.map((newsletter) => (
              <NewsletterCard key={newsletter.id} id={newsletter.id} title={newsletter.title} />
            ))}
          </div>
        ) : (
          <p className="text-secondary">No newsletters available yet.</p>
        )}

        <Link href="/archive">
          <button className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-foreground transition-colors">
            View All Reports
          </button>
        </Link>
      </section>
    </div>
  )
}
