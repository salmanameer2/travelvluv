import React from 'react';
import { ArrowUp, Instagram, Twitter, Youtube, Facebook, MapPin, Mail, Phone } from 'lucide-react';
import { companyInfo, footerLinks, popularDestinationPills } from '../assets/assets.js';

export default function Footer({ onSelectDestinationByName }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14171A] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-gray-800">
          {/* 1. Brand Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-black tracking-tight text-white">
                ROAM<span className="text-[#34D399]">STORY</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              An editorial travel atelier dedicated to crafting extraordinary bespoke expeditions, authentic cultural encounters, and luxury sanctuary retreats worldwide.
            </p>

            <div className="text-xs text-gray-400 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{companyInfo.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2D5A46] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2D5A46] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2D5A46] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2D5A46] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Quick Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Discover RoamStory
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              {(footerLinks.quickLinks || footerLinks.explore || []).map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Popular Destinations (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Featured Havens
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              {(popularDestinationPills || []).map((dest) => (
                <li key={dest.id}>
                  <button
                    onClick={() => onSelectDestinationByName && onSelectDestinationByName(dest.name)}
                    className="text-left hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer"
                  >
                    {dest.name}, {dest.region}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Trust & Security (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Support & Ethics
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              {(footerLinks.support || footerLinks.about || []).map((sup, idx) => (
                <li key={idx}>
                  <a
                    href={sup.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {sup.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 RoamStory Luxury Travel Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
