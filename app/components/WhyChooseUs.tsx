"use client";

import React from "react";
import { motion } from 'framer-motion';
import { FaClock, FaCheck, FaRecycle, FaUsers, FaMap, FaMoneyBillWave, FaPhone } from 'react-icons/fa';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Quick Service',
    description: 'We offer same-day and next-day appointments to meet your schedule.',
    icon: FaClock,
  },
  {
    id: 2,
    title: 'Professional Team',
    description: 'Our uniformed, courteous crew will handle your items with care.',
    icon: FaUsers,
  },
  {
    id: 3,
    title: 'Eco-Friendly',
    description: 'We donate or recycle items whenever possible to reduce landfill waste.',
    icon: FaRecycle,
  },
  {
    id: 4,
    title: 'Free Estimates',
    description: 'We provide upfront, no-obligation quotes before any work begins.',
    icon: FaMoneyBillWave,
  },
  {
    id: 5,
    title: 'Local Knowledge',
    description: 'Our team knows the Triangle area and all local disposal regulations.',
    icon: FaMap,
  },
  {
    id: 6,
    title: 'Satisfaction Guaranteed',
    description: "We're not satisfied until you're satisfied with our service.",
    icon: FaCheck,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="studio-section bg-white dark:bg-gray-900 relative overflow-hidden pt-24">
      {/* Decorative background pattern */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-[var(--muted)] dark:bg-gray-800/30"></div>
      
      <div className="studio-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="flex flex-col items-center justify-center -mt-8 mb-12">
            <h2 className="studio-heading text-3xl md:text-4xl lg:text-5xl mb-4 text-center">Why Choose Us</h2>
            <div className="h-1 w-16 bg-[var(--primary)] mb-6 mx-auto"></div>
          </div>
          <p className="text-[var(--muted-foreground)]">
            We&apos;re more than just a junk removal company. We&apos;re your neighbors committed to providing exceptional service with integrity and care.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[var(--primary)]/30 to-[var(--primary)]/0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="ml-4">
                    <h3 className="studio-heading text-xl mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--muted-foreground)]">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 max-w-3xl mx-auto text-center bg-[var(--muted)] dark:bg-gray-800/50 rounded-lg p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-left flex-1">
              <h3 className="studio-heading text-2xl mb-2">Ready to experience the difference?</h3>
              <p className="text-[var(--muted-foreground)]">Contact us today for your free, no-obligation estimate.</p>
            </div>
            <div className="shrink-0">
              <a 
                href="tel:+17274037074" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[var(--primary)] text-white hover:bg-[var(--blue-600)] px-6 py-3 no-underline"
              >
                <FaPhone className="mr-2 h-4 w-4" />
                (727)-403-7074
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 