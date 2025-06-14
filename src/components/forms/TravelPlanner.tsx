import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DestinationStep from './steps/DestinationStep'
import InterestsStep from './steps/InterestsStep'
import BudgetStep from './steps/BudgetStep'
import DurationStep from './steps/DurationStep'
import GroupStep from './steps/GroupStep'
import SummaryStep from './steps/SummaryStep'

const steps = [
  { id: 'destination', title: 'Destination' },
  { id: 'interests', title: 'Interests' },
  { id: 'budget', title: 'Budget' },
  { id: 'duration', title: 'Duration' },
  { id: 'group', title: 'Group' },
  { id: 'summary', title: 'Summary' },
]

export default function TravelPlanner() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    destination: '',
    interests: [],
    customInterests: '',
    budget: {
      accommodation: 0,
      food: 0,
      activities: 0,
      currency: 'USD',
    },
    duration: {
      startDate: null,
      endDate: null,
    },
    group: {
      adults: 1,
      children: 0,
      childrenAges: [],
    },
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <DestinationStep data={formData.destination} onUpdate={updateFormData} onNext={handleNext} />
      case 1:
        return <InterestsStep data={formData.interests} customData={formData.customInterests} onUpdate={updateFormData} onNext={handleNext} onBack={handleBack} />
      case 2:
        return <BudgetStep data={formData.budget} onUpdate={updateFormData} onNext={handleNext} onBack={handleBack} />
      case 3:
        return <DurationStep data={formData.duration} onUpdate={updateFormData} onNext={handleNext} onBack={handleBack} />
      case 4:
        return <GroupStep data={formData.group} onUpdate={updateFormData} onNext={handleNext} onBack={handleBack} />
      case 5:
        return <SummaryStep data={formData} onBack={handleBack} />
      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Steps */}
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