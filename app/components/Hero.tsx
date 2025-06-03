"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useBooking } from '../context/BookingContext';

const Hero: React.FC = () => {
  const { openBookingModal } = useBooking();

  return (
    <section className="relative flex items-center justify-center min-h-[85vh] bg-gradient-to-b from-blue-100 via-blue-50 to-white dark:from-blue-900 dark:via-blue-950 dark:to-gray-900 overflow-hidden pt-16 pb-4 sm:pb-12 lg:pb-16">
      {/* Decorative blurred gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[var(--primary)]/20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-[var(--accent)]/20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 items-center">
        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center lg:text-left">
          <h1 className="font-bold tracking-tight leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 md:mb-4">
            <span className="block whitespace-nowrap text-[var(--foreground)]">Trusted & Professional</span>
            <span className="block whitespace-nowrap text-[var(--primary)]">Relocation Servicing</span>
          </h1>
          <div className="mb-6 sm:mb-8 md:mb-10" />
          <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8">
            Professional junk removal and hauling services for Raleigh, Durham, Chapel Hill, and the entire Triangle area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6 md:mb-8">
            <button
              onClick={openBookingModal}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[var(--primary)] text-white hover:bg-[var(--blue-600)] px-6 py-3 text-base no-underline"
            >
              Get a Free Estimate
            </button>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--gray-200)] px-6 py-3 text-base no-underline"
            >
              View Our Services
            </Link>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-[var(--muted-foreground)]">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  <span className="text-xs font-medium">★</span>
                </div>
              ))}
            </div>
            <div className="text-sm">
              Trusted by <span className="font-medium">500+</span> happy customers
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center h-full gap-8 ml-8 lg:ml-16">
          <div className="relative w-full max-w-md mx-auto h-[150px] sm:h-[210px] md:h-[270px] lg:h-[320px] mt-4 rounded-2xl overflow-hidden">
            <Image 
              src="/images/hero-bg.jpg" 
              alt="Triangle Hauling Pros Logo" 
              width={600}
              height={333}
              className="w-full h-full object-contain" 
              style={{ aspectRatio: '1.8/1' }}
            />
          </div>
          <div className="w-full flex justify-center mt-2">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-md">
              <p className="text-[var(--primary)] font-medium mb-1">Eco-friendly Services</p>
              <h3 className="font-bold tracking-tight leading-tight text-xl mb-2">We recycle up to 70% of what we collect</h3>
              <p className="text-[var(--muted-foreground)] text-sm">Doing our part to keep the Triangle area clean and sustainable.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wavy SVG at the bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
          {/* Light mode wave */}
          <path className="dark:hidden" fill="url(#wave-gradient-light)" d="M0,40 C360,120 1080,-40 1440,60 L1440,100 L0,100 Z" />
          {/* Dark mode wave */}
          <path className="hidden dark:block" fill="url(#wave-gradient-dark)" d="M0,40 C360,120 1080,-40 1440,60 L1440,100 L0,100 Z" />
          <defs>
            <linearGradient id="wave-gradient-light" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(0)">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
            <linearGradient id="wave-gradient-dark" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(0)">
              <stop offset="0%" stopColor="#4ca1c7" />
              <stop offset="100%" stopColor="#1a2633" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero; 