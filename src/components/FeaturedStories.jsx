import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen, Share2, Heart, X, Sparkles } from 'lucide-react';
import { featuredStories } from '../assets/assets.js';
import SectionHeading from './SectionHeading.jsx';

export default function FeaturedStories({ onSelectDestinationByName, onBookTrip }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [likedStories, setLikedStories] = useState({});

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedStories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const largeStory = featuredStories[0];
  const gridStories = featuredStories.slice(1);

  return (
    <section id="stories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Curated Journal"
          title="Latest from the Blog"
          subtitle="Explore firsthand guides, secret viewpoints, smart itineraries, and expert travel insights."
          actionButton={
            <a
              href="#destinations"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D5A46] hover:text-[#1F4333] transition-colors group"
            >
              <span>VIEW ALL POSTS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          }
        />

        {/* Editorial Layout (Matching reference image structure: 1 Large Left + 2x2 Grid Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Large Featured Card (Amalfi Coast) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedStory(largeStory)}
            className="lg:col-span-5 group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-900 min-h-[460px] lg:min-h-[580px] flex flex-col justify-end p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Background Image with Zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={largeStory.image}
                alt={largeStory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
            </div>

            {/* Category Tag */}
            <div className="absolute top-6 left-6 z-10">
              <span className="bg-[#2D5A46] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-sm">
                {largeStory.category}
              </span>
            </div>

            {/* Like Bookmark button */}
            <button
              onClick={(e) => toggleLike(largeStory.id, e)}
              className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-colors"
              aria-label="Save Story"
            >
              <Heart
                className={`w-4.5 h-4.5 ${
                  likedStories[largeStory.id] ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
            </button>

            {/* Content Overlaid at Bottom */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors">
                {largeStory.title}
              </h3>
              <p className="mt-2 text-sm text-gray-300 line-clamp-2 leading-relaxed">
                {largeStory.subtitle}
              </p>

              {/* Author & Meta */}
              <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <img
                    src={largeStory.author.avatar}
                    alt={largeStory.author.name}
                    className="w-8 h-8 rounded-full border border-white/40 object-cover"
                  />
                  <div>
                    <span className="font-semibold text-white">By {largeStory.author.name}</span>
                    <span className="mx-2 text-white/40">|</span>
                    <span>{largeStory.date}</span>
                  </div>
                </div>
                <span className="text-emerald-300 font-medium hidden sm:inline">
                  {largeStory.readTime}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right 2x2 Grid Stories */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gridStories.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedStory(story)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#2D5A46] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                      {story.category}
                    </span>
                  </div>
                  <button
                    onClick={(e) => toggleLike(story.id, e)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-xs text-white flex items-center justify-center transition-colors"
                    aria-label="Save Story"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedStories[story.id] ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#2D5A46] transition-colors leading-snug line-clamp-2">
                      {story.title}
                    </h4>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {story.subtitle}
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <img
                        src={story.author.avatar}
                        alt={story.author.name}
                        className="w-6 h-6 rounded-full object-cover border border-gray-200"
                      />
                      <span className="font-medium text-gray-800">By {story.author.name}</span>
                    </div>
                    <span className="text-gray-400">{story.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-80 w-full">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-[#2D5A46] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-2 inline-block">
                  {selectedStory.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {selectedStory.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {/* Author bar */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedStory.author.avatar}
                    alt={selectedStory.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">
                      {selectedStory.author.name}
                    </h5>
                    <p className="text-xs text-gray-500">Travel Author & Photographer</p>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>{selectedStory.date}</p>
                  <p className="text-emerald-700 font-medium">{selectedStory.readTime}</p>
                </div>
              </div>

              {/* Story Text */}
              <div className="prose max-w-none text-gray-700 space-y-4 leading-relaxed">
                <p className="text-lg font-serif italic text-gray-800 border-l-4 border-[#2D5A46] pl-4 py-1">
                  "{selectedStory.subtitle}"
                </p>
                <p>
                  Traveling through this spectacular region reveals an intoxicating mix of pristine natural vistas, ancient traditions, and world-class culinary wonders. Every cobblestone alley and panoramic cliffside tells a story of centuries-old maritime adventures and timeless cultural devotion.
                </p>
                <p>
                  When planning your journey, remember that early morning hours provide both the softest photography light and the quietest moments at iconic landmarks. Pair your itinerary with local seasonal produce, artisan olive oils, and regional sommelier tastings for an authentic sensory immersion.
                </p>
                <div className="p-4 bg-[#F4F8F5] rounded-xl border border-emerald-100 flex items-center justify-between mt-6">
                  <div>
                    <h6 className="font-bold text-[#2D5A46] text-sm">Want to experience this journey in real life?</h6>
                    <p className="text-xs text-gray-600 mt-0.5">Let our bespoke travel concierges arrange your private villa and transport.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedStory(null);
                      onBookTrip();
                    }}
                    className="shrink-0 ml-4 bg-[#2D5A46] hover:bg-[#234837] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
                  >
                    Book Trip
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
