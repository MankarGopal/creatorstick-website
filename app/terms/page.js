'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using the Creatorstick Media website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.',
  },
  {
    title: '2. Description of Services',
    content: 'Creatorstick Media provides digital marketing, influencer marketing, content production, brand strategy, social media management, paid media, web development, and consulting services. Service specifics are outlined in individual project agreements.',
  },
  {
    title: '3. Intellectual Property',
    content: 'All content, branding, strategies, and creative assets developed by Creatorstick for clients become the property of the client upon full payment, unless otherwise agreed in writing. Our proprietary methodologies remain our intellectual property.',
  },
  {
    title: '4. Client Responsibilities',
    content: 'Clients are responsible for providing accurate information, timely approvals, and necessary assets. Delays caused by the client may result in project timeline adjustments. Clients must ensure they have rights to any materials provided to us.',
  },
  {
    title: '5. Payment Terms',
    content: 'Payment terms are outlined in individual service agreements. Generally, we require a 50% advance before project commencement and the balance upon project completion. Late payments may attract interest charges.',
  },
  {
    title: '6. Limitation of Liability',
    content: 'Creatorstick shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service in question.',
  },
  {
    title: '7. Termination',
    content: 'Either party may terminate a service agreement with 30 days written notice. Upon termination, the client shall pay for all work completed up to the termination date. Prepaid amounts for undelivered work may be refunded at our discretion.',
  },
  {
    title: '8. Governing Law',
    content: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India. We encourage resolution through mediation before legal action.',
  },
];

export default function TermsPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-orange rounded-full" /><span className="text-sm" style={{ color: 'var(--muted)' }}>Legal</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="text-4xl md:text-5xl font-bold font-montserrat mb-4" style={{ color: 'var(--heading)' }}>
            Terms of <span className="gradient-text">Service</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm mb-2" style={{ color: 'var(--muted)' }}>Last updated: April 1, 2026</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            Please read these Terms of Service carefully before using the Creatorstick Media website or any of our services. These terms constitute a legally binding agreement between you and Creatorstick Media Private Limited.
          </motion.p>
        </div>
      </section>

      <section className="pb-24" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 pt-12">
          <div className="space-y-8">
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
