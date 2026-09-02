import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Clock,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  CalendarCheck,
  Heart,
  Share2,
  ShieldCheck,
} from 'lucide-react';

export default function DestinationDetailsModal({
  destination,
  onClose,
  onBook,
  isWishlisted,
  onToggleWishlist,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!destination) return null;

  const allImages = destination.gallery && destination.gallery.length > 0
    ? [destination.image, ...destination.gallery]
    : [destination.image];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-gray-100 my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors shadow-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Showcase */}
        <div className="relative h-72 sm:h-96 w-full bg-gray-900">
          <img
            src={allImages[activeImageIndex] || destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Top badges */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="bg-[#2D5A46] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
              {destination.category}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
              {destination.region}
            </span>
          </div>

          {/* Quick info over image */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{destination.country}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                {destination.name}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-2 border border-white/15">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-white text-sm">{destination.rating}</span>
                <span className="text-gray-300 text-xs">({destination.reviews} reviews)</span>
              </div>
              <button
                onClick={() => onToggleWishlist(destination.id)}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail selector */}
        {allImages.length > 1 && (
          <div className="bg-gray-900 px-6 py-3 flex items-center gap-3 overflow-x-auto">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-emerald-400 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Main Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F4F8F5] rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#2D5A46]" />
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  Duration
                </span>
                <span className="text-sm font-bold text-gray-900">{destination.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#2D5A46]" />
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  Best Season
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {destination.bestTimeToVisit || 'Year-round'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#2D5A46]" />
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  Group Type
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {destination.groupSize || 'Private / Small Group'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2D5A46]" />
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  Guarantee
                </span>
                <span className="text-sm font-bold text-gray-900">100% Bespoke</span>
              </div>
            </div>
          </div>

          {/* Narrative Story / Overview */}
          <div>
            <h4 className="text-xl font-serif font-bold text-gray-900 mb-3">
              About This Journey
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {destination.longDescription || destination.description}
            </p>
          </div>

          {/* Highlights & Included Experiences (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Highlights */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h5 className="font-serif font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-[#2D5A46]" />
                <span>Bespoke Highlights</span>
              </h5>
              <ul className="space-y-3">
                {destination.highlights ? (
                  destination.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A46] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-500">Custom luxury highlights included upon booking.</li>
                )}
              </ul>
            </div>

            {/* Included Experiences */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h5 className="font-serif font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-[#2D5A46]" />
                <span>Included with Every Trip</span>
              </h5>
              <ul className="space-y-3">
                {destination.includedExperiences ? (
                  destination.includedExperiences.map((exp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A46] shrink-0 mt-2"></span>
                      <span>{exp}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-500">5-Star accommodation, VIP transfers, and concierge.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Fixed Action Sticky Bar */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block">
                Estimated Package Price
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1D20]">
                  {destination.priceDisplay}
                </span>
                <span className="text-xs text-gray-500 font-normal">/ person (inclusive of all perks)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleShare}
                className="p-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center shrink-0"
                title="Share link"
              >
                <Share2 className="w-4.5 h-4.5" />
                {copied && <span className="ml-1 text-xs text-emerald-700 font-bold">Copied!</span>}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onBook(destination);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#2D5A46] hover:bg-[#234837] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-98"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Request Booking Now</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
