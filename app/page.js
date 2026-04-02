'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from './components/ScrollReveal';
import ParallaxText, { ParallaxMarquee } from './components/ParallaxText';
import AnimatedCounter from './components/AnimatedCounter';
import MagneticButton from './components/MagneticButton';

const services = [
  {
    num: '01',
    title: 'Brand Strategy',
    desc: 'We craft compelling brand narratives that resonate with your audience and drive meaningful engagement across all touchpoints.',
    icon: '◆',
  },
  {
    num: '02',
    title: 'Creator Marketing',
    desc: 'Connect with top-tier creators who authentically represent your brand and amplify your message to millions.',
    icon: '▲',
  },
  {
    num: '03',
    title: 'Content Production',
    desc: 'From concept to delivery, we produce stunning visual content that captivates audiences and elevates your brand.',
    icon: '●',
  },
  {
    num: '04',
    title: 'Digital Campaigns',
    desc: 'Data-driven campaigns that maximize ROI and deliver measurable results across every digital platform.',
    icon: '■',
  },
  {
    num: '05',
    title: 'Social Management',
    desc: 'Full-service social media management that grows communities and creates meaningful conversations.',
    icon: '◈',
  },
  {
    num: '06',
    title: 'Performance Marketing',
    desc: 'Strategic ad placement and optimization to reach the right audience at the right moment with precision.',
    icon: '✦',
  },
];

const capabilities = [
  'BRANDING', 'INTERIOR SHOOTS', 'FASHION CAMPAIGNS', 'REAL ESTATE',
  'CONTENT CREATION', 'SOCIAL MEDIA', 'PERFORMANCE MARKETING',
  'CREATOR PARTNERSHIPS', 'DIGITAL STRATEGY', 'VIDEO PRODUCTION',
  'INFLUENCER MARKETING', 'BRAND STORYTELLING',
];

const stats = [
  { number: 25, suffix: '+', label: 'Projects Launched' },
  { number: 15, suffix: '+', label: 'Happy Clients' },
  { number: 100, suffix: '%', label: 'Passion Driven' },
  { number: 5, suffix: 'M+', label: 'Reach Generated' },
];

const testimonials = [
  {
    quote: "We took a chance on Creatorstick for our brand launch and it paid off big time. Their energy and creativity is unmatched — they feel like a founding team member.",
    author: "Rahul Mehra",
    role: "Founder, TechVenture Inc.",
  },
  {
    quote: "For a new agency, their output is insane. Fresh ideas, fast execution, and they genuinely care about results. Can't recommend them enough.",
    author: "Ananya Desai",
    role: "Brand Lead, UrbanStyle",
  },
  {
    quote: "Creatorstick brought the hunger and creativity that bigger agencies have lost. They helped us go from zero to a real brand presence in weeks.",
    author: "Priya Sharma",
    role: "Founder, BloomHealth",
  },
];

