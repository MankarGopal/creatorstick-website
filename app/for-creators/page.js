'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import ParallaxText from '../components/ParallaxText';
import AnimatedCounter from '../components/AnimatedCounter';

const benefits = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>
      </svg>
    ),
    title: 'Monetize Your Content',
    desc: 'Get paid for what you love doing. Access brand deals that match your niche and audience.',
    color: 'rgba(255, 107, 0, 0.12)',
    accent: '#FF6B00',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Grow Your Audience',
    desc: 'Get expert guidance on content strategy, SEO, and audience engagement to scale faster.',
    color: 'rgba(99, 102, 241, 0.1)',
    accent: '#6366f1',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Premium Brand Partnerships',
    desc: 'We connect you with top-tier brands that align with your values and content style.',
    color: 'rgba(16, 185, 129, 0.1)',
    accent: '#10b981',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Analytics & Insights',
    desc: 'Access detailed performance reports and audience insights to optimize your content.',
    color: 'rgba(245, 158, 11, 0.1)',
    accent: '#f59e0b',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Rights Protection',
    desc: 'We handle contracts, negotiations, and copyright protection so you can focus on creating.',
    color: 'rgba(239, 68, 68, 0.1)',
    accent: '#ef4444',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Reach',
    desc: 'Tap into our global network of brands and expand your reach to international markets.',
    color: 'rgba(14, 165, 233, 0.1)',
    accent: '#0ea5e9',
  },
];

const steps = [
  { num: '01', title: 'Apply', desc: 'Fill out our creator application form with your profile and content samples.' },
  { num: '02', title: 'Get Verified', desc: 'Our team reviews your application and verifies your profile within 48 hours.' },
  { num: '03', title: 'Get Matched', desc: 'We match you with brands that align with your niche, audience, and style.' },
  { num: '04', title: 'Create & Earn', desc: 'Start creating amazing content and earn competitive compensation for your work.' },
];

const creatorTiers = [
  { tier: 'Nano', followers: '1K–10K', badge: 'N', desc: 'Perfect starting point to build brand relationships and gain experience.', perks: ['Brand Introductions', 'Content Guidelines', 'Basic Analytics'] },
  { tier: 'Micro', followers: '10K–100K', badge: 'M', desc: 'Growing creators with dedicated campaigns and manager support.', perks: ['Priority Brand Matching', 'Dedicated Manager', 'Advanced Analytics', 'Growth Workshop'] },
  { tier: 'Macro', followers: '100K–1M', badge: 'Mc', desc: 'Established creators with premium deals and full brand team.', perks: ['Premium Brand Deals', 'Personal Brand Team', 'Revenue Optimization', 'PR Support', 'Event Invitations'], popular: true },
  { tier: 'Mega', followers: '1M+', badge: 'Mg', desc: 'Top-tier creators with exclusive partnerships and custom campaigns.', perks: ['Exclusive Partnerships', 'Full Management', 'Custom Campaigns', 'International Deals', 'Production Support', 'Legal Team'] },
];

// Platform badge component
function PlatformBadge({ name, color, icon, delay, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
      className={`absolute flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg ${className}`}
      style={{ background: color }}
    >
      {icon}
      {name}
    </motion.div>
  );
}

