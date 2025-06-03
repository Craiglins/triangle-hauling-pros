"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaDollarSign, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface Estimate {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  paymentMethod: string;
  additionalInfo: string | null;
  status: string;
  estimatedAmount: number | null;
  images: string[];
  createdAt: string;
  paymentStatus: string;
  analysis: string | null;
}

export default function AdminDashboard() {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [estimateAmount, setEstimateAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [_uploadingImages, setUploadingImages] = useState(false);
  const [_showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchEstimates();
  }, []);

  const fetchEstimates = async () => {
    try {
      const response = await fetch('/api/admin/estimates');
      const data = await response.json();
      setEstimates(data);
    } catch (error) {
      console.error('Error fetching estimates:', error);
    }
  };

  const handleSetEstimate = async (estimateId: string) => {
    if (!estimateAmount) return;

    try {
      const response = await fetch(`/api/admin/estimates/${estimateId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estimatedAmount: parseFloat(estimateAmount),
          status: 'ESTIMATED',
        }),
      });

      if (response.ok) {
        await fetchEstimates();
        setSelectedEstimate(null);
        setEstimateAmount('');
      }
    } catch (error) {
      console.error('Error setting estimate:', error);
    }
  };

  const handleSendEstimate = async (estimateId: string) => {
    try {
      const response = await fetch(`/api/admin/estimates/${estimateId}/send`, {
        method: 'POST',
      });

      if (response.ok) {
        await fetchEstimates();
      }
    } catch (error) {
      console.error('Error sending estimate:', error);
    }
  };

  const _handleImageUpload = async (estimateId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch(`/api/admin/estimates/${estimateId}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchEstimates();
      } else {
        console.error('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploadingImages(false);
    }
  };

  const _handleConfirmEstimate = async (estimateId: string) => {
    try {
      const response = await fetch(`/api/admin/estimates/${estimateId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'ESTIMATE_SENT',
        }),
      });
      if (response.ok) {
        await fetchEstimates();
        setSelectedEstimate(null);
        setShowConfirmModal(false);
      }
    } catch (_error) {
      console.error('Error confirming estimate:', _error);
    }
  };

  const handleDeleteBooking = async (estimateId: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      const response = await fetch(`/api/admin/appointments?id=${estimateId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchEstimates();
      } else {
        alert('Failed to delete booking.');
      }
    } catch (error) {
      alert('Error deleting booking.');
    }
  };

  const filteredEstimates = estimates.filter(estimate => {
    const matchesSearch = 
      estimate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || estimate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          
          {/* Search and Filter */}
          <div className="flex gap-4">
            <a
              href="/admin/calendar"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Calendar
            </a>
            <div className="relative">
              <input
                type="text"
                placeholder="Search estimates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="ESTIMATED">Estimated</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        {/* Estimates List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredEstimates.map((estimate) => (
                  <tr key={estimate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {estimate.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {estimate.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {estimate.serviceType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {new Date(estimate.preferredDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {estimate.preferredTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        estimate.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        estimate.status === 'PENDING_ADMIN_REVIEW' ? 'bg-orange-100 text-orange-800' :
                        estimate.status === 'ESTIMATED' ? 'bg-blue-100 text-blue-800' :
                        estimate.status === 'ESTIMATE_SENT' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {estimate.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {estimate.estimatedAmount ? `$${estimate.estimatedAmount}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedEstimate(estimate)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                      >
                        View Details
                      </button>
                      {estimate.status === 'ESTIMATED' && (
                        <button
                          onClick={() => handleSendEstimate(estimate.id)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-4"
                        >
                          Send Estimate
                        </button>
                      )}
                      {estimate.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleDeleteBooking(estimate.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Estimate Details Modal */}
        {selectedEstimate && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Estimate Details
                </h2>
                <button
                  onClick={() => setSelectedEstimate(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {selectedEstimate.name}</p>
                    <p><strong>Email:</strong> {selectedEstimate.email}</p>
                    <p><strong>Phone:</strong> {selectedEstimate.phone}</p>
                    <p><strong>Address:</strong> {selectedEstimate.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Service Details
                  </h3>
                  <div className="space-y-2">
                    <p><strong>Service Type:</strong> {selectedEstimate.serviceType}</p>
                    <p><strong>Preferred Date:</strong> {new Date(selectedEstimate.preferredDate).toLocaleDateString()}</p>
                    <p><strong>Preferred Time:</strong> {selectedEstimate.preferredTime}</p>
                    <p><strong>Payment Method:</strong> {selectedEstimate.paymentMethod}</p>
                    {selectedEstimate.additionalInfo && (
                      <p><strong>Additional Info:</strong> {selectedEstimate.additionalInfo}</p>
                    )}
                  </div>
                </div>
              </div>

              {selectedEstimate.analysis && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    AI Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedEstimate.analysis}</p>
                </div>
              )}

              {selectedEstimate.status === 'PENDING_ADMIN_REVIEW' && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Set Estimate
                  </h3>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Estimate Amount
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaDollarSign className="text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={estimateAmount}
                          onChange={(e) => setEstimateAmount(e.target.value)}
                          className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleSetEstimate(selectedEstimate.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Set Estimate
                    </button>
                  </div>
                </div>
              )}

              {selectedEstimate.status === 'ESTIMATED' && (
                <div className="mt-6">
                  <button
                    onClick={() => handleSendEstimate(selectedEstimate.id)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Send Estimate to Customer
                  </button>
                </div>
              )}

              {selectedEstimate.images && selectedEstimate.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Uploaded Images
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedEstimate.images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <Image
                          src={image}
                          alt={`Uploaded image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 