'use client'

import React from 'react';
import Image from 'next/image';
import { destinations } from '@/data/destinations';

export const InspirationCarousel = () => {
  const extendedDestinations = [...destinations, ...destinations];

  return (
    <section className="w-full py-8 bg-black/10 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Inspiration for your next adventure</h2>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll">
                {extendedDestinations.map((destination, index) => (
                <li key={index} className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                    <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <p className="absolute bottom-4 left-4 text-white font-bold text-xl">{destination.name}</p>
                </li>
                ))}
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                {extendedDestinations.map((destination, index) => (
                <li key={index} className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                    <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <p className="absolute bottom-4 left-4 text-white font-bold text-xl">{destination.name}</p>
                </li>
                ))}
            </ul>
      </div>
    </section>
  );
}; 