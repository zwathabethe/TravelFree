'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface TripDetails {
  destination: string
  dates: { start: string, end: string }
  interests: string[]
  budget: string
}

const initialTripDetails: TripDetails = {
  destination: '',
  dates: { start: '', end: '' },
  interests: [],
  budget: '',
}

type ConversationStep = 'destination' | 'dates' | 'interests' | 'budget' | 'summary'

export const InteractivePlanner = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tripDetails, setTripDetails] = useState<TripDetails>(initialTripDetails)
  const [conversationStep, setConversationStep] = useState<ConversationStep>('destination')

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    // Set the initial message based on the conversation step
    const initialMessage = getInitialMessage(conversationStep)
    setMessages([{ role: 'assistant', content: initialMessage }])
  }, [])

  const getInitialMessage = (step: ConversationStep): string => {
    switch (step) {
      case 'destination':
        return "Hello! I'm your TravelFree AI assistant. To start, where are you dreaming of going?"
      case 'dates':
        return `Great! And when are you thinking of traveling? Please provide the start and end dates.`
      case 'interests':
        return "What kind of activities are you interested in? (e.g., hiking, museums, beaches)"
      case 'budget':
        return "What's your approximate budget for this trip?"
      case 'summary':
        return 'I have all the details. I will now generate a personalized travel plan for you.'
      default:
        return "Let's plan your trip!"
    }
  }

  const handleUserInput = async (input: string) => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setUserInput('')
    setIsLoading(true)

    try {
      // Process user input based on the current step
      const newTripDetails = { ...tripDetails }
      let nextStep = conversationStep
      let assistantResponse = ''

      switch (conversationStep) {
        case 'destination':
          newTripDetails.destination = input
          nextStep = 'dates'
          assistantResponse = getInitialMessage(nextStep)
          break
        case 'dates':
          // Simple parsing for dates, can be improved with a date picker
          const [start, end] = input.split(' to ')
          newTripDetails.dates = { start: start?.trim(), end: end?.trim() || '' }
          nextStep = 'interests'
          assistantResponse = getInitialMessage(nextStep)
          break
        case 'interests':
          newTripDetails.interests = input.split(',').map(item => item.trim())
          nextStep = 'budget'
          assistantResponse = getInitialMessage(nextStep)
          break
        case 'budget':
          newTripDetails.budget = input
          nextStep = 'summary'
          assistantResponse = getInitialMessage(nextStep)
          // All details collected, call the AI
          await generatePlan(newTripDetails, assistantResponse)
          break
      }

      setTripDetails(newTripDetails)
      if (conversationStep !== 'budget') {
        const assistantMessage: Message = { role: 'assistant', content: assistantResponse }
        setMessages(prev => [...prev, assistantMessage])
        setConversationStep(nextStep)
      }
    } catch (error) {
      console.error('Error handling user input:', error)
      toast.error('Sorry, something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const generatePlan = async (details: TripDetails, initialAssistantResponse: string) => {
    // Show the initial "generating" message
    const assistantMessage: Message = { role: 'assistant', content: initialAssistantResponse }
    setMessages(prev => [...prev, assistantMessage])

    // Then call the actual API
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages, // Send the whole conversation
          travelData: details,
        }),
      })

      if (!response.ok) throw new Error('Failed to generate travel plan')

      const { message } = await response.json()
      const finalPlan: Message = { role: 'assistant', content: message }
      setMessages(prev => [...prev, finalPlan])
      setConversationStep('summary') // Keep in summary step
    } catch (error) {
      console.error('Error generating plan:', error)
      toast.error('Failed to generate your travel plan. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestart = () => {
    setMessages([])
    setTripDetails(initialTripDetails)
    setConversationStep('destination')
    setUserInput('')
    setTimeout(() => {
        const initialMessage = getInitialMessage('destination')
        setMessages([{ role: 'assistant', content: initialMessage }])
    }, 100)
    toast.success('Let a new adventure begin!')
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-end p-4 w-full">
      <div className="w-full max-w-4xl bg-black/30 backdrop-blur-sm rounded-t-2xl shadow-lg h-[90vh] flex flex-col">
        {/* Pinned Header */}
        <div className="p-4 border-b border-white/20 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">TravelFree Planner</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/80 mt-2">
              <p><strong>Destination:</strong> {tripDetails.destination || 'Not set'}</p>
              <p><strong>Dates:</strong> {tripDetails.dates.start ? `${tripDetails.dates.start} - ${tripDetails.dates.end}` : 'Not set'}</p>
              <p><strong>Interests:</strong> {tripDetails.interests.join(', ') || 'Not set'}</p>
              <p><strong>Budget:</strong> {tripDetails.budget || 'Not set'}</p>
            </div>
          </div>
          <button onClick={handleRestart} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <ArrowPathIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Chat Window */}
        <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' ? 'bg-white/20' : 'bg-white/5'
                  }`}
                >
                  <p className="text-white whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex space-x-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-white/20">
          <form onSubmit={(e) => {
            e.preventDefault()
            handleUserInput(userInput)
          }} className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder={
                conversationStep === 'summary' 
                ? "Your travel plan is ready!" 
                : getInitialMessage(conversationStep).substring(getInitialMessage(conversationStep).indexOf(' ')+1)
              }
              className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-3 border-0 focus:ring-2 focus:ring-white/50"
              disabled={isLoading || conversationStep === 'summary'}
            />
            <button
              type="submit"
              disabled={isLoading || conversationStep === 'summary'}
              className="bg-white/20 p-3 rounded-lg hover:bg-white/30 disabled:opacity-50"
            >
              <PaperAirplaneIcon className="w-6 h-6 text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 