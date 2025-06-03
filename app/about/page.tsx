"use client";

import React from "react";
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaRecycle, FaMapMarkerAlt } from 'react-icons/fa';
import CallToAction from '../components/CallToAction';
import { IconType } from 'react-icons';
import { useBooking } from '../context/BookingContext';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const founders = [
  {
    id: 1,
    name: 'Tyler Roberton',
    title: 'Co-Founder',
    bio: 'Tyler graduated from UNC Chapel Hill with a degree in Business Administration. After working in corporate logistics for several years, Tyler decided to apply his expertise to create a junk removal business that truly prioritizes customer service and environmental responsibility.',
    image: '/images/tyler.jpg'
  },
  {
    id: 2,
    name: 'Tucker Valliere',
    title: 'Co-Founder',
    bio: "Tucker earned his degree in Environmental Science from UNC Chapel Hill. His passion for sustainability drives our company's commitment to eco-friendly disposal practices. Tucker oversees our recycling initiatives and community donation programs.",
    image: '/images/Tucker.jpeg'
  }
];

const values: { id: number; title: string; description: string; icon: IconType }[] = [
  {
    id: 1,
    title: 'Customer Satisfaction',
    description: "We&apos;re not satisfied until our customers are completely happy with our service.",
    icon: FaUsers
  },
  {
    id: 2,
    title: 'Environmental Responsibility',
    description: 'We make every effort to donate or recycle items rather than sending them to landfills.',
    icon: FaRecycle
  },
  {
    id: 3,
    title: 'Local Commitment',
    description: "As Triangle natives and UNC alumni, we're invested in serving our community with integrity.",
    icon: FaMapMarkerAlt
  },
  {
    id: 4,
    title: 'Professional Development',
    description: 'We continuously train our team to deliver the best possible service with courtesy and expertise.',
    icon: FaGraduationCap
  }
];

const AboutPage = () => {
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
            <span className="text-[var(--primary)] font-semibold tracking-widest text-sm mb-4">JUNK REMOVAL EXPERTS</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--foreground)]">About Us</h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-8">Get to know the team behind Triangle Hauling Pros and our commitment to the community.</p>
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

      {/* Our Story Section */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">Our Story</h2>
              <div className="w-20 h-1 bg-[var(--primary)] mx-auto mb-6"></div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <p className="text-lg text-[var(--muted-foreground)] mb-6">
                Triangle Hauling Pros was founded in 2020 by two UNC Chapel Hill graduates, Tyler Roberton and Tucker Valliere, who saw a need for reliable, environmentally conscious junk removal services in the Triangle area.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] mb-6">
                After experiencing the challenges of finding dependable junk removal services themselves, they decided to create a company that prioritizes customer satisfaction, transparent pricing, and eco-friendly disposal methods.
              </p>
              <p className="text-lg text-[var(--muted-foreground)]">
                Today, Triangle Hauling Pros serves hundreds of residential and commercial customers throughout Raleigh, Durham, Chapel Hill, and surrounding areas. We're proud to be locally owned and operated, with deep roots in the community we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">Meet Our Founders</h2>
            <div className="w-20 h-1 bg-[#5DB7E0] mx-auto mb-6"></div>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              The passionate team behind Triangle Hauling Pros is committed to providing exceptional service to our community.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="h-64 relative">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={400}
                    height={256}
                    className={`h-64 w-full object-cover ${founder.name === 'Tucker Valliere' ? 'object-[center_5%]' : 'object-[center_30%]'}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{founder.name}</h3>
                  <p className="text-blue-500 dark:text-blue-400 font-medium mb-4">{founder.title}</p>
                  <p className="text-gray-700 dark:text-gray-300">{founder.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-[#5DB7E0] mx-auto mb-6"></div>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              These core principles guide everything we do at Triangle Hauling Pros.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start p-6 bg-[var(--card)] rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-4">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{value.title}</h3>
                    <p className="text-[var(--muted-foreground)]">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="py-20 bg-[#5DB7E0] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold mb-2">3+</h3>
              <p className="text-xl">Years in Business</p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold mb-2">1500+</h3>
              <p className="text-xl">Happy Customers</p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold mb-2">75%</h3>
              <p className="text-xl">Items Recycled or Donated</p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-4xl font-bold mb-2">15+</h3>
              <p className="text-xl">Communities Served</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />
    </>
  );
};

export default AboutPage;
