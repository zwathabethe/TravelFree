'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SunIcon,
  MapIcon,
  BuildingOfficeIcon,
  HeartIcon,
  CameraIcon,
  ShoppingBagIcon,
  MusicalNoteIcon,
  SparklesIcon,
  GlobeAltIcon,
  FireIcon
} from '@heroicons/react/24/outline'

interface InterestsStepProps {
  data: {
    interests: string[]
    customInterests: string[]
  }
  onNext: (data: { interests: string[], customInterests: string[] }) => void
  onBack: () => void
}

const interests = [
  {
    id: 'beach',
    name: 'Beach & Sun',
    icon: SunIcon,
    description: 'Relax on pristine beaches and enjoy water activities'
  },
  {
    id: 'nature',
    name: 'Nature & Hiking',
    icon: MapIcon,
    description: 'Explore national parks and scenic trails'
  },
  {
    id: 'culture',
    name: 'Culture & History',
    icon: BuildingOfficeIcon,
    description: 'Visit museums, historical sites, and local traditions'
  },
  {
    id: 'romance',
    name: 'Romance',
    icon: HeartIcon,
    description: 'Perfect for couples and romantic getaways'
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: CameraIcon,
    description: 'Capture stunning landscapes and cityscapes'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingBagIcon,
    description: 'Discover local markets and luxury boutiques'
  },
  {
    id: 'nightlife',
    name: 'Nightlife',
    icon: MusicalNoteIcon,
    description: 'Experience vibrant bars, clubs, and entertainment'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: SparklesIcon,
    description: 'Indulge in high-end experiences and accommodations'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: GlobeAltIcon,
    description: 'Try thrilling activities and unique experiences'
  },
  {
    id: 'food',
    name: 'Food & Dining',
    icon: FireIcon,
    description: 'Savor local cuisine and culinary experiences'
  }
]

export default function InterestsStep({ data, onNext, onBack }: InterestsStepProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(data.interests || [])
  const [customInterest, setCustomInterest] = useState('')
  const [customInterests, setCustomInterests] = useState<string[]>(data.customInterests || [])

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !customInterests.includes(customInterest.trim())) {
      setCustomInterests(prev => [...prev, customInterest.trim()])
      setCustomInterest('')
    }
  }

  const handleRemoveCustomInterest = (interest: string) => {
    setCustomInterests(prev => prev.filter(i => i !== interest))
  }

  const handleNext = () => {
    onNext({
      interests: selectedInterests,
      customInterests
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">What are your interests?</h2>
        <p className="text-gray-600">Select activities and experiences you'd like to enjoy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interests.map((interest) => {
          const Icon = interest.icon
          return (
            <button
              key={interest.id}
              onClick={() => handleInterestToggle(interest.id)}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                selectedInterests.includes(interest.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedInterests.includes(interest.id)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">{interest.name}</h3>
                  <p className="text-sm text-gray-600">{interest.description}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Custom Interests */}
      <div className="space-y-4">
        <h3 className="font-semibold">Add Custom Interests</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            placeholder="Enter custom interest..."
            className="input flex-1"
          />
          <button
            onClick={handleAddCustomInterest}
            disabled={!customInterest.trim()}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
        {customInterests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {customInterests.map((interest) => (
              <div
                key={interest}
                className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full"
              >
                <span>{interest}</span>
                <button
                  onClick={() => handleRemoveCustomInterest(interest)}
                  className="text-primary hover:text-primary/80"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="btn btn-outline"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={selectedInterests.length === 0 && customInterests.length === 0}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </motion.div>
  )
} 