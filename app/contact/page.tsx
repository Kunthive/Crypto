import ContactClientPage from "./contact-client-page"
import { generateSEOMetadata, SEO_CONFIG, SEO_KEYWORDS } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us - Milkroad Pro Archive",
  description: "Get in touch with questions, feedback, or inquiries about the Milkroad Pro Archive. We welcome your input to improve the archive experience.",
  keywords: [...SEO_KEYWORDS, "contact", "feedback", "support"],
  canonical: `${SEO_CONFIG.siteUrl}/contact`,
  noindex: true,
})

export default function ContactPage() {
  return <ContactClientPage />
}
