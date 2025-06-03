"use client";

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BookingModal from './BookingModal';
import { useBooking } from '../context/BookingContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, closeBookingModal } = useBooking();

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
      <BookingModal isOpen={isOpen} onClose={closeBookingModal} />
    </>
  );
} 