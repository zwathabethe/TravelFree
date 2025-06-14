'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface TripDetails {
  destination: string
  dates: string
  interests: string
  budget: string
}

const initialTripDetails: TripDetails = {
  destination: 'Not set',
  dates: 'Not set',
  interests: 'Not set',
  budget: 'Not set',
}

export const InteractivePlanner = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI travel assistant. Where are you dreaming of going?",
    },
  ])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tripDetails, setTripDetails] = useState<TripDetails>(initialTripDetails)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: userInput }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setUserInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          travelData: tripDetails,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const { message, updatedTripDetails } = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: message,
      }
      setMessages(prev => [...prev, assistantMessage])

      if (updatedTripDetails) {
        setTripDetails(prev => ({ ...prev, ...updatedTripDetails }))
      }
    } catch (error) {
      console.error('Error contacting AI:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I seem to be having some trouble right now. Please try again in a moment.',
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-end p-4 w-full">
      <div className="w-full max-w-4xl bg-black/30 backdrop-blur-sm rounded-t-2xl shadow-lg h-[90vh] flex flex-col">
        {/* Pinned Header */}
        <div className="p-4 border-b border-white/20">
          <h2 className="text-xl font-bold text-white">Your Trip Itinerary</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/80 mt-2">
            <p><strong>Destination:</strong> {tripDetails.destination}</p>
            <p><strong>Dates:</strong> {tripDetails.dates}</p>
            <p><strong>Interests:</strong> {tripDetails.interests}</p>
            <p><strong>Budget:</strong> {tripDetails.budget}</p>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
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
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="e.g., 'A week in Italy' or 'I want a relaxing beach vacation'"
              className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-3 border-0 focus:ring-2 focus:ring-white/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
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