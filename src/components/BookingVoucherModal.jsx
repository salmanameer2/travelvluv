import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Printer,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Plane,
  Building,
  Sparkles,
  QrCode,
  CheckCircle2,
  Share2,
  Clock,
  Compass,
} from 'lucide-react';

export default function BookingVoucherModal({ booking, onClose }) {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 relative my-auto print:shadow-none print:border-none print:rounded-none"
      >
        {/* Modal Controls Bar (Hidden during print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Official Bespoke Travel Itinerary & Voucher
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Voucher Body (Printable) */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Branding */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#2D5A46] text-white flex items-center justify-center font-bold text-sm">
                  ✈
                </div>
                <span className="font-serif font-bold text-2xl text-gray-900 tracking-tight">
                  RoamStory
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D5A46] mt-0.5">
                LUXURY CONCIERGE & EXPEDITION VOUCHER
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Booking Reference
              </span>
              <span className="font-mono text-lg font-extrabold text-[#2D5A46] tracking-wider">
                {booking.confirmationNumber || booking.id}
              </span>
              <div className="mt-1">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    booking.status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : booking.status === 'Upcoming'
                      ? 'bg-blue-100 text-blue-800'
                      : booking.status === 'Completed'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  ● {booking.status || 'Confirmed'}
                </span>
              </div>
            </div>
          </div>

          {/* Destination Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm h-48 bg-gray-900">
            <img
              src={booking.image}
              alt={booking.destination}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {booking.country}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-1">
                {booking.destination} Luxury Expedition
              </h2>
            </div>
          </div>

          {/* Key Trip Parameters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200/80 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Departure Date</span>
              <span className="font-bold text-gray-900 mt-0.5 block">
                {booking.departureDate}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Return / Duration</span>
              <span className="font-bold text-gray-900 mt-0.5 block">
                {booking.returnDate || 'Flexible'}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Party Size</span>
              <span className="font-bold text-gray-900 mt-0.5 block">
                {booking.travelers || `${booking.adults || 2} Travelers`}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Booking Status</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">
                Guaranteed VIP
              </span>
            </div>
          </div>

          {/* Passenger & Reservation Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-gray-100 bg-[#FBFBF9] space-y-2">
              <div className="flex items-center gap-2 font-bold text-gray-900 pb-1.5 border-b border-gray-200">
                <User className="w-4 h-4 text-[#2D5A46]" />
                <span>Lead Passenger & Contact</span>
              </div>
              <div className="space-y-1 text-gray-700">
                <p>
                  <span className="text-gray-400">Name:</span>{' '}
                  <strong className="text-gray-900">{booking.leadTraveler}</strong>
                </p>
                <p>
                  <span className="text-gray-400">Email:</span> {booking.email}
                </p>
                <p>
                  <span className="text-gray-400">Phone:</span> {booking.phone}
                </p>
                {booking.specialRequests && (
                  <p className="pt-1 text-[11px] text-gray-600 italic">
                    Note: "{booking.specialRequests}"
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-gray-100 bg-[#FBFBF9] space-y-2">
              <div className="flex items-center gap-2 font-bold text-gray-900 pb-1.5 border-b border-gray-200">
                <Building className="w-4 h-4 text-[#2D5A46]" />
                <span>Tier & Accommodation</span>
              </div>
              <div className="space-y-1 text-gray-700">
                <p>
                  <span className="text-gray-400">Lodging:</span>{' '}
                  <strong className="text-gray-900">{booking.accommodation}</strong>
                </p>
                <p>
                  <span className="text-gray-400">Travel Class:</span>{' '}
                  <strong className="text-gray-900">{booking.travelClass}</strong>
                </p>
                <p>
                  <span className="text-gray-400">Concierge:</span> 24/7 Priority Support
                </p>
                <p>
                  <span className="text-gray-400">Check-in:</span> VIP Early Access
                </p>
              </div>
            </div>
          </div>

          {/* Included Experiences */}
          {booking.selectedActivities && booking.selectedActivities.length > 0 && (
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2 font-bold text-xs text-gray-900 mb-2">
                <Sparkles className="w-4 h-4 text-[#2D5A46]" />
                <span>Curated VIP Activities Included</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {booking.selectedActivities.map((act, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {act}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Payment & Security Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dashed border-gray-300">
            <div className="flex items-center gap-3">
              {/* Decorative QR Code Voucher */}
              <div className="w-14 h-14 bg-white p-1 rounded-xl border border-gray-300 shadow-xs flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-gray-900 rounded-lg p-1 flex flex-wrap gap-0.5 items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-xs"></div>
                  <div className="w-4 h-4 bg-emerald-400 rounded-xs"></div>
                  <div className="w-4 h-4 bg-white rounded-xs"></div>
                  <div className="w-4 h-4 bg-white rounded-xs"></div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <span className="font-bold text-gray-900 block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                  Verified Reservation
                </span>
                <span>Scan at hotel reception or private chauffeur check-in</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-500 block">Total Package Value</span>
              <span className="text-2xl font-bold text-[#2D5A46]">
                ${Number(booking.total || 0).toLocaleString()} USD
              </span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Close */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Itinerary
          </button>
        </div>
      </motion.div>
    </div>
  );
}
