import Link from "next/link"

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <h1 className="text-4xl font-bold text-foreground mb-4">404 - Not Found</h1>
      <p className="text-lg text-secondary mb-8">The page you're looking for doesn't exist.</p>
      <Link href="/">
        <button className="bg-foreground text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary transition-colors">
          Back to Home
        </button>
      </Link>
    </div>
  )
}
