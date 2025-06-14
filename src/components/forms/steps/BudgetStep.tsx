'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface BudgetStepProps {
  data: {
    budget: {
      accommodation: number
      food: number
      activities: number
      currency: string
    }
  }
  onUpdate: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const currencies = [
  { code: 'USD', name: 'United States Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
]

export default function BudgetStep({ data, onUpdate, onNext, onBack }: BudgetStepProps) {
  const [budget, setBudget] = useState(data.budget)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBudget(prev => ({ ...prev, [name]: name === 'currency' ? value : Number(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({ budget })
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
        <h2 className="text-2xl font-bold text-gray-900">What's your budget?</h2>
        <p className="mt-2 text-gray-600">Enter your estimated daily expenses</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700">
              Accommodation
            </label>
            <input
              type="number"
              id="accommodation"
              name="accommodation"
              value={budget.accommodation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g., 100"
              required
            />
          </div>

          <div>
            <label htmlFor="food" className="block text-sm font-medium text-gray-700">
              Food
            </label>
            <input
              type="number"
              id="food"
              name="food"
              value={budget.food}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g., 50"
              required
            />
          </div>

          <div>
            <label htmlFor="activities" className="block text-sm font-medium text-gray-700">
              Activities
            </label>
            <input
              type="number"
              id="activities"
              name="activities"
              value={budget.activities}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g., 30"
              required
            />
          </div>
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={budget.currency}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </motion.div>
  )
} 