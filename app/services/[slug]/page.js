'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { use, useRef } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicesData, servicesBySlug } from '../data';
import ScrollReveal from '../../components/ScrollReveal';
import ParallaxText from '../../components/ParallaxText';

// Renders the right SVG icon for each service type
function ServiceIcon({ type, size = 24, color }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color || 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (type) {
    case 'polygon': return <svg {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case 'people': return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case 'video': return <svg {...props}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
    case 'share': return <svg {...props}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
    case 'chart': return <svg {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case 'play': return <svg {...props}><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>;
    case 'browser': return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
    case 'lightbulb': return <svg {...props}><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>;
    default: return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
  }
}

export default function ServicePage({ params }) {
  // Next.js 15: params is a Promise — must be unwrapped with React.use()
  const { slug } = use(params);
  const service = servicesBySlug[slug];
  if (!service) notFound();

  // Always use site-default orange — consistent with the rest of the site
  const ORANGE       = '#FF6B00';
  const ORANGE_LIGHT = 'rgba(255,107,0,0.1)';

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const otherServices = servicesData.filter(s => s.slug !== service.slug).slice(0, 3);
  const accentGrad = 'linear-gradient(135deg, #FF6B00, #ff8533)';

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 grid-pattern" />

        {/* Glow */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 glass-light rounded-full px-5 py-2 mb-8"
            >
              <span style={{ color: ORANGE }}>
                <ServiceIcon type={service.iconType} size={18} color={ORANGE} />
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Our Services</span>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>·</span>
              <span className="text-sm font-semibold" style={{ color: ORANGE }}>{service.name}</span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-[0.95]"
                style={{ color: 'var(--heading)' }}
              >
                {service.heroHeadline}<br />
                <span style={{ background: accentGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {service.heroAccent}
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              {service.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/book"
                className="inline-block text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:opacity-90"
                style={{ background: ORANGE, color: '#ffffff' }}
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:opacity-80"
                style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}
              >
                See What&apos;s Included
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="py-16" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {service.stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-montserrat mb-2" style={{ color: ORANGE }}>
                    {stat.value}
                  </div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ORANGE }}>What&apos;s Included</p>
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Everything in{' '}
                <span style={{ background: accentGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {service.name}
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="p-7 rounded-2xl h-full group relative overflow-hidden"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: ORANGE_LIGHT }} />
                  <div className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: ORANGE_LIGHT, color: ORANGE }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="relative font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>{feature.title}</h3>
                  <p className="relative text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{feature.desc}</p>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" style={{ background: ORANGE }} />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-32" style={{ background: 'var(--section-alt-bg)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ORANGE }}>Process</p>
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                How We <span style={{ background: accentGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Work</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.4), transparent)' }} />
            {service.process.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -6 }} className="relative text-center group">
                  <div className="relative inline-flex w-20 h-20 mx-auto mb-6 items-center justify-center">
                    <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-110" style={{ background: ORANGE_LIGHT, border: '2px solid rgba(255,107,0,0.4)' }} />
                    <span className="relative text-3xl font-bold font-montserrat" style={{ background: accentGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-montserrat mb-3" style={{ color: 'var(--heading)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{step.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARALLAX ===== */}
      <section className="py-16 overflow-hidden">
        <ParallaxText speed={-0.3} axis="x">
          <h2 className="font-bold font-montserrat uppercase leading-none" style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', background: 'linear-gradient(135deg, rgba(255,107,0,0.5), rgba(255,107,0,0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {service.name}
          </h2>
        </ParallaxText>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <motion.div
              className="rounded-3xl p-12 md:p-16 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${ORANGE_LIGHT} 0%, var(--card-bg) 100%)`, border: '1px solid rgba(255,107,0,0.3)' }}
            >
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 rounded-tl-3xl" style={{ borderColor: 'rgba(255,107,0,0.4)' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 rounded-br-3xl" style={{ borderColor: 'rgba(255,107,0,0.4)' }} />
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-6" style={{ color: 'var(--heading)' }}>
                Ready to Get{' '}
                <span style={{ background: accentGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Started?</span>
              </h2>
              <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
                Let&apos;s talk about your {service.name.toLowerCase()} goals and build a plan that works for you.
              </p>
              <Link href="/book" className="inline-block text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:opacity-90" style={{ background: ORANGE, color: '#ffffff' }}>
                Book a Consultation →
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== OTHER SERVICES ===== */}
      <section className="py-20" style={{ borderTop: '1px solid var(--border)', background: 'var(--section-alt-bg)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-center text-sm uppercase tracking-[0.2em] mb-10" style={{ color: 'var(--muted)' }}>Explore More Services</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {otherServices.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 0.1}>
                <Link href={`/services/${s.slug}`} className="block group">
                  <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl transition-all duration-300" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: ORANGE_LIGHT, color: ORANGE }}>
                        <ServiceIcon type={s.iconType} size={18} color={ORANGE} />
                      </div>
                      <h3 className="font-bold font-montserrat group-hover:text-orange transition-colors" style={{ color: 'var(--heading)' }}>{s.name}</h3>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>{s.shortDesc}</p>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
