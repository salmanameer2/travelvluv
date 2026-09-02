import React, { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Mail,
  Phone,
  User,
  CheckCircle2,
  Sparkles,
  Plane,
  Building,
  Plus,
  Minus,
} from 'lucide-react';
import { bookingOptions, destinations } from '../assets/assets.js';

export default function BookingForm({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  errors,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdultsChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      adults: Math.max(1, prev.adults + delta),
    }));
  };

  const handleChildrenChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      children: Math.max(0, prev.children + delta),
    }));
  };

  const handleActivityToggle = (activity) => {
    setFormData((prev) => {
      const exists = prev.selectedActivities.includes(activity);
      return {
        ...prev,
        selectedActivities: exists
          ? prev.selectedActivities.filter((a) => a !== activity)
          : [...prev.selectedActivities, activity],
      };
    });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-8">
      {/* 1. Destination & Dates */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
          <span className="w-6 h-6 rounded-full bg-[#2D5A46] text-white flex items-center justify-center text-xs font-bold">
            1
          </span>
          <h4 className="font-serif font-bold text-gray-900 text-lg">
            Destination & Travel Dates
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Destination */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Select Destination <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                name="destinationId"
                value={formData.destinationId}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:bg-white transition-colors cursor-pointer ${
                  errors.destinationId
                    ? 'border-rose-400 focus:border-rose-500'
                    : 'border-gray-200 focus:border-[#2D5A46]'
                }`}
              >
                <option value="">-- Choose Your Destination --</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.country} ({d.duration} — From {d.priceDisplay})
                  </option>
                ))}
              </select>
            </div>
            {errors.destinationId && (
              <p className="text-xs text-rose-500 mt-1">{errors.destinationId}</p>
            )}
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Departure Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:bg-white transition-colors ${
                errors.departureDate
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-gray-200 focus:border-[#2D5A46]'
              }`}
            />
            {errors.departureDate && (
              <p className="text-xs text-rose-500 mt-1">{errors.departureDate}</p>
            )}
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Return Date (Optional)
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A46] focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 2. Travelers & Party Count */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
          <span className="w-6 h-6 rounded-full bg-[#2D5A46] text-white flex items-center justify-center text-xs font-bold">
            2
          </span>
          <h4 className="font-serif font-bold text-gray-900 text-lg">
            Travel Party & Group Size
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Adults Counter */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-900 text-sm block">Adults</span>
              <span className="text-xs text-gray-500">Age 13+</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleAdultsChange(-1)}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-base text-gray-900">
                {formData.adults}
              </span>
              <button
                type="button"
                onClick={() => handleAdultsChange(1)}
                className="w-8 h-8 rounded-full bg-[#2D5A46] text-white flex items-center justify-center hover:bg-[#234837] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Children Counter */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-900 text-sm block">Children</span>
              <span className="text-xs text-gray-500">Age 0 - 12</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleChildrenChange(-1)}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-base text-gray-900">
                {formData.children}
              </span>
              <button
                type="button"
                onClick={() => handleChildrenChange(1)}
                className="w-8 h-8 rounded-full bg-[#2D5A46] text-white flex items-center justify-center hover:bg-[#234837] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Accommodation & Class Preferences */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
          <span className="w-6 h-6 rounded-full bg-[#2D5A46] text-white flex items-center justify-center text-xs font-bold">
            3
          </span>
          <h4 className="font-serif font-bold text-gray-900 text-lg">
            Accommodation & Travel Class
          </h4>
        </div>

        <div className="space-y-4">
          {/* Accommodation Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Preferred Accommodation
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bookingOptions.accommodationTypes.map((acc) => {
                const selected = formData.accommodationId === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, accommodationId: acc.id }))}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selected
                        ? 'border-[#2D5A46] bg-[#F4F8F5] ring-1 ring-[#2D5A46]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">{acc.name}</span>
                      <span className="text-[11px] text-gray-500 font-medium">{acc.badge}</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selected
                          ? 'border-[#2D5A46] bg-[#2D5A46] text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {selected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Travel Class Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Transfers & Travel Class
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bookingOptions.travelClasses.map((cls) => {
                const selected = formData.travelClassId === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, travelClassId: cls.id }))}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selected
                        ? 'border-[#2D5A46] bg-[#F4F8F5] ring-1 ring-[#2D5A46]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-xs font-semibold text-gray-800">{cls.name}</span>
                    <span className="text-[11px] font-bold text-[#2D5A46]">
                      {cls.cost === 0 ? 'Included' : `+$${cls.cost}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Activities Checklist */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Preferred Activities (Select All That Apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {bookingOptions.activitiesList.map((act) => {
                const isChecked = formData.selectedActivities.includes(act);
                return (
                  <button
                    key={act}
                    type="button"
                    onClick={() => handleActivityToggle(act)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isChecked
                        ? 'bg-[#2D5A46] text-white border-[#2D5A46]'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {isChecked ? '✓ ' : '+ '}
                    {act}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Lead Traveler Contact Info */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
          <span className="w-6 h-6 rounded-full bg-[#2D5A46] text-white flex items-center justify-center text-xs font-bold">
            4
          </span>
          <h4 className="font-serif font-bold text-gray-900 text-lg">
            Lead Traveler Contact Information
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Eleanor Bennett"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:bg-white transition-colors ${
                errors.fullName
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-gray-200 focus:border-[#2D5A46]'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="eleanor@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:bg-white transition-colors ${
                errors.email
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-gray-200 focus:border-[#2D5A46]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+1 (555) 019-2834"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:bg-white transition-colors ${
                errors.phone
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-gray-200 focus:border-[#2D5A46]'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Special Requests / Notes */}
        <div className="mt-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
            Special Requests & Dietary Requirements
          </label>
          <textarea
            name="specialRequests"
            rows="3"
            placeholder="Let us know if you're celebrating a honeymoon, birthday, or require dietary customizations..."
            value={formData.specialRequests}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A46] focus:bg-white transition-colors resize-none"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-[#2D5A46] hover:bg-[#234837] text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#2D5A46]/30 transition-all duration-200 active:scale-99 disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Submit Bespoke Booking Request</span>
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">
          By requesting a booking, you agree to our privacy policy and flexible guarantee terms.
        </p>
      </div>
    </form>
  );
}
