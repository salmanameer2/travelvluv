import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { destinations, featuredStories, travelPackages } from '../assets/assets.js';

export default function SearchModal({
  isOpen,
  onClose,
  onSelectDestination,
  onBookTrip,
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Triggered outside or toggled
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const matchedDestinations = query.trim()
    ? destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.country.toLowerCase().includes(query.toLowerCase()) ||
          d.category.toLowerCase().includes(query.toLowerCase())
      )
    : destinations.slice(0, 4);

  const matchedStories = query.trim()
    ? featuredStories.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.category.toLowerCase().includes(query.toLowerCase())
      )
    : featuredStories.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative border border-gray-100 overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-gray-200 pb-4">
          <Search className="w-5 h-5 text-[#2D5A46] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search Bali, Amalfi Coast, luxury escapes, packing tips..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-base sm:text-lg text-gray-900 focus:outline-none placeholder-gray-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 mr-2 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-6 pr-1">
          {/* Destinations Category */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
              Destinations ({matchedDestinations.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedDestinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => {
                    onClose();
                    onSelectDestination(dest);
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F5] cursor-pointer border border-gray-100 hover:border-emerald-200 transition-all group"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-[#2D5A46] truncate">
                      {dest.name}
                    </h5>
                    <p className="text-[11px] text-gray-500 truncate">{dest.country} • From {dest.priceDisplay}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#2D5A46] group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Stories Category */}
          {matchedStories.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Stories & Travel Guides ({matchedStories.length})
              </span>
              <div className="space-y-2">
                {matchedStories.map((story) => (
                  <a
                    key={story.id}
                    href="#stories"
                    onClick={() => onClose()}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-[#2D5A46]" />
                      <span className="text-xs font-semibold text-gray-800">{story.title}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {story.category}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Helper */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span>Press ESC to close</span>
          <button
            onClick={() => {
              onClose();
              onBookTrip();
            }}
            className="text-[#2D5A46] font-bold hover:underline"
          >
            Directly Request a Custom Booking →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
