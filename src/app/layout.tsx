import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TravelFree - Plan Your Perfect Trip',
  description: 'Plan your dream vacation with ease. Get personalized travel recommendations, budget planning, and detailed itineraries.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  )
} 