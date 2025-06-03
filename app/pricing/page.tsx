"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaDollarSign, FaPlus } from 'react-icons/fa';
import CallToAction from '../components/CallToAction';
import BookingModal from '../components/BookingModal';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Regular pricing levels
const pricingLevels = [
  {
    id: 1,
    name: 'Minimum Load',
    description: 'Small items or single items',
    price: '$75 - $125',
    examples: ['Single furniture item', 'Small appliance', 'Box of smaller items'],
    icon: <FaDollarSign />
  },
  {
    id: 2,
    name: '1/4 Truck Load',
    description: 'About the size of a standard bathtub',
    price: '$125 - $225',
    examples: ['Couch + small table', 'Refrigerator + boxes', 'Several bags and small items'],
    icon: <FaDollarSign />
  },
  {
    id: 3,
    name: '1/2 Truck Load',
    description: 'Roughly equivalent to a 5×5 storage unit',
    price: '$250 - $375',
    examples: ['Apartment bedroom set', 'Garage clean-up', 'Small basement cleanout'],
    icon: <FaDollarSign />
  },
  {
    id: 4,
    name: 'Full Truck Load',
    description: 'About the size of a standard one-car garage',
    price: '$500 - $600+',
    examples: ['Complete apartment cleanout', 'Large basement or garage', 'Multiple rooms of furniture'],
    icon: <FaDollarSign />
  }
];

// Add-on services
const addOns = [
  {
    id: 1,
    name: 'Appliance Removal',
    price: '+$75',
    description: 'Per large appliance (refrigerators, washers, dryers, etc.)'
  },
  {
    id: 2,
    name: 'Stairs Fee',
    price: '+$50',
    description: 'For items that need to be carried up/down multiple flights of stairs'
  },
  {
    id: 3,
    name: 'Same-Day Service',
    price: '+$50',
    description: 'For urgent removal needs with short notice'
  },
  {
    id: 4,
    name: 'Heavy Items',
    price: '+Varies',
    description: 'For extremely heavy items like pianos, safes, hot tubs, etc.'
  }
];

const PricingPage = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] bg-gradient-to-b from-blue-100 via-blue-50 to-white dark:from-blue-900 dark:via-blue-950 dark:to-gray-900 overflow-hidden pt-16 pb-12">
        {/* Decorative blurred gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[var(--primary)]/20 blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-[var(--primary)]/20 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl px-8 py-12 text-center flex flex-col items-center">
            <span className="text-[var(--primary)] font-semibold tracking-widest text-sm mb-4">TRANSPARENT PRICING</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--foreground)]">Simple, Fair Pricing</h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-8">No hidden fees. Get a free estimate for your junk removal needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={openBookingModal}
                className="bg-[var(--primary)] hover:bg-[var(--blue-600)] text-white font-semibold py-3 px-6 rounded-md transition-colors w-full sm:w-auto"
              >
                Get a Free Estimate
              </button>
              <Link href="/services" className="bg-[var(--muted)] hover:bg-[var(--gray-200)] text-[var(--foreground)] font-semibold py-3 px-6 rounded-md transition-colors w-full sm:w-auto">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
        {/* Wavy SVG at the bottom */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
            <path fill="url(#wave-gradient)" d="M0,40 C360,120 1080,-40 1440,60 L1440,100 L0,100 Z" />
            <defs>
              <linearGradient id="wave-gradient" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(0)">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--background)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Volume-Based Pricing</h2>
            <div className="w-20 h-1 bg-[#5DB7E0] mx-auto mb-6"></div>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Our pricing is based on the volume of junk removed, which is measured by how much space it takes up in our truck. We provide free, no-obligation estimates before any work begins.
            </p>
          </motion.div>

          {/* Pricing Table (Desktop) */}
          <motion.div 
            className="hidden lg:block mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg bg-gradient-to-b from-gray-100 to-gray-200 dark:from-[var(--card-bg-from)] dark:to-[var(--card-bg-to)]">
              <div className="bg-[#5DB7E0] text-white py-4">
                <div className="grid grid-cols-4">
                  <div className="px-6 font-bold text-lg text-white">Load Size</div>
                  <div className="px-6 font-bold text-lg text-white">Description</div>
                  <div className="px-6 font-bold text-lg text-white">Price Range</div>
                  <div className="px-6 font-bold text-lg text-white">Example Items</div>
                </div>
              </div>
              <div>
                {pricingLevels.map((level, index) => (
                  <div 
                    key={level.id} 
                    className={`grid grid-cols-4 py-4 ${index % 2 === 0 ? 'bg-gray-100/80 dark:bg-[var(--card-bg-from)]/80' : 'bg-gray-200/80 dark:bg-[var(--card-bg-to)]/80'}`}
                  >
                    <div className="px-6 font-semibold text-[var(--foreground)]">{level.name}</div>
                    <div className="px-6 text-[var(--muted-foreground)]">{level.description}</div>
                    <div className="px-6 font-bold text-blue-500 dark:text-blue-300">{level.price}</div>
                    <div className="px-6">
                      <ul className="list-disc pl-5 text-[var(--muted-foreground)]">
                        {level.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards (Mobile) */}
          <div className="lg:hidden grid gap-6 mb-16">
            {pricingLevels.map((level, index) => (
              <motion.div
                key={level.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gradient-to-b dark:from-[var(--card-bg-from)] dark:to-[var(--card-bg-to)] rounded-lg shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700"
              >
                <div className="bg-[#5DB7E0] text-white p-4">
                  <h3 className="text-xl font-bold text-white">{level.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-black dark:text-gray-200 mb-4">{level.description}</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-4">{level.price}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-black dark:text-white">Example Items:</h4>
                    <ul className="list-disc pl-5 text-black dark:text-gray-200 space-y-1">
                      {level.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    href="/book-now" 
                    className="bg-[#5DB7E0] hover:bg-blue-600 text-white py-2 px-6 rounded-md font-medium transition-colors inline-block w-full text-center"
                  >
                    Get a Quote
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add-ons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Additional Services & Fees</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {addOns.map((addOn, index) => (
                <motion.div
                  key={addOn.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-[var(--card-bg-from)] dark:to-[var(--card-bg-to)] rounded-lg p-6 border border-gray-300 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-[#5DB7E0] rounded-full text-white mr-3">
                      <FaPlus />
                    </div>
                    <h3 className="font-bold text-[var(--foreground)]">{addOn.name}</h3>
                  </div>
                  <p className="text-xl font-bold text-blue-500 dark:text-blue-300 mb-2">{addOn.price}</p>
                  <p className="text-[var(--muted-foreground)] text-sm">{addOn.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Notes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-[var(--card-bg-from)] dark:to-[var(--card-bg-to)] rounded-lg p-6 border border-gray-300 dark:border-gray-700 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">Important Pricing Notes:</h3>
            <ul className="space-y-2 text-[var(--muted-foreground)]">
              <li className="flex items-start">
                <span className="text-blue-500 dark:text-blue-300 mr-2 mt-1">•</span>
                <span>All prices are estimates and may vary based on specific circumstances.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 dark:text-blue-300 mr-2 mt-1">•</span>
                <span>We provide free, no-obligation estimates before performing any work.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 dark:text-blue-300 mr-2 mt-1">•</span>
                <span>Pricing includes labor, transportation, disposal fees, and taxes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 dark:text-blue-300 mr-2 mt-1">•</span>
                <span>Hazardous materials, electronic waste, and certain other items may incur additional fees.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 dark:text-blue-300 mr-2 mt-1">•</span>
                <span>We accept cash, credit cards, and electronic payments for your convenience.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />

      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </>
  );
};

export default PricingPage; 