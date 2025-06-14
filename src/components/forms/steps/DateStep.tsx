'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface DateStepProps {
  data: {
    duration: {
      startDate: Date | null
      endDate: Date | null
    }
  }
  onNext: () => void
  onBack: () => void
  onUpdate: (data: any) => void
}

export default function DateStep({ data, onNext, onBack, onUpdate }: DateStepProps) {
  const [startDate, setStartDate] = useState<Date>(data.duration.startDate || new Date())
  const [endDate, setEndDate] = useState<Date>(data.duration.endDate || new Date())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({ duration: { startDate, endDate } })
    onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">When are you traveling?</h2>
        <p className="mt-2 text-gray-600">Select your travel dates</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate.toISOString().split('T')[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate.toISOString().split('T')[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              min={startDate.toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Back
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </form>
    </motion.div>
  )
} 