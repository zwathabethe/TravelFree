'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { differenceInDays } from 'date-fns'

interface DurationStepProps {
  data: {
    startDate: Date | null
    endDate: Date | null
  }
  onUpdate: (data: { duration: DurationStepProps['data'] }) => void
  onNext: () => void
  onBack: () => void
}

const suggestedDurations = [
  { label: 'Weekend', days: 2 },
  { label: 'Short Break', days: 4 },
  { label: 'Week', days: 7 },
  { label: 'Two Weeks', days: 14 },
  { label: 'Month', days: 30 },
]

export default function DurationStep({ data, onUpdate, onNext, onBack }: DurationStepProps) {
  const [duration, setDuration] = useState(data)
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null)

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setDuration({ startDate: start, endDate: end })
    setSelectedDuration(null)
  }

  const handleDurationSelect = (days: number) => {
    const start = new Date()
    const end = new Date()
    end.setDate(end.getDate() + days)
    setDuration({ startDate: start, endDate: end })
    setSelectedDuration(days)
  }

  const handleSubmit = () => {
    onUpdate({ duration })
    onNext()
  }

  const getDurationInDays = () => {
    if (duration.startDate && duration.endDate) {
      return differenceInDays(duration.endDate, duration.startDate)
    }
    return 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">When are you traveling?</h2>
        <p className="mt-2 text-gray-600">Select your travel dates or choose a suggested duration</p>
      </div>

      {/* Date Range Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Travel Dates
        </label>
        <DatePicker
          selected={duration.startDate}
          onChange={handleDateChange}
          startDate={duration.startDate}
          endDate={duration.endDate}
          selectsRange
          inline
          minDate={new Date()}
          className="w-full"
        />
      </div>

      {/* Suggested Durations */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or choose a suggested duration
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {suggestedDurations.map(({ label, days }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDurationSelect(days)}
              className={`p-3 rounded-lg border ${
                selectedDuration === days
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {label}
              <div className="text-sm mt-1 text-gray-500">
                {days} days
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Duration Summary */}
      {getDurationInDays() > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900">Trip Duration</h3>
          <p className="text-blue-700">
            {getDurationInDays()} days
            {duration.startDate && duration.endDate && (
              <>
                {' '}
                ({duration.startDate.toLocaleDateString()} - {duration.endDate.toLocaleDateString()})
              </>
            )}
          </p>
        </div>
      )}

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
          disabled={!duration.startDate || !duration.endDate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  )
} 