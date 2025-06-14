'use client'

import { motion } from 'framer-motion'
import { differenceInDays } from 'date-fns'

interface SummaryStepProps {
  data: {
    destination: string
    interests: string[]
    customInterests: string
    budget: {
      accommodation: number
      food: number
      activities: number
      currency: string
    }
    duration: {
      startDate: Date | null
      endDate: Date | null
    }
    group: {
      adults: number
      children: number
      childrenAges: number[]
    }
  }
  onBack: () => void
}

const currencies = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
}

export default function SummaryStep({ data, onBack }: SummaryStepProps) {
  const getDurationInDays = () => {
    if (data.duration.startDate && data.duration.endDate) {
      return differenceInDays(data.duration.endDate, data.duration.startDate)
    }
    return 0
  }

  const getTotalBudget = () => {
    const days = getDurationInDays()
    const dailyTotal = data.budget.accommodation + data.budget.food + data.budget.activities
    return dailyTotal * days
  }

  const getCurrencySymbol = (code: string) => {
    return currencies[code as keyof typeof currencies] || '$'
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Your Travel Plan</h2>
        <p className="mt-2 text-gray-600">Review your travel details and preferences</p>
      </div>

      {/* Destination */}
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Destination</h3>
        <p className="text-gray-700">{data.destination}</p>
      </div>

      {/* Dates */}
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Dates</h3>
        {data.duration.startDate && data.duration.endDate && (
          <div className="space-y-2">
            <p className="text-gray-700">
              {data.duration.startDate.toLocaleDateString()} - {data.duration.endDate.toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Duration: {getDurationInDays()} days
            </p>
          </div>
        )}
      </div>

      {/* Group */}
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Group</h3>
        <p className="text-gray-700">
          {data.group.adults} {data.group.adults === 1 ? 'Adult' : 'Adults'}
          {data.group.children > 0 && (
            <>
              {' '}
              and {data.group.children} {data.group.children === 1 ? 'Child' : 'Children'}
            </>
          )}
        </p>
      </div>

      {/* Interests */}
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {data.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
        {data.customInterests && (
          <p className="mt-4 text-gray-700">
            <span className="font-medium">Additional preferences:</span> {data.customInterests}
          </p>
        )}
      </div>

      {/* Budget Summary */}
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Accommodation (per day)</span>
            <span className="font-medium">
              {getCurrencySymbol(data.budget.currency)}{data.budget.accommodation}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Food (per day)</span>
            <span className="font-medium">
              {getCurrencySymbol(data.budget.currency)}{data.budget.food}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Activities (per day)</span>
            <span className="font-medium">
              {getCurrencySymbol(data.budget.currency)}{data.budget.activities}
            </span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-gray-900 font-medium">Total Budget</span>
              <span className="text-blue-600 font-bold">
                {getCurrencySymbol(data.budget.currency)}{getTotalBudget()}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Based on {getDurationInDays()} days
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Generate Itinerary
        </motion.button>
      </div>
    </div>
  )
} 