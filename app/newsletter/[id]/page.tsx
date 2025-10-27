import { getNewsletterById, getAllNewsletters } from "@/lib/newsletters"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import { generateSEOMetadata, generateArticleStructuredData, SEO_CONFIG, SEO_KEYWORDS } from "@/lib/seo"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const newsletters = getAllNewsletters()
  return newsletters.map((newsletter) => ({
    id: newsletter.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const newsletter = getNewsletterById(id)

  if (!newsletter) {
    return {
      title: "Not Found",
    }
  }

  const url = `${SEO_CONFIG.siteUrl}/newsletter/${encodeURIComponent(id)}`
  const description = newsletter.content.substring(0, 155) + "..."
  
  return generateSEOMetadata({
    title: newsletter.title,
    description: `${description} - Milkroad Pro Report covering cryptocurrency market analysis and insights.`,
    keywords: [
      ...SEO_KEYWORDS,
      newsletter.title.toLowerCase(),
      "crypto report",
      "market analysis",
      "cryptocurrency insights",
    ],
    canonical: url,
    ogType: "article",
  })
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

  // Clean up broken markdown links (social sharing links with missing link text)
  const cleanContent = newsletter.content
    .split('\n')
    .filter(line => {
      const trimmed = line.trim()
      // Filter out [[MILK]] references
      if (/\[\[MILK\]\]/.test(trimmed)) {
        return false
      }
      // Filter out lines that are malformed markdown links (](url)[) - social sharing links
      const isBrokenLink = /^\]\s*\(https?:\/\/[^\)]+\)\s*\[?\s*$/.test(trimmed)
      // Filter out standalone brackets
      const isEmptyBrackets = /^\[?\s*\]?\s*$/.test(trimmed)
      // Filter out just opening brackets like "["
      const isStandaloneBracket = /^\[[\s]*$/.test(trimmed)
      return !isBrokenLink && !isEmptyBrackets && !isStandaloneBracket
    })
    .join('\n')

  const url = `${SEO_CONFIG.siteUrl}/newsletter/${encodeURIComponent(id)}`
  const description = newsletter.content.substring(0, 155)
  
  const articleStructuredData = generateArticleStructuredData({
    headline: newsletter.title,
    description: description,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      name: "Milkroad Pro",
    },
    publisher: {
      name: "Milkroad Pro Archive",
      logo: `${SEO_CONFIG.siteUrl}/placeholder.svg`,
    },
    url,
  })

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SEO_CONFIG.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Archive",
        item: `${SEO_CONFIG.siteUrl}/archive`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: newsletter.title,
        item: url,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Article Header */}
        <article aria-labelledby="newsletter-title" itemScope itemType="https://schema.org/Article">
        <h1 id="newsletter-title" className="text-4xl sm:text-5xl font-bold text-foreground mb-2 text-balance">
          {newsletter.title}
        </h1>
        <div className="h-px bg-border my-8" />

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12 space-y-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              h1: ({ className, ...props }) => (
                <h1 className="text-3xl font-bold text-foreground mt-8 mb-4" {...props} />
              ),
              h2: ({ className, ...props }) => (
                <h2 className="text-2xl font-bold text-foreground mt-6 mb-3" {...props} />
              ),
              h3: ({ className, ...props }) => (
                <h3 className="text-xl font-semibold text-foreground mt-4 mb-2" {...props} />
              ),
              h4: ({ className, ...props }) => (
                <h4 className="text-lg font-semibold text-foreground mt-3 mb-2" {...props} />
              ),
              p: ({ className, ...props }) => (
                <p className="text-lg text-foreground leading-relaxed mb-4" {...props} />
              ),
              ul: ({ className, ...props }) => (
                <ul className="ml-6 list-disc space-y-2 text-foreground mb-4" {...props} />
              ),
              ol: ({ className, ...props }) => (
                <ol className="ml-6 list-decimal space-y-2 text-foreground mb-4" {...props} />
              ),
              li: ({ className, ...props }) => (
                <li className="text-lg text-foreground leading-relaxed" {...props} />
              ),
              a: ({ className, href, ...props }) => (
                <a
                  href={href}
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              img: ({ className, src, alt, ...props }) => (
                <img
                  src={src}
                  alt={alt || "Image"}
                  className="rounded-lg my-4 max-w-full h-auto"
                  {...props}
                />
              ),
              blockquote: ({ className, ...props }) => (
                <blockquote className="border-l-4 border-accent pl-4 italic text-secondary my-4" {...props} />
              ),
              code: ({ className, ...props }) => (
                <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props} />
              ),
              pre: ({ className, ...props }) => (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4" {...props} />
              ),
              strong: ({ className, ...props }) => (
                <strong className="font-bold" {...props} />
              ),
              em: ({ className, ...props }) => (
                <em className="italic" {...props} />
              ),
            }}
          >
            {cleanContent}
          </ReactMarkdown>
        </div>

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
    </>
  )
}
