'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import ParallaxText from '../components/ParallaxText';
import AnimatedCounter from '../components/AnimatedCounter';

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    title: 'Social Media Growth',
    desc: 'Build a real, engaged following across all major platforms.',
    features: ['Daily content creation', 'Community management', 'Hashtag strategy', 'Competitor analysis'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    title: 'Video & Content Production',
    desc: 'Professional content that punches above your budget weight.',
    features: ['Reels & short-form video', 'Product photography', 'Branded video content', 'Editing & post-production'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Performance Marketing',
    desc: 'Smart ad campaigns that bring measurable customers to your door.',
    features: ['Meta & Google Ads', 'Audience targeting', 'A/B creative testing', 'Monthly ROI reports'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Influencer Collaborations',
    desc: 'Partner with local creators who connect with your customers.',
    features: ['Nano & micro creator sourcing', 'Local influencer campaigns', 'Content rights management', 'Campaign reporting'],
  },
];

const packages = [
  {
    name: 'Starter',
    period: '/month',
    desc: 'Perfect for new businesses looking to establish their digital presence.',
    features: ['Social Media Setup (2 platforms)', '8 Posts per Month', 'Basic Analytics Report', 'Community Management', 'Content Calendar'],
    popular: false,
  },
  {
    name: 'Growth',
    period: '/month',
    desc: 'For businesses ready to scale their marketing efforts and reach.',
    features: ['Social Media (4 platforms)', '20 Posts per Month', 'Detailed Analytics Dashboard', 'Influencer Partnership (1/mo)', 'Ad Management', 'Monthly Strategy Call'],
    popular: true,
  },
  {
    name: 'Scale',
    period: '/month',
    desc: 'Full-service solution for ambitious businesses aiming for market leadership.',
    features: ['All Platforms Management', '30+ Posts per Month', 'Real-time Analytics', 'Influencer Campaigns (3/mo)', 'Full Ad Management', 'Video Content Production', 'Priority Support'],
    popular: false,
  },
];

const successStories = [
  { name: 'Bloom Cafe', industry: 'Food & Beverage', result: 'Grew from 200 to 5,000 followers in 3 months with 2x increase in daily footfall.', growth: '2,400%', icon: '☕' },
  { name: 'FitZone Studio', industry: 'Health & Fitness', result: 'Boosted membership signups through local creator campaigns and targeted ads.', growth: '150%', icon: '🏃' },
  { name: 'StyleCraft Boutique', industry: 'Fashion Retail', result: 'Launched social commerce generating consistent online revenue from Instagram.', growth: '₹2L/mo', icon: '👗' },
];

const faqs = [
  { q: 'What makes Creatorstick different from other agencies?', a: "We're a new-age team that combines fresh creative thinking with smart data. We understand startup budgets and deliver maximum impact without the bloated agency price tag." },
  { q: 'How quickly can I see results?', a: 'Most businesses see noticeable improvements within the first 30 days. Significant growth typically happens within 2-3 months of consistent strategy execution.' },
  { q: 'Can I upgrade my package later?', a: "Absolutely! You can upgrade or customize your package at any time. We design flexible plans that grow with your business." },
  { q: 'Do you work with businesses outside India?', a: "Yes! We serve businesses globally. Our digital-first approach allows us to work with clients anywhere in the world." },
];

// Business type illustration
function BusinessIcon({ type, className }) {
  const icons = {
    cafe: (
      <svg viewBox="0 0 60 60" fill="none" className={className}>
        <rect x="10" y="30" width="35" height="25" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 30V20a15 15 0 0 1 30 0v10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M45 35h5a5 5 0 0 1 0 10h-5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="20" y1="42" x2="20" y2="48" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="28" y1="42" x2="28" y2="48" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="36" y1="42" x2="36" y2="48" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    boutique: (
      <svg viewBox="0 0 60 60" fill="none" className={className}>
        <rect x="8" y="25" width="44" height="30" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 25V18l12-8 12 8v7" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="22" y="38" width="16" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="30" cy="46" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    studio: (
      <svg viewBox="0 0 60 60" fill="none" className={className}>
        <rect x="8" y="20" width="44" height="35" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 28h44" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="30" cy="42" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="30" cy="42" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="16" y1="24" x2="16" y2="24.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="21" y1="24" x2="21" y2="24.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[type] || null;
}

export default function ForSmallBusiness() {
  const [openFaq, setOpenFaq] = useState(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 grid-pattern" />

        {/* Warm glow */}
        <motion.div
          className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(255,183,0,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        />

        {/* Floating business type decorations */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 0.12, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute left-8 top-1/3 text-orange hidden xl:block"
        >
          <BusinessIcon type="cafe" className="w-24 h-24 text-orange" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 0.12, x: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute right-8 top-1/2 text-orange hidden xl:block"
        >
          <BusinessIcon type="boutique" className="w-24 h-24 text-orange" />
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-orange rounded-full" />
              <span className="text-sm" style={{ color: 'var(--muted)' }}>For Small Business</span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-[0.95]"
                style={{ color: 'var(--heading)' }}
              >
                Big Results,<br />
                <span className="gradient-text">Smart Budget</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              Premium marketing solutions designed specifically for small businesses. Get the agency experience without the enterprise price tag.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <a href="#pricing" className="bg-orange hover:bg-[#ff8533] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:scale-105">
                See Pricing
              </a>
              <Link href="/book" className="px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:text-orange" style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}>
                Free Consultation
              </Link>
            </motion.div>

            {/* Business type badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {['Cafes & Restaurants', 'Boutiques', 'Fitness Studios', 'Salons & Spas', 'Local Retail', 'Service Businesses'].map((type, i) => (
                <motion.span
                  key={type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.08 }}
                  className="text-xs px-4 py-2 rounded-full"
                  style={{ background: 'var(--glass-light-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  {type}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 20, suffix: '+', label: 'SMBs Served' },
              { number: 85, suffix: '%', label: 'Client Growth' },
              { number: 3, suffix: 'x', label: 'Avg. ROI' },
              { number: 24, suffix: '/7', label: 'Support' },
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

      {/* ===== SERVICES — VISUAL CHECKLIST ===== */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">What We Do</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Everything You <span className="gradient-text">Need</span>
              </h2>
              <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
                Four core specialisations crafted for small business success.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 p-8 rounded-2xl items-center"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00' }}>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div>
                      <h3 className="text-xl font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>{service.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{service.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
                          <span className="text-orange flex-shrink-0">✓</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-32" style={{ background: 'var(--section-alt-bg)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Pricing</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Transparent <span className="gradient-text">Pricing</span>
              </h2>
              <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
                No hidden fees, no lock-in contracts. Choose a plan that fits your business, upgrade any time.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`p-8 rounded-2xl h-full flex flex-col relative ${pkg.popular ? 'ring-2 ring-orange' : ''}`}
                  style={{ border: pkg.popular ? '1px solid rgba(255,107,0,0.4)' : '1px solid var(--border)', background: pkg.popular ? 'linear-gradient(135deg, rgba(255,107,0,0.08) 0%, var(--card-bg) 100%)' : 'var(--card-bg)' }}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-orange text-white px-4 py-1 rounded-full font-semibold">Recommended</span>
                  )}
                  <h3 className="text-2xl font-bold font-montserrat mb-1" style={{ color: 'var(--heading)' }}>{pkg.name}</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>{pkg.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="text-sm flex items-start gap-2" style={{ color: 'var(--muted)' }}>
                        <span className="text-orange mt-0.5 flex-shrink-0">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book"
                    className={`block text-center py-3 rounded-xl font-semibold transition-all duration-300 ${pkg.popular ? 'bg-orange hover:bg-[#ff8533] text-white hover:shadow-[0_0_30px_rgba(255,107,0,0.3)]' : 'hover:border-orange hover:text-orange'}`}
                    style={!pkg.popular ? { color: 'var(--heading)', border: '1px solid var(--border-hover)' } : { color: '#ffffff' }}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES — INSTAGRAM STYLE ===== */}
      <section className="py-32" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Results</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Success <span className="gradient-text">Stories</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="rounded-3xl overflow-hidden"
                  style={{ border: '1px solid var(--border)' }}
                >
                  {/* "Post" header */}
                  <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(255,107,0,0.1)' }}>
                      {story.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-sm font-montserrat" style={{ color: 'var(--heading)' }}>{story.name}</div>
                      <div className="text-xs text-orange">{story.industry}</div>
                    </div>
                    <div className="ml-auto">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--muted)' }}>
                        <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                      </svg>
                    </div>
                  </div>

                  {/* "Post" body */}
                  <div className="p-6" style={{ background: 'var(--card-bg)' }}>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>{story.result}</p>

                    {/* Big stat */}
                    <div className="rounded-2xl p-5 text-center" style={{ background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.15)' }}>
                      <div className="text-4xl font-bold gradient-text font-montserrat">{story.growth}</div>
                      <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--muted)' }}>Growth Achieved</div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ - CHAT STYLE ===== */}
      <section className="py-32" style={{ background: 'var(--section-alt-bg)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Common <span className="gradient-text">Questions</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: openFaq === i ? '1px solid rgba(255,107,0,0.3)' : '1px solid var(--border)', background: 'var(--card-bg)' }}
                >
                  {/* Question — styled like a chat bubble */}
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 transition-colors hover:bg-orange/5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-orange text-xs font-bold">Q</span>
                      </div>
                      <span className="font-semibold text-sm leading-relaxed" style={{ color: 'var(--heading)' }}>{faq.q}</span>
                    </div>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      className="text-orange text-xl flex-shrink-0"
                    >
                      +
                    </motion.span>
                  </button>

                  {/* Answer — styled like a response */}
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 flex items-start gap-3" style={{ borderTop: '1px solid var(--border)' }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-4" style={{ background: 'var(--glass-light-bg)', border: '1px solid var(--border)' }}>
                            <span className="text-xs font-bold font-montserrat gradient-text">.cs</span>
                          </div>
                          <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--muted)' }}>{faq.a}</p>
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

      {/* ===== PARALLAX ===== */}
      <section className="py-16 overflow-hidden">
        <ParallaxText speed={-0.3} axis="x">
          <h2 className="text-[8rem] md:text-[12rem] font-bold font-montserrat gradient-text uppercase tracking-tight leading-none text-center">
            Growth
          </h2>
        </ParallaxText>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <motion.div
              className="rounded-3xl p-12 md:p-16 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, var(--card-bg) 60%, rgba(255,183,0,0.04) 100%)', border: '1px solid rgba(255,107,0,0.15)' }}
            >
              {/* Decorative business illustrations */}
              <div className="absolute top-6 right-6 opacity-5">
                <BusinessIcon type="studio" className="w-32 h-32 text-orange" />
              </div>
              <div className="absolute bottom-6 left-6 opacity-5">
                <BusinessIcon type="cafe" className="w-28 h-28 text-orange" />
              </div>

              <h2 className="relative text-4xl md:text-5xl font-bold font-montserrat mb-6" style={{ color: 'var(--heading)' }}>
                Let&apos;s Grow <span className="gradient-text">Together</span>
              </h2>
              <p className="relative text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
                Start with a free consultation. No commitments, just a conversation about your business goals.
              </p>
              <Link href="/book" className="relative inline-block bg-orange hover:bg-[#ff8533] text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:scale-105" style={{ color: '#ffffff' }}>
                Book Free Consultation
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
