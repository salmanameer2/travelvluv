import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Heart, ArrowUpRight, CalendarCheck } from 'lucide-react';

export default function DestinationCard({
  destination,
  onSelect,
  onBook,
  isWishlisted,
  onToggleWishlist,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Destination Image Container */}
      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onSelect(destination)}>
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/90 backdrop-blur-md text-[#2D5A46] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
            {destination.category}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(destination.id);
          }}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 active:scale-90"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4.5 h-4.5 ${
              isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white'
            }`}
          />
        </button>

        {/* Duration Badge Bottom Left */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-xs text-white font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>{destination.duration}</span>
        </div>

        {/* Location Region Bottom Right */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 text-xs text-white/90 font-medium">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>{destination.country}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-gray-900">{destination.rating}</span>
              <span className="text-xs text-gray-400">({destination.reviews} reviews)</span>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {destination.region}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(destination)}
            className="text-xl font-serif font-bold text-gray-900 group-hover:text-[#2D5A46] transition-colors cursor-pointer"
          >
            {destination.name}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-serif font-bold text-[#1A1D20]">
                {destination.priceDisplay}
              </span>
              <span className="text-xs text-gray-500 font-normal">/ person</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(destination)}
              className="p-2.5 rounded-lg border border-gray-200 text-gray-700 hover:text-[#2D5A46] hover:border-[#2D5A46] hover:bg-[#F4F8F5] transition-colors"
              title="View Details"
              aria-label="View Details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onBook(destination)}
              className="inline-flex items-center gap-1.5 bg-[#2D5A46] hover:bg-[#234837] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-colors shadow-xs"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
