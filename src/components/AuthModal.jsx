import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Compass,
  CreditCard,
  Building,
  Plane,
  AlertCircle,
  Copy,
  Check,
  Search,
  Filter,
  FileText,
  Trash2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  Heart,
  Settings,
  Luggage,
} from 'lucide-react';
import BookingVoucherModal from './BookingVoucherModal.jsx';
import { destinations } from '../assets/assets.js';
import { useAuth } from '../hooks/useAuth.js';

export default function AuthModal({
  isOpen,
  onClose,
  user,
  onLogout,
  bookings = [],
  onCancelBooking,
  onUpdateUser,
  wishlist = [],
  onNavigateToBooking,
  initialTab = 'bookings',
}) {
  const { signUp, signIn, signInWithGoogle, resetPassword, isConfigured } = useAuth();
  
  const [activeTab, setActiveTab] = useState(initialTab || 'bookings');
  const [bookingFilter, setBookingFilter] = useState('all'); // 'all', 'confirmed', 'upcoming', 'completed', 'cancelled'
  const [bookingSearch, setBookingSearch] = useState('');
  const [selectedVoucherBooking, setSelectedVoucherBooking] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [cancelConfirmId, setCancelConfirmId] = useState(null);

  // Auth Form State (when logged out)
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    nationality: user?.nationality || '',
    homeAirport: user?.homeAirport || '',
    dietary: user?.dietary || '',
  });
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        nationality: user.nationality || '',
        homeAirport: user.homeAirport || '',
        dietary: user.dietary || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Filtered Bookings Logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        bookingSearch === '' ||
        (b.destination && b.destination.toLowerCase().includes(bookingSearch.toLowerCase())) ||
        (b.country && b.country.toLowerCase().includes(bookingSearch.toLowerCase())) ||
        (b.confirmationNumber && b.confirmationNumber.toLowerCase().includes(bookingSearch.toLowerCase()));

      if (!matchesSearch) return false;

      if (bookingFilter === 'all') return true;
      if (bookingFilter === 'confirmed') return b.status === 'Confirmed';
      if (bookingFilter === 'upcoming') return b.status === 'Upcoming' || b.status === 'Confirmed';
      if (bookingFilter === 'completed') return b.status === 'Completed';
      if (bookingFilter === 'cancelled') return b.status === 'Cancelled' || b.status === 'cancelled';
      return true;
    });
  }, [bookings, bookingFilter, bookingSearch]);

  // Wishlist Destinations Objects
  const wishlistDestinations = useMemo(() => {
    return destinations.filter((d) => wishlist.includes(String(d.id)) || wishlist.includes(Number(d.id)));
  }, [wishlist]);

  const upcomingCount = bookings.filter(
    (b) => b.status === 'Confirmed' || b.status === 'Upcoming'
  ).length;

  if (!isOpen) return null;

  const handleCopyId = (id) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleProfileChange = (e) => {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (onUpdateUser) {
      await onUpdateUser({
        full_name: profileForm.name,
        phone: profileForm.phone,
        nationality: profileForm.nationality,
        home_airport: profileForm.homeAirport,
        dietary_preferences: profileForm.dietary,
      });
    }
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  const handleAuthChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');
    const { error } = await signInWithGoogle();
    setIsLoading(false);
    if (error) {
      setError(error);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (mode === 'forgot') {
      setIsLoading(true);
      const { error } = await resetPassword(formData.email);
      setIsLoading(false);
      if (error) {
        setError(error);
      } else {
        setSuccessMsg('If an account exists, a password reset link has been sent to your email.');
      }
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup') {
      if (!formData.fullName.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);

    if (mode === 'signup') {
      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
      });
      setIsLoading(false);
      if (error) {
        setError(error);
      } else {
        window.location.href = '/';
      }
    } else {
      const { error } = await signIn({
        email: formData.email,
        password: formData.password,
      });
      setIsLoading(false);
      if (error) {
        setError(error);
      } else {
        window.location.href = '/';
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`bg-white rounded-3xl w-full shadow-2xl relative border border-gray-100 overflow-hidden my-auto ${
            user ? 'max-w-4xl' : 'max-w-md p-6 sm:p-8'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* ================================================================ */}
          {/* 1. AUTHENTICATED USER PROFILE & MY BOOKINGS HUB */}
          {/* ================================================================ */}
          {user ? (
            <div className="flex flex-col">
              {/* Profile Top Banner */}
              <div className="bg-gradient-to-r from-[#1E3A2F] via-[#2D5A46] to-[#1E3A2F] text-white p-6 sm:p-8 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white/20 shadow-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#2D5A46] flex items-center justify-center text-2xl font-bold border-4 border-white/20 shadow-lg">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-400 border-2 border-[#2D5A46] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#2D5A46] stroke-[3]" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                          {user.name}
                        </h2>
                        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          <Award className="w-3 h-3" />
                          {user.membershipTier || 'VIP Member'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-0.5">{user.email}</p>
                      <p className="text-[11px] text-emerald-300/80 mt-1 flex items-center gap-1">
                        <span>Member since {user.joinedDate || '2025'}</span>
                        <span>•</span>
                        <span className="text-white font-medium">
                          {(user.rewardPoints || 0).toLocaleString()} RoamRewards Pts
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Top Right Quick Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onLogout();
                      }}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-white/10"
                    >
                      Log Out
                    </button>
                  </div>
                </div>

                {/* Quick Metric Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-4 border-t border-white/10 text-xs">
                  <div
                    onClick={() => {
                      setActiveTab('bookings');
                      setBookingFilter('all');
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/15 rounded-xl cursor-pointer transition-colors backdrop-blur-xs"
                  >
                    <span className="text-[11px] text-gray-300 block">Total Bookings</span>
                    <span className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                      <Luggage className="w-4 h-4 text-emerald-300" />
                      {bookings.length} Journeys
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('bookings');
                      setBookingFilter('upcoming');
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/15 rounded-xl cursor-pointer transition-colors backdrop-blur-xs"
                  >
                    <span className="text-[11px] text-gray-300 block">Upcoming Trips</span>
                    <span className="text-base font-bold text-emerald-300 mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {upcomingCount} Active
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveTab('wishlist')}
                    className="p-2.5 bg-white/10 hover:bg-white/15 rounded-xl cursor-pointer transition-colors backdrop-blur-xs"
                  >
                    <span className="text-[11px] text-gray-300 block">Saved Wishlist</span>
                    <span className="text-base font-bold text-rose-300 mt-0.5 flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-rose-300 text-rose-300" />
                      {wishlist.length} Havens
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveTab('profile')}
                    className="p-2.5 bg-white/10 hover:bg-white/15 rounded-xl cursor-pointer transition-colors backdrop-blur-xs"
                  >
                    <span className="text-[11px] text-gray-300 block">VIP Status</span>
                    <span className="text-base font-bold text-amber-300 mt-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      Platinum Tier
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-gray-200 px-6 bg-gray-50/80">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`flex items-center gap-2 py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'border-[#2D5A46] text-[#2D5A46]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Luggage className="w-4 h-4" />
                  <span>My Bookings</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === 'bookings'
                        ? 'bg-[#2D5A46] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {bookings.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === 'profile'
                      ? 'border-[#2D5A46] text-[#2D5A46]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Passport & Preferences</span>
                </button>

                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`flex items-center gap-2 py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === 'wishlist'
                      ? 'border-[#2D5A46] text-[#2D5A46]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Saved Wishlist</span>
                  <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full font-bold">
                    {wishlist.length}
                  </span>
                </button>
              </div>

              {/* Tab Content Container */}
              <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
                {/* -------------------------------------------------------- */}
                {/* TAB 1: MY BOOKINGS LIST */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'bookings' && (
                  <div className="space-y-6">
                    {/* Filter & Search Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      {/* Status Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                        {[
                          { id: 'all', label: `All (${bookings.length})` },
                          {
                            id: 'upcoming',
                            label: `Upcoming (${upcomingCount})`,
                          },
                          {
                            id: 'completed',
                            label: `Completed (${
                              bookings.filter((b) => b.status === 'Completed').length
                            })`,
                          },
                          {
                            id: 'cancelled',
                            label: `Cancelled (${
                              bookings.filter((b) => b.status === 'Cancelled').length
                            })`,
                          },
                        ].map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => setBookingFilter(filter.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                              bookingFilter === filter.id
                                ? 'bg-[#2D5A46] text-white shadow-xs'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>

                      {/* Search in Bookings */}
                      <div className="relative min-w-[200px]">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search destination or ID..."
                          value={bookingSearch}
                          onChange={(e) => setBookingSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                        />
                      </div>
                    </div>

                    {/* Bookings List Cards */}
                    {filteredBookings.length > 0 ? (
                      <div className="space-y-4">
                        {filteredBookings.map((b) => (
                          <motion.div
                            key={b.id || b.confirmationNumber}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-[#2D5A46]/40 transition-all shadow-xs hover:shadow-md"
                          >
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                              {/* Destination Thumbnail */}
                              <div className="w-full md:w-32 h-28 md:h-28 rounded-xl overflow-hidden shrink-0 relative bg-gray-100">
                                <img
                                  src={b.image}
                                  alt={b.destination}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                                  {b.country}
                                </span>
                              </div>

                              {/* Middle Itinerary Specs */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-serif font-bold text-gray-900 truncate">
                                      {b.destination}
                                    </h3>
                                    <span
                                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                        b.status === 'Confirmed'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : b.status === 'Upcoming'
                                          ? 'bg-blue-100 text-blue-800'
                                          : b.status === 'Completed'
                                          ? 'bg-gray-100 text-gray-700'
                                          : 'bg-rose-100 text-rose-800'
                                      }`}
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                      {b.status || 'Confirmed'}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                                    <span className="font-sans font-medium text-gray-400">
                                      Ref:
                                    </span>
                                    <span className="font-bold text-gray-900">
                                      {b.confirmationNumber || b.id}
                                    </span>
                                    <button
                                      onClick={() => handleCopyId(b.confirmationNumber || b.id)}
                                      title="Copy Booking ID"
                                      className="p-1 hover:text-[#2D5A46] rounded transition-colors cursor-pointer"
                                    >
                                      {copiedId === (b.confirmationNumber || b.id) ? (
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  </div>
                                </div>

                                {/* Key Dates & Specs Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs text-gray-600 mt-2">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-[#2D5A46]" />
                                    <span>
                                      Depart:{' '}
                                      <strong className="text-gray-800 font-semibold">
                                        {b.departureDate}
                                      </strong>
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-[#2D5A46]" />
                                    <span>
                                      Guests:{' '}
                                      <strong className="text-gray-800 font-semibold">
                                        {b.travelers || `${b.adults || 2} Travelers`}
                                      </strong>
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    <Building className="w-3.5 h-3.5 text-[#2D5A46]" />
                                    <span className="truncate">
                                      Stay:{' '}
                                      <strong className="text-gray-800 font-semibold">
                                        {b.accommodation}
                                      </strong>
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    <Plane className="w-3.5 h-3.5 text-[#2D5A46]" />
                                    <span className="truncate">
                                      Class:{' '}
                                      <strong className="text-gray-800 font-semibold">
                                        {b.travelClass}
                                      </strong>
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5 sm:col-span-2">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                    <span className="truncate text-gray-500">
                                      {b.selectedActivities && b.selectedActivities.length > 0
                                        ? `${b.selectedActivities.length} VIP experiences included`
                                        : 'Standard VIP Inclusions'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Price & Action Buttons */}
                              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 gap-3">
                                <div className="text-left md:text-right">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                                    Total Value
                                  </span>
                                  <span className="text-base sm:text-lg font-bold text-[#2D5A46]">
                                    ${Number(b.total || 0).toLocaleString()} USD
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setSelectedVoucherBooking(b)}
                                    className="px-3 py-2 bg-[#2D5A46] hover:bg-[#234837] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>Voucher</span>
                                  </button>

                                  {b.status !== 'Cancelled' && (
                                    <button
                                      onClick={() => setCancelConfirmId(b.id || b.confirmationNumber)}
                                      className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                                      title="Cancel Booking"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Cancellation Confirmation Bar */}
                            {cancelConfirmId === (b.id || b.confirmationNumber) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 pt-3 border-t border-rose-100 bg-rose-50/70 p-3 rounded-xl flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center gap-2 text-rose-800">
                                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                  <span>Are you sure you want to cancel this reservation?</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setCancelConfirmId(null)}
                                    className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer"
                                  >
                                    Keep Trip
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (onCancelBooking) {
                                        onCancelBooking(b.id || b.confirmationNumber);
                                      }
                                      setCancelConfirmId(null);
                                    }}
                                    className="px-3 py-1 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 cursor-pointer"
                                  >
                                    Confirm Cancel
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      /* Empty State */
                      <div className="text-center py-12 px-4 rounded-3xl bg-gray-50 border border-dashed border-gray-200">
                        <div className="w-14 h-14 rounded-full bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center mx-auto mb-3">
                          <Luggage className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-serif font-bold text-gray-900">
                          {bookingSearch ? 'No matching bookings found' : 'No bookings in this category'}
                        </h4>
                        <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-5">
                          {bookingSearch
                            ? `Try clearing your search terms or view all bookings.`
                            : `Ready to plan your next bespoke world adventure? Customize dates and luxury stays in seconds.`}
                        </p>
                        <button
                          onClick={() => {
                            onClose();
                            if (onNavigateToBooking) {
                              onNavigateToBooking();
                            } else {
                              const el = document.getElementById('booking');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D5A46] hover:bg-[#234837] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                        >
                          <Compass className="w-4 h-4" />
                          <span>Plan a New Journey</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* TAB 2: PASSPORT & PREFERENCES PROFILE EDIT */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    {profileSaveSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Traveler profile and VIP preferences updated successfully!</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Full Legal Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Registered Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Phone Number (VIP SMS Alerts)
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Passport / Nationality
                        </label>
                        <input
                          type="text"
                          name="nationality"
                          value={profileForm.nationality}
                          onChange={handleProfileChange}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Preferred Home Airport
                        </label>
                        <input
                          type="text"
                          name="homeAirport"
                          value={profileForm.homeAirport}
                          onChange={handleProfileChange}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Dietary & Wellness Preferences
                        </label>
                        <input
                          type="text"
                          name="dietary"
                          value={profileForm.dietary}
                          onChange={handleProfileChange}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                        />
                      </div>
                    </div>

                    {/* VIP Membership Perks Details */}
                    <div className="p-4 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 rounded-2xl border border-amber-200/60 text-xs">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Included VIP Concierge Privileges</span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>24/7 Dedicated Senior Concierge Hotline</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Complimentary Mercedes-Maybach VIP Transfers</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Guaranteed 4 PM Late Checkout Privileges</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Welcome Dom Pérignon & Seasonal Caviar Platter</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#2D5A46] hover:bg-[#234837] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Save Profile Changes
                      </button>
                    </div>
                  </form>
                )}

                {/* -------------------------------------------------------- */}
                {/* TAB 3: SAVED WISHLIST */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'wishlist' && (
                  <div className="space-y-4">
                    {wishlistDestinations.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {wishlistDestinations.map((dest) => (
                          <div
                            key={dest.id}
                            className="flex items-center gap-3 p-3 rounded-2xl border border-gray-200 bg-white hover:border-[#2D5A46]/30 transition-all group"
                          >
                            <img
                              src={dest.image}
                              alt={dest.name}
                              className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm text-gray-900 truncate">
                                {dest.name}
                              </h4>
                              <p className="text-xs text-gray-500">{dest.country}</p>
                              <p className="text-xs font-bold text-[#2D5A46] mt-0.5">
                                {dest.priceDisplay}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                onClose();
                                if (onNavigateToBooking) {
                                  onNavigateToBooking(dest);
                                } else {
                                  const el = document.getElementById('booking');
                                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                              className="p-2 rounded-xl bg-[#E8F0EC] hover:bg-[#2D5A46] text-[#2D5A46] hover:text-white transition-colors cursor-pointer"
                              title="Book this destination"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-xs text-gray-500">
                        <Heart className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                        <span>No saved destinations yet. Click the heart icon on any destination to save it here!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ================================================================ */
            /* 2. LOGGED OUT STATE (LOGIN / SIGN UP FORM) */
            /* ================================================================ */
            <div>
              {/* Header branding */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {mode === 'login'
                    ? 'Access your bespoke itineraries and saved journeys.'
                    : 'Join our community of discerning luxury world travelers.'}
                </p>
              </div>

              {/* Mode Switch Tabs */}
              {mode !== 'forgot' && (
                <div className="flex p-1 bg-gray-100 rounded-xl mb-5">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError('');
                    }}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      mode === 'login'
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setError('');
                    }}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      mode === 'signup'
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Error / Success Feedback */}
              {error && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {mode === 'forgot' ? (
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleAuthChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-[#2D5A46] hover:bg-[#234837] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span>Send Reset Link</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setError('');
                        setSuccessMsg('');
                      }}
                      className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer"
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-700 transition-colors mb-3 shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-[1px] bg-gray-200"></div>
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                  Or with email
                </span>
                <div className="flex-1 h-[1px] bg-gray-200"></div>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="e.g. Jane Doe"
                        value={formData.fullName}
                        onChange={handleAuthChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleAuthChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[10px] sm:text-xs text-[#2D5A46] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleAuthChange}
                      className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleAuthChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#2D5A46]"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#2D5A46] hover:bg-[#234837] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>{mode === 'login' ? 'Log In to Account' : 'Create Account'}</span>
                  )}
                </button>
              </form>
              </>
            )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Booking Boarding Voucher Modal */}
      {selectedVoucherBooking && (
        <BookingVoucherModal
          booking={selectedVoucherBooking}
          onClose={() => setSelectedVoucherBooking(null)}
        />
      )}
    </>
  );
}
