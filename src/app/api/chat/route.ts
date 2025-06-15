import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { messages, travelData } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })

    const interests = Array.isArray(travelData.interests)
      ? travelData.interests.join(', ')
      : travelData.interests

    const lastMessage = messages[messages.length - 1]?.content
    const systemPrompt = `You are a helpful travel planning assistant. The user wants to plan a trip.
      
      **User's Trip Details:**
      - **Destination:** ${travelData.destination}
      - **Dates:** ${travelData.dates.start} to ${travelData.dates.end}
      - **Interests:** ${interests}
      - **Budget:** ${travelData.budget}

      **Your Task:**
      1.  First, create a detailed, personalized travel plan based on the user's details.
      2.  The plan MUST be in a valid, stringified JSON format that adheres to this exact structure:
          \`\`\`json
          {
            "destination": "City, Country",
            "duration": "X Days, Y Nights",
            "flights": [
              { "airline": "Airline Name", "price": "USD XXX" }
            ],
            "accommodations": [
              { "name": "Hotel Name", "pricePerNight": "USD XXX" }
            ],
            "dailyItinerary": [
              { 
                "day": 1, 
                "activities": ["Activity 1", "Activity 2"],
                "dining": ["Restaurant for Lunch", "Restaurant for Dinner"]
              }
            ],
            "estimatedTotal": "USD XXXX"
          }
          \`\`\`
      3.  After the JSON block, add a "---" separator.
      4.  Finally, write a friendly, conversational message summarizing the plan you've created. This message will be shown to the user in the chat.
      
      **Example Output:**
      \`\`\`json
      { ... valid JSON plan ... }
      ---
      I've crafted a wonderful trip to Paris for you! I've included a mix of iconic sights and hidden gems, along with some amazing dining experiences. Check out the detailed plan for all the specifics!
      \`\`\`
      
      Now, generate the response for the user's request.
      `

    // We don't need the chat history for this final generation step, as the prompt contains all info.
    const result = await model.generateContent(systemPrompt)
    const response = await result.response
    const text = response.text()

    // Parse the response to separate the JSON plan from the message
    const [planString, message] = text.split('---')
    let plan = null;
    try {
      // Clean up the JSON string before parsing
      const cleanedPlanString = planString.replace(/```json\n|```/g, '').trim()
      plan = JSON.parse(cleanedPlanString)
    } catch (e) {
      console.error("Failed to parse generated plan JSON:", e)
      // Handle cases where the model doesn't return perfect JSON
    }

    return NextResponse.json({
      message: message ? message.trim() : "Here is your travel plan!",
      plan: plan
    })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
} 