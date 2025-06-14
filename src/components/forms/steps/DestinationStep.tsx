import { useState } from 'react'
import { motion } from 'framer-motion'

interface DestinationStepProps {
  data: string
  onUpdate: (data: { destination: string }) => void
  onNext: () => void
}

const popularDestinations = [
  { name: 'Paris, France', image: '/images/paris.jpg' },
  { name: 'Tokyo, Japan', image: '/images/tokyo.jpg' },
  { name: 'New York, USA', image: '/images/newyork.jpg' },
  { name: 'Bali, Indonesia', image: '/images/bali.jpg' },
  { name: 'Rome, Italy', image: '/images/rome.jpg' },
  { name: 'Sydney, Australia', image: '/images/sydney.jpg' },
]

export default function DestinationStep({ data, onUpdate, onNext }: DestinationStepProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleDestinationSelect = (destination: string) => {
    onUpdate({ destination })
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Where would you like to go?</h2>
        <p className="mt-2 text-gray-600">Select your dream destination or search for a specific location</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search destinations..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Popular Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularDestinations.map((destination) => (
          <motion.button
            key={destination.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleDestinationSelect(destination.name)}
            className="relative h-48 rounded-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-semibold">{destination.name}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Custom Destination Input */}
      <div className="mt-6">
        <button
          onClick={() => handleDestinationSelect(searchQuery)}
          disabled={!searchQuery.trim()}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue with Custom Destination
        </button>
      </div>
    </div>
  )
} 