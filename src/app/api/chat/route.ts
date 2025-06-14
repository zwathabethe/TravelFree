import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { messages, travelData } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })

    const systemPrompt = `You are a helpful travel planning assistant. The user is planning a trip with the following details:
      - Destination: ${travelData.destination}
      - Dates: ${travelData.dates.start} to ${travelData.dates.end}
      - Group Size: ${travelData.groupSize} people
      - Interests: ${travelData.interests.join(', ')}
      
      Help them plan their trip by providing personalized recommendations, answering questions, and offering insights about their destination.`

    // Convert messages to Gemini format
    const chat = model.startChat({
      history: messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: msg.content,
      })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    })

    const result = await chat.sendMessage(systemPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      message: text
    })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
} 