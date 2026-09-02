import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, CalendarCheck, ShieldCheck } from 'lucide-react';
import { travelPackages } from '../assets/assets.js';
import SectionHeading from './SectionHeading.jsx';

export default function TravelPackages({ onSelectPackage }) {
  return (
    <section className="py-24 bg-[#FBFBF9] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Curated Styles"
          title="Bespoke Travel Packages"
          subtitle="Choose a travel style tailored to your rhythm—from high-energy cultural expeditions to peaceful luxury island retreats."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {travelPackages.map((pkg, idx) => {
            const isFeatured = idx === 0;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative ${
                  isFeatured
                    ? 'bg-[#1A1D20] text-white shadow-2xl ring-2 ring-[#2D5A46]'
                    : 'bg-white text-gray-900 border border-gray-200/80 shadow-xs hover:shadow-xl'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      isFeatured
                        ? 'bg-[#2D5A46] text-white'
                        : 'bg-emerald-50 text-[#2D5A46] border border-emerald-200'
                    }`}
                  >
                    {pkg.badge}
                  </span>
                  <Sparkles
                    className={`w-4 h-4 ${isFeatured ? 'text-emerald-400' : 'text-gray-400'}`}
                  />
                </div>

                <div>
                  <h3
                    className={`text-2xl font-serif font-bold ${
                      isFeatured ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                      isFeatured ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="my-6 py-4 border-y border-gray-200/20 flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold">
                      ${pkg.pricePerPerson.toLocaleString()}
                    </span>
                    <span
                      className={`text-xs ${isFeatured ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      {pkg.priceNote}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            isFeatured
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-[#E8F0EC] text-[#2D5A46]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={isFeatured ? 'text-gray-200' : 'text-gray-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 ${
                    isFeatured
                      ? 'bg-[#2D5A46] hover:bg-[#234837] text-white shadow-lg shadow-[#2D5A46]/40'
                      : 'bg-gray-900 hover:bg-black text-white'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Choose This Travel Style</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
