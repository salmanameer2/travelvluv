import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  MapPin,
  Luggage,
  Map,
  Globe,
  Sparkles,
  CalendarCheck,
  ChevronDown,
} from 'lucide-react';
import { quickFeatures } from '../assets/assets.js';

export default function Hero({
  onExploreStories,
  onExploreClick,
  onBookTrip,
  onBookClick,
  onQuickFeatureClick,
  onSearchSubmit,
}) {
  const handleExplore = onExploreStories || onExploreClick || (() => {
    const el = document.getElementById('stories') || document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  const handleBook = onBookTrip || onBookClick || (() => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  const handleQuickFeature = (targetSection) => {
    if (onQuickFeatureClick) {
      onQuickFeatureClick(targetSection);
    } else {
      const el = document.getElementById(targetSection);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const iconMap = {
    MapPin: MapPin,
    Luggage: Luggage,
    Map: Map,
    Globe: Globe,
  };

  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette & Gradient Overlay (matching reference image) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2200&q=85"
          alt="Traveler looking at mountain lake"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-subtle"
          loading="eager"
        />
        {/* Editorial gradient: Left dark for text contrast, right slightly transparent showing traveler & lake */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1215]/90 via-[#0C1215]/65 to-transparent sm:w-3/4"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1215]/80 via-transparent to-[#0C1215]/40"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto py-12">
        <div className="max-w-2xl">
          {/* Script Tagline (Adventure is Worthwhile) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="font-script text-2xl sm:text-3xl text-emerald-300 tracking-wide">
              Adventure is Worthwhile
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]"
          >
            Explore. Dream. <br />
            <span className="text-emerald-400 font-serif italic">Discover.</span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="mt-6 text-base sm:text-lg text-gray-200/90 leading-relaxed max-w-xl font-light"
          >
            Inspiring stories, useful travel tips, and breathtaking destinations to fuel your wanderlust and help you travel smarter.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={handleExplore}
              className="inline-flex items-center gap-3 bg-[#2D5A46] hover:bg-[#234837] text-white px-7 py-3.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#2D5A46]/30 hover:translate-x-1 group cursor-pointer"
            >
              <span>EXPLORE STORIES</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleBook}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 px-6 py-3.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:border-white/60 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              <span>PLAN A BESPOKE TRIP</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Quick Feature Bar (Exact match to reference image bottom of hero) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-8 w-full -mb-10 sm:-mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 p-3 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100"
        >
          {quickFeatures.map((feat) => {
            const Icon = iconMap[feat.icon] || Compass;
            return (
              <button
                key={feat.id}
                onClick={() => handleQuickFeature(feat.targetSection)}
                className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F4F8F5] transition-colors text-left group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#E8F0EC] group-hover:bg-[#2D5A46] text-[#2D5A46] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-gray-900 group-hover:text-[#2D5A46] transition-colors">
                    {feat.title}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {feat.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
