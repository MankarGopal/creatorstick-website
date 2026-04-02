'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

const values = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, title: 'Creative First', desc: 'We lead with creativity in every campaign, strategy, and story we tell.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, title: 'Results Driven', desc: 'We obsess over performance — every decision is rooted in data and outcomes.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Community Built', desc: 'Our creator-first approach means authentic relationships at the heart of every campaign.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'Locally Rooted', desc: 'Based in India, we understand the nuances of local culture and global ambitions.' },
];

const team = [
  { name: 'Mukund Chavan', role: 'Founder & CEO', initials: 'MC' },
  { name: 'Creative Team', role: 'Brand & Content', initials: 'CT' },
  { name: 'Strategy Team', role: 'Campaigns & Media', initials: 'ST' },
  { name: 'Creator Network', role: '500+ Creators', initials: 'CN' },
];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 grid-pattern" />
        <motion.div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)' }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-orange rounded-full" />
            <span className="text-sm" style={{ color: 'var(--muted)' }}>About Us</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-[0.95] mb-6" style={{ color: 'var(--heading)' }}>
              We Build Brands<br /><span className="gradient-text">That Matter.</span>
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>
            Creatorstick is a bold media agency crafting digital impact through creative storytelling, influencer strategy, and smart marketing. Based in India — building globally.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex gap-4">
            <Link href="/book" className="bg-orange hover:bg-[#ff8533] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]">Get in Touch</Link>
            <Link href="/careers" className="px-8 py-4 rounded-full font-medium transition-all duration-300 hover:text-orange" style={{ border: '1px solid var(--border-hover)', color: 'var(--heading)' }}>Join the Team</Link>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{ v: '50+', l: 'Brands Served' }, { v: '500+', l: 'Creator Network' }, { v: '5M+', l: 'Total Reach' }, { v: '3x', l: 'Avg. ROI' }].map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-montserrat gradient-text mb-2">{s.v}</div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{s.l}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4 text-orange">What We Stand For</p>
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>Our Core <span className="gradient-text">Values</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl text-center" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-orange" style={{ background: 'rgba(255,107,0,0.1)' }}>{v.icon}</div>
                  <h3 className="font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{v.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-28" style={{ background: 'var(--section-alt-bg)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4 text-orange">The People</p>
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>Meet the <span className="gradient-text">Team</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl text-center" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold font-montserrat text-sm" style={{ background: 'linear-gradient(135deg, #FF6B00, #ff8533)' }}>{m.initials}</div>
                  <h3 className="font-bold font-montserrat text-sm mb-1" style={{ color: 'var(--heading)' }}>{m.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{m.role}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-6" style={{ color: 'var(--heading)' }}>Ready to <span className="gradient-text">Work Together?</span></h2>
            <p className="text-lg mb-8" style={{ color: 'var(--muted)' }}>Let&apos;s build something extraordinary. Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
            <Link href="/book" className="inline-block bg-orange hover:bg-[#ff8533] text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]">Start a Conversation →</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
