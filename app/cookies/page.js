'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const cookieTypes = [
  {
    type: 'Essential Cookies',
    required: true,
    desc: 'These cookies are necessary for the website to function properly. They enable core functionality such as page navigation, access to secure areas, and form submissions. The website cannot function properly without these cookies.',
    examples: 'Session cookies, security cookies, load balancing cookies.',
  },
  {
    type: 'Performance Cookies',
    required: false,
    desc: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the performance and user experience of our site.',
    examples: 'Google Analytics, page view tracking, error monitoring.',
  },
  {
    type: 'Functionality Cookies',
    required: false,
    desc: 'These cookies allow the website to remember choices you make (such as your preferred language or region) and provide enhanced, more personal features.',
    examples: 'Language preferences, theme settings (dark/light mode).',
  },
  {
    type: 'Marketing Cookies',
    required: false,
    desc: 'These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.',
    examples: 'Google Ads, Meta Pixel, remarketing cookies.',
  },
];

export default function CookiesPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-orange rounded-full" /><span className="text-sm" style={{ color: 'var(--muted)' }}>Legal</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="text-4xl md:text-5xl font-bold font-montserrat mb-4" style={{ color: 'var(--heading)' }}>
            Cookie <span className="gradient-text">Policy</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm mb-2" style={{ color: 'var(--muted)' }}>Last updated: April 1, 2026</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            This Cookie Policy explains how Creatorstick Media uses cookies and similar tracking technologies when you visit our website. By continuing to browse, you agree to our use of cookies as described in this policy.
          </motion.p>
        </div>
      </section>

      <section className="pb-24" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 pt-12 space-y-8">
          <ScrollReveal>
            <div className="p-6 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
              <h2 className="text-lg font-bold font-montserrat mb-3" style={{ color: 'var(--heading)' }}>What Are Cookies?</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Cookies are small text files stored on your browser when you visit a website. They help websites work more efficiently, remember your preferences, and provide information to website owners about how their site is being used.
              </p>
            </div>
          </ScrollReveal>

          {cookieTypes.map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="p-6 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold font-montserrat" style={{ color: 'var(--heading)' }}>{c.type}</h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={c.required ? { background: 'rgba(255,107,0,0.12)', color: '#FF6B00' } : { background: 'var(--glass-light-bg)', color: 'var(--muted)' }}>
                    {c.required ? 'Required' : 'Optional'}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>{c.desc}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--heading)' }}>Examples:</strong> {c.examples}</p>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div className="p-6 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
              <h2 className="text-lg font-bold font-montserrat mb-3" style={{ color: 'var(--heading)' }}>Managing Cookies</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. To manage cookies, go to your browser settings and look for cookie or privacy controls. You can also opt out of Google Analytics by visiting the Google Analytics opt-out page.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
