import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryItems } from '../assets/assets.js';
import GalleryCard from './GalleryCard.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Gallery({ onBookTrip }) {
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Luxury', 'Tropical', 'Adventure', 'Nature', 'Cultural'];

  const filteredGallery = galleryItems.filter(
    (item) => selectedFilter === 'All' || item.category.toLowerCase() === selectedFilter.toLowerCase()
  );

  const handleNext = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredGallery.findIndex((i) => i.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredGallery.length;
    setActiveLightboxItem(filteredGallery[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredGallery.findIndex((i) => i.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
    setActiveLightboxItem(filteredGallery[prevIndex]);
  };

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Visual Odyssey"
          title="Exotic Travel Gallery"
          subtitle="Glimpse the breathtaking vistas, hidden waters, and unforgettable moments captured by our worldwide expeditions."
        />

        {/* Gallery Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-[#2D5A46] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={(clicked) => setActiveLightboxItem(clicked)}
            />
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* High-res Image */}
              <div className="relative h-[65vh] w-full bg-black flex items-center justify-center">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Lightbox Caption bar */}
              <div className="p-6 bg-gray-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-800">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeLightboxItem.country}</span>
                    <span className="text-gray-500">•</span>
                    <span>{activeLightboxItem.category}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {activeLightboxItem.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveLightboxItem(null);
                    onBookTrip();
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#2D5A46] hover:bg-[#234837] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Inquire for This Destination</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
