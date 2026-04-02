'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

const coverage = [
  'Economic Times', 'Hindustan Times Digital', 'YourStory',
  'Inc42', 'Startup India', 'Financial Express',
];

const kits = [
  { title: 'Company Overview', desc: 'One-pager with our mission, services, and key stats.', icon: '📄' },
  { title: 'Brand Assets', desc: 'Logos, color palette, typography, and brand guidelines.', icon: '🎨' },
  { title: 'Founder Bio', desc: 'Official biography and headshot for press use.', icon: '👤' },
  { title: 'High-Res Images', desc: 'Campaign imagery and behind-the-scenes photos.', icon: '🖼️' },
];

export default function PressPage() {
  return (
    <div className="relative">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 grid-pattern" />
        <motion.div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-orange rounded-full" /><span className="text-sm" style={{ color: 'var(--muted)' }}>Press</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-[0.95] mb-6" style={{ color: 'var(--heading)' }}>
              Press &<br /><span className="gradient-text">Media Room</span>
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg max-w-xl leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
            For media inquiries, interviews, and press kits. We&apos;re always happy to speak with journalists and content creators about the creator economy.
          </motion.p>
          <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} href="mailto:press@creatorstick.com" className="inline-block bg-orange hover:bg-[#ff8533] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300">
            Contact Press Team →
          </motion.a>
        </div>
      </section>

      <section className="py-20" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-10 text-orange text-center">As Seen In</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coverage.map((outlet, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div className="p-4 rounded-xl text-center text-sm font-semibold" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}>{outlet}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'var(--section-alt-bg)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4" style={{ color: 'var(--heading)' }}>Press Kit <span className="gradient-text">Downloads</span></h2>
              <p style={{ color: 'var(--muted)' }}>Everything you need to cover Creatorstick accurately.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kits.map((k, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl text-center" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                  <div className="text-3xl mb-4">{k.icon}</div>
                  <h3 className="font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>{k.title}</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{k.desc}</p>
                  <a href="mailto:press@creatorstick.com" className="text-xs font-semibold text-orange hover:underline">Request →</a>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
