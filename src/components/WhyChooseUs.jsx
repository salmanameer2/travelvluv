import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  ShieldCheck,
  Sparkles,
  Headphones,
  Tag,
  Award,
} from 'lucide-react';
import { whyChooseUsFeatures } from '../assets/assets.js';
import SectionHeading from './SectionHeading.jsx';

export default function WhyChooseUs() {
  const iconMap = {
    Compass: Compass,
    ShieldCheck: ShieldCheck,
    Sparkles: Sparkles,
    Headphones: Headphones,
    Tag: Tag,
    Award: Award,
  };

  return (
    <section className="py-24 bg-[#FBFBF9] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="The RoamStory Difference"
          title="Why Discerning Travelers Choose Us"
          subtitle="We craft personalized luxury journeys with unmatched attention to detail, insider access, and round-the-clock peace of mind."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsFeatures.map((feat, idx) => {
            const Icon = iconMap[feat.icon] || Compass;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white p-8 rounded-2xl border border-gray-100/90 shadow-xs hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E8F0EC] group-hover:bg-[#2D5A46] text-[#2D5A46] group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-[#2D5A46] transition-colors mb-3">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
