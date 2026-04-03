'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

/* ─── ALL WORK PHOTOS ORGANIZED BY CATEGORY ─── */
const categories = [
  {
    id: 'all',
    label: 'All Work',
  },
  {
    id: 'interior',
    label: 'Interior',
  },
  {
    id: 'fashion',
    label: 'Fashion',
  },
  {
    id: 'food',
    label: 'Food',
  },
  {
    id: 'product',
    label: 'Product',
  },
  {
    id: 'jewellery',
    label: 'Jewellery',
  },
  {
    id: 'spot',
    label: 'Spot',
  },
];

const photos = [
  // Interior Photography
  { id: 'int-1', src: '/work/interior-1.jpg', category: 'interior', title: 'Modern Living Space', label: 'Interior Photography' },
  { id: 'int-2', src: '/work/interior-2.jpg', category: 'interior', title: 'Bedroom Suite', label: 'Interior Photography' },
  { id: 'int-3', src: '/work/interior-3.jpg', category: 'interior', title: 'Contemporary Design', label: 'Interior Photography' },

  // Fashion Photography
  { id: 'fash-1', src: '/work/fashion-1.jpg', category: 'fashion', title: 'Portrait Session', label: 'Fashion Photography' },
  { id: 'fash-2', src: '/work/fashion-2.jpg', category: 'fashion', title: 'Child Portrait', label: 'Fashion Photography' },
  { id: 'fash-3', src: '/work/fashion-3.jpg', category: 'fashion', title: 'Silhouette Fashion', label: 'Fashion Photography' },

  // Food & Beverage Photography
  { id: 'food-1', src: '/work/food-1.jpg', category: 'food', title: 'Strawberry Art', label: 'Food Photography' },
  { id: 'food-2', src: '/work/food-2.jpg', category: 'food', title: 'Gourmet Close-up', label: 'Food Photography' },
  { id: 'food-3', src: '/work/food-3.jpg', category: 'food', title: 'Wine Bottle Wood', label: 'Food Photography' },

  // Product Photography
  { id: 'prod-1', src: '/work/product-1.jpg', category: 'product', title: 'Product Hero Shot', label: 'Product Photography' },
  { id: 'prod-2', src: '/work/product-2.jpg', category: 'product', title: 'Main Shot', label: 'Product Photography' },
  { id: 'prod-3', src: '/work/product-3.jpg', category: 'product', title: 'Front View', label: 'Product Photography' },
  { id: 'prod-4', src: '/work/product-4.jpg', category: 'product', title: 'Detail Shot', label: 'Product Photography' },

  // Jewellery Photography
  { id: 'jew-1', src: '/work/jewellery-1.jpg', category: 'jewellery', title: 'Jewellery Collection', label: 'Jewellery Photography' },
  { id: 'jew-2', src: '/work/jewellery-2.jpg', category: 'jewellery', title: 'Fine Jewellery', label: 'Jewellery Photography' },

  // Spot Photography
  { id: 'spot-1', src: '/work/spot-1.jpg', category: 'spot', title: 'Spot Campaign', label: 'Spot Photography' },
  { id: 'spot-2', src: '/work/spot-2.jpg', category: 'spot', title: 'Location Shoot', label: 'Spot Photography' },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  return (
    <div className="relative">
      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <motion.div
          className="absolute top-1/3 right-1/3 w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm mb-8" style={{ color: 'var(--muted)' }}>
              <Link href="/" className="hover:text-orange transition-colors">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--heading)' }}>Our Work</span>
            </div>

            <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Portfolio</p>
            <h1 className="text-5xl md:text-7xl font-bold font-montserrat leading-[0.95] mb-6" style={{ color: 'var(--heading)' }}>
              Our <span className="gradient-text">Work</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
              A curated collection of our photography work across interior design, fashion, food, product, and jewellery shoots — each image crafted with precision and intention.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-10 mt-10">
              {[
                { value: `${photos.length}+`, label: 'Photos' },
                { value: `${categories.length - 1}`, label: 'Categories' },
                { value: '100%', label: 'Original' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold gradient-text font-montserrat">{s.value}</div>
                  <div className="text-xs uppercase tracking-widest mt-1" style={{ color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY FILTER TABS ── */}
      <section className="sticky top-16 z-30 py-4" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="relative flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: activeCategory === cat.id ? '#FF6B00' : 'var(--glass-light-bg)',
                  color: activeCategory === cat.id ? '#ffffff' : 'var(--muted)',
                  border: activeCategory === cat.id ? '1px solid #FF6B00' : '1px solid var(--border)',
                }}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.span
                    layoutId="activeCat"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(255,107,0,0.15)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <div className="ml-auto flex-shrink-0 text-sm" style={{ color: 'var(--muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--heading)' }}>{filtered.length}</span> photos
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GRID ── */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            >
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid"
                  style={{ border: '1px solid var(--border)' }}
                  onClick={() => setLightbox(photo)}
                >
                  <div className="relative w-full" style={{ aspectRatio: i % 5 === 0 ? '3/4' : i % 3 === 0 ? '1/1' : '4/3' }}>
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-orange/80 mb-1">{photo.label}</span>
                    <h3 className="text-white font-semibold font-montserrat text-sm">{photo.title}</h3>
                    <div className="mt-2 inline-flex items-center gap-1 text-xs text-white/70">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      View Full
                    </div>
                  </div>
                  {/* Zoom icon on hover */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">📷</div>
              <p style={{ color: 'var(--muted)' }}>No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden"
              onClick={e => e.stopPropagation()}
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  style={{ background: '#111' }}
                />
              </div>
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                <span className="text-xs uppercase tracking-widest font-bold text-orange">{lightbox.label}</span>
                <h3 className="text-white font-bold font-montserrat text-lg mt-1">{lightbox.title}</h3>
              </div>
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Work With Us</p>
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-6" style={{ color: 'var(--heading)' }}>
              Ready to Create <span className="gradient-text">Something Great?</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: 'var(--muted)' }}>
              Let's bring your vision to life — from product shoots to brand campaigns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="bg-orange hover:bg-[#ff8533] text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:scale-105"
                style={{ color: '#fff' }}
              >
                Book a Shoot
              </Link>
              <Link
                href="/"
                className="px-10 py-4 rounded-full font-medium transition-all duration-300 hover:text-orange"
                style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}
              >
                ← Back to Home
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
