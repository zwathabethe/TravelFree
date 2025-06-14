'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPinIcon } from '@heroicons/react/24/outline'

interface DestinationStepProps {
  data: {
    destination: string
  }
  onNext: () => void
  onUpdate: (data: { destination: string }) => void
}

const popularDestinations = [
  {
    id: 'bali',
    name: 'Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    description: 'Tropical paradise with rich culture and stunning beaches'
  },
  {
    id: 'paris',
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    description: 'City of love, art, and unforgettable experiences'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    description: 'Where tradition meets cutting-edge technology'
  }
]

export default function DestinationStep({ data, onNext, onUpdate }: DestinationStepProps) {
  const [selectedDestination, setSelectedDestination] = useState(data.destination)
  const [customDestination, setCustomDestination] = useState('')

  const handleDestinationSelect = (destination: string) => {
    setSelectedDestination(destination)
    setCustomDestination('')
    onUpdate({ destination })
  }

  const handleCustomDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomDestination(value)
    setSelectedDestination('')
    onUpdate({ destination: value })
  }

  const isDestinationSelected = selectedDestination || customDestination

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Where would you like to go?</h2>
        <p className="mt-2 text-gray-600">
          Choose a popular destination or enter your own. We'll do the research for you!
        </p>
      </div>

      {/* Popular Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {popularDestinations.map((destination) => (
          <button
            key={destination.id}
            onClick={() => handleDestinationSelect(destination.name)}
            className={`relative rounded-lg overflow-hidden group transition-all ${
              selectedDestination === destination.name
                ? 'ring-2 ring-blue-500 ring-offset-2'
                : 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2'
            }`}
          >
            <div className="relative h-48">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                <p className="text-sm opacity-90">{destination.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* OR Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-gray-500">or</span>
        </div>
      </div>

      {/* Custom Destination Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPinIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={customDestination}
          onChange={handleCustomDestinationChange}
          placeholder="Type any city, region, or country..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!isDestinationSelected}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </motion.div>
  )
} 