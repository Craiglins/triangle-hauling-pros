"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBooking } from '../context/BookingContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openBookingModal } = useBooking();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo: show image on mobile, text on desktop */}
          <Link href="/" className="flex items-center">
            <span className="block md:hidden">
              <Image 
                src="/images/hero-bg.jpg" 
                alt="Triangle Hauling Pros Logo" 
                width={40}
                height={40}
                className="h-10 w-auto" 
              />
            </span>
            <span className="hidden md:block text-2xl font-bold text-[var(--primary)]">
              Triangle Hauling Pros
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={openBookingModal}
              className="bg-[var(--primary)] hover:bg-[var(--blue-600)] text-white px-6 py-2 rounded-md transition-colors"
            >
              Get Estimate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 bg-white dark:bg-gray-900">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                openBookingModal();
              }}
              className="w-full mt-4 bg-[var(--primary)] hover:bg-[var(--blue-600)] text-white px-6 py-2 rounded-md transition-colors"
            >
              Get Estimate
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 