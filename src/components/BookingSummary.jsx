import React from 'react';
import { ShieldCheck, Sparkles, Check, MapPin, Calendar, Users, Award, Tag } from 'lucide-react';

export default function BookingSummary({
  formData,
  destinationObj,
  calculatedTotal,
  selectedAccommodation,
  selectedClass,
}) {
  return (
    <div className="bg-[#1A1D20] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-800 sticky top-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
            Bespoke Quote
          </span>
          <h3 className="text-2xl font-serif font-bold text-white">Booking Summary</h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#2D5A46] text-white flex items-center justify-center font-bold">
          ✈
        </div>
      </div>

      {/* Destination Preview Card */}
      {destinationObj ? (
        <div className="my-6 p-3 bg-gray-900/90 rounded-2xl border border-gray-800 flex items-center gap-3">
          <img
            src={destinationObj.image}
            alt={destinationObj.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <MapPin className="w-3 h-3" />
              <span>{destinationObj.country}</span>
            </div>
            <h4 className="font-serif font-bold text-white text-base">
              {destinationObj.name}
            </h4>
            <span className="text-xs text-gray-400">{destinationObj.duration} Experience</span>
          </div>
        </div>
      ) : (
        <div className="my-6 p-4 bg-gray-900/60 rounded-2xl border border-dashed border-gray-700 text-center text-xs text-gray-400">
          Select a destination from the form to view real-time itinerary pricing.
        </div>
      )}

      {/* Breakdown Checklist */}
      <div className="space-y-3 text-xs sm:text-sm py-2">
        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-1.5 text-gray-400">
            <Users className="w-4 h-4 text-emerald-400" />
            Travelers
          </span>
          <span className="font-semibold text-white">
            {formData.adults} {formData.adults === 1 ? 'Adult' : 'Adults'}
            {formData.children > 0 ? `, ${formData.children} Children` : ''}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Travel Dates
          </span>
          <span className="font-semibold text-white text-right truncate max-w-[180px]">
            {formData.departureDate ? formData.departureDate : 'Select date'} —{' '}
            {formData.returnDate ? formData.returnDate : 'Flexible'}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-1.5 text-gray-400">
            <Tag className="w-4 h-4 text-emerald-400" />
            Accommodation
          </span>
          <span className="font-semibold text-white text-right truncate max-w-[160px]">
            {selectedAccommodation ? selectedAccommodation.name : 'Boutique Standard'}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-1.5 text-gray-400">
            <Award className="w-4 h-4 text-emerald-400" />
            Travel Class
          </span>
          <span className="font-semibold text-white text-right truncate max-w-[160px]">
            {selectedClass ? selectedClass.name : 'Standard Private'}
          </span>
        </div>

        {formData.selectedActivities.length > 0 && (
          <div className="pt-2 border-t border-gray-800">
            <span className="text-gray-400 block mb-1.5">Selected VIP Inclusions:</span>
            <div className="flex flex-wrap gap-1.5">
              {formData.selectedActivities.map((act, i) => (
                <span
                  key={i}
                  className="bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                >
                  + {act}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing Calculation Section */}
      <div className="my-6 pt-5 border-t border-gray-800">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block">
              Estimated Total
            </span>
            <span className="text-[11px] text-gray-500">Taxes, permits & concierge included</span>
          </div>
          <div className="text-right">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
              ${calculatedTotal.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 block">USD Total</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="p-4 bg-gray-900/90 rounded-2xl border border-gray-800 space-y-2 text-xs text-gray-300">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Complimentary VIP Consultation</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          No charge until your personalized itinerary is finalized and approved by you.
        </p>
      </div>
    </div>
  );
}
