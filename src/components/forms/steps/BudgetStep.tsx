import { useState } from 'react'
import { motion } from 'framer-motion'

interface BudgetStepProps {
  data: {
    accommodation: number
    food: number
    activities: number
    currency: string
  }
  onUpdate: (data: { budget: BudgetStepProps['data'] }) => void
  onNext: () => void
  onBack: () => void
}

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
]

const budgetRanges = {
  accommodation: [
    { label: 'Budget', value: 50 },
    { label: 'Standard', value: 100 },
    { label: 'Luxury', value: 200 },
  ],
  food: [
    { label: 'Budget', value: 30 },
    { label: 'Standard', value: 60 },
    { label: 'Luxury', value: 120 },
  ],
  activities: [
    { label: 'Budget', value: 20 },
    { label: 'Standard', value: 50 },
    { label: 'Luxury', value: 100 },
  ],
}

export default function BudgetStep({ data, onUpdate, onNext, onBack }: BudgetStepProps) {
  const [budget, setBudget] = useState(data)

  const handleBudgetChange = (category: keyof typeof budgetRanges, value: number) => {
    setBudget(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleCurrencyChange = (currency: string) => {
    setBudget(prev => ({
      ...prev,
      currency
    }))
  }

  const handleSubmit = () => {
    onUpdate({ budget })
    onNext()
  }

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || '$'
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Set Your Budget</h2>
        <p className="mt-2 text-gray-600">Plan your daily expenses for accommodation, food, and activities</p>
      </div>

      {/* Currency Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Currency
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {currencies.map(currency => (
            <motion.button
              key={currency.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCurrencyChange(currency.code)}
              className={`p-3 rounded-lg border ${
                budget.currency === currency.code
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {currency.symbol} - {currency.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Budget Categories */}
      {Object.entries(budgetRanges).map(([category, ranges]) => (
        <div key={category} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {category.charAt(0).toUpperCase() + category.slice(1)} Budget (per day)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ranges.map(range => (
              <motion.button
                key={range.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBudgetChange(category as keyof typeof budgetRanges, range.value)}
                className={`p-3 rounded-lg border ${
                  budget[category as keyof typeof budgetRanges] === range.value
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {range.label}
                <div className="text-sm mt-1">
                  {getCurrencySymbol(budget.currency)}{range.value}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ))}

      {/* Custom Budget Input */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(budgetRanges).map(([category]) => (
          <div key={category}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom {category} budget
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {getCurrencySymbol(budget.currency)}
              </span>
              <input
                type="number"
                value={budget[category as keyof typeof budgetRanges]}
                onChange={(e) => handleBudgetChange(category as keyof typeof budgetRanges, Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="10"
              />
            </div>
          </div>
        ))}
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