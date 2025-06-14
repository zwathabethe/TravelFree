'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface GroupStepProps {
  data: {
    adults: number
    children: number
    childrenAges: number[]
  }
  onUpdate: (data: { group: GroupStepProps['data'] }) => void
  onNext: () => void
  onBack: () => void
}

const ageRanges = [
  { label: '0-2 years', value: 1 },
  { label: '3-5 years', value: 4 },
  { label: '6-12 years', value: 9 },
]

export default function GroupStep({ data, onUpdate, onNext, onBack }: GroupStepProps) {
  const [group, setGroup] = useState(data)

  const handleAdultsChange = (value: number) => {
    setGroup(prev => ({
      ...prev,
      adults: Math.max(1, value)
    }))
  }

  const handleChildrenChange = (value: number) => {
    const newValue = Math.max(0, value)
    setGroup(prev => ({
      ...prev,
      children: newValue,
      childrenAges: Array(newValue).fill(0)
    }))
  }

  const handleChildAgeChange = (index: number, ageRange: number) => {
    setGroup(prev => ({
      ...prev,
      childrenAges: prev.childrenAges.map((age, i) => i === index ? ageRange : age)
    }))
  }

  const handleSubmit = () => {
    onUpdate({ group })
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Who's traveling?</h2>
        <p className="mt-2 text-gray-600">Tell us about your travel group</p>
      </div>

      {/* Adults Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Adults
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleAdultsChange(group.adults - 1)}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
          >
            -
          </button>
          <span className="text-xl font-medium">{group.adults}</span>
          <button
            onClick={() => handleAdultsChange(group.adults + 1)}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Children Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Children (under 12)
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleChildrenChange(group.children - 1)}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
          >
            -
          </button>
          <span className="text-xl font-medium">{group.children}</span>
          <button
            onClick={() => handleChildrenChange(group.children + 1)}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Children Ages */}
      {group.children > 0 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Children's Ages
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: group.children }).map((_, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Child {index + 1}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ageRanges.map(range => (
                    <motion.button
                      key={range.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChildAgeChange(index, range.value)}
                      className={`p-2 rounded-lg border text-sm ${
                        group.childrenAges[index] === range.value
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {range.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group Summary */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900">Group Summary</h3>
        <p className="text-blue-700">
          {group.adults} {group.adults === 1 ? 'Adult' : 'Adults'}
          {group.children > 0 && (
            <>
              {' '}
              and {group.children} {group.children === 1 ? 'Child' : 'Children'}
            </>
          )}
        </p>
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