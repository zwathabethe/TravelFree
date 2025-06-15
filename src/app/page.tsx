'use client'

import React, { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/3 p-4 border-r">
        <Card>
          <CardHeader>
            <CardTitle>Your Itinerary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Destination</h3>
              <p className="text-gray-600">{travelData.destination || 'Not set'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Dates</h3>
              <p className="text-gray-600">{travelData.dates || 'Not set'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Interests</h3>
              <p className="text-gray-600">{travelData.interests || 'Not set'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Budget</h3>
              <p className="text-gray-600">{travelData.budget || 'Not set'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-2/3 flex flex-col h-screen">
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-gray-200">
                  Thinking...
                </div>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex items-center space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
            placeholder="Tell me about your dream trip..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HomePage; 