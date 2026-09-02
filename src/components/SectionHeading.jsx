import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  actionButton = null,
  light = false,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14 ${
        centered ? 'text-center md:items-center' : ''
      } ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}
      >
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#2D5A46]"></span>
            <span
              className={`text-xs font-bold tracking-widest uppercase ${
                light ? 'text-emerald-300' : 'text-[#2D5A46]'
              }`}
            >
              {eyebrow}
            </span>
          </div>
        )}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight ${
            light ? 'text-white' : 'text-[#1A1D20]'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-3 text-base sm:text-lg leading-relaxed ${
              light ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {subtitle}
          </p>
        )}
      </motion.div>

      {actionButton && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="shrink-0"
        >
          {actionButton}
        </motion.div>
      )}
    </div>
  );
}
