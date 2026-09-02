import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#F7F7F5] rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content with Paper Airplane Icon (Matching reference image design) */}
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[#2D5A46] text-white flex items-center justify-center shrink-0 shadow-md">
                <Send className="w-7 h-7 -translate-y-0.5 translate-x-0.5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold uppercase tracking-wider text-gray-900">
                  GET TRAVEL INSPIRATION
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl leading-relaxed font-light">
                  Subscribe to our newsletter and get exclusive travel tips, secret guides & bespoke stories straight to your inbox.
                </p>
              </div>
            </div>

            {/* Right Email Form */}
            <div className="w-full lg:w-auto lg:min-w-[440px]">
              {isSubmitted ? (
                <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-[#2D5A46] shrink-0" />
                  <span>Thank you! You're subscribed to the RoamStory travel dispatches.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#2D5A46] shadow-xs transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#2D5A46] hover:bg-[#234837] text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>SUBSCRIBE</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
