"use client";

import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';
import CallToAction from '../components/CallToAction';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { openBookingModal } = useBooking();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
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
            <span className="text-[var(--primary)] font-semibold tracking-widest text-sm mb-4">JUNK REMOVAL EXPERTS</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--foreground)]">Contact Us</h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-8">Have questions or ready to schedule a pickup? Get in touch with our friendly team.</p>
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

      {/* Contact Information */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <a href="tel:+17274037074" className="block focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded-2xl" aria-label="Call (727)-403-7074">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--muted)] rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg transition-shadow min-h-[220px]"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-[var(--muted-foreground)]">(727)-403-7074</p>
              </motion.div>
            </a>

            <a href="mailto:support@trianglehaulingpros.com" className="block focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded-2xl" aria-label="Email support@trianglehaulingpros.com">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[var(--muted)] rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg transition-shadow min-h-[220px]"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-[var(--muted-foreground)] text-sm truncate block max-w-full">support@trianglehaulingpros.com</p>
              </motion.div>
            </a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[var(--muted)] rounded-2xl p-6 text-center min-h-[220px]"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-[var(--muted-foreground)]">
                Triangle Area, NC
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[var(--muted)] rounded-2xl p-6 text-center min-h-[220px]"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hours</h3>
              <p className="text-[var(--muted-foreground)]">
                Mon-Sat: 8AM - 6PM<br />
                Sunday: Closed
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                <p className="text-[var(--muted-foreground)] mb-6">
                  Your message has been received. We&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#5DB7E0] hover:bg-blue-600 text-white py-3 px-8 rounded-md font-medium transition-colors inline-block"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8"
              >
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-[var(--muted-foreground)] font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] border-[var(--gray-200)] focus:outline-none focus:ring-2 focus:ring-[#5DB7E0]"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-[var(--muted-foreground)] font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] border-[var(--gray-200)] focus:outline-none focus:ring-2 focus:ring-[#5DB7E0]"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-[var(--muted-foreground)] font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] border-[var(--gray-200)] focus:outline-none focus:ring-2 focus:ring-[#5DB7E0]"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-[var(--muted-foreground)] font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] border-[var(--gray-200)] focus:outline-none focus:ring-2 focus:ring-[#5DB7E0]"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-[#5DB7E0] hover:bg-blue-600 text-white py-3 px-6 rounded-md font-medium transition-colors w-full ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />
    </>
  );
};

export default ContactPage; 