import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, CalendarCheck, ArrowRight, MapPin } from 'lucide-react';
import { destinations } from '../assets/assets.js';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds = [],
  onRemoveWishlist,
  onSelectDestination,
  onBookDestination,
}) {
  if (!isOpen) return null;

  const wishlistedItems = destinations.filter((d) => wishlistIds.map(Number).includes(Number(d.id)));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#FBFBF9]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              <h3 className="text-xl font-serif font-bold text-gray-900">
                Saved Sanctuaries
              </h3>
              <span className="text-xs font-bold bg-[#2D5A46] text-white px-2 py-0.5 rounded-full">
                {wishlistedItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-bold text-gray-900">
                  No Saved Destinations
                </h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Explore our destination catalog and click the heart icon on any retreat to save it for later.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-5 py-2.5 bg-[#2D5A46] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#234837]"
                >
                  Explore Destinations
                </button>
              </div>
            ) : (
              wishlistedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#FBFBF9] rounded-2xl border border-gray-200/80 flex gap-3.5 items-center group relative hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-semibold mb-0.5">
                      <MapPin className="w-3 h-3 text-[#2D5A46]" />
                      <span>{item.country}</span>
                    </div>
                    <h5
                      onClick={() => {
                        onClose();
                        onSelectDestination(item);
                      }}
                      className="font-serif font-bold text-gray-900 text-sm truncate hover:text-[#2D5A46] cursor-pointer"
                    >
                      {item.name}
                    </h5>
                    <p className="text-xs font-bold text-[#1A1D20] mt-1">
                      {item.priceDisplay}
                      <span className="text-[10px] font-normal text-gray-500"> / person</span>
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onBookDestination(item);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#2D5A46] hover:underline"
                      >
                        <CalendarCheck className="w-3 h-3" />
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveWishlist(item.id)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Action Footer */}
          {wishlistedItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-[#FBFBF9]">
              <button
                onClick={() => {
                  onClose();
                  onBookDestination(wishlistedItems[0]);
                }}
                className="w-full py-3.5 bg-[#2D5A46] hover:bg-[#234837] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>Plan Group Trip with Saved Places</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