const portfolioProjects = [
  { src: '/work/interior-1.png', title: 'Luxury Living Room', category: 'Interior Shoots', client: 'HomeVista Interiors', desc: 'Premium residential interior photography showcasing modern luxury living spaces.', span: 'lg:row-span-2' },
  { src: '/work/fashion-1.png', title: 'Urban Edge Collection', category: 'Fashion', client: 'Velour Studios', desc: 'High-end editorial campaign with cinematic lighting and bold aesthetics.', span: '' },
  { src: '/work/realestate-1.png', title: 'Sunset Villa Estate', category: 'Real Estate', client: 'Prestige Properties', desc: 'Golden hour exterior shoot for a luxury villa listing with pool and landscape.', span: '' },
  { src: '/work/fashion-2.png', title: 'Golden Hour Lookbook', category: 'Fashion', client: 'AuraWear', desc: 'Rooftop fashion lookbook with golden hour lighting and premium color grading.', span: '' },
  { src: '/work/realestate-2.png', title: 'Skyline Penthouse', category: 'Real Estate', client: 'Luxe Realty Group', desc: 'Interior and exterior photography for a premium penthouse with panoramic city views.', span: '' },
  { src: '/work/interior-2.png', title: 'Designer Kitchen Suite', category: 'Interior Shoots', client: 'ArchLine Designs', desc: 'Architectural photography of a high-end kitchen with custom cabinetry and marble.', span: '' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.9]);

  const scrollFrameRef = useRef(null);
  const { scrollYProgress: frameProgress } = useScroll({
    target: scrollFrameRef,
    offset: ['start end', 'end start'],
  });
  
  const frameScale = useTransform(frameProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const frameRotate = useTransform(frameProgress, [0, 1], [-5, 5]);

  return (
    <div className="relative">
      {/* ============= HERO SECTION ============= */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
        {/* Background Grid */}
        <div className="absolute inset-0 grid-pattern" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 60, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[100px]"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center flex-1"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--muted)' }}>Fresh. Bold. Creative.</span>
          </motion.div>

          {/* Hero Heading */}
          <div className="overflow-hidden pt-1 pb-8 -mb-7">
            <motion.h1
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-[0.95] tracking-tight pb-[0.2em] -mb-[0.2em]"
              style={{ color: 'var(--heading)' }}
            >
              We Create
            </motion.h1>
          </div>
          <div className="overflow-hidden pt-1 pb-8 -mb-7">
            <motion.h1
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-[0.95] tracking-tight gradient-text pb-[0.2em] -mb-[0.2em]"
            >
              Digital Impact
            </motion.h1>
          </div>
          <div className="overflow-hidden pt-1 pb-8 -mb-3">
            <motion.h1
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-[0.95] tracking-tight pb-[0.2em] -mb-[0.2em]"
              style={{ color: 'var(--text-subtle)' }}
            >
              That Lasts
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            A new-age media agency on a mission to transform brands through bold storytelling, 
            creative campaigns, and next-gen digital strategy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/book"
              className="bg-orange hover:bg-[#ff8533] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:scale-105"
              style={{ color: '#ffffff' }}
            >
              Start Your Project
            </Link>
            <Link
              href="/for-brands"
              className="px-10 py-4 rounded-full text-lg font-medium transition-all duration-300"
              style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="relative z-10 mt-auto"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full flex items-start justify-center p-1"
            style={{ border: '2px solid var(--border-hover)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-orange rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ============= MARQUEE ============= */}
      <section className="py-8" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <ParallaxMarquee text="CREATORSTICK MEDIA" />
      </section>

      {/* ============= CAPABILITIES MARQUEE ============= */}
      <section className="py-16" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.2em] text-center mb-10" style={{ color: 'var(--muted)' }}>
              What We Bring to the Table
            </p>
          </ScrollReveal>
          <div className="overflow-hidden">
            <div className="animate-marquee flex">
              {[...capabilities, ...capabilities].map((cap, i) => (
                <span
                  key={i}
                  className="mx-8 flex items-center gap-4 whitespace-nowrap"
                >
                  <span className="text-xl md:text-2xl font-bold font-montserrat tracking-widest cursor-default hover:text-orange transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>
                    {cap}
                  </span>
                  <span className="text-orange text-xs">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= ABOUT SECTION ============= */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal direction="left">
                <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                  Who We Are
                </p>
                <h2 className="text-4xl md:text-6xl font-bold font-montserrat leading-tight mb-6" style={{ color: 'var(--heading)' }}>
                  The New Era of <br />
                  <span className="gradient-text">Media & Creativity</span>
                </h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
                  Creatorstick Media is a fresh, hungry, and ambitious team of creatives, 
                  strategists, and storytellers. We launched with a single mission — to help 
                  brands stand out in a noisy digital world through authentic content, smart 
                  strategy, and relentless innovation.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/for-brands"
                    className="bg-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-[#ff8533] transition-all duration-300"
                    style={{ color: '#ffffff' }}
                  >
                    Our Work
                  </Link>
                  <Link
                    href="/careers"
                    className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:text-orange"
                    style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}
                  >
                    Join Us
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <div ref={scrollFrameRef} className="relative">
                <motion.div
                  className="aspect-square rounded-3xl p-8 flex items-center justify-center"
                  style={{ scale: frameScale, rotateZ: frameRotate, background: 'linear-gradient(135deg, var(--card-glow), transparent)', border: '1px solid var(--border)' }}
                >
                  <div className="text-center">
                    <div className="text-7xl md:text-8xl font-bold gradient-text font-montserrat mb-2">∞</div>
                    <div style={{ color: 'var(--heading)' }} className="text-xl font-bold font-montserrat mb-1">Limitless Ideas</div>
                    <div style={{ color: 'var(--muted)' }} className="text-sm">One Bold Vision</div>
                  </div>
                </motion.div>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-orange/10 rounded-2xl border border-orange/20 flex items-center justify-center"
                >
                  <span className="text-orange text-2xl">◆</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--glass-light-bg)', border: '1px solid var(--glass-light-border)' }}
                >
                  <span className="text-xl" style={{ color: 'var(--muted)' }}>✦</span>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============= STATS SECTION ============= */}
      <section className="py-20" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= SERVICES SECTION ============= */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                What We Do
              </p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Our <span className="gradient-text">Services</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group p-8 rounded-2xl cursor-pointer h-full transition-all duration-500 t-card"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl text-orange/50 group-hover:text-orange transition-colors">
                      {service.icon}
                    </span>
                    <span className="text-sm font-mono" style={{ color: 'var(--text-subtle)' }}>{service.num}</span>
                  </div>
                  <h3 className="text-xl font-bold font-montserrat mb-3 group-hover:text-orange transition-colors" style={{ color: 'var(--heading)' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {service.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= OUR WORK / PORTFOLIO ============= */}
      <section className="py-32 relative" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-6">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Portfolio
              </p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Our <span className="gradient-text">Work</span>
              </h2>
              <p className="text-base mt-4 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
                From luxury interiors to high-end fashion campaigns and premium real estate — here&apos;s a glimpse of what we create.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Pills */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
              {['All', 'Interior Shoots', 'Fashion', 'Real Estate'].map((cat) => (
                <span
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-orange text-white'
                      : ''
                  }`}
                  style={activeCategory !== cat ? { color: 'var(--muted)', border: '1px solid var(--border)', background: 'var(--glass-light-bg)' } : { color: '#ffffff' }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Portfolio Grid — Masonry style */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {portfolioProjects.filter(p => activeCategory === 'All' || p.category === activeCategory).map((project, i) => (
                <ScrollReveal key={project.title} delay={i * 0.1}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -6 }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer ${project.span}`}
                  style={{ border: '1px solid var(--border)' }}
                >
                  {/* Image */}
                  <div className={`overflow-hidden ${project.span === 'lg:row-span-2' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                    <motion.img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    {/* Category Tag */}
                    <motion.span
                      initial={{ y: 10, opacity: 0 }}
                      className="inline-block w-fit bg-orange/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 opacity-0 translate-y-2"
                    >
                      {project.category}
                    </motion.span>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-montserrat text-white mb-1 group-hover:translate-y-0 translate-y-3 transition-transform duration-500 delay-150">
                      {project.title}
                    </h3>

                    {/* Client */}
                    <p className="text-orange/80 text-sm font-medium mb-2 group-hover:translate-y-0 translate-y-3 transition-transform duration-500 delay-200">
                      {project.client}
                    </p>

                    {/* Description */}
                    <p className="text-white/70 text-xs leading-relaxed group-hover:translate-y-0 translate-y-3 transition-transform duration-500 delay-[250ms]">
                      {project.desc}
                    </p>

                    {/* View icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:opacity-100 opacity-0 transition-all duration-500 delay-100 group-hover:scale-100 scale-75">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6" />
                        <path d="M10 14L21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
            </AnimatePresence>
          </motion.div>

          {/* View More CTA */}
          <ScrollReveal>
            <div className="text-center mt-14">
              <Link
                href="/for-brands"
                className="inline-flex items-center gap-2 bg-orange hover:bg-[#ff8533] px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:scale-105"
                style={{ color: '#ffffff' }}
              >
                View All Projects
                <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <section className="py-20 relative overflow-hidden">
        <ParallaxText speed={-0.3} axis="x" className="text-center">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-montserrat uppercase tracking-tight leading-none" style={{ color: 'var(--text-subtle)' }}>
            Strategy
          </h2>
        </ParallaxText>
        <ParallaxText speed={0.3} axis="x" className="text-center -mt-8">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-montserrat gradient-text uppercase tracking-tight leading-none">
            Creativity
          </h2>
        </ParallaxText>
        <ParallaxText speed={-0.2} axis="x" className="text-center -mt-8">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-montserrat uppercase tracking-tight leading-none" style={{ color: 'var(--text-subtle)' }}>
            Results
          </h2>
        </ParallaxText>
      </section>

      {/* ============= PROCESS SECTION ============= */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Our Process
              </p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                How We <span className="gradient-text">Work</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Deep dive into your brand, audience, and goals to build a strategic foundation.' },
              { step: '02', title: 'Strategy', desc: 'Develop data-driven strategies tailored to your unique objectives and market.' },
              { step: '03', title: 'Execute', desc: 'Bring ideas to life with precision, creativity, and unwavering quality standards.' },
              { step: '04', title: 'Optimize', desc: 'Continuously refine and improve based on real performance data and insights.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative">
                  <div className="text-6xl font-bold font-montserrat text-orange/10 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold font-montserrat mb-3" style={{ color: 'var(--heading)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 right-0 w-full h-[1px] bg-gradient-to-r from-orange/20 to-transparent" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= TESTIMONIALS ============= */}
      <section className="py-32 relative" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Client Stories
              </p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                What They <span className="gradient-text">Say</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl h-full flex flex-col t-card"
                >
                  <div className="text-orange text-4xl mb-6">&quot;</div>
                  <p className="text-base leading-relaxed mb-6 flex-1" style={{ color: 'var(--fg)', opacity: 0.8 }}>
                    {t.quote}
                  </p>
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--heading)' }}>{t.author}</p>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>{t.role}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= WHO WE SERVE ============= */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Who We Serve
              </p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Solutions For <span className="gradient-text">Everyone</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'For Brands', desc: 'Strategic partnerships and campaigns that amplify your brand presence.', href: '/for-brands', icon: '◆' },
              { title: 'For Creators', desc: 'Grow your influence with premium brand collaborations and support.', href: '/for-creators', icon: '▲' },
              { title: 'Small Business', desc: 'Affordable, impactful marketing solutions tailored to your budget.', href: '/for-small-business', icon: '●' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Link href={item.href} className="block group">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="p-8 rounded-2xl transition-all duration-500 h-full t-card"
                  >
                    <span className="text-4xl text-orange/30 group-hover:text-orange transition-colors block mb-6">
                      {item.icon}
                    </span>
                    <h3 className="text-xl font-bold font-montserrat mb-3 group-hover:text-orange transition-colors" style={{ color: 'var(--heading)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{item.desc}</p>
                    <span className="text-orange text-sm font-medium flex items-center gap-2">
                      Explore
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </span>
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
