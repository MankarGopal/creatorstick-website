'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import ParallaxText from '../components/ParallaxText';
import AnimatedCounter from '../components/AnimatedCounter';

const brandServices = [
  {
    title: 'Influencer Marketing',
    desc: 'Connect with vetted creators who align with your brand values. End-to-end campaign management from talent sourcing to performance reporting.',
    features: ['Creator Vetting & Matching', 'Campaign Management', 'Performance Analytics', 'Content Rights & Licensing'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Content Strategy',
    desc: 'Data-driven content strategies that position your brand as a thought leader and drive engagement across every platform.',
    features: ['Content Calendar', 'Platform Strategy', 'SEO Optimization', 'Brand Voice Development'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Brand Campaigns',
    desc: 'Full-scale campaign production from concept to launch. We create campaigns that turn heads and drive conversions.',
    features: ['Creative Direction', 'Multi-Channel Launch', 'A/B Testing', 'ROI Tracking'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Social Media Management',
    desc: 'Complete social media management with content creation, community management, and growth strategies.',
    features: ['Daily Posting', 'Community Management', 'Growth Hacking', 'Monthly Reports'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
  },
  {
    title: 'Video Production',
    desc: 'Cinematic video production that tells your brand story with impact. From short-form to documentary style.',
    features: ['Scripting & Storyboard', 'Filming & Direction', 'Post-Production', 'Distribution Strategy'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
  },
  {
    title: 'Paid Media',
    desc: 'Strategic paid media campaigns across Meta, Google, YouTube, and emerging platforms with precision targeting.',
    features: ['Ad Creative Design', 'Audience Targeting', 'Budget Optimization', 'Conversion Tracking'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
];

const caseStudies = [
  {
    brand: 'FashionForward',
    category: 'Fashion & Lifestyle',
    result: 'Built brand identity and launched social presence from zero through strategic creator partnerships',
    metric: '50K',
    metricLabel: 'Followers in 2 Months',
    growth: '+340%',
  },
  {
    brand: 'TechStart Pro',
    category: 'Technology',
    result: 'Designed and executed a complete digital launch campaign with multi-platform creator content',
    metric: '2.8x',
    metricLabel: 'ROI on First Campaign',
    growth: '+180%',
  },
  {
    brand: 'GreenLife Co.',
    category: 'Sustainability',
    result: 'Created a viral content series that drove massive organic growth and brand awareness',
    metric: '500K',
    metricLabel: 'Organic Impressions',
    growth: '+520%',
  },
];


export default function ForBrands() {
  const [activeService, setActiveService] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 grid-pattern" />

        {/* Geometric accent lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="200" x2="1440" y2="200" stroke="#FF6B00" strokeWidth="1"/>
          <line x1="0" y1="700" x2="1440" y2="700" stroke="#FF6B00" strokeWidth="1"/>
          <line x1="400" y1="0" x2="400" y2="900" stroke="#FF6B00" strokeWidth="1"/>
          <line x1="1040" y1="0" x2="1040" y2="900" stroke="#FF6B00" strokeWidth="1"/>
          <rect x="380" y="180" width="40" height="40" fill="none" stroke="#FF6B00" strokeWidth="2"/>
          <rect x="1020" y="680" width="40" height="40" fill="none" stroke="#FF6B00" strokeWidth="2"/>
        </svg>

        {/* Glow orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-8"
              >
                <span className="w-2 h-2 bg-orange rounded-full" />
                <span className="text-sm" style={{ color: 'var(--muted)' }}>For Brands</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-[0.95] mb-6"
                  style={{ color: 'var(--heading)' }}
                >
                  Amplify Your<br />
                  <span className="gradient-text">Brand&apos;s Voice</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg max-w-xl mb-10 leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                We partner with ambitious brands to create campaigns that resonate, engage, and convert. Fresh ideas, sharp execution — let&apos;s build something unforgettable.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/book" className="bg-orange hover:bg-[#ff8533] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:scale-105" style={{ color: '#ffffff' }}>
                  Get a Proposal
                </Link>
                <a href="#services" className="px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:text-orange" style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}>
                  Explore Services
                </a>
              </motion.div>
            </div>

            {/* Right: Clean dashboard — no overlaps */}
            <div className="hidden lg:flex flex-col gap-4">
              {/* Main chart card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="rounded-3xl p-6"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-orange">Campaign Overview</span>
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-orange"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>Live</span>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-2 h-32 mb-5">
                  {[40, 65, 45, 80, 60, 90, 75, 100, 85, 95, 70, 88].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{ background: i === 11 ? 'var(--orange)' : 'rgba(255,107,0,0.2)' }}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                    />
                  ))}
                </div>

                {/* 3 inline metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {[{ label: 'Impressions', val: '2.4M' }, { label: 'Engagement', val: '8.7%' }, { label: 'Conversions', val: '1,240' }].map(({ label, val }) => (
                    <div key={label} className="rounded-xl p-3 text-center" style={{ background: 'var(--glass-light-bg)' }}>
                      <div className="text-base font-bold gradient-text font-montserrat">{val}</div>
                      <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted)' }}>{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bottom stat row — no overlap */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'ROI', value: '3.2x', delay: 0.9 },
                  { label: 'Total Reach', value: '5M+', delay: 1.0 },
                  { label: 'Campaigns', value: '25+', delay: 1.1 },
                ].map(({ label, value, delay }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay, duration: 0.5 }}
                    className="rounded-2xl px-4 py-4 text-center"
                    style={{ background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.15)' }}
                  >
                    <div className="text-2xl font-bold font-montserrat gradient-text">{value}</div>
                    <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted)' }}>{label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="py-16" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 15, suffix: '+', label: 'Brands Served' },
              { number: 25, suffix: '+', label: 'Campaigns Launched' },
              { number: 5, suffix: 'M+', label: 'Total Impressions' },
              { number: 3, suffix: 'x', label: 'Avg. ROI' },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES — ACCORDION ===== */}
      <section id="services" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Services</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Full-Stack <span className="gradient-text">Brand Solutions</span>
              </h2>
              <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
                Click any service to explore what&apos;s included.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-3 max-w-4xl mx-auto">
            {brandServices.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.div
                  className="rounded-2xl overflow-hidden cursor-pointer"
                  style={{ border: activeService === i ? '1px solid rgba(255,107,0,0.4)' : '1px solid var(--border)', background: activeService === i ? 'rgba(255,107,0,0.04)' : 'var(--card-bg)' }}
                  onClick={() => setActiveService(activeService === i ? null : i)}
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: activeService === i ? 'rgba(255,107,0,0.15)' : 'var(--glass-light-bg)', color: activeService === i ? '#FF6B00' : 'var(--muted)' }}>
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold font-montserrat" style={{ color: activeService === i ? '#FF6B00' : 'var(--heading)' }}>
                        {service.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: activeService === i ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--glass-light-bg)', color: 'var(--muted)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {activeService === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 grid md:grid-cols-2 gap-6 border-t" style={{ borderColor: 'rgba(255,107,0,0.15)' }}>
                          <p className="text-sm leading-relaxed pt-6" style={{ color: 'var(--muted)' }}>{service.desc}</p>
                          <div className="flex flex-wrap gap-2 pt-6">
                            {service.features.map((f) => (
                              <span key={f} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00', border: '1px solid rgba(255,107,0,0.2)' }}>
                                <span>✦</span> {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARALLAX TEXT ===== */}
      <section className="py-16 overflow-hidden">
        <ParallaxText speed={-0.3} axis="x">
          <h2 className="text-[8rem] md:text-[12rem] font-bold font-montserrat gradient-text uppercase tracking-tight leading-none text-center">
            Brands
          </h2>
        </ParallaxText>
      </section>

      {/* ===== CASE STUDIES — SPOTLIGHT ===== */}
      <section className="py-32" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Results</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Case <span className="gradient-text">Studies</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {caseStudies.map((study, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8 items-center"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
                >
                  <div className="md:col-span-2">
                    <span className="text-xs text-orange uppercase tracking-widest font-semibold">{study.category}</span>
                    <h3 className="text-3xl font-bold font-montserrat mt-2 mb-3" style={{ color: 'var(--heading)' }}>{study.brand}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{study.result}</p>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-2">
                    <div className="text-5xl md:text-6xl font-bold gradient-text font-montserrat leading-none">{study.metric}</div>
                    <div className="text-sm uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{study.metricLabel}</div>
                    <span className="mt-2 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00' }}>
                      {study.growth} Growth
                    </span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="py-20" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-center text-sm uppercase tracking-[0.2em] mb-12" style={{ color: 'var(--muted)' }}>
              Trusted by brands across industries
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {['Fashion', 'Technology', 'Sustainability', 'F&B', 'Real Estate', 'Health'].map((industry, i) => (
              <ScrollReveal key={industry} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-full"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  <span className="text-orange text-xs">◆</span>
                  <span className="font-semibold text-sm uppercase tracking-wider">{industry}</span>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <motion.div
              className="rounded-3xl p-12 md:p-16 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.08) 0%, var(--card-bg) 100%)', border: '1px solid rgba(255,107,0,0.2)' }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange/40 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-orange/40 rounded-br-3xl" />
              
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-6" style={{ color: 'var(--heading)' }}>
                Ready to <span className="gradient-text">Scale</span>?
              </h2>
              <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
                Let&apos;s build something extraordinary together. We&apos;re hungry, creative, and ready to make your brand unforgettable.
              </p>
              <Link href="/book" className="inline-block bg-orange hover:bg-[#ff8533] text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.5)] hover:scale-105" style={{ color: '#ffffff' }}>
                Start Your Campaign →
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
