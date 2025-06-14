'use client'

import { useState } from 'react'
import Image from 'next/image'
import { InteractivePlanner } from '@/components/InteractivePlanner'

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
      <div className="relative z-10 flex-1 flex flex-col">
        <InteractivePlanner />
      </div>
    </main>
  )
} 