export default function ForCreators() {
  const [formData, setFormData] = useState({ name: '', email: '', platform: '', handle: '', followers: '', niche: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 grid-pattern" />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
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
                <span className="text-sm" style={{ color: 'var(--muted)' }}>For Creators</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-[0.95] mb-6"
                  style={{ color: 'var(--heading)' }}
                >
                  Create. Grow.<br />
                  <span className="gradient-text">Get Paid.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg max-w-xl mb-10 leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                Join our growing creator network and unlock brand partnerships, expert guidance, and tools to take your content career to the next level.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#apply" className="bg-orange hover:bg-[#ff8533] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:scale-105">
                  Apply as Creator
                </a>
                <a href="#benefits" className="px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:text-orange" style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}>
                  See Benefits
                </a>
              </motion.div>
            </div>

            {/* Right: Animated creator profile */}
            <div className="relative hidden lg:flex items-center justify-center h-[480px]">
              {/* Central creator card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 rounded-3xl p-8 text-center w-64"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto rounded-full mb-4 flex items-center justify-center text-3xl font-bold gradient-text font-montserrat" style={{ background: 'rgba(255,107,0,0.1)', border: '3px solid rgba(255,107,0,0.3)' }}>
                  C
                </div>
                <div className="font-bold font-montserrat mb-0.5" style={{ color: 'var(--heading)' }}>@creatorhandle</div>
                <div className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Content Creator</div>
                {/* Animated follower count */}
                <div className="rounded-xl py-3 px-4 mb-4" style={{ background: 'rgba(255,107,0,0.08)' }}>
                  <div className="text-2xl font-bold gradient-text font-montserrat">
                    <AnimatedCounter target={125} suffix="K" />
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>Followers</div>
                </div>
                {/* Verified badge */}
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold" style={{ background: 'rgba(255,107,0,0.15)', color: '#FF6B00' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#FF6B00"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Verified Creator
                </span>
              </motion.div>

              {/* Orbiting platform badges */}
              <PlatformBadge name="YouTube" color="#FF0000" delay={0.9} className="top-4 right-4"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>}
              />
              <PlatformBadge name="Instagram" color="linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" delay={1.05} className="bottom-8 right-0"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>}
              />
              <PlatformBadge name="LinkedIn" color="#0077b5" delay={1.2} className="top-12 left-0"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>}
              />


            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 50, suffix: '+', label: 'Creators Onboard' },
              { number: 15, suffix: '+', label: 'Brand Partners' },
              { number: 2, suffix: 'M+', label: 'Combined Reach' },
              { number: 100, suffix: '%', label: 'Passion Driven' },
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

      {/* ===== BENEFITS — EDITORIAL GRID ===== */}
      <section id="benefits" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Benefits</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Why <span className="gradient-text">Join Us</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group p-8 rounded-2xl h-full transition-all duration-500 relative overflow-hidden"
                  style={{ border: '1px solid var(--border)', background: 'var(--card-bg)' }}
                >
                  {/* Colored glow bg */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: b.color }} />
                  
                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                      style={{ background: b.color, color: b.accent }}
                    >
                      {b.icon}
                    </div>
                    <h3 className="text-xl font-bold font-montserrat mb-3 transition-colors duration-300" style={{ color: 'var(--heading)' }}>
                      {b.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{b.desc}</p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" style={{ background: b.accent }} />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-32" style={{ borderTop: '1px solid var(--border)', background: 'var(--section-alt-bg)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Process</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                How It <span className="gradient-text">Works</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.3), transparent)' }} />
            
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -6 }} className="relative text-center">
                  <div className="relative inline-flex w-20 h-20 mx-auto mb-6 items-center justify-center">
                    <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,107,0,0.08)', border: '2px solid rgba(255,107,0,0.2)' }} />
                    <span className="text-3xl font-bold gradient-text font-montserrat">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold font-montserrat mb-3" style={{ color: 'var(--heading)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{step.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CREATOR TIERS — ROADMAP ===== */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Tiers</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Creator <span className="gradient-text">Levels</span>
              </h2>
              <p className="mt-4 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>Your journey from Nano to Mega — each level unlocks more powerful perks.</p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical spine (desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,107,0,0.3) 20%, rgba(255,107,0,0.3) 80%, transparent)' }} />
            
            <div className="space-y-8 lg:space-y-0">
              {creatorTiers.map((t, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className={`lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${i % 2 === 1 ? '' : ''}`}>
                    {/* Tier card — alternates sides on desktop */}
                    <div className={`lg:col-start-${i % 2 === 0 ? '1' : '2'} lg:row-start-1`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`p-8 rounded-2xl relative ${t.popular ? 'ring-2 ring-orange' : ''}`}
                        style={{ border: t.popular ? '1px solid rgba(255,107,0,0.4)' : '1px solid var(--border)', background: t.popular ? 'linear-gradient(135deg, rgba(255,107,0,0.08) 0%, var(--card-bg) 100%)' : 'var(--card-bg)' }}
                      >
                        {t.popular && (
                          <span className="absolute -top-3 left-6 text-xs bg-orange text-white px-4 py-1 rounded-full font-semibold">Most Popular</span>
                        )}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-montserrat flex-shrink-0" style={{ background: 'rgba(255,107,0,0.15)', color: '#FF6B00' }}>
                            {t.badge}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>{t.tier}</h3>
                            <p className="text-orange text-sm font-medium">{t.followers} followers</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>{t.desc}</p>
                        <ul className="space-y-2">
                          {t.perks.map((p) => (
                            <li key={p} className="text-sm flex items-center gap-2.5" style={{ color: 'var(--muted)' }}>
                              <span className="text-orange text-xs flex-shrink-0">✦</span> {p}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Center dot on spine (desktop) */}
                    <div className="hidden lg:flex items-center justify-center" style={{ gridColumn: i % 2 === 0 ? '2' : '1', gridRow: '1' }}>
                      <motion.div whileHover={{ scale: 1.5 }} className="w-4 h-4 rounded-full border-2 border-orange" style={{ background: 'var(--bg)' }} />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARALLAX ===== */}
      <section className="py-16 overflow-hidden">
        <ParallaxText speed={0.3} axis="x">
          <h2 className="text-[8rem] md:text-[12rem] font-bold font-montserrat gradient-text uppercase tracking-tight leading-none text-center">
            Creators
          </h2>
        </ParallaxText>
      </section>

      {/* ===== APPLICATION FORM ===== */}
      <section id="apply" className="py-32" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Apply Now</p>
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4" style={{ color: 'var(--heading)' }}>
                Join Our <span className="gradient-text">Creator Network</span>
              </h2>
              <p className="text-lg" style={{ color: 'var(--muted)' }}>Fill out the form below and our team will review your application within 48 hours.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-xl px-5 py-3.5 placeholder-gray-500 outline-none transition-all" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl px-5 py-3.5 placeholder-gray-500 outline-none transition-all" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Primary Platform</label>
                  <select value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} className="w-full rounded-xl px-5 py-3.5 outline-none" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }}>
                    <option value="">Select Platform</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Social Handle</label>
                  <input type="text" value={formData.handle} onChange={(e) => setFormData({ ...formData, handle: e.target.value })} className="w-full rounded-xl px-5 py-3.5 placeholder-gray-500 outline-none" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} placeholder="@yourhandle" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Follower Count</label>
                  <select value={formData.followers} onChange={(e) => setFormData({ ...formData, followers: e.target.value })} className="w-full rounded-xl px-5 py-3.5 outline-none" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }}>
                    <option value="">Select Range</option>
                    <option value="1k-10k">1K - 10K</option>
                    <option value="10k-50k">10K - 50K</option>
                    <option value="50k-100k">50K - 100K</option>
                    <option value="100k-500k">100K - 500K</option>
                    <option value="500k-1m">500K - 1M</option>
                    <option value="1m+">1M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Content Niche</label>
                  <input type="text" value={formData.niche} onChange={(e) => setFormData({ ...formData, niche: e.target.value })} className="w-full rounded-xl px-5 py-3.5 placeholder-gray-500 outline-none" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} placeholder="e.g. Fashion, Tech, Food" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Tell us about your content</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-xl px-5 py-3.5 placeholder-gray-500 resize-none outline-none" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} placeholder="Share what makes your content unique..." />
              </div>

              <button type="submit" className="w-full bg-orange hover:bg-[#ff8533] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.3)]">
                {submitted ? '✓ Application Submitted!' : 'Submit Application'}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
