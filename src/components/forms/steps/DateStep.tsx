'use client'

import { useState } from 'react'

interface DateStepProps {
  data: {
    dates: {
      start: Date
      end: Date
    }
  }
  onNext: () => void
  onBack: () => void
  onUpdate: (data: any) => void
}

export default function DateStep({ data, onNext, onBack, onUpdate }: DateStepProps) {
  const [startDate, setStartDate] = useState<string>(
    data.dates.start.toISOString().split('T')[0]
  )
  const [endDate, setEndDate] = useState<string>(
    data.dates.end.toISOString().split('T')[0]
  )

  const handleNext = () => {
    if (startDate && endDate) {
      onUpdate({
        dates: {
          start: new Date(startDate),
          end: new Date(endDate)
        }
      })
      onNext()
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">When do you want to travel?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Start Date</h3>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">End Date</h3>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Back
        </button>
        <button 
          onClick={handleNext}
          disabled={!startDate || !endDate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  )
} 