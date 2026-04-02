'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

export default function DisclaimerPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-orange rounded-full" /><span className="text-sm" style={{ color: 'var(--muted)' }}>Legal</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="text-4xl md:text-5xl font-bold font-montserrat mb-4" style={{ color: 'var(--heading)' }}>
            <span className="gradient-text">Disclaimer</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Last updated: April 1, 2026</motion.p>
        </div>
      </section>

      <section className="pb-24" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 pt-12 space-y-8">
          {[
            { title: 'General Information Only', content: 'The information on this website is provided for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.' },
            { title: 'No Professional Advice', content: 'Nothing on this website constitutes professional business, legal, financial, or marketing advice. The content is for informational purposes only. You should always seek the advice of a qualified professional before making any business decisions.' },
            { title: 'Results Disclaimer', content: 'Any results, metrics, or case studies mentioned on our website represent past performance and are not guarantees of future results. Marketing outcomes vary depending on many factors including market conditions, budget, audience, and timing.' },
            { title: 'Third-Party Links', content: 'Our website may contain links to third-party websites. These links are provided for convenience and do not signify our endorsement of such websites. We have no control over the content or nature of these sites and accept no responsibility for them.' },
            { title: 'Limitation of Liability', content: 'In no event shall Creatorstick Media Private Limited be liable for any loss or damage including without limitation indirect or consequential loss or damage, or any loss or damage whatsoever arising from the use of this website.' },
            { title: 'Changes to Disclaimer', content: 'We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated revision date. Your continued use of the website following any changes constitutes your acceptance of the revised disclaimer.' },
          ].map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                <h2 className="text-lg font-bold font-montserrat mb-3" style={{ color: 'var(--heading)' }}>{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.content}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
