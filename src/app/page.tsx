import TravelPlanner from '@/components/forms/TravelPlanner'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            Plan Your Dream Vacation
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl">
            Get personalized travel recommendations, budget planning, and detailed itineraries
          </p>
        </div>
      </div>

      {/* Travel Planner Form */}
      <div className="max-w-4xl mx-auto -mt-20 px-4 pb-20">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <TravelPlanner />
        </div>
      </div>
    </div>
  )
} 