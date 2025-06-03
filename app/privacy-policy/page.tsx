"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const PrivacyPolicyPage = () => {
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
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--foreground)]">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-8">Learn how we collect, use, and protect your personal information.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Information We Collect</h2>
              <p className="text-[var(--muted-foreground)] mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)]">
                <li>Name and contact information</li>
                <li>Service address and details</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">How We Use Your Information</h2>
              <p className="text-[var(--muted-foreground)] mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)]">
                <li>Provide and improve our services</li>
                <li>Process your bookings and payments</li>
                <li>Communicate with you about your service</li>
                <li>Send you important updates and notifications</li>
                <li>Improve our website and customer experience</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Information Sharing</h2>
              <p className="text-[var(--muted-foreground)]">
                We do not sell or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)] mt-4">
                <li>Service providers who assist in our operations</li>
                <li>Payment processors for secure transactions</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Data Security</h2>
              <p className="text-[var(--muted-foreground)]">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Your Rights</h2>
              <p className="text-[var(--muted-foreground)] mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--muted-foreground)]">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Contact Us</h2>
              <p className="text-[var(--muted-foreground)]">
                If you have any questions about our privacy policy or how we handle your information, please contact us at:
              </p>
              <p className="text-[var(--muted-foreground)] mt-2">
                Email: support@trianglehaulingpros.com<br />
                Phone: (727)-403-7074
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Updates to This Policy</h2>
              <p className="text-[var(--muted-foreground)]">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
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

export default PrivacyPolicyPage; 