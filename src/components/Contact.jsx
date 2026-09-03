import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { companyInfo } from '../assets/assets.js';
import SectionHeading from './SectionHeading.jsx';
import { contactService } from '../services/contactService.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Contact() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setWarning('');

    // Honeypot check for bots
    if (formData.honeypot) {
      setIsSuccess(true);
      return;
    }

    const { name, email, phone, subject, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (name.length > 100 || email.length > 255 || message.length > 5000 || phone.length > 30) {
      setError('Input exceeds maximum allowed length.');
      return;
    }

    setIsSubmitting(true);

    const { error: submitError, emailFailed } = await contactService.submitContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim()
    }, user?.id || null);

    setIsSubmitting(false);

    if (submitError && !emailFailed) {
      setError(submitError.message || 'Unable to send your message right now. Please try again.');
      return;
    }

    setIsSuccess(true);
    if (emailFailed) {
      setWarning(submitError.message);
    }
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
      honeypot: '',
    });
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Speak with a Travel Curator"
          subtitle="Whether you have questions about an upcoming journey or wish to design a custom group expedition, our team is at your service."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Cards & Location Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FBFBF9] p-8 rounded-3xl border border-gray-200/80 space-y-6">
              <h4 className="text-xl font-serif font-bold text-gray-900">
                Direct Inquiries & Concierge
              </h4>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Sanctuary Headquarters</span>
                    <span className="text-gray-600 leading-relaxed block mt-0.5">
                      {companyInfo.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Email Us</span>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-[#2D5A46] font-semibold hover:underline block mt-0.5"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Phone / WhatsApp</span>
                    <span className="text-gray-600 block mt-0.5">{companyInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Operational Hours</span>
                    <span className="text-gray-600 block mt-0.5">{companyInfo.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Image / Visual Feature Card */}
            <div className="relative rounded-3xl overflow-hidden h-56 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
                alt="Bali Concierge Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                  Global Reach
                </span>
                <p className="font-serif font-bold text-lg text-white">
                  Local Experts Across 40+ Countries
                </p>
              </div>
            </div>
          </div>

          {/* Right Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#FBFBF9] p-6 sm:p-10 rounded-3xl border border-gray-200/80">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-gray-900">
                  Message Sent Successfully
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto">
                  Thank you for reaching out. One of our dedicated travel curators will respond within 24 business hours.
                </p>
                {warning && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-xl max-w-md mx-auto">
                    {warning}
                  </div>
                )}
                <button
                  onClick={() => { setIsSuccess(false); setWarning(''); }}
                  className="mt-6 px-6 py-2.5 bg-[#2D5A46] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#234837]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Send Us a Direct Message
                </h4>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                    {error}
                  </div>
                )}

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Liam Walker"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A46]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="liam@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A46]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A46]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A46] cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Bespoke Trip Planning">Bespoke Trip Planning</option>
                      <option value="Private Group Charter">Private Group Charter</option>
                      <option value="Press and Media">Press and Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell us about the destinations or experiences you have in mind..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A46] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#2D5A46] hover:bg-[#234837] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>SENDING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
