import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { BookingProvider } from './context/BookingContext';
import ClientLayout from './components/ClientLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Triangle Hauling Pros',
  description: 'Triangle Hauling Pros - Professional Junk Removal & Hauling Services in the Triangle Area',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      <html lang="en" className="scroll-smooth">
        <head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]`}
        >
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </BookingProvider>
  );
}
