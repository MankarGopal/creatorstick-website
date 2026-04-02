'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const sections = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly to us, such as when you contact us, book a service, or subscribe to our newsletter. This includes: name, email address, phone number, company name, and details about your project or inquiry.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use the information we collect to: provide and improve our services, communicate with you about projects, send marketing communications (with your consent), and comply with legal obligations. We do not sell your personal information to third parties.',
  },
  {
    title: '3. Information Sharing',
    content: 'We may share your information with trusted service providers who assist us in operating our business (e.g., email providers, analytics). These parties are bound by confidentiality agreements and are prohibited from using your information for other purposes.',
  },
  {
    title: '4. Cookies & Tracking',
    content: 'We use cookies and similar technologies to improve your experience on our website, analyze traffic, and personalize content. You can control cookie preferences through your browser settings. See our Cookie Policy for more details.',
  },
  {
    title: '5. Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.',
  },
  {
    title: '6. Your Rights',
    content: 'Depending on your location, you may have rights including: access to your personal data, correction of inaccurate data, deletion of your data, and objection to processing. To exercise these rights, contact us at privacy@creatorstick.com.',
  },
  {
    title: '7. Contact Us',
    content: 'If you have questions about this Privacy Policy, please contact us at: privacy@creatorstick.com or write to us at Creatorstick Media Private Limited, India.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-orange rounded-full" /><span className="text-sm" style={{ color: 'var(--muted)' }}>Legal</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="text-4xl md:text-5xl font-bold font-montserrat mb-4" style={{ color: 'var(--heading)' }}>
            Privacy <span className="gradient-text">Policy</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm mb-2" style={{ color: 'var(--muted)' }}>Last updated: April 1, 2026</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            At Creatorstick Media Private Limited, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
          </motion.p>
        </div>
      </section>

      <section className="pb-24" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 pt-12">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="p-6 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                  <h2 className="text-lg font-bold font-montserrat mb-3" style={{ color: 'var(--heading)' }}>{s.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
