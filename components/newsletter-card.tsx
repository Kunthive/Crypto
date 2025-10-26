import Link from "next/link"

interface NewsletterCardProps {
  id: string
  title: string
}

export default function NewsletterCard({ id, title }: NewsletterCardProps) {
  return (
    <article aria-labelledby={`newsletter-${id}`} className="rounded-lg">
      <Link href={`/newsletter/${encodeURIComponent(id)}`} className="block focus:outline-none focus:ring-2 focus:ring-foreground rounded-lg" aria-label={`Open report ${title}`}>
        <div className="p-6 sm:p-8 border border-border rounded-lg hover:border-foreground transition-all">
          <h3 id={`newsletter-${id}`} className="text-lg sm:text-xl font-semibold text-foreground transition-colors">
            {title}
          </h3>
        </div>
      </Link>
    </article>
  )
}
