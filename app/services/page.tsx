"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaCouch, FaTv, FaTools, FaLeaf, FaHandsHelping } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';
import CallToAction from '../components/CallToAction';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const services = [
  {
    id: 'junk-removal',
    name: 'Junk Removal',
    icon: FaTrash,
    description: 'Professional junk removal services for your home or business.',
    longDescription: 'We handle all types of junk removal, from household items to commercial waste. Our team will efficiently remove and properly dispose of your unwanted items.',
    benefits: [
      'Fast and efficient service',
      'Environmentally responsible disposal',
      'No hidden fees',
      'Licensed and insured'
    ]
  },
  {
    id: 'furniture-removal',
    name: 'Furniture Removal',
    icon: FaCouch,
    description: 'Specialized furniture removal and disposal services.',
    longDescription: 'Whether you\'re moving, renovating, or just need to get rid of old furniture, we can help. We handle all types of furniture, from sofas to mattresses.',
    benefits: [
      'Careful handling of your items',
      'Proper disposal methods',
      'Quick turnaround time',
      'Competitive pricing'
    ]
  },
  {
    id: 'appliance-removal',
    name: 'Appliance Removal',
    icon: FaTv,
    description: 'Safe and efficient appliance removal services.',
    longDescription: 'We specialize in removing and disposing of all types of appliances, including refrigerators, washers, dryers, and more. We ensure proper handling and disposal.',
    benefits: [
      'Safe removal of heavy appliances',
      'Proper disposal of hazardous materials',
      'Experienced team',
      'Full-service solution'
    ]
  },
  {
    id: 'construction-debris',
    name: 'Construction Debris',
    icon: FaTools,
    description: 'Construction and renovation debris removal.',
    longDescription: 'We handle all types of construction debris, from small renovation projects to large construction sites. Our team is equipped to handle any size job.',
    benefits: [
      'Large capacity trucks',
      'Quick turnaround',
      'Proper disposal methods',
      'Flexible scheduling'
    ]
  },
  {
    id: 'yard-waste',
    name: 'Yard Waste',
    icon: FaLeaf,
    description: 'Yard waste and landscaping debris removal.',
    longDescription: 'We help you keep your yard clean by removing and properly disposing of yard waste, including branches, leaves, and other landscaping debris.',
    benefits: [
      'Eco-friendly disposal',
      'Quick service',
      'Competitive rates',
      'Regular service available'
    ]
  },
  {
    id: 'donation-runs',
    name: 'Donation Runs',
    icon: FaHandsHelping,
    description: 'We\'ll transport your items to local donation centers to help you give back to the community.',
    longDescription: 'Our team will pick up your gently used items and deliver them to local charities and donation centers. Make a difference by giving your items a second life and supporting those in need.',
    benefits: [
      'Support local charities',
      'Convenient pickup and drop-off',
      'Reduce landfill waste',
      'Feel good about giving back'
    ]
  }
];

const ServicesPage = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const { openBookingModal } = useBooking();

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
            <span className="text-[var(--primary)] font-semibold tracking-widest text-sm mb-4">OUR SERVICES</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--foreground)]">Professional Junk Removal Services</h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-8">Fast, reliable, and environmentally responsible junk removal services for your home or business.</p>
            <button
              onClick={openBookingModal}
              className="bg-[var(--primary)] hover:bg-[var(--blue-600)] text-white font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Get a Free Estimate
            </button>
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

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                type="button"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full text-left bg-gradient-to-b from-[var(--card-bg-from)] to-[var(--card-bg-to)] hover:from-[var(--card-bg-hover-from)] hover:to-[var(--card-bg-hover-to)] rounded-lg p-6 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                aria-expanded={expandedService === service.id}
                aria-controls={`service-details-${service.id}`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[var(--primary)] rounded-full text-white mr-3">
                    {React.createElement(service.icon)}
                  </div>
                  <h3 className="font-bold text-[var(--foreground)]">{service.name}</h3>
                </div>
                <p className="text-[var(--muted-foreground)] text-sm mb-4">{service.description}</p>
                <span className="text-[var(--primary)] font-medium hover:underline">
                  {expandedService === service.id ? 'Show Less' : 'Learn More'}
                </span>
                {/* Animated details section */}
                <motion.div
                  id={`service-details-${service.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={expandedService === service.id ? { height: 'auto', opacity: 1, marginTop: 16 } : { height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  {expandedService === service.id && (
                    <div className="pt-2">
                      <p className="text-[var(--muted-foreground)] text-sm mb-2">{service.longDescription}</p>
                      <ul className="list-disc pl-5 text-[var(--muted-foreground)] text-sm space-y-1">
                        {service.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />
    </>
  );
};

export default ServicesPage; 