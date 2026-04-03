'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const inquiryTypes = [
  { id: 'brand-collaboration', label: 'Brand Collaboration', icon: '◆' },
  { id: 'content-services', label: 'Content Services', icon: '●' },
  { id: 'social-media', label: 'Social Media Management', icon: '▲' },
  { id: 'consulting', label: 'Strategic Consulting', icon: '◇' },
  { id: 'internship', label: 'Internship / Careers', icon: '✦' },
  { id: 'other', label: 'Something Else', icon: '◈' },
];

const contactDetails = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'creatorstick@gmail.com',
    href: 'mailto:creatorstick@gmail.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    label: 'Instagram',
    value: '@creatorstick',
    href: 'https://instagram.com/creatorstick',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Pune, Maharashtra, India',
    href: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-orange/10 border border-orange/30 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <span className="text-5xl text-orange">✓</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
            Message <span className="gradient-text">Received!</span>
          </h1>
          <p className="text-gray text-lg mb-2">
            Thank you, <strong className="text-white">{formData.name}</strong>!
          </p>
          <p className="text-gray mb-10">
            We'll get back to you at{' '}
            <strong className="text-orange">{formData.email}</strong> within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-orange hover:bg-[#ff8533] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.3)]"
            >
              Back to Home
            </Link>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name:'',email:'',phone:'',subject:'',inquiryType:'',message:'' }); }}
              className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:text-orange"
              style={{ border: '1px solid var(--border-hover)', color: 'var(--heading)' }}
            >
              Send Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid-pattern" />
      <motion.div
        className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-orange/8 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
              <span className="text-sm" style={{ color: 'var(--muted)' }}>We'd love to hear from you</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold font-montserrat mb-4" style={{ color: 'var(--heading)' }}>
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
              Have a project in mind, a question, or just want to say hello? Send us a message and we'll get back to you within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left: Contact Info */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="space-y-6">

              {/* Contact Details */}
              <div className="rounded-2xl p-7 space-y-6 t-card">
                <h2 className="text-lg font-bold font-montserrat" style={{ color: 'var(--heading)' }}>Contact Info</h2>
                {contactDetails.map((d, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center flex-shrink-0 text-orange">
                      {d.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--muted)' }}>{d.label}</p>
                      {d.href ? (
                        <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          className="font-medium hover:text-orange transition-colors" style={{ color: 'var(--heading)' }}>
                          {d.value}
                        </a>
                      ) : (
                        <p className="font-medium" style={{ color: 'var(--heading)' }}>{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="rounded-2xl p-7 t-card">
                <h2 className="text-lg font-bold font-montserrat mb-5" style={{ color: 'var(--heading)' }}>Looking for something specific?</h2>
                <div className="space-y-3">
                  <Link href="/book" className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-orange/30 hover:bg-orange/5 transition-all duration-300 group">
                    <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>Book a Service</span>
                    <span className="text-orange text-xs group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <Link href="/careers" className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-orange/30 hover:bg-orange/5 transition-all duration-300 group">
                    <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>Join Our Team</span>
                    <span className="text-orange text-xs group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <Link href="/for-brands" className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-orange/30 hover:bg-orange/5 transition-all duration-300 group">
                    <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>Explore Services</span>
                    <span className="text-orange text-xs group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>

              {/* Response Promise */}
              <div className="rounded-2xl p-6 border border-orange/20 bg-orange/5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-orange">24-Hour Response</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  We respond to every message within 24 hours during business days.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal direction="right" className="lg:col-span-3">
            <div className="rounded-2xl p-8 t-card">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: 'var(--muted)' }}>
                    What are you reaching out about?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {inquiryTypes.map((t) => (
                      <motion.button
                        key={t.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, inquiryType: t.id })}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                          formData.inquiryType === t.id
                            ? 'border-orange bg-orange/10 text-orange'
                            : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                        }`}
                        style={formData.inquiryType !== t.id ? { color: 'var(--muted)' } : {}}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/40 focus:border-orange/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/40 focus:border-orange/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/40 focus:border-orange/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief subject line"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/40 focus:border-orange/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, idea, or question..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/40 resize-none focus:border-orange/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* Error */}
                <AnimatePresence>
                  {submitError && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm"
                    >
                      {submitError}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    submitting
                      ? 'bg-orange/50 cursor-wait'
                      : 'bg-orange hover:bg-[#ff8533] hover:shadow-[0_0_40px_rgba(255,107,0,0.35)]'
                  } text-white`}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message →'
                  )}
                </motion.button>

                <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
                  We respond within 24 hours. No spam, ever.
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
