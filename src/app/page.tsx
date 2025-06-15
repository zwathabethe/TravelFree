'use client'

import { useState } from 'react'
import Image from 'next/image'
import { InteractivePlanner } from '@/components/InteractivePlanner'
import { InspirationCarousel } from '@/components/InspirationCarousel'

export default function Home() {
  const [background, setBackground] = useState(
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'
  )

  return (
    <main className="min-h-screen flex flex-col transition-all duration-1000 ease-in-out">
      <div className="absolute inset-0 z-0">
        <Image
          src={background}
          alt="Travel background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 flex-1 flex flex-col justify-center text-white">
        <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
                    TravelFree
                </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mt-4 font-light max-w-2xl mx-auto">
                Your AI-powered gateway to unforgettable adventures. Plan less, explore more.
            </p>
        </div>
        <InteractivePlanner />
      </div>
      <div className="relative z-10 mt-auto">
        <InspirationCarousel />
      </div>
    </main>
  )
} 