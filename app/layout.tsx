import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AppWrapper from "@/components/app-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Milkroad Pro Archive",
  description: "Access all Milkroad Pro reports at your convenience",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  openGraph: {
    title: "Milkroad Pro Archive",
    description: "Access all Milkroad Pro reports at your convenience",
    type: "website",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
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
