"use client";

import React from "react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTrash, FaCouch, FaHome, FaLeaf, FaHandsHelping, FaBoxes } from 'react-icons/fa';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Junk Removal',
    description: 'We remove all types of unwanted items from your property, including old furniture, appliances, and general clutter.',
    icon: FaTrash,
    link: '/services#junk-removal'
  },
  {
    id: 2,
    title: 'Appliance Removal',
    description: 'Specialized service for removing old appliances like refrigerators, washing machines, and more.',
    icon: FaHome,
    link: '/services#appliance-removal'
  },
  {
    id: 3,
    title: 'Furniture Pickup',
    description: 'We\'ll pick up and haul away your unwanted furniture items, from couches to mattresses and beyond.',
    icon: FaCouch,
    link: '/services#furniture-pickup'
  },
  {
    id: 4,
    title: 'Move-Out Cleanouts',
    description: 'Complete property cleanouts for moving, renovations, or estate situations.',
    icon: FaBoxes,
    link: '/services#move-out-cleanouts'
  },
  {
    id: 5,
    title: 'Yard Waste',
    description: 'We remove yard debris, branches, leaves, and other outdoor waste to keep your property clean.',
    icon: FaLeaf,
    link: '/services#yard-waste'
  },
  {
    id: 6,
    title: 'Donation Runs',
    description: 'We\'ll transport your items to local donation centers to help you give back to the community.',
    icon: FaHandsHelping,
    link: '/services#donation-runs'
  }
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const Icon = service.icon;
  return (
    <Link
      href={service.link}
      className="block focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded-lg"
      role="link"
      tabIndex={0}
      aria-label={`Learn more about ${service.title}`}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gradient-to-b from-[var(--card-bg-from)] to-[var(--card-bg-to)] shadow-lg overflow-hidden group hover:border-[var(--primary)]/30 hover:shadow-xl transition-all duration-200 flex flex-col items-center justify-center h-full w-full min-h-[260px] p-4 hover:from-[var(--card-bg-hover-from)] hover:to-[var(--card-bg-hover-to)] cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mb-4 relative flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
              <Icon className="w-6 h-6" />
            </div>
            <div className="absolute w-24 h-24 -top-4 -left-4 rounded-full bg-[var(--primary)]/5 blur-xl group-hover:bg-[var(--primary)]/10 transition-colors"></div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-[var(--foreground)] text-center group-hover:text-[var(--primary)] transition-colors">{service.title}</h3>
          <p className="text-[var(--muted-foreground)] mb-4 text-center">{service.description}</p>
          <span className="inline-flex items-center text-[var(--primary)] font-medium group-hover:text-[var(--blue-300)] transition-colors group-hover:translate-x-1 duration-200 select-none">
            Learn More
            <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 bg-[var(--muted)] dark:bg-gray-800/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.7))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.7))]"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="font-bold tracking-tight leading-tight text-3xl md:text-4xl lg:text-5xl mb-4">Our Services</h2>
          <div className="h-1 w-16 bg-[var(--primary)] mx-auto mb-6"></div>
          <p className="text-[var(--muted-foreground)]">
            We offer a comprehensive range of junk removal services to meet all your hauling needs, from residential cleanouts to commercial waste removal.
          </p>
        </motion.div>
        
        {/* Responsive grid: 2x3 for first 6 on mobile, all in 2/3 columns on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-2xl md:max-w-7xl mx-auto items-stretch h-full">
          {services.slice(0, 6).map((service, index) => (
            <div key={service.id} className="block md:hidden h-full w-full">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
          {services.map((service, index) => (
            <div key={service.id} className="hidden md:block h-full w-full">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link 
            href="/services" 
            className="inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-blue-50 hover:bg-blue-700 px-8 py-3 text-base no-underline"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 