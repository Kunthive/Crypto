import { getNewsletterById, getAllNewsletters } from "@/lib/newsletters"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const newsletters = getAllNewsletters()
  return newsletters.map((newsletter) => ({
    id: encodeURIComponent(newsletter.id),
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  // Decode the URL-encoded ID to match the original filename
  const decodedId = decodeURIComponent(id)
  const newsletter = getNewsletterById(decodedId)

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
  // Decode the URL-encoded ID to match the original filename
  const decodedId = decodeURIComponent(id)
  const newsletter = getNewsletterById(decodedId)

  if (!newsletter) {
    notFound()
  }

  const allNewsletters = getAllNewsletters()
  const currentIndex = allNewsletters.findIndex((n) => n.id === decodedId)
  const previousNewsletter = currentIndex < allNewsletters.length - 1 ? allNewsletters[currentIndex + 1] : null
  const nextNewsletter = currentIndex > 0 ? allNewsletters[currentIndex - 1] : null

  // Fallback/simple renderer: convert markdown-like blocks to elements so the
  // content is visible even if a markdown plugin isn't processing certain
  // constructs. This handles H1/H2/H3, lists that start with "- ", and
  // paragraph blocks separated by blank lines.
  const renderContent = (content: string) => {
    if (!content) return null

    // Normalize CRLF and split into blocks by two or more newlines
    const blocks = content.replace(/\r\n/g, "\n").split(/\n{2,}/)

    return blocks.map((block, i) => {
      const trimmed = block.trim()

      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={i} className="text-3xl font-bold text-foreground mt-8 mb-4">
            {trimmed.replace(/^#\s+/, "")}
          </h1>
        )
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold text-foreground mt-6 mb-3">
            {trimmed.replace(/^##\s+/, "")}
          </h2>
        )
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-semibold text-foreground mt-4 mb-2">
            {trimmed.replace(/^###\s+/, "")}
          </h3>
        )
      }

      // Simple unordered list support: lines starting with "- "
      const lines = trimmed.split(/\n+/)
      const isList = lines.every((ln) => ln.trim().startsWith("- ") || ln.trim() === "") && lines.some((ln) => ln.trim().startsWith("- "))
      if (isList) {
        const items = lines
          .map((ln) => ln.trim())
          .filter((ln) => ln.startsWith("- "))
          .map((ln) => ln.replace(/^-\s+/, ""))
        return (
          <ul key={i} className="ml-6 list-disc space-y-2 text-foreground">
            {items.map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        )
      }

      // Default: render as paragraph, preserving inline links/images as raw text
      return (
        <p key={i} className="text-lg text-foreground leading-relaxed mb-4">
          {lines.map((ln, idx) => (
            <span key={idx}>
              {ln}
              {idx < lines.length - 1 ? "\n" : ""}
            </span>
          ))}
        </p>
      )
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Article Header */}
      <article aria-labelledby="newsletter-title">
        <h1 id="newsletter-title" className="text-4xl sm:text-5xl font-bold text-foreground mb-2 text-balance">
          {newsletter.title}
        </h1>
        <div className="h-px bg-border my-8" />

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12 space-y-4">{renderContent(newsletter.content)}</div>

        {/* Navigation */}
        <div className="h-px bg-border my-12" />
        <div className="flex gap-4 justify-between">
          {previousNewsletter ? (
            <Link href={`/newsletter/${encodeURIComponent(previousNewsletter.id)}`}>
              <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-foreground font-medium">
                ← Previous Report
              </button>
            </Link>
          ) : (
            <div />
          )}

          {nextNewsletter ? (
            <Link href={`/newsletter/${encodeURIComponent(nextNewsletter.id)}`}>
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
