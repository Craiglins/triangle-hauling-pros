"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface Estimate {
  id: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  paymentMethod: string;
  estimatedAmount: number;
  additionalInfo: string | null;
}

export default function ConfirmAppointmentPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    paymentMethod: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) return;
    const fetchEstimate = async () => {
      try {
        const response = await fetch(`/api/admin/estimates/token/${token}`);
        if (!response.ok) {
          throw new Error('Invalid or expired confirmation link');
        }
        const data = await response.json();
        setEstimate(data);
        const date = new Date(data.preferredDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        setFormData({
          preferredDate: `${year}-${month}-${day}`,
          preferredTime: data.preferredTime,
          paymentMethod: data.paymentMethod,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEstimate();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/admin/estimates/${estimate?.id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm appointment');
      }

      router.push('/confirmation-success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5DB7E0]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Confirm Your Appointment
          </h1>
          <p className="text-gray-600">
            Please review your appointment details below
          </p>
        </div>

        <div className="mb-8 bg-gradient-to-r from-blue-50 to-[#5DB7E0]/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Estimate Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service Type:</span>
              <span className="font-medium text-gray-900">{estimate?.serviceType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated Amount:</span>
              <span className="font-bold text-[#5DB7E0]">${estimate?.estimatedAmount}</span>
            </div>
            {estimate?.additionalInfo && (
              <div className="pt-3 border-t border-gray-200">
                <span className="text-gray-600 block mb-2">Additional Information:</span>
                <p className="text-gray-900 bg-white p-3 rounded-lg border border-gray-100">
                  {estimate.additionalInfo}
                </p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                id="preferredDate"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DB7E0] focus:border-transparent transition-colors bg-white text-gray-900"
                required
                disabled={!isEditing}
              />
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <select
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DB7E0] focus:border-transparent transition-colors bg-white text-gray-900"
                required
                disabled={!isEditing}
              >
                <option value="MORNING">Morning (8AM - 12PM)</option>
                <option value="AFTERNOON">Afternoon (12PM - 4PM)</option>
                <option value="EVENING">Evening (4PM - 6PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DB7E0] focus:border-transparent transition-colors bg-white text-gray-900"
              required
              disabled={!isEditing}
            >
              <option value="CASH">Cash</option>
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
            </select>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#5DB7E0] hover:text-blue-600 font-medium transition-colors"
            >
              {isEditing ? 'Cancel Editing' : 'Edit Details'}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-gradient-to-r from-[#5DB7E0] to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5DB7E0] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Confirming...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 