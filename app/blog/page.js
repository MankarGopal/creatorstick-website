'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

const categories = ['All', 'Brand Strategy', 'Creator Economy', 'Marketing', 'Case Studies', 'Industry Insights'];

const posts = [
  {
    slug: 'building-brand-identity-that-lasts',
    category: 'Brand Strategy',
    title: 'How to Build a Brand Identity That Lasts',
    excerpt: 'Your brand is more than a logo — it\'s a promise. Discover the strategic foundations of identity that create lasting recognition and emotional resonance with your audience.',
    date: 'March 28, 2026',
    readTime: '6 min read',
    author: 'Creatorstick Team',
    featured: true,
    tag: 'Strategy',
  },
  {
    slug: 'creator-economy-india-2026',
    category: 'Creator Economy',
    title: 'The State of the Creator Economy in India — 2026',
    excerpt: 'India\'s creator economy has crossed ₹3,000 crore. We break down the trends, niches, and opportunities every brand needs to understand right now.',
    date: 'March 21, 2026',
    readTime: '9 min read',
    author: 'Creatorstick Team',
    featured: false,
    tag: 'Trends',
  },
  {
    slug: 'winning-influencer-campaign-blueprint',
    category: 'Case Studies',
    title: 'Inside a Winning Influencer Campaign: Our Blueprint',
    excerpt: 'Behind the scenes of a D2C brand campaign that generated 2.8x ROI and 4.2M impressions — including brief frameworks, creator selection, and measurement.',
    date: 'March 14, 2026',
    readTime: '8 min read',
    author: 'Creatorstick Team',
    featured: false,
    tag: 'Case Study',
  },
  {
    slug: 'social-media-trends-brands-2026',
    category: 'Marketing',
    title: 'Social Media Trends Every Brand Should Know in 2026',
    excerpt: 'From AI-generated content to long-form video and micro-communities — the platforms, formats and strategies winning attention this year.',
    date: 'March 7, 2026',
    readTime: '7 min read',
    author: 'Creatorstick Team',
    featured: false,
    tag: 'Trends',
  },
  {
    slug: 'content-calendar-brand-growth',
    category: 'Marketing',
    title: 'Why Your Brand Needs a Proper Content Calendar',
    excerpt: 'Consistency beats creativity in the long run. Learn how a structured content calendar doubles your output without burning out your team.',
    date: 'February 28, 2026',
    readTime: '5 min read',
    author: 'Creatorstick Team',
    featured: false,
    tag: 'Strategy',
  },
  {
    slug: 'small-business-digital-marketing-guide',
    category: 'Industry Insights',
    title: 'The Small Business Digital Marketing Guide for 2026',
    excerpt: 'Digital marketing on a lean budget doesn\'t mean low results. This comprehensive guide covers the channels and tactics that deliver the highest ROI for small brands.',
    date: 'February 20, 2026',
    readTime: '10 min read',
    author: 'Creatorstick Team',
    featured: false,
    tag: 'Guide',
  },
];

function PostCard({ post, large = false }) {
  const tagColors = {
    Strategy: { bg: 'rgba(255,107,0,0.12)', text: '#FF6B00' },
    Trends: { bg: 'rgba(99,102,241,0.12)', text: '#6366f1' },
    'Case Study': { bg: 'rgba(16,185,129,0.12)', text: '#10b981' },
    Guide: { bg: 'rgba(14,165,233,0.12)', text: '#0ea5e9' },
  };
  const tagStyle = tagColors[post.tag] || { bg: 'rgba(255,107,0,0.12)', text: '#FF6B00' };

  if (large) {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        className="relative rounded-3xl overflow-hidden group"
        style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
      >
        {/* Decorative gradient strip */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #FF6B00, #ff8533, #FF6B00)' }} />
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: tagStyle.bg, color: tagStyle.text }}>
              {post.tag}
            </span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>{post.category}</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-montserrat leading-tight mb-4 group-hover:text-orange transition-colors duration-300" style={{ color: 'var(--heading)' }}>
            {post.title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--muted)' }}>
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center text-xs font-bold text-white">C</div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--heading)' }}>{post.author}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{post.date} · {post.readTime}</div>
              </div>
            </div>
            <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-orange group-hover:gap-3 transition-all duration-300">
              Read Article
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="flex flex-col rounded-2xl overflow-hidden group h-full"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
    >
      {/* Color bar */}
      <div className="h-1 flex-shrink-0" style={{ background: 'linear-gradient(90deg, #FF6B00, #ff8533)' }} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: tagStyle.bg, color: tagStyle.text }}>
            {post.tag}
          </span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{post.readTime}</span>
        </div>
        <h3 className="text-lg font-bold font-montserrat leading-snug mb-3 group-hover:text-orange transition-colors duration-300 flex-1" style={{ color: 'var(--heading)' }}>
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + '…' : post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{post.date}</span>
          <Link href={`/blog/${post.slug}`} className="text-xs font-semibold text-orange flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
            Read
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featuredPost = posts.find(p => p.featured);
  const gridPosts = filteredPosts.filter(p => !p.featured || activeCategory !== 'All');

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 grid-pattern" />
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            <span className="text-sm" style={{ color: 'var(--muted)' }}>Insights & Stories</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-[0.95] mb-6"
              style={{ color: 'var(--heading)' }}
            >
              The Creatorstick{' '}
              <span className="gradient-text">Blog</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            Strategy, trends, and stories from inside the creator economy. Written for brands, creators, and agencies who want to grow smarter.
          </motion.p>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      {activeCategory === 'All' && featuredPost && (
        <section className="py-12" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: '#FF6B00' }}>Featured Article</p>
              <PostCard post={featuredPost} large />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ===== CATEGORY FILTER ===== */}
      <section className="py-8 sticky top-[72px] z-30" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                style={activeCategory === cat
                  ? { background: '#FF6B00', color: '#ffffff' }
                  : { background: 'var(--glass-light-bg)', color: 'var(--muted)', border: '1px solid var(--border)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POSTS GRID ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(activeCategory === 'All' ? posts.filter(p => !p.featured) : filteredPosts).map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.07}>
                  <PostCard post={post} />
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: 'var(--muted)' }}>No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER CTA ===== */}
      <section className="py-24" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #FF6B00, #ff8533, #FF6B00)' }} />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(255,107,0,0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4" style={{ color: 'var(--heading)' }}>
                Get Articles <span className="gradient-text">in Your Inbox</span>
              </h2>
              <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
                Weekly insights on marketing, creator economy, and brand building. No spam, unsubscribe anytime.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }}
                />
                <button
                  type="submit"
                  className="bg-orange hover:bg-[#ff8533] text-white px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
