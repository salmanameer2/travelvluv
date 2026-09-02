import React from 'react';
import { motion } from 'framer-motion';
import { statistics } from '../assets/assets.js';
import { Globe2, Users, Award, Smile } from 'lucide-react';

export default function Statistics() {
  const statIcons = [Globe2, Users, Award, Smile];

  return (
    <section className="pt-24 pb-12 bg-[#FBFBF9] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statistics.map((item, index) => {
            const Icon = statIcons[index % statIcons.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8F0EC] text-[#2D5A46] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1D20] tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mt-0.5">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
