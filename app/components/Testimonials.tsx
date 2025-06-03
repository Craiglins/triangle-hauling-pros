"use client";

import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jennifer R.",
    location: "Raleigh, NC",
    rating: 5,
    text: "The team at Triangle Hauling Pros was amazing! They showed up on time, worked quickly, and removed all my old furniture without any issues. Highly recommend their services!",
    image: "/images/Jennifer_R.jpg",
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Durham, NC",
    rating: 5,
    text: "I needed help cleaning out my garage before moving, and these guys made it so easy. Fair pricing and professional service from start to finish.",
    image: "/images/Michael_T.webp",
  },
  {
    id: 3,
    name: "Sarah B.",
    location: "Chapel Hill, NC",
    rating: 5,
    text: "I've used Triangle Hauling Pros twice now, and both times they've been nothing but professional, courteous, and efficient. Their pricing is fair and transparent.",
    image: "/images/Sarah_B.jpg",
  },
  {
    id: 4,
    name: "David W.",
    location: "Cary, NC",
    rating: 5,
    text: "Tyler and Tucker were fantastic! They removed an old hot tub from our backyard quickly and without damaging anything. Great service at a great price.",
    image: "/images/David_W.avif",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[var(--primary)]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[var(--accent)]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="font-bold tracking-tight leading-tight text-3xl md:text-4xl lg:text-5xl mb-4">Customer Testimonials</h2>
          <div className="h-1 w-16 bg-[var(--primary)] mx-auto mb-6"></div>
          <p className="text-[var(--muted-foreground)]">
            Don&apos;t just take our word for it. Hear what our satisfied customers have to say about our junk removal services.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden py-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="rounded-lg border bg-[var(--background)] border-[var(--gray-200)] shadow-sm overflow-hidden p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
                      <div className="shrink-0">
                        <div className="relative">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-[var(--muted)] border-2 border-[var(--primary)]/20">
                            <Image 
                              src={testimonial.image || `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=5DB7E0&color=fff`} 
                              alt={testimonial.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-3 -right-3 bg-[var(--primary)] rounded-full p-2 shadow-md">
                            <FaQuoteLeft className="text-white w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar key={i} className="text-[var(--accent)] w-5 h-5" />
                          ))}
                        </div>
                        
                        <p className="text-[var(--foreground)] mb-4 italic">&quot;{testimonial.text}&quot;</p>
                        
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">{testimonial.name}</h4>
                          <p className="text-[var(--muted-foreground)] text-sm">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:shadow-lg transition-all z-10"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:shadow-lg transition-all z-10"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'bg-[var(--primary)] w-6' 
                    : 'bg-[var(--gray-300)] hover:bg-[var(--gray-400)]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 