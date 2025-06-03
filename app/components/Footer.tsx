"use client";

import React from "react";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Book Now", href: "/book-now" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const serviceLinks = [
  { name: "Junk Removal", href: "/services#junk-removal" },
  { name: "Appliance Removal", href: "/services#appliance-removal" },
  { name: "Furniture Pickup", href: "/services#furniture-pickup" },
  { name: "Move-Out Cleanouts", href: "/services#move-out-cleanouts" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { openBookingModal } = useBooking();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="text-2xl font-bold text-[var(--primary)] mb-4">Triangle Hauling Pros</div>
            <p className="text-[var(--muted-foreground)] mb-6">
              Professional junk removal and hauling services for residential and commercial customers in the Triangle area.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--primary)] p-2 rounded-full transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--primary)] p-2 rounded-full transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--primary)] p-2 rounded-full transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                link.name === "Book Now" ? (
                  <li key={link.name}>
                    <button
                      onClick={openBookingModal}
                      className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-left w-full"
                      type="button"
                    >
                      {link.name}
                    </button>
                  </li>
                ) : (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 text-[var(--primary)] mt-0.5 mr-3" />
                <span className="text-[var(--muted-foreground)]">
                  Serving Raleigh, Durham, Chapel Hill and surrounding areas
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="w-5 h-5 text-[var(--primary)] mr-3" />
                <a href="tel:+17274037074" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                  (727)-403-7074
                </a>
              </li>
              <li className="flex items-center">
                <a href="mailto:support@trianglehaulingpros.com" aria-label="Email" className="flex items-center group">
                  <FaEnvelope className="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] text-[var(--primary)] group-hover:text-blue-500 transition-colors mr-3" />
                  <span className="text-[var(--muted-foreground)] group-hover:text-[var(--primary)] break-all">support@trianglehaulingpros.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--muted-foreground)] text-sm mb-4 md:mb-0">
            &copy; {currentYear} Triangle Hauling Pros. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)]">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 