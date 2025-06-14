'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DestinationStep from './steps/DestinationStep'
import InterestsStep from './steps/InterestsStep'
import GroupStep from './steps/GroupStep'
import DateStep from './steps/DateStep'
import SummaryStep from './steps/SummaryStep'
import AIConversationStep from './steps/AIConversationStep'

const steps = [
  { id: 'destination', title: 'Where to?' },
  { id: 'interests', title: 'What interests you?' },
  { id: 'group', title: 'Who\'s coming?' },
  { id: 'dates', title: 'When?' },
  { id: 'summary', title: 'Review' },
  { id: 'ai-conversation', title: 'Plan Your Trip' }
]

export default function TravelPlanner() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    destination: '',
    interests: [] as string[],
    groupSize: 1,
    dates: {
      start: new Date(),
      end: new Date()
    }
  })

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleUpdateData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DestinationStep
            data={formData}
            onNext={handleNext}
            onUpdate={handleUpdateData}
          />
        )
      case 1:
        return (
          <InterestsStep
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={handleUpdateData}
          />
        )
      case 2:
        return (
          <GroupStep
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={handleUpdateData}
          />
        )
      case 3:
        return (
          <DateStep
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={handleUpdateData}
          />
        )
      case 4:
        return (
          <SummaryStep
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <AIConversationStep
            data={formData}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </div>
              <div className="text-sm font-medium">{step.title}</div>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-300"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`
            }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 