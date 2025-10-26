import Link from "next/link"

interface NewsletterCardProps {
  id: string
  title: string
}

export default function NewsletterCard({ id, title }: NewsletterCardProps) {
  return (
    <Link href={`/newsletter/${id}`}>
      <div className="p-8 border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
    </Link>
  )
}
