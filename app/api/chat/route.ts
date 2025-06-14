import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, travelData } = await req.json()

    const systemMessage = {
      role: 'system',
      content: `You are a friendly and knowledgeable travel assistant. Your goal is to help users plan their perfect trip based on their preferences.
      Here is the user's travel data:
      - Destination: ${travelData.destination}
      - Interests: ${travelData.interests.join(', ')}${travelData.customInterests ? `, ${travelData.customInterests}` : ''}
      - Dates: ${travelData.duration.startDate ? new Date(travelData.duration.startDate).toLocaleDateString() : 'Not specified'} to ${travelData.duration.endDate ? new Date(travelData.duration.endDate).toLocaleDateString() : 'Not specified'}
      - Group: ${travelData.group.adults} adults${travelData.group.children > 0 ? `, ${travelData.group.children} children` : ''}
      - Budget: ${travelData.budget.accommodation + travelData.budget.food + travelData.budget.activities} ${travelData.budget.currency} per day

      Based on this information, generate an initial, detailed, day-by-day travel itinerary. Be creative and suggest specific places, restaurants, and activities.
      After presenting the initial plan, engage the user in a conversation to refine the itinerary. Be proactive in asking questions to better understand their needs.
      Format your responses clearly. Use markdown for lists and emphasis.
      `,
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [systemMessage, ...messages],
    })

    const message = response.choices[0].message.content

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 })
  }
} 