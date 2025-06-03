"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard, FaInfoCircle } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    date: '',
    time: '',
    paymentMethod: '',
    additionalInfo: '',
    images: [] as File[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [estimate, setEstimate] = useState<{
    analysis: string;
    estimatedAmount: string | number;
    breakdown?: {
      loadSize: string;
      basePrice: number;
      additionalFees: Array<{
        name: string;
        amount: number;
        reason: string;
      }>;
      total: number;
    };
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert images to base64 strings for storage
      const imagePromises = formData.images.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        return `data:${file.type};base64,${buffer.toString('base64')}`;
      });

      const base64Images = await Promise.all(imagePromises);

      // Prepare data for API
      const payload = {
        ...formData,
        images: base64Images,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const bookingData = await response.json();
        const estimateId = bookingData.estimateId;

        // Fetch the estimate from the backend
        const estimateRes = await fetch(`/api/admin/estimates/${estimateId}`);
        if (estimateRes.ok) {
          const estimateData = await estimateRes.json();
          setEstimate({
            analysis: estimateData.analysis || 'No analysis available.',
            estimatedAmount: estimateData.estimatedAmount ?? 'N/A',
            breakdown: estimateData.breakdown,
          });
        } else {
          setEstimate({ analysis: 'Failed to fetch estimate.', estimatedAmount: 'N/A' });
        }
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        setIsSubmitting(false);
        alert('Failed to submit booking.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setIsSubmitting(false);
      alert('An error occurred while submitting your booking.');
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      serviceType: '',
      date: '',
      time: '',
      paymentMethod: '',
      additionalInfo: '',
      images: []
    });
    setSubmitted(false);
    setEstimate(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[var(--background)] dark:bg-[#232936] text-[var(--foreground)] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#5DB7E0] to-blue-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Book Your Service</h2>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {submitted && estimate ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    
                    {/* Prominent Price Display */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">Your Estimate</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        ${typeof estimate.estimatedAmount === 'number' 
                          ? estimate.estimatedAmount.toFixed(2)
                          : estimate.estimatedAmount}
                      </div>
                      <p className="text-gray-500 text-sm">Estimated Total</p>
                    </div>

                    {/* Detailed Estimate Breakdown */}
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Estimate Details</h4>
                        <p className="text-gray-600 mb-4">{estimate.analysis}</p>
                      </div>

                      {estimate.breakdown && (
                        <div className="space-y-4">
                          <div className="border-t pt-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Load Size:</span>
                              <span className="font-medium">{estimate.breakdown.loadSize}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Base Price:</span>
                              <span className="font-medium">${estimate.breakdown.basePrice.toFixed(2)}</span>
                            </div>
                            
                            {estimate.breakdown.additionalFees.length > 0 && (
                              <div className="mt-4">
                                <h5 className="text-sm font-semibold text-gray-700 mb-2">Additional Fees:</h5>
                                {estimate.breakdown.additionalFees.map((fee, index) => (
                                  <div key={index} className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">{fee.name}</span>
                                    <span className="font-medium">${fee.amount.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="border-t mt-4 pt-4">
                              <div className="flex justify-between">
                                <span className="font-semibold text-gray-900">Total Estimate:</span>
                                <span className="font-bold text-blue-600">${estimate.breakdown.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-500 mb-8">You will receive an email shortly with your estimate details and a confirmation link to finalize your appointment.</p>
                    <button
                      onClick={handleClose}
                      className="bg-[#5DB7E0] hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                          <FaUser className="w-4 h-4 mr-2 text-[#5DB7E0]" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#5DB7E0] focus:border-transparent transition-colors bg-[var(--background)] dark:bg-gray-900 text-[var(--foreground)] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                          <FaEnvelope className="w-4 h-4 mr-2 text-[#5DB7E0]" />
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#5DB7E0] focus:border-transparent transition-colors bg-[var(--background)] dark:bg-gray-900 text-[var(--foreground)] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="support@trianglehaulingpros.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                          <FaPhone className="w-4 h-4 mr-2 text-[#5DB7E0]" />
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#5DB7E0] focus:border-transparent transition-colors bg-[var(--background)] dark:bg-gray-900 text-[var(--foreground)] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="(727)-403-7074"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-[#5DB7E0]" />
                          Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#5DB7E0] focus:border-transparent transition-colors bg-[var(--background)] dark:bg-gray-900 text-[var(--foreground)] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="123 Main St, City, State"
                        />
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                        <FaCalendarAlt className="w-4 h-4 mr-2 text-[#5DB7E0]" />
                        Service Type *
                      </label>
                      <select
                        required
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="appearance-none w-full px-4 py-2.5 border border-gray-300 rounded-md bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500"
                      >
                        <option value="">Select a service</option>
                        <option value="JUNK_REMOVAL">Junk Removal</option>
                        <option value="APPLIANCE_REMOVAL">Appliance Removal</option>
                        <option value="FURNITURE_PICKUP">Furniture Pickup</option>
                        <option value="MOVE_OUT_CLEANOUTS">Move-Out Cleanouts</option>
                        <option value="YARD_WASTE">Yard Waste</option>
                        <option value="DONATION_RUNS">Donation Runs</option>
                        <option value="CONSTRUCTION_DEBRIS">Construction Debris</option>
                      </select>
                    </div>

                    {/* Scheduling */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                          <FaCalendarAlt className="w-4 h-4 mr-2 text-[#5DB7E0]" />
                          Preferred Date *
                        </label>
                        <DatePicker
                          selected={formData.date ? new Date(formData.date) : null}
                          onChange={date => setFormData({ ...formData, date: date ? date.toISOString().split('T')[0] : '' })}
                          dateFormat="yyyy-MM-dd"
                          required
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#5DB7E0] focus:border-transparent transition-colors bg-[var(--background)] dark:bg-gray-900 text-[var(--foreground)] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                          calendarClassName="!bg-white dark:!bg-gray-900 !border !border-gray-200 dark:!border-gray-700 !text-gray-900 dark:!text-gray-100"
                          wrapperClassName="w-full"
                          placeholderText="Select a date"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                          Preferred Time *
                        </label>
                        <select
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="appearance-none w-full px-4 py-2.5 border border-gray-300 rounded-md bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500"
                        >
                          <option value="">Select a time</option>
                          <option value="MORNING">Morning (8AM - 12PM)</option>
                          <option value="AFTERNOON">Afternoon (12PM - 4PM)</option>
                          <option value="EVENING">Evening (4PM - 6PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                        <FaCreditCard className="w-4 h-4 mr-2 text-[#5DB7E0]" />
                        Preferred Payment Type *
                      </label>
                      <select
                        required
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="appearance-none w-full px-4 py-2.5 border border-gray-300 rounded-md bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500"
                      >
                        <option value="">Select payment method</option>
                        <option value="CASH">Cash</option>
                        <option value="CREDIT_CARD">Credit Card</option>
                        <option value="DEBIT_CARD">Debit Card</option>
                      </select>
                    </div>

                    {/* Picture Upload */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                        <span className="inline-block w-4 h-4 mr-2 bg-[#5DB7E0] rounded-sm flex items-center justify-center text-white">📷</span>
                        Upload Pictures (optional)
                        <span className="ml-2 text-xs text-gray-500">(Adding photos helps us better understand your needs)</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={e => setFormData({ ...formData, images: e.target.files ? Array.from(e.target.files) : [] })}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 dark:file:bg-blue-600 dark:file:text-white dark:hover:file:bg-blue-700"
                      />
                    </div>

                    {/* Description of Service Needs */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-[var(--foreground)]">
                        <FaInfoCircle className="w-4 h-4 mr-2 text-[#5DB7E0]" />
                        Description of Service Needs *
                      </label>
                      <textarea
                        required
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#5DB7E0] focus:border-transparent transition-colors bg-[var(--background)] dark:bg-gray-900 text-[var(--foreground)] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="Please describe what you need removed, approximate quantities, any stairs or access challenges, and any details that could affect pricing (e.g., size, weight, special handling). The more details you provide, the more accurate your estimate will be."
                      ></textarea>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-[var(--muted-foreground)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-[#5DB7E0] hover:bg-blue-600 text-white py-2.5 px-8 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Book Now'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal; 