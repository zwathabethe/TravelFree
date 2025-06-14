import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TravelFree - Personalized Travel Planning',
  description: 'Plan your perfect trip with TravelFree - a personalized travel planning application that helps you create unforgettable experiences.',
  keywords: 'travel, planning, vacation, trip, itinerary, personalized, tourism',
  authors: [{ name: 'TravelFree Team' }],
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  )
} 