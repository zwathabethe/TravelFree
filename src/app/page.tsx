'use client'

import React, { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TravelData {
  destination: string;
  dates: string;
  interests: string;
  budget: string;
}

const HomePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [travelData, setTravelData] = useState<TravelData>({
    destination: '',
    dates: '',
    interests: '',
    budget: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages, travelData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.updatedTripDetails) {
        setTravelData(prev => ({ ...prev, ...data.updatedTripDetails }));
        toast.success('Trip details updated!');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      toast.error('Failed to get response. Please try again.');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Your Itinerary</h2>
        <div className="space-y-2">
          <p><strong>Destination:</strong> {travelData.destination || 'Not set'}</p>
          <p><strong>Dates:</strong> {travelData.dates || 'Not set'}</p>
          <p><strong>Interests:</strong> {travelData.interests || 'Not set'}</p>
          <p><strong>Budget:</strong> {travelData.budget || 'Not set'}</p>
        </div>
      </div>
      <div className="w-2/3 flex flex-col h-[calc(100vh-100px)]">
        <div className="flex-grow p-4 overflow-y-auto bg-white">
          {messages.map((msg, index) => (
            <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-bubble">
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="chat chat-start"><div className="chat-bubble">Thinking...</div></div>}
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell me about your dream trip..."
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default HomePage; 