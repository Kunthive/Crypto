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
    id: encodeURIComponent(newsletter.id),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const decodedId = decodeURIComponent(id)
  const newsletter = getNewsletterById(decodedId)

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
  const decodedId = decodeURIComponent(id)
  const newsletter = getNewsletterById(decodedId)

  if (!newsletter) {
    notFound()
  }

  const allNewsletters = getAllNewsletters()
  const currentIndex = allNewsletters.findIndex((n) => n.id === decodedId)
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Article Header */}
        <article aria-labelledby="newsletter-title" itemScope itemType="https://schema.org/Article">
        <h1 id="newsletter-title" className="text-3xl sm:text-5xl font-black text-foreground mb-3 leading-tight">
          {newsletter.title}
        </h1>
        <div className="h-1 bg-foreground my-8 rounded-sm" />

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              h1: ({ className, ...props }) => (
                <h1 className="text-3xl font-black text-foreground mt-10 mb-5" {...props} />
              ),
              h2: ({ className, ...props }) => (
                <h2 className="text-2xl font-black text-foreground mt-8 mb-4" {...props} />
              ),
              h3: ({ className, ...props }) => (
                <h3 className="text-xl font-bold text-foreground mt-6 mb-3" {...props} />
              ),
              h4: ({ className, ...props }) => (
                <h4 className="text-lg font-bold text-foreground mt-5 mb-2" {...props} />
              ),
              p: ({ className, ...props }) => (
                <p className="text-base sm:text-lg text-foreground leading-relaxed mb-5" {...props} />
              ),
              ul: ({ className, ...props }) => (
                <ul className="ml-6 list-disc space-y-2 text-foreground mb-5 marker:text-foreground" {...props} />
              ),
              ol: ({ className, ...props }) => (
                <ol className="ml-6 list-decimal space-y-2 text-foreground mb-5 marker:text-foreground marker:font-bold" {...props} />
              ),
              li: ({ className, ...props }) => (
                <li className="text-base sm:text-lg text-foreground leading-relaxed" {...props} />
              ),
              a: ({ className, href, ...props }) => (
                <a
                  href={href}
                  className="text-foreground underline decoration-2 hover:decoration-4 font-medium transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              img: ({ className, src, alt, ...props }) => (
                <img
                  src={src}
                  alt={alt || "Image"}
                  className="rounded-md border-3 border-foreground neo-shadow-sm my-6 max-w-full h-auto"
                  {...props}
                />
              ),
              blockquote: ({ className, ...props }) => (
                <blockquote className="border-l-4 border-foreground pl-5 py-2 italic text-foreground/90 my-6 font-medium bg-muted" {...props} />
              ),
              code: ({ className, ...props }) => (
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono border border-foreground/20" {...props} />
              ),
              pre: ({ className, ...props }) => (
                <pre className="bg-muted p-5 rounded-md border-2 border-foreground/30 overflow-x-auto my-6" {...props} />
              ),
              strong: ({ className, ...props }) => (
                <strong className="font-black" {...props} />
              ),
              em: ({ className, ...props }) => (
                <em className="italic font-medium" {...props} />
              ),
            }}
          >
            {cleanContent}
          </ReactMarkdown>
        </div>

        {/* Navigation */}
        <div className="h-1 bg-foreground my-12 rounded-sm" />
        <div className="flex gap-4 justify-between flex-wrap">
          {previousNewsletter ? (
            <Link href={`/newsletter/${encodeURIComponent(previousNewsletter.id)}`}>
              <button className="flex items-center gap-2 px-5 py-3 border-3 border-foreground rounded-md neo-shadow-sm hover:neo-shadow hover:-translate-y-1 active:translate-y-1 transition-all text-foreground font-bold bg-background uppercase tracking-wide text-sm">
                ← Prev
              </button>
            </Link>
          ) : (
            <div />
          )}

          {nextNewsletter ? (
            <Link href={`/newsletter/${encodeURIComponent(nextNewsletter.id)}`}>
              <button className="flex items-center gap-2 px-5 py-3 border-3 border-foreground rounded-md neo-shadow-sm hover:neo-shadow hover:-translate-y-1 active:translate-y-1 transition-all text-foreground font-bold bg-background uppercase tracking-wide text-sm">
                Next →
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
