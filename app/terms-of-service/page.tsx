"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const TermsOfServicePage = () => {
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
            <span className="text-[var(--primary)] font-semibold tracking-widest text-sm mb-4">LEGAL INFORMATION</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--foreground)]">Terms of Service</h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-8">Please read these terms carefully before using our services.</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">1. Acceptance of Terms</h2>
              <p className="text-[var(--muted-foreground)]">
                By accessing and using Triangle Hauling Pros' services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">2. Service Description</h2>
              <p className="text-[var(--muted-foreground)] mb-4">
                Triangle Hauling Pros provides junk removal and hauling services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)]">
                <li>Residential junk removal</li>
                <li>Commercial junk removal</li>
                <li>Furniture and appliance removal</li>
                <li>Construction debris removal</li>
                <li>Estate cleanouts</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">3. Booking and Cancellation</h2>
              <p className="text-[var(--muted-foreground)] mb-4">
                Our booking and cancellation policies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)]">
                <li>Bookings must be made at least 24 hours in advance</li>
                <li>Cancellations must be made at least 4 hours before the scheduled service time</li>
                <li>Late cancellations may be subject to a cancellation fee</li>
                <li>We reserve the right to reschedule services due to weather or other circumstances</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">4. Pricing and Payment</h2>
              <p className="text-[var(--muted-foreground)] mb-4">
                Our pricing and payment terms:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)]">
                <li>All prices are subject to change without notice</li>
                <li>Final pricing may vary based on actual volume and type of items</li>
                <li>Payment is due upon completion of service</li>
                <li>We accept cash, credit cards, and electronic payments</li>
                <li>Additional fees may apply for special handling or hazardous materials</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">5. Customer Responsibilities</h2>
              <p className="text-[var(--muted-foreground)] mb-4">
                As a customer, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)]">
                <li>Provide accurate information about items to be removed</li>
                <li>Ensure safe access to the removal location</li>
                <li>Notify us of any hazardous materials</li>
                <li>Be present or provide access during the scheduled service time</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">6. Liability</h2>
              <p className="text-[var(--muted-foreground)]">
                Triangle Hauling Pros is not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)] mt-4">
                <li>Damage to property not directly caused by our services</li>
                <li>Loss of items not specifically requested for removal</li>
                <li>Delays due to circumstances beyond our control</li>
                <li>Consequential or indirect damages</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">7. Environmental Responsibility</h2>
              <p className="text-[var(--muted-foreground)]">
                We are committed to environmentally responsible disposal practices. We will:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)] mt-4">
                <li>Recycle materials whenever possible</li>
                <li>Properly dispose of hazardous materials</li>
                <li>Donate usable items to local charities</li>
                <li>Comply with all environmental regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">8. Changes to Terms</h2>
              <p className="text-[var(--muted-foreground)]">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the modified terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">9. Contact Information</h2>
              <p className="text-[var(--muted-foreground)]">
                For questions about these terms, please contact us at:
              </p>
              <p className="text-[var(--muted-foreground)] mt-2">
                Email: support@trianglehaulingpros.com<br />
                Phone: (727)-403-7074
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">10. Governing Law</h2>
              <p className="text-[var(--muted-foreground)]">
                These terms are governed by the laws of the state of North Carolina. Any disputes shall be resolved in the courts of Wake County, North Carolina.
              </p>
              <p className="text-[var(--muted-foreground)] mt-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TermsOfServicePage; 