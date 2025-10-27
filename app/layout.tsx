import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AppWrapper from "@/components/app-wrapper"
import { generateSEOMetadata, viewport, SEO_KEYWORDS, SEO_CONFIG } from "@/lib/seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_KEYWORDS,
    canonical: SEO_CONFIG.siteUrl,
  }),
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  generator: "Next.js",
  applicationName: SEO_CONFIG.siteName,
  referrer: "origin-when-cross-origin",
  category: "Finance, Cryptocurrency, Investment",
}

export { viewport }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Milkroad Pro Archive",
    url: "https://milkroad-archive.vercel.app",
    description: "Complete archive of Milkroad Pro reports featuring comprehensive cryptocurrency market analysis",
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://milkroad-archive.vercel.app/archive?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Milkroad Pro Archive",
    url: "https://milkroad-archive.vercel.app",
    logo: "https://milkroad-archive.vercel.app/placeholder.svg",
    sameAs: [],
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AppWrapper>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppWrapper>
      </body>
    </html>
  )
}
