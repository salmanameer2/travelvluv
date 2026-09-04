import AdminDashboard from "./components/AdminDashboard.jsx";
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Statistics from './components/Statistics.jsx';
import FeaturedStories from './components/FeaturedStories.jsx';
import PopularDestinationsStrip from './components/PopularDestinationsStrip.jsx';
import Destinations from './components/Destinations.jsx';
import DestinationDetailsModal from './components/DestinationDetailsModal.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import Gallery from './components/Gallery.jsx';
import About from './components/About.jsx';
import TravelPackages from './components/TravelPackages.jsx';
import Reviews from './components/Reviews.jsx';
import Booking from './components/Booking.jsx';
import Contact from './components/Contact.jsx';
import Newsletter from './components/Newsletter.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';
import SearchModal from './components/SearchModal.jsx';
import WishlistDrawer from './components/WishlistDrawer.jsx';
import { destinations } from './assets/assets.js';
import { useAuth } from './hooks/useAuth.js';
import { bookingService } from './services/bookingService.js';
import { favoriteService } from './services/favoriteService.js';

export default function App() {
  const { user, profile, signOut, updateUserProfile } = useAuth();
  
  const [currentView, setCurrentView] = useState(window.location.pathname === '/admin' ? 'admin' : 'home');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(window.location.pathname === '/admin' ? 'admin' : 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentView(path === '/admin' ? 'admin' : 'home');
  };

  // Modal & Drawer State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('bookings');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [preBookingDestination, setPreBookingDestination] = useState(null);

  // Bookings State
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        const { data } = await bookingService.getMyBookings();
        if (data) setBookings(data);
      } else {
        setBookings([]);
      }
    };
    fetchBookings();
  }, [user]);

  // Wishlist / Favorites State
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const { data } = await favoriteService.getMyFavorites();
        if (data) setWishlist(data);
      } else {
        setWishlist([]);
      }
    };
    fetchFavorites();
  }, [user]);

  // Cancel an existing booking
  const handleCancelBooking = async (bookingId) => {
    const { error } = await bookingService.cancelBooking(bookingId);
    if (!error) {
      setBookings((prev) =>
        prev.map((b) =>
          (b.id === bookingId || b.confirmationNumber === bookingId)
            ? { ...b, status: 'Cancelled' }
            : b
        )
      );
    }
  };

  // Open Auth/Profile modal with specific tab
  const handleOpenAuth = (tab = 'bookings') => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };

  // Wishlist Toggle Handler
  const handleToggleWishlist = async (destId) => {
    if (!user) {
      handleOpenAuth('login');
      return;
    }

    const idToToggle = Number(destId);
    const isFavorited = wishlist.includes(idToToggle);
    
    // Optimistic UI update
    setWishlist((prev) =>
      isFavorited ? prev.filter((id) => id !== idToToggle) : [...prev, idToToggle]
    );

    const { error } = isFavorited 
      ? await favoriteService.removeFavorite(idToToggle)
      : await favoriteService.addFavorite(idToToggle);

    // Rollback on error
    if (error) {
      setWishlist((prev) =>
        isFavorited ? [...prev, idToToggle] : prev.filter((id) => id !== idToToggle)
      );
      alert('Unable to update favorites at this time.');
    }
  };

  // Select destination by name (from popular strip or footer)
  const handleSelectDestinationByName = (name) => {
    const found = destinations.find(
      (d) => d.name.toLowerCase().includes(name.toLowerCase())
    );
    if (found) {
      setSelectedDestination(found);
    } else {
      const el = document.getElementById('destinations');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Direct Booking Handler: Pre-selects item and smoothly scrolls to booking form
  const handleBookDestination = (destination) => {
    setPreBookingDestination(destination);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Package Selection Handler
  const handleSelectPackage = (pkg) => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  if (currentView === 'admin') {
    return (
      <AdminDashboard onBack={() => navigateTo('/')} />
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1A1D20] font-sans selection:bg-[#2D5A46] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar
        onOpenAuth={() => handleOpenAuth('bookings')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
        bookingsCount={bookings.length}
        user={profile}
        onLogout={signOut}
        onBookNowClick={() => {
          const el = document.getElementById('booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Hero Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('destinations');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onBookClick={() => {
          const el = document.getElementById('booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSearchSubmit={(searchTerm) => {
          setIsSearchOpen(true);
        }}
      />

      {/* 3. Statistics Strip */}
      <Statistics />

      {/* 4. Featured Stories / Blog Magazine Section */}
      <FeaturedStories
        onExploreStory={(story) => {
          // Handled inside FeaturedStories reader modal
        }}
      />

      {/* 5. Popular Destinations Horizontal Strip */}
      <PopularDestinationsStrip
        onSelectDestinationByName={handleSelectDestinationByName}
      />

      {/* 6. All Destinations Discovery & Filter Grid */}
      <Destinations
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onBookDestination={handleBookDestination}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 7. Why Choose Us Feature Grid */}
      <WhyChooseUs />

      {/* 8. Exotic Travel Visual Gallery with Lightbox */}
      <Gallery
        onBookTrip={() => {
          const el = document.getElementById('booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 9. About Founder & Story with Parallax Effect */}
      <About
        onContactClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onBookTrip={() => {
          const el = document.getElementById('booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 10. Bespoke Travel Packages */}
      <TravelPackages onSelectPackage={handleSelectPackage} />

      {/* 11. Customer Reviews with Swiper.js */}
      <Reviews />

      {/* 12. Complete Booking Section with Interactive Live Summary & Math */}
      <Booking
        selectedPreDestination={preBookingDestination}
        onResetPreDestination={() => setPreBookingDestination(null)}
        onAddBooking={handleAddBooking}
        onOpenProfile={(tab) => handleOpenAuth(tab || 'bookings')}
        onRequireAuth={() => handleOpenAuth('login')}
      />

      {/* 13. Contact & Concierge Inquiries */}
      <Contact />

      {/* 14. Newsletter Signup */}
      <Newsletter />

      {/* 15. Luxury Footer */}
      <Footer onSelectDestinationByName={handleSelectDestinationByName} />

      {/* MODALS & DRAWERS */}
      {/* Destination Details Modal */}
      {selectedDestination && (
        <DestinationDetailsModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onBook={handleBookDestination}
          isWishlisted={wishlist.map(Number).includes(Number(selectedDestination.id))}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Global Search Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onBookTrip={() => {
          setIsSearchOpen(false);
          const el = document.getElementById('booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onBookDestination={handleBookDestination}
      />

      {/* User Profile, My Bookings & Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={profile}
        onLogout={signOut}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onUpdateUser={updateUserProfile}
        wishlist={wishlist}
        initialTab={authInitialTab}
        onNavigateToBooking={(dest) => {
          if (dest) {
            handleBookDestination(dest);
          } else {
            const el = document.getElementById('booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}
