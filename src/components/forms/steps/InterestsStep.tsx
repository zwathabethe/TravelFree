import { useState } from 'react'
import { motion } from 'framer-motion'

interface InterestsStepProps {
  data: string[]
  customData: string
  onUpdate: (data: { interests: string[], customInterests: string }) => void
  onNext: () => void
  onBack: () => void
}

const interestCategories = [
  {
    id: 'adventure',
    name: 'Adventure',
    icon: '🏔️',
    interests: ['Hiking', 'Water Sports', 'Rock Climbing', 'Safari', 'Camping']
  },
  {
    id: 'culture',
    name: 'Culture',
    icon: '🏛️',
    interests: ['Museums', 'Historical Sites', 'Local Festivals', 'Art Galleries', 'Traditional Music']
  },
  {
    id: 'food',
    name: 'Food & Drink',
    icon: '🍽️',
    interests: ['Local Cuisine', 'Wine Tasting', 'Cooking Classes', 'Street Food', 'Fine Dining']
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    interests: ['Beaches', 'National Parks', 'Wildlife', 'Gardens', 'Scenic Views']
  },
  {
    id: 'relaxation',
    name: 'Relaxation',
    icon: '🧘',
    interests: ['Spa', 'Yoga', 'Meditation', 'Beach Relaxation', 'Wellness Retreats']
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    interests: ['Local Markets', 'Boutiques', 'Souvenirs', 'Antiques', 'Malls']
  }
]

export default function InterestsStep({ data, customData, onUpdate, onNext, onBack }: InterestsStepProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(data)
  const [customInterests, setCustomInterests] = useState(customData)
  const [activeCategory, setActiveCategory] = useState(interestCategories[0].id)

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = () => {
    onUpdate({
      interests: selectedInterests,
      customInterests
    })
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">What are your interests?</h2>
        <p className="mt-2 text-gray-600">Select activities and experiences that interest you</p>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {interestCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Interests Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {interestCategories
          .find(cat => cat.id === activeCategory)
          ?.interests.map(interest => (
            <motion.button
              key={interest}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleInterestToggle(interest)}
              className={`p-3 rounded-lg border ${
                selectedInterests.includes(interest)
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {interest}
            </motion.button>
          ))}
      </div>

      {/* Custom Interests */}
      <div>
        <label htmlFor="customInterests" className="block text-sm font-medium text-gray-700 mb-2">
          Any other specific interests or preferences?
        </label>
        <textarea
          id="customInterests"
          value={customInterests}
          onChange={(e) => setCustomInterests(e.target.value)}
          placeholder="Tell us about any specific interests or preferences..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  )
} 