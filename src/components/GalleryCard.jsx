import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Eye, ArrowUpRight } from 'lucide-react';

export default function GalleryCard({ item, onClick, onExplore }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => onClick(item)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 h-72 sm:h-80"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

      {/* Top Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/20">
          {item.category}
        </span>
      </div>

      {/* Top Right Zoom Icon */}
      <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Eye className="w-4 h-4" />
      </div>

      {/* Bottom Info Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{item.country}</span>
        </div>
        <h4 className="text-lg font-serif font-bold text-white group-hover:text-emerald-200 transition-colors leading-snug">
          {item.title}
        </h4>
        <p className="text-xs text-gray-300 mt-1 line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">
          {item.description}
        </p>

        {/* View Trigger */}
        <div className="mt-3 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span>Explore Gallery</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}
