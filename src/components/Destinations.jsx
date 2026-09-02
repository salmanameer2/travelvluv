import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';
import { destinations, categories } from '../assets/assets.js';
import DestinationCard from './DestinationCard.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Destinations({
  onSelectDestination,
  onBookDestination,
  wishlist = [],
  onToggleWishlist,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="destinations" className="py-24 bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Curated Journeys"
          title="Explore Exotic Destinations"
          subtitle="Discover handpicked sanctuaries, private island retreats, and awe-inspiring heritage landscapes across the globe."
        />

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#2D5A46] text-white shadow-sm'
                      : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#2D5A46] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#2D5A46] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <AnimatePresence mode="popLayout">
          {filteredDestinations.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onSelect={onSelectDestination}
                  onBook={onBookDestination}
                  isWishlisted={wishlist.map(Number).includes(Number(destination.id))}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-12 text-center border border-gray-100 max-w-lg mx-auto"
            >
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-serif font-bold text-gray-900">
                No Destinations Found
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                We couldn't find any destinations matching "{searchQuery}" in {selectedCategory}. Try resetting filters to explore all locations.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 inline-flex items-center gap-2 bg-[#2D5A46] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#234837] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
