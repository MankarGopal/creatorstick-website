'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const LAUNCH_DATE = new Date('2026-04-03T00:00:00');

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownUnit({ value, label }) {
  const str = String(value).padStart(2, '0');
  return (
    <div className="cs-countdown-unit">
      <div className="cs-countdown-number">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={str}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="cs-countdown-digit"
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="cs-countdown-label">{label}</span>
    </div>
  );
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  const marqueeItems = [
    'BRAND STRATEGY', 'CREATOR MARKETING', 'CONTENT PRODUCTION',
    'DIGITAL CAMPAIGNS', 'SOCIAL MEDIA', 'PERFORMANCE MARKETING',
    'BRAND STORYTELLING', 'INFLUENCER MARKETING',
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cs-root {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* ── NOISE OVERLAY ── */
        .cs-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        /* ── GRID PATTERN ── */
        .cs-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* ── HERO ── */
        .cs-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6rem 1.5rem 4rem;
          overflow: hidden;
        }

        /* ── ORB BG ── */
        .cs-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .cs-orb-1 {
          width: 600px; height: 600px;
          background: rgba(255,107,0,0.12);
          top: -100px; right: -150px;
        }
        .cs-orb-2 {
          width: 500px; height: 500px;
          background: rgba(255,107,0,0.06);
          bottom: -100px; left: -100px;
        }
        .cs-orb-3 {
          width: 300px; height: 300px;
          background: rgba(255,140,0,0.08);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }

        /* ── HERO CONTENT ── */
        .cs-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          width: 100%;
        }

        /* ── DEV BADGE ── */
        .cs-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,107,0,0.25);
          border-radius: 100px;
          padding: 8px 20px;
          margin-bottom: 2.5rem;
          backdrop-filter: blur(12px);
        }
        .cs-badge-dot {
          width: 8px; height: 8px;
          background: #FF6B00;
          border-radius: 50%;
          animation: badge-pulse 2s ease-in-out infinite;
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,0,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(255,107,0,0); }
        }
        .cs-badge-text {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #FF6B00;
        }

        /* ── HEADLINE ── */
        .cs-headline {
          font-size: clamp(2.8rem, 9.5vw, 7rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 1.5rem;
          overflow: visible;
        }
        .cs-headline-white { color: #ffffff; display: block; }
        .cs-headline-orange {
          display: block;
          background: linear-gradient(135deg, #FF6B00 0%, #ff8c38 50%, #ffb380 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cs-headline-dim {
          color: rgba(255,255,255,0.15);
          display: block;
        }

        /* ── SUBTEXT ── */
        .cs-sub {
          font-size: clamp(0.95rem, 2vw, 1.2rem);
          color: #888888;
          max-width: 560px;
          margin: 0 auto 3.5rem;
          line-height: 1.75;
          font-weight: 400;
        }

        /* ── PROGRESS BAR ── */
        .cs-progress-wrap {
          margin-bottom: 3.5rem;
        }
        .cs-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .cs-progress-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #555;
          font-weight: 600;
        }
        .cs-progress-pct {
          font-size: 0.85rem;
          font-weight: 700;
          color: #FF6B00;
        }
        .cs-progress-track {
          height: 4px;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          overflow: hidden;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
        }
        .cs-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF6B00, #ffb380);
          border-radius: 100px;
          box-shadow: 0 0 12px rgba(255,107,0,0.5);
        }

        /* ── COUNTDOWN ── */
        .cs-countdown {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(1rem, 3vw, 2.5rem);
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }
        .cs-countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .cs-countdown-number {
          position: relative;
          width: clamp(72px, 12vw, 110px);
          height: clamp(72px, 12vw, 110px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }
        .cs-countdown-number::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .cs-countdown-digit {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 800;
          color: #ffffff;
          font-variant-numeric: tabular-nums;
          display: block;
          font-family: 'Montserrat', sans-serif;
        }
        .cs-countdown-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #555;
          font-weight: 600;
        }
        .cs-countdown-sep {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 300;
          color: rgba(255,107,0,0.4);
          margin-top: -20px;
        }

        /* ── EMAIL FORM ── */
        .cs-form-wrap {
          max-width: 500px;
          margin: 0 auto 2.5rem;
        }
        .cs-form-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #555;
          font-weight: 600;
          display: block;
          margin-bottom: 0.75rem;
        }
        .cs-form {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .cs-input {
          flex: 1;
          min-width: 220px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          padding: 14px 24px;
          font-size: 0.9rem;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.3s, box-shadow 0.3s;
          outline: none;
        }
        .cs-input::placeholder { color: #444; }
        .cs-input:focus {
          border-color: #FF6B00;
          box-shadow: 0 0 0 3px rgba(255,107,0,0.1);
        }
        .cs-btn {
          background: #FF6B00;
          color: #ffffff;
          border: none;
          border-radius: 100px;
          padding: 14px 28px;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.3s;
          white-space: nowrap;
        }
        .cs-btn:hover {
          background: #ff8533;
          transform: translateY(-1px);
          box-shadow: 0 0 30px rgba(255,107,0,0.4);
        }
        .cs-btn:active { transform: translateY(0); }
        .cs-form-error {
          font-size: 0.78rem;
          color: #ff4444;
          margin-top: 0.5rem;
        }
        .cs-form-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.9rem;
          color: #FF6B00;
          font-weight: 600;
          padding: 14px 0;
        }
        .cs-form-success-icon {
          width: 24px; height: 24px;
          background: rgba(255,107,0,0.15);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
        }

        /* ── SOCIAL ── */
        .cs-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.875rem;
        }
        .cs-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #666;
          text-decoration: none;
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          flex-shrink: 0;
        }
        .cs-social-link svg {
          width: 18px; height: 18px;
          fill: currentColor;
          display: block;
          flex-shrink: 0;
        }
        .cs-social-link:hover {
          background: rgba(255,107,0,0.12);
          border-color: rgba(255,107,0,0.35);
          color: #FF6B00;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(255,107,0,0.2);
        }

        /* ── MARQUEE ── */
        .cs-marquee-section {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 1.25rem 0;
          overflow: hidden;
          background: rgba(255,255,255,0.01);
        }
        .cs-marquee-track {
          display: flex;
          animation: marquee-scroll 28s linear infinite;
          width: max-content;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cs-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
          padding: 0 2rem;
          white-space: nowrap;
        }
        .cs-marquee-text {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.12);
          transition: color 0.3s;
        }
        .cs-marquee-dot {
          width: 4px; height: 4px;
          background: rgba(255,107,0,0.4);
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── FOOTER LINE ── */
        .cs-footer {
          position: relative;
          z-index: 2;
          padding: 2rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .cs-footer-brand {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
        }
        .cs-footer-brand span { color: #FF6B00; }
        .cs-footer-copy {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.12);
          letter-spacing: 0.05em;
        }

        /* ── SCROLL INDICATOR ── */
        .cs-scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .cs-scroll-mouse {
          width: 24px; height: 38px;
          border: 2px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 5px;
        }
        .cs-scroll-dot {
          width: 4px; height: 4px;
          background: #FF6B00;
          border-radius: 50%;
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }
        .cs-scroll-text {
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
          font-weight: 600;
        }

        /* ── FEATURED TAGS ── */
        .cs-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 3rem;
        }
        .cs-tag {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          padding: 5px 14px;
        }
      `}</style>

      <div className="cs-root">
        {/* ── HERO ── */}
        <section ref={heroRef} className="cs-hero">
          <motion.div
            style={{ y: bgY }}
            className="cs-orb cs-orb-1"
            animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="cs-orb cs-orb-2"
            animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="cs-orb cs-orb-3"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="cs-grid" />

          <div className="cs-content">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="cs-badge"
              id="dev-badge"
            >
              <span className="cs-badge-dot" />
              <span className="cs-badge-text">Currently Under Development</span>
              <span className="cs-badge-dot" />
            </motion.div>

            {/* Headline */}
            <div style={{ marginBottom: '0.25rem' }}>
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="cs-headline">
                  <span className="cs-headline-white">Something</span>
                  <span className="cs-headline-orange">Bold</span>
                  <span className="cs-headline-dim">Is Coming</span>
                </span>
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="cs-sub"
            >
              Creatorstick Media is crafting a next-generation platform for brands, creators, and
              storytellers. We&apos;re heads-down building — and we&apos;ll be live before you know it.
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="cs-tags"
            >
              {['Brand Strategy', 'Creator Marketing', 'Content Production', 'Digital Campaigns', 'Social Media'].map((t) => (
                <span key={t} className="cs-tag">{t}</span>
              ))}
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="cs-progress-wrap"
            >
              <div className="cs-progress-header" style={{ maxWidth: 480, margin: '0 auto 0.75rem' }}>
                <span className="cs-progress-label">Development Progress</span>
                <span className="cs-progress-pct">65%</span>
              </div>
              <div className="cs-progress-track">
                <motion.div
                  className="cs-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1.8, delay: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <p className="cs-progress-label" style={{ marginBottom: '1.25rem' }}>Launching In</p>
              <div className="cs-countdown" id="countdown">
                <CountdownUnit value={days} label="Days" />
                <span className="cs-countdown-sep">:</span>
                <CountdownUnit value={hours} label="Hours" />
                <span className="cs-countdown-sep">:</span>
                <CountdownUnit value={minutes} label="Minutes" />
                <span className="cs-countdown-sep">:</span>
                <CountdownUnit value={seconds} label="Seconds" />
              </div>
            </motion.div>

            {/* Email Notify */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="cs-form-wrap"
            >
              <label className="cs-form-label" htmlFor="cs-email-input">
                Get notified on launch
              </label>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="cs-form-success"
                  >
                    <span className="cs-form-success-icon">✓</span>
                    You&apos;re on the list! We&apos;ll notify you at launch.
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="cs-form">
                      <input
                        id="cs-email-input"
                        type="email"
                        className="cs-input"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        aria-label="Email address"
                      />
                      <button type="submit" className="cs-btn" id="cs-notify-btn">
                        Notify Me
                      </button>
                    </div>
                    {error && <p className="cs-form-error">{error}</p>}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="cs-social"
              aria-label="Social media links"
            >
  {[
                {
                  title: 'Instagram',
                  href: 'https://instagram.com/creatorstick',
                  icon: (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  title: 'LinkedIn',
                  href: 'https://linkedin.com/company/creatorstick',
                  icon: (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
                {
                  title: 'X / Twitter',
                  href: 'https://twitter.com/creatorstick',
                  icon: (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
                {
                  title: 'YouTube',
                  href: 'https://youtube.com/@creatorstick',
                  icon: (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-social-link"
                  aria-label={s.title}
                  title={s.title}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="cs-scroll-hint"
          >
            <div className="cs-scroll-mouse">
              <div className="cs-scroll-dot" />
            </div>
            <span className="cs-scroll-text">Scroll</span>
          </motion.div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="cs-marquee-section">
          <div className="cs-marquee-track">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="cs-marquee-item">
                <span className="cs-marquee-text">{item}</span>
                <span className="cs-marquee-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="cs-footer">
          <div className="cs-footer-brand">
            CREATOR<span>STICK</span> MEDIA
          </div>
          <div className="cs-footer-copy">
            © {new Date().getFullYear()} Creatorstick Media Pvt Ltd. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
