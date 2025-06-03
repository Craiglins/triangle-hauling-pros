"use client";

import React from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';

const areas = [
  'Raleigh',
  'Durham',
  'Chapel Hill',
  'Cary',
  'Apex',
  'Morrisville',
  'Holly Springs',
  'Wake Forest',
  'Garner',
  'Carrboro',
  'Knightdale',
  'And more!'
];

const ServiceAreas: React.FC = () => {
  return (
    <section className="py-20 bg-[var(--muted)] text-[var(--foreground)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Service Areas</h2>
          <div className="w-20 h-1 bg-[#5DB7E0]/80 rounded-full mx-auto mb-6"></div>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Proudly serving the entire Triangle region and surrounding communities.
          </p>
        </div>
        {/* Responsive grid: 2x3 for first 6 on mobile, all in 3 columns on sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {areas.slice(0, 6).map((area) => (
            <div key={area} className="flex items-center justify-center bg-gradient-to-b from-[var(--card-bg-from)] to-[var(--card-bg-to)] border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-6 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:from-[var(--card-bg-hover-from)] hover:to-[var(--card-bg-hover-to)] sm:hidden">
              <FaMapMarkerAlt className="text-blue-300 mr-3" size={22} />
              <span className="text-[var(--foreground)] font-semibold text-lg">{area}</span>
            </div>
          ))}
          {areas.map((area) => (
            <div key={area} className="hidden sm:flex items-center justify-center bg-gradient-to-b from-[var(--card-bg-from)] to-[var(--card-bg-to)] border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-6 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:from-[var(--card-bg-hover-from)] hover:to-[var(--card-bg-hover-to)]">
              <FaMapMarkerAlt className="text-blue-300 mr-3" size={22} />
              <span className="text-[var(--foreground)] font-semibold text-lg">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas; 