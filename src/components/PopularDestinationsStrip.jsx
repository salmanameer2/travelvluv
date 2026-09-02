import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, Mountain, Waves, TreePine, Flower2, MapPin } from 'lucide-react';
import { popularDestinationPills } from '../assets/assets.js';

export default function PopularDestinationsStrip({ onSelectDestinationByName }) {
  const iconMap = {
    Flower2: Flower2,
    Compass: Compass,
    Mountain: Mountain,
    TreePine: TreePine,
    Waves: Waves,
  };

  return (
    <section className="bg-white border-y border-gray-100 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D5A46]">
            <Sparkles className="w-4 h-4" />
            <span>Trending Wanderlust Escapes</span>
          </div>
          <span className="text-xs text-gray-400 hidden sm:inline">
            Click any destination to explore curated experiences
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {popularDestinationPills.map((pill, idx) => {
            const Icon = iconMap[pill.icon] || MapPin;
            return (
              <motion.button
                key={pill.id || idx}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectDestinationByName && onSelectDestinationByName(pill.name)}
                className="group relative flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#FBFBF9] hover:bg-[#E8F0EC] border border-gray-200/70 hover:border-[#2D5A46]/30 transition-all text-left cursor-pointer overflow-hidden shadow-xs"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 relative">
                  <img
                    src={pill.image}
                    alt={pill.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs sm:text-sm text-gray-900 tracking-wide truncate">
                      {pill.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate font-light">
                    {pill.tag || pill.region}
                  </p>
                </div>

                <div className="w-6 h-6 rounded-full bg-white group-hover:bg-[#2D5A46] text-gray-400 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
