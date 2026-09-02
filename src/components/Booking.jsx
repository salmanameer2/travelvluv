import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, X, ArrowRight, Download, CalendarCheck } from 'lucide-react';
import { destinations, bookingOptions } from '../assets/assets.js';
import BookingForm from './BookingForm.jsx';
import BookingSummary from './BookingSummary.jsx';
import SectionHeading from './SectionHeading.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { bookingService } from '../services/bookingService.js';

export default function Booking({
  selectedPreDestination,
  onResetPreDestination,
  onAddBooking,
  onOpenProfile,
  onRequireAuth,
}) {
  const { user, profile } = useAuth();

  const [formData, setFormData] = useState({
    destinationId: selectedPreDestination ? selectedPreDestination.id : '1',
    departureDate: '',
    returnDate: '',
    adults: 2,
    children: 0,
    accommodationId: 'luxury-villa',
    travelClassId: 'business-class',
    selectedActivities: ['Private Yacht Charter', 'Culinary & Wine Masterclass'],
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  // Keep form data synced with logged in user if they just logged in
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      fullName: profile?.name || profile?.full_name || '',
      email: user?.email || '',
      phone: profile?.phone || '',
    }));
  }, [
    user?.id,
    user?.email,
    profile?.name,
    profile?.full_name,
    profile?.phone,
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessModal, setBookingSuccessModal] = useState(null);

  // Sync if pre-selected from another section
  useEffect(() => {
    if (selectedPreDestination) {
      setFormData((prev) => ({
        ...prev,
        destinationId: selectedPreDestination.id,
      }));
    }
  }, [selectedPreDestination]);

  // Selected Objects
  const destinationObj = useMemo(() => {
    return destinations.find((d) => String(d.id) === String(formData.destinationId)) || destinations[0];
  }, [formData.destinationId]);

  const selectedAccommodation = useMemo(() => {
    return bookingOptions.accommodationTypes.find((a) => a.id === formData.accommodationId);
  }, [formData.accommodationId]);

  const selectedClass = useMemo(() => {
    return bookingOptions.travelClasses.find((c) => c.id === formData.travelClassId);
  }, [formData.travelClassId]);

  // Real-time calculation math
  const calculatedTotal = useMemo(() => {
    if (!destinationObj) return 0;
    const base = destinationObj.price || 1500;
    const multiplier = selectedAccommodation ? selectedAccommodation.multiplier : 1.0;
    const classAddon = selectedClass ? selectedClass.cost : 0;
    const activityCount = formData.selectedActivities.length;
    const activityAddon = activityCount * 180;

    const totalTravelers = formData.adults + formData.children * 0.75;
    const singleCost = (base * multiplier) + classAddon + activityAddon;
    return Math.round(singleCost * totalTravelers);
  }, [destinationObj, selectedAccommodation, selectedClass, formData.adults, formData.children, formData.selectedActivities]);

  const validate = () => {
    const errs = {};
    if (!formData.destinationId) errs.destinationId = 'Please select a destination.';
    if (!formData.departureDate) errs.departureDate = 'Please select a departure date.';
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) errs.phone = 'Please provide a contact phone number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      const formEl = document.getElementById('booking-section-wrapper');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!user) {
      if (onRequireAuth) onRequireAuth();
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      ...formData,
      destination: destinationObj.name,
      country: destinationObj.country,
      image: destinationObj.image,
      accommodation: selectedAccommodation ? selectedAccommodation.name : 'Luxury Suite',
      travelClass: selectedClass ? selectedClass.name : 'Standard Luxury',
      total: calculatedTotal,
    };

    const { data: newBookingRecord, error } = await bookingService.createBooking(bookingPayload);
    setIsSubmitting(false);

    if (error) {
      alert(error);
      return;
    }

    if (onAddBooking) {
      onAddBooking(newBookingRecord);
    }

    setBookingSuccessModal(newBookingRecord);

    // Trigger Confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D5A46', '#34D399', '#FBBF24', '#10B981'],
      });
    } catch (err) {
      // Safe fallback
    }
  };

  return (
    <section id="booking" className="py-24 bg-[#FBFBF9] border-t border-gray-100">
      <div id="booking-section-wrapper" className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Bespoke Reservations"
          title="Plan Your Unforgettable Journey"
          subtitle="Customize your dates, luxury accommodations, private VIP transfers, and exclusive experiences in seconds."
        />

        {/* Two-Column Responsive Layout: Left Form + Right Live Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Booking Form */}
          <div className="lg:col-span-7">
            <BookingForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              errors={errors}
            />
          </div>

          {/* Right Live Booking Summary */}
          <div className="lg:col-span-5">
            <BookingSummary
              formData={formData}
              destinationObj={destinationObj}
              calculatedTotal={calculatedTotal}
              selectedAccommodation={selectedAccommodation}
              selectedClass={selectedClass}
            />
          </div>
        </div>
      </div>

      {/* Booking Success Confirmation Modal */}
      <AnimatePresence>
        {bookingSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 text-center"
            >
              <button
                onClick={() => setBookingSuccessModal(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A46] bg-emerald-50 px-3 py-1 rounded-full">
                Booking Request Received
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-3">
                Your Journey Awaits!
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Thank you, <span className="font-bold text-gray-900">{bookingSuccessModal.leadTraveler}</span>. Our senior concierge specialist has received your bespoke itinerary request.
              </p>

              {/* Confirmation Details Ticket Card */}
              <div className="my-6 p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-200 text-left space-y-2.5 text-xs text-gray-700">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200 font-mono text-xs">
                  <span className="text-gray-500 font-sans">Reference ID:</span>
                  <span className="font-bold text-[#2D5A46]">{bookingSuccessModal.confirmationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination:</span>
                  <span className="font-semibold text-gray-900">{bookingSuccessModal.destination}, {bookingSuccessModal.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Departure:</span>
                  <span className="font-semibold text-gray-900">{bookingSuccessModal.departureDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Party Size:</span>
                  <span className="font-semibold text-gray-900">{bookingSuccessModal.travelers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Accommodation:</span>
                  <span className="font-semibold text-gray-900">{bookingSuccessModal.accommodation || bookingSuccessModal.package}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-bold text-gray-900">
                  <span>Estimated Total:</span>
                  <span className="text-[#2D5A46]">${Number(bookingSuccessModal.total || 0).toLocaleString()} USD</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    setBookingSuccessModal(null);
                    if (onOpenProfile) {
                      onOpenProfile('bookings');
                    }
                  }}
                  className="w-full py-3.5 bg-[#2D5A46] hover:bg-[#234837] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>View in My Profile & Bookings</span>
                </button>
                <button
                  onClick={() => setBookingSuccessModal(null)}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Done & Continue Exploring
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
