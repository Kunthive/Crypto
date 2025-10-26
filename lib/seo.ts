import type { Metadata } from "next"

/**
 * Primary SEO Keywords for Milkroad Pro Reports
 * Strategically selected for maximum search visibility
 */
export const SEO_KEYWORDS = [
  "Milkroad Pro reports",
  "Milkroad Pro archive",
  "Milkroad premium newsletters",
  "Milkroad Pro subscription",
  "cryptocurrency market analysis",
  "crypto insights",
  "bitcoin analysis",
  "crypto newsletter",
  "market reports",
  "cryptocurrency news",
  "crypto research",
  "Milkroad archive",
  "blockchain insights",
  "crypto market intelligence",
  "digital asset analysis",
]

/**
 * Core SEO configuration
 */
export const SEO_CONFIG = {
  siteName: "Milkroad Pro Archive",
  siteUrl: "https://milkroad-archive.vercel.app",
  twitterHandle: "@milkroad",
  defaultTitle: "Milkroad Pro Archive - Complete Collection of Premium Crypto Reports",
  defaultDescription:
    "Access the complete archive of Milkroad Pro reports featuring comprehensive cryptocurrency market analysis, insights, and premium newsletters. Free public access to all historical Milkroad Pro content.",
}

/**
 * Generate comprehensive metadata with SEO optimization
 */
export function generateSEOMetadata(options: {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article" | "blog"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  noindex?: boolean
  nofollow?: boolean
}): Metadata {
  const {
    title = SEO_CONFIG.defaultTitle,
    description = SEO_CONFIG.defaultDescription,
    keywords = SEO_KEYWORDS,
    canonical = "",
    ogImage = "/placeholder.svg",
    ogType = "website",
    publishedTime,
    modifiedTime,
    author = "Milkroad Pro",
    section,
    noindex = false,
    nofollow = false,
  } = options

  const fullTitle = title.includes(SEO_CONFIG.siteName)
    ? title
    : `${title} | ${SEO_CONFIG.siteName}`

  const robotsIndex = noindex || nofollow
    ? `${noindex ? "noindex" : ""}${nofollow ? ", nofollow" : ""}`.trim()
    : "index, follow"

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical,
    },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url: canonical || SEO_CONFIG.siteUrl,
      siteName: SEO_CONFIG.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },
    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    verification: {
      google: "your-google-verification-code", // Replace with actual verification code
    },
  }
}

/**
 * Generate Article structured data (JSON-LD)
 */
export function generateArticleStructuredData(options: {
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author: {
    name: string
    url?: string
  }
  publisher: {
    name: string
    logo?: string
  }
  url: string
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.headline,
    description: options.description,
    image: options.image || "/placeholder.svg",
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    author: {
      "@type": "Person",
      name: options.author.name,
      ...(options.author.url && { url: options.author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: options.publisher.name,
      ...(options.publisher.logo && {
        logo: {
          "@type": "ImageObject",
          url: options.publisher.logo,
        },
      }),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": options.url,
    },
    url: options.url,
    inLanguage: "en-US",
  }
}

/**
 * Generate WebSite structured data (JSON-LD)
 */
export function generateWebSiteStructuredData(searchActionUrl?: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    inLanguage: "en-US",
    potentialAction: searchActionUrl
      ? {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: searchActionUrl,
          },
          "query-input": "required name=search_term_string",
        }
      : undefined,
  }
}

/**
 * Generate BreadcrumbList structured data (JSON-LD)
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate CollectionPage structured data for archive pages
 */
export function generateCollectionPageStructuredData(options: {
  name: string
  description: string
  url: string
  numberOfItems?: number
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.name,
    description: options.description,
    url: options.url,
    ...(options.numberOfItems !== undefined && {
      numberOfItems: options.numberOfItems,
    }),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
  }
}

/**
 * Generate meta viewport for mobile optimization
 */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

/**
 * Generate robots meta tag configuration
 */
export function generateRobotsConfig() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://milkroad-archive.vercel.app/sitemap.xml",
  }
}

