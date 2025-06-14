'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

interface AIConversationStepProps {
  data: {
    destination: string
    interests: string[]
    dates: {
      start: Date
      end: Date
    }
    groupSize: number
  }
  onBack: () => void
}

export default function AIConversationStep({ data, onBack }: AIConversationStepProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    // Initial AI response
    generateInitialPlan()
  }, [])

  const generateInitialPlan = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [],
          travelData: {
            ...data,
            dates: {
              start: data.dates.start.toISOString(),
              end: data.dates.end.toISOString(),
            },
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate initial plan')
      }

      const { message } = await response.json()
      setConversation([
        {
          role: 'assistant',
          content: message,
        },
      ])
    } catch (error) {
      console.error('Error generating initial plan:', error)
      setConversation([
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    // Add user message
    const userMessage = { role: 'user' as const, content: userInput }
    setConversation(prev => [...prev, userMessage])
    setUserInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...conversation, userMessage],
          travelData: {
            ...data,
            dates: {
              start: data.dates.start.toISOString(),
              end: data.dates.end.toISOString(),
            },
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const { message } = await response.json()
      setConversation(prev => [
        ...prev,
        {
          role: 'assistant',
          content: message,
        },
      ])
    } catch (error) {
      console.error('Error in chat:', error)
      setConversation(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Let's Plan Your Perfect Trip</h2>
        <p className="mt-2 text-gray-600">
          I'll help you create a personalized travel plan through our conversation.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[400px] flex flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto mb-4">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'assistant'
                    ? 'bg-blue-50 text-blue-900'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Travel Assistant</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about your trip..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Back
        </button>
      </div>
    </motion.div>
  )
} 