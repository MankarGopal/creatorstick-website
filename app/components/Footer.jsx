'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const footerLinks = {
  Services: [
    { label: 'Brand Strategy',      href: '/services/brand-strategy' },
    { label: 'Influencer Marketing',href: '/services/influencer-marketing' },
    { label: 'Content Production',  href: '/services/content-production' },
    { label: 'Social Media',        href: '/services/social-media' },
    { label: 'Paid Media & Ads',    href: '/services/paid-media' },
    { label: 'Video Production',    href: '/services/video-production' },
    { label: 'Web Development',     href: '/services/web-development' },
    { label: 'Consulting',          href: '/services/consulting' },
  ],
  Company: [
    { label: 'About Us',  href: '/about' },
    { label: 'Careers',   href: '/careers' },
    { label: 'Blog',      href: '/blog' },
    { label: 'Press',     href: '/press' },
    { label: 'Contact',   href: '/book' },
  ],
  Legal: [
    { label: 'Privacy Policy',  href: '/privacy' },
    { label: 'Terms of Service',href: '/terms' },
    { label: 'Cookie Policy',   href: '/cookies' },
    { label: 'Disclaimer',      href: '/disclaimer' },
  ],
};

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/creatorstick/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://x.com/creatorstick',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@CreatorstickMedia',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative" style={{ background: 'var(--footer-bg)', borderTop: '1px solid var(--section-border)' }}>
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold font-montserrat mb-6" style={{ color: 'var(--foreground)' }}>
              Ready to <span className="gradient-text">Elevate</span> Your Brand?
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-muted)' }}>
              Let&apos;s create something extraordinary together. Book a consultation and discover what&apos;s possible.
            </p>
            <Link
              href="/book"
              className="inline-block bg-orange hover:bg-[#ff8533] px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:scale-105"
              style={{ color: '#ffffff' }}
            >
              Start Your Project
            </Link>
          </div>
        </ScrollReveal>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Logo Column — 3 cols */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-5">
              <span className="font-manrope text-2xl font-bold">
                <span className="text-orange">.</span>
                <span style={{ color: 'var(--foreground)' }}>creatorstick</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              A fresh, bold media agency crafting digital impact through creative storytelling and smart strategy. Based in India, building globally.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-orange hover:text-white hover:scale-110"
                  style={{
                    background: 'var(--glass-light-bg)',
                    border: '1px solid var(--glass-light-border)',
                    color: 'var(--text-muted)',
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns — 2 cols each */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-2">
              <h4
                className="font-semibold text-xs uppercase tracking-[0.2em] mb-5"
                style={{ color: 'var(--foreground)' }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-300 hover:text-orange"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter — 3 cols */}
          <div className="lg:col-span-3">
            <h4
              className="font-semibold text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: 'var(--foreground)' }}
            >
              Stay Updated
            </h4>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Get the latest insights on media, marketing, and creative strategy.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--foreground)',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-orange hover:bg-[#ff8533] px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{ color: '#ffffff' }}
              >
                Subscribe →
              </motion.button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ background: 'var(--section-border)' }} />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Creatorstick Media Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm transition-colors hover:text-orange" style={{ color: 'var(--text-muted)' }}>
              Privacy
            </Link>
            <Link href="/terms" className="text-sm transition-colors hover:text-orange" style={{ color: 'var(--text-muted)' }}>
              Terms
            </Link>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Crafted with ❤️ in India 🇮🇳
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
