import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Define a schema for the structured data we want the AI to return
const functions = [
  {
    name: 'updateTripDetails',
    description: 'Update the details of the travel itinerary.',
    parameters: {
      type: 'object',
      properties: {
        destination: {
          type: 'string',
          description: 'The destination city, e.g., "Paris, France"',
        },
        dates: {
          type: 'string',
          description: 'The start and end dates for the trip, e.g., "June 10-17, 2025"',
        },
        interests: {
          type: 'string',
          description: 'A summary of the user\'s interests, e.g., "Food, History, Museums"',
        },
        budget: {
          type: 'string',
          description: 'The user\'s estimated budget, e.g., "$2000 USD"',
        },
      },
      required: [],
    },
  },
]

export async function POST(req: NextRequest) {
  try {
    const { messages, travelData } = await req.json()

    const systemMessage = {
      role: 'system',
      content: `You are a friendly and expert travel assistant. Your goal is to help users plan their perfect trip by having a natural conversation.
      1.  Engage the user to understand their travel preferences (destination, dates, interests, budget).
      2.  As you gather information, use the 'updateTripDetails' function to update the structured travel plan.
      3.  Only update the fields for which you have new information. Do not make up details.
      4.  Keep your conversational responses concise and friendly.
      5.  Proactively ask the next logical question to guide the conversation. For example, after getting the destination, ask about dates.
      
      Current Itinerary Details:
      - Destination: ${travelData.destination}
      - Dates: ${travelData.dates}
      - Interests: ${travelData.interests}
      - Budget: ${travelData.budget}
      `,
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [systemMessage, ...messages],
      functions: functions,
      function_call: 'auto',
    })

    const responseMessage = response.choices[0].message
    let updatedTripDetails = null

    if (responseMessage.function_call) {
      updatedTripDetails = JSON.parse(responseMessage.function_call.arguments)
    }

    // Always send a conversational response, even if a function was called.
    const followupResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            systemMessage,
            ...messages,
            responseMessage, // include the function call message in the history
            {
                role: 'system',
                content: 'You have just updated the itinerary details. Now, provide a brief, friendly, and conversational follow-up to the user. Ask the next logical question if the plan is not yet complete.'
            }
        ],
    })

    const message = followupResponse.choices[0].message.content;

    return NextResponse.json({ message, updatedTripDetails })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 })
  }
} 