import { getNewsletterById, getAllNewsletters } from "@/lib/newsletters"
import { notFound } from "next/navigation"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const newsletters = getAllNewsletters()
  return newsletters.map((newsletter) => ({
    id: newsletter.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const newsletter = getNewsletterById(id)

  if (!newsletter) {
    return {
      title: "Not Found",
    }
  }

  return {
    title: `${newsletter.title} | Milkroad Pro Archive`,
    description: newsletter.content.substring(0, 160),
    openGraph: {
      title: newsletter.title,
      description: newsletter.content.substring(0, 160),
    },
  }
}

export default async function NewsletterPage({ params }: PageProps) {
  const { id } = await params
  const newsletter = getNewsletterById(id)

  if (!newsletter) {
    notFound()
  }

  const allNewsletters = getAllNewsletters()
  const currentIndex = allNewsletters.findIndex((n) => n.id === id)
  const previousNewsletter = currentIndex < allNewsletters.length - 1 ? allNewsletters[currentIndex + 1] : null
  const nextNewsletter = currentIndex > 0 ? allNewsletters[currentIndex - 1] : null

  const renderContent = (content: string) => {
    return content.split("\n").map((line, idx) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-3xl font-bold text-foreground mt-8 mb-4">
            {line.replace("# ", "")}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-2xl font-bold text-foreground mt-6 mb-3">
            {line.replace("## ", "")}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-xl font-semibold text-foreground mt-4 mb-2">
            {line.replace("### ", "")}
          </h3>
        )
      }
      if (line.startsWith("- ")) {
        return (
          <li key={idx} className="text-foreground ml-4">
            {line.replace("- ", "")}
          </li>
        )
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />
      }
      return (
        <p key={idx} className="text-lg text-foreground leading-relaxed mb-4">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Article Header */}
      <article>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2 text-balance">{newsletter.title}</h1>
        <div className="h-px bg-border my-8" />

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12 space-y-4">{renderContent(newsletter.content)}</div>

        {/* Navigation */}
        <div className="h-px bg-border my-12" />
        <div className="flex gap-4 justify-between">
          {previousNewsletter ? (
            <Link href={`/newsletter/${previousNewsletter.id}`}>
              <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-foreground font-medium">
                ← Previous Report
              </button>
            </Link>
          ) : (
            <div />
          )}

          {nextNewsletter ? (
            <Link href={`/newsletter/${nextNewsletter.id}`}>
              <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-foreground font-medium">
                Next Report →
              </button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>
    </div>
  )
}
