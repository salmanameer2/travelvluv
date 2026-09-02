import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative">
      {/* Top Quote Icon & Rating */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-[#2D5A46]/20" />
        </div>

        {/* Review Text */}
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic mb-6 font-serif">
          "{review.review}"
        </p>
      </div>

      {/* Author Details & Visited Destination */}
      <div className="pt-5 border-t border-gray-100">
        <div className="flex items-center gap-3.5 mb-3">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-emerald-100 shrink-0"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
            <p className="text-xs text-gray-500">{review.country}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
          <div className="flex items-center gap-1 text-emerald-800 font-medium">
            <MapPin className="w-3 h-3 text-[#2D5A46]" />
            <span>Visited: {review.destination}</span>
          </div>
          <span className="text-gray-400 text-[11px]">{review.date}</span>
        </div>
      </div>
    </div>
  );
}
