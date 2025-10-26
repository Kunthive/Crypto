import Link from "next/link"

interface NewsletterCardProps {
  id: string
  title: string
}

export default function NewsletterCard({ id, title }: NewsletterCardProps) {
  return (
    <article aria-labelledby={`newsletter-${id}`} className="rounded-lg">
      <Link href={`/newsletter/${id}`} className="block focus:outline-none focus:ring-2 focus:ring-accent" aria-label={`Open report ${title}`}>
        <div className="p-8 border border-border rounded-lg hover:bg-muted transition-colors">
          <h3 id={`newsletter-${id}`} className="text-xl font-semibold text-foreground">
            {title}
          </h3>
        </div>
      </Link>
    </article>
  )
}
