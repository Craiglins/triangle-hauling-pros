"use client";

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface Appointment {
  id: string;
  title: string;
  start: string;
  end: string;
  customerName: string;
  serviceType: string;
  address?: string;
  phone?: string;
}

export default function AdminCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/appointments');
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      setError('Failed to load appointments. Please try again later.');
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventColor = (serviceType: string) => {
    switch (serviceType.toLowerCase()) {
      case 'junk removal':
        return 'bg-blue-200 border-blue-400';
      case 'demolition':
        return 'bg-blue-300 border-blue-500';
      case 'dumpster rental':
        return 'bg-blue-400 border-blue-600';
      case 'appliance_removal':
        return 'bg-blue-100 border-blue-300';
      case 'yard_waste':
        return 'bg-blue-50 border-blue-200';
      case 'move_out_cleanouts':
        return 'bg-blue-500 border-blue-700';
      default:
        return 'bg-blue-100 border-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Appointment Calendar</h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
        >
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={fetchAppointments}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={appointments.map(appointment => ({
                ...appointment,
                backgroundColor: getEventColor(appointment.serviceType),
                borderColor: getEventColor(appointment.serviceType),
              }))}
              height="auto"
              eventContent={(eventInfo) => {
                const serviceType = eventInfo.event.extendedProps.serviceType || eventInfo.event.title;
                const colorClass = getEventColor(serviceType);
                return (
                  <div className={`rounded-lg shadow px-2 py-1 border text-gray-900 text-xs font-semibold ${colorClass}`} style={{ minWidth: 90 }}>
                    <div>{eventInfo.event.title}</div>
                    <div className="text-xs font-normal text-gray-700">{eventInfo.event.extendedProps.customerName}</div>
                  </div>
                );
              }}
              eventClick={(info) => {
                setSelectedAppointment({
                  id: info.event.id,
                  title: info.event.title,
                  start: info.event.start?.toISOString() || '',
                  end: info.event.end?.toISOString() || '',
                  customerName: info.event.extendedProps.customerName,
                  serviceType: info.event.extendedProps.serviceType,
                  address: info.event.extendedProps.address,
                  phone: info.event.extendedProps.phone,
                });
              }}
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Appointment Details
              </h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Type</h3>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{selectedAppointment.serviceType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer</h3>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{selectedAppointment.customerName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</h3>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {new Date(selectedAppointment.start).toLocaleDateString()} at{' '}
                  {new Date(selectedAppointment.start).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {selectedAppointment.address && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">{selectedAppointment.address}</p>
                </div>
              )}
              {selectedAppointment.phone && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">{selectedAppointment.phone}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 