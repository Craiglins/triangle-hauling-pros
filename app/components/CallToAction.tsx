"use client";

import React from "react";
import Link from "next/link";
import { useBooking } from '../context/BookingContext';

const CallToAction: React.FC = () => {
  const { openBookingModal } = useBooking();

  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Gradient background with accent pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--blue-700)]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--white)_0%,transparent_60%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-bold tracking-tight leading-tight text-3xl md:text-4xl lg:text-5xl mb-4">Ready to Clear Your Clutter?</h2>
          <p className="text-lg md:text-xl mb-10 text-white/90">
            Get a free, no-obligation estimate for your junk removal project. Our friendly team is ready to help you reclaim your space!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openBookingModal}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Book Now
            </button>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
          
          <div className="mt-10 flex flex-col md:flex-row justify-center gap-6 text-white/90">
            <div>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="font-medium">Quick & Reliable Service</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="font-medium">Transparent Pricing</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="font-medium">Eco-Friendly Disposal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 