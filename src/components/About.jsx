import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { companyInfo } from '../assets/assets.js';
import SectionHeading from './SectionHeading.jsx';

export default function About({ onContactClick, onBookTrip }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 bg-white overflow-hidden border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Column with Parallax Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              <motion.div style={{ y: imageY }} className="scale-110">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                  alt="RoamStory Travel Founders in Bali"
                  className="w-full h-[520px] object-cover object-center"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Floating Experience Badge with Opposite Parallax */}
            <motion.div
              style={{ y: badgeY }}
              className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs z-10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-gray-900">15+ Years</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Bespoke Craft
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Handcrafting extraordinary memories across 120+ destinations worldwide.
              </p>
            </motion.div>

            {/* Location floating pin tag */}
            <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sanctuary Headquarters, Canggu Bali</span>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#2D5A46]"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#2D5A46]">
                Our Philosophy
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1D20] tracking-tight leading-tight">
              Curating Journeys That Leave a Lasting Imprint
            </h2>

            <p className="mt-6 text-base text-gray-600 leading-relaxed font-light">
              {companyInfo.aboutStory}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Strictly Sustainable & Eco-Conscious</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    We offset 100% of carbon emissions from our guest itineraries and support local heritage artisans.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Insider Access & Private Permissions</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Privileged after-hours entries to world wonders, secret temple ceremonies, and private island permits.
                  </p>
                </div>
              </div>
            </div>

            {/* Olivia James signature quote */}
            <div className="mt-8 p-5 bg-[#F4F8F5] rounded-2xl border border-emerald-100 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                alt="Olivia James"
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600 shrink-0"
              />
              <div>
                <p className="font-script text-xl text-[#2D5A46] font-bold">
                  "To travel is to discover that everyone is wrong about other countries."
                </p>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-700 mt-0.5">
                  Olivia James — Founder & Lead Explorer
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookTrip}
                className="inline-flex items-center gap-2 bg-[#2D5A46] hover:bg-[#234837] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-sm transition-all"
              >
                <span>Plan Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition-colors"
              >
                <span>Talk with an Expert</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
