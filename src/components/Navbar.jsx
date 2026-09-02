import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Search,
  Heart,
  User,
  Compass,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Share2,
  CalendarCheck,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { companyInfo, navigationLinks, socialLinks } from '../assets/assets.js';

export default function Navbar({
  onOpenAuth,
  onOpenSearch,
  onOpenWishlist,
  onOpenBooking,
  wishlistCount = 0,
  bookingsCount = 0,
  user = null,
  onLogout,
  currentView = 'home',
  onNavigate,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-4 px-4 sm:px-6 pointer-events-none">
        {/* Main Navbar */}
        <nav
          className={`pointer-events-auto max-w-7xl mx-auto rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-white shadow-lg py-2.5 sm:py-3'
              : 'bg-white shadow-md py-3 sm:py-4'
          }`}
        >
          <div className="px-5 sm:px-8 flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-full border-[1.5px] border-gray-900 flex items-center justify-center bg-transparent group-hover:bg-gray-900 transition-colors duration-300">
                <span className="font-serif font-semibold text-base tracking-tight text-gray-900 group-hover:text-white transition-colors duration-300">
                  TV
                </span>
              </div>
              <span className="font-sans font-bold text-sm sm:text-base text-gray-900 tracking-widest uppercase group-hover:text-gray-600 transition-colors">
                {companyInfo.name}
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-[13px] font-medium text-gray-800 hover:text-black transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Action Icons & CTA Buttons */}
            <div className="flex items-center gap-3 xl:gap-5">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                className="p-1.5 sm:p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                title="Search destinations & stories (Ctrl+K)"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="p-1.5 sm:p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-100 transition-colors relative"
                title="View saved destinations"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* User Account / Profile & Bookings Button */}
              {user ? (
                <div className="relative group hidden sm:block">
                  <button
                    onClick={onOpenAuth}
                    className="flex items-center gap-2 py-1 px-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-xs font-semibold text-gray-800 border border-gray-200 cursor-pointer"
                    title="View Profile & My Bookings"
                  >
                    <div className="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center text-[10px] font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="max-w-[75px] truncate hidden md:inline-block">{user.name || 'Account'}</span>
                    {bookingsCount > 0 && (
                      <span className="bg-gray-900 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {bookingsCount}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="hidden sm:flex items-center gap-1 text-[13px] font-medium text-gray-700 hover:text-black px-2 py-1 transition-colors cursor-pointer"
                >
                  <span>Log In</span>
                </button>
              )}

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full border-[1.5px] border-gray-900 flex items-center justify-center bg-transparent">
                      <span className="font-serif font-semibold text-sm tracking-tight text-gray-900">
                        TV
                      </span>
                    </div>
                    <span className="font-sans font-bold text-sm text-gray-900 uppercase tracking-widest">
                      {companyInfo.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User status in mobile drawer */}
                <div className="my-4 p-3 bg-gray-50 rounded-xl space-y-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenAuth();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <CalendarCheck className="w-3.5 h-3.5" />
                          <span>My Bookings & Profile</span>
                        </span>
                        <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                          {bookingsCount}
                        </span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-[13px] font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Log In / View My Bookings</span>
                    </button>
                  )}
                </div>

                {/* Navigation links */}
                <div className="flex flex-col gap-1 mt-2">
                  {navigationLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      className="flex items-center justify-between py-3 px-2 text-[14px] font-medium text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                  <span>{companyInfo.location}</span>
                  <div className="flex items-center gap-2">
                    <a href="https://instagram.com" className="text-gray-400 hover:text-gray-600">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://facebook.com" className="text-gray-400 hover:text-gray-600">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
