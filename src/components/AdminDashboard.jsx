import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Calendar, CheckCircle2, XCircle, 
  Clock, Search, Filter, ShieldCheck, 
  ChevronLeft, FileText, Check, X, AlertCircle
} from 'lucide-react';
import adminService from '../services/adminService';
import { useAuth } from '../hooks/useAuth';

export default function AdminDashboard({ onBack }) {
  const { profile } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await adminService.getAllBookings();
    if (error) {
      console.error(error);
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (bookingId, status) => {
    if (status === 'rejected' && !rejectionReason.trim()) {
      setError('Please provide a rejection reason.');
      return;
    }
    setError('');
    setActionLoading(true);
    const { error: updateError } = await adminService.updateBookingStatus(bookingId, status, rejectionReason);
    setActionLoading(false);
    
    if (updateError) {
      setError(updateError);
    } else {
      setSelectedBooking(null);
      setRejectionReason('');
      fetchBookings();
    }
  };

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      rejected: bookings.filter(b => b.status === 'rejected').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = 
        b.confirmation_number?.toLowerCase().includes(search.toLowerCase()) || 
        b.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        b.destination_name?.toLowerCase().includes(search.toLowerCase()) ||
        b.email?.toLowerCase().includes(search.toLowerCase());
      
      const matchFilter = filter === 'all' || b.status === filter;
      return matchSearch && matchFilter;
    });
  }, [bookings, search, filter]);

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ShieldCheck className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600 mt-2">You do not have administrative privileges.</p>
          <button onClick={onBack} className="mt-6 px-6 py-2 bg-[#2D5A46] text-white rounded-xl text-sm font-bold tracking-wider uppercase">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBF9] pb-24">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#2D5A46]" />
                Admin Command Center
              </h1>
              <p className="text-xs text-gray-500">Secure TravelVLV Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E8F0EC] text-[#2D5A46] rounded-full flex items-center justify-center font-bold">
              {profile?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: 'Total Bookings', value: stats.total, icon: Calendar, color: 'text-gray-900' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-600' },
            { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, color: 'text-emerald-600' },
            { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-rose-600' },
            { label: 'Cancelled', value: stats.cancelled, icon: AlertCircle, color: 'text-gray-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</span>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-3xl font-serif font-bold text-gray-900 mt-auto">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {['all', 'pending', 'confirmed', 'rejected', 'cancelled'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  filter === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search ref, name, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A46]"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2D5A46] rounded-full animate-spin mb-4"></div>
              <p>Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-16 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">No bookings found</h3>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-4 pl-6">Reference</th>
                    <th className="p-4">Traveler</th>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Dates</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 pl-6">
                        <span className="font-mono text-xs font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                          {b.confirmation_number || b.id.substring(0,8)}
                        </span>
                        <div className="text-[10px] text-gray-400 mt-1">
                          {new Date(b.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-bold text-gray-900">{b.full_name}</p>
                        <p className="text-xs text-gray-500">{b.email}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-bold text-gray-900">{b.destination_name}</p>
                        <p className="text-xs text-gray-500">{b.travel_package}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-900">{b.travel_date}</p>
                        <p className="text-xs text-gray-500">{b.adults} Adults {b.children > 0 && `, ${b.children} Children`}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          b.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          b.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button 
                          onClick={() => setSelectedBooking(b)}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Booking Review Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl my-auto relative shadow-2xl">
            <button 
              onClick={() => {
                setSelectedBooking(null);
                setRejectionReason('');
                setError('');
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Review Booking</h2>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Reference</span>
                  <span className="font-mono font-medium text-gray-900">{selectedBooking.confirmation_number}</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Status</span>
                  <span className={`font-bold uppercase ${
                    selectedBooking.status === 'confirmed' ? 'text-emerald-600' :
                    selectedBooking.status === 'pending' ? 'text-amber-600' :
                    selectedBooking.status === 'rejected' ? 'text-rose-600' : 'text-gray-600'
                  }`}>{selectedBooking.status}</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Traveler</span>
                  <p className="font-medium text-gray-900">{selectedBooking.full_name}</p>
                  <p className="text-gray-500">{selectedBooking.email}</p>
                  <p className="text-gray-500">{selectedBooking.phone}</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Trip Details</span>
                  <p className="font-medium text-gray-900">{selectedBooking.destination_name}</p>
                  <p className="text-gray-500">{selectedBooking.travel_date}</p>
                  <p className="text-gray-500">{selectedBooking.travel_package} • {selectedBooking.travel_class}</p>
                </div>
              </div>

              {selectedBooking.special_requests && (
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Special Requests</span>
                  <div className="p-4 bg-amber-50 text-amber-900 text-sm rounded-xl italic">
                    "{selectedBooking.special_requests}"
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-3 bg-rose-50 text-rose-700 text-sm rounded-xl border border-rose-200">
                  {error}
                </div>
              )}

              {selectedBooking.status === 'pending' && (
                <div className="space-y-4">
                  <textarea
                    placeholder="Optional message or required reason for rejection..."
                    value={rejectionReason}
                    onChange={e => setRejectionReason(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 bg-white"
                    rows="3"
                  />
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleStatusUpdate(selectedBooking.id, 'rejected')}
                      disabled={actionLoading}
                      className="flex-1 py-3 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      {actionLoading ? 'Processing...' : 'Reject Booking'}
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedBooking.id, 'confirmed')}
                      disabled={actionLoading}
                      className="flex-1 py-3 bg-[#2D5A46] text-white hover:bg-[#234837] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      {actionLoading ? 'Processing...' : 'Approve Booking'}
                    </button>
                  </div>
                </div>
              )}

              {selectedBooking.status !== 'pending' && (
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">
                    This booking was <strong>{selectedBooking.status}</strong> on {selectedBooking.approved_at ? new Date(selectedBooking.approved_at).toLocaleDateString() : 'Unknown Date'}
                  </p>
                  {selectedBooking.rejection_reason && (
                    <p className="text-sm text-rose-700 bg-rose-50 p-3 rounded-lg inline-block mt-2">
                      Reason: {selectedBooking.rejection_reason}
                    </p>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
