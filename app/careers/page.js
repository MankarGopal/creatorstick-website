'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import ParallaxText from '../components/ParallaxText';

const openings = [
  {
    title: 'Senior Brand Strategist',
    department: 'Strategy',
    location: 'Mumbai / Remote',
    type: 'Full-time',
    desc: 'Lead brand strategy development for top-tier clients. You\'ll shape brand narratives and drive strategic direction across multi-channel campaigns.',
    requirements: ['5+ years brand strategy experience', 'Strong presentation skills', 'Agency experience preferred', 'Portfolio of brand case studies'],
  },
  {
    title: 'Content Producer',
    department: 'Production',
    location: 'Mumbai',
    type: 'Full-time',
    desc: 'Own content production from ideation to delivery. You\'ll work with creators, brands, and our internal team to produce compelling content.',
    requirements: ['3+ years content production', 'Video & photo production experience', 'Project management skills', 'Knowledge of social platforms'],
  },
  {
    title: 'Social Media Manager',
    department: 'Marketing',
    location: 'Mumbai / Hybrid',
    type: 'Full-time',
    desc: 'Manage social media for multiple brand accounts. Create content calendars, grow audiences, and report on performance.',
    requirements: ['2+ years social media management', 'Copywriting skills', 'Analytics proficiency', 'Trend awareness'],
  },
  {
    title: 'Motion Graphics Designer',
    department: 'Creative',
    location: 'Remote',
    type: 'Full-time',
    desc: 'Create stunning motion graphics and animations for social content, brand campaigns, and corporate videos.',
    requirements: ['After Effects expertise', 'Cinema 4D is a plus', 'Strong design portfolio', 'Understanding of social platforms'],
  },
  {
    title: 'Business Development Manager',
    department: 'Sales',
    location: 'Mumbai / Delhi',
    type: 'Full-time',
    desc: 'Drive new business acquisition and manage client relationships. You\'ll identify opportunities and close deals with major brands.',
    requirements: ['3+ years B2B sales', 'Media/advertising industry experience', 'Strong network', 'Excellent communication'],
  },
  {
    title: 'Data Analyst (Marketing)',
    department: 'Analytics',
    location: 'Remote',
    type: 'Full-time',
    desc: 'Analyze campaign performance, build dashboards, and provide actionable insights to optimize marketing strategies.',
    requirements: ['SQL & Python proficiency', 'Experience with analytics tools', 'Strong visualization skills', 'Marketing data experience'],
  },
];

const perks = [
  { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>, title: 'Flexible Work', desc: 'Hybrid and remote options available' },
  { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>, title: 'Learning Budget', desc: '₹50K annual learning & development' },
  { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>, title: 'Health Insurance', desc: 'Comprehensive coverage for you & family' },
  { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>, title: 'Fun Culture', desc: 'Team events, game nights, offsite trips' },
  { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>, title: 'Growth Path', desc: 'Clear career progression & mentorship' },
  { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>, title: 'Competitive Pay', desc: 'Above-market compensation & bonuses' },
  { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>, title: 'Generous PTO', desc: '24 days paid leave + holidays' },
  { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>, title: 'Meal Allowance', desc: 'Daily meal credits for in-office days' },
];

const values = [
  { title: 'Bold Creativity', desc: 'We push boundaries and challenge conventions. Mediocrity has no place here.' },
  { title: 'Data-Driven', desc: 'Every decision is backed by insights. We measure, learn, and optimize.' },
  { title: 'Client Obsessed', desc: 'Our clients\' success is our success. We go above and beyond, always.' },
  { title: 'Team First', desc: 'We believe in collaboration, respect, and lifting each other up.' },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', position: '', experience: '',
    portfolio: '', resume: '', coverLetter: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 grid-pattern" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-light rounded-full px-5 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
              <span className="text-sm text-gray">We&apos;re Hiring!</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-[0.95] mb-6"
            >
              Build Your
              <br />
              <span className="gradient-text">Career Here</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray text-xl max-w-2xl mb-10 leading-relaxed"
            >
              Get in on the ground floor. Join a passionate, fast-moving team of creators 
              and strategists building the next big media agency from scratch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a href="#openings" className="bg-orange hover:bg-[#ff8533] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)]">
                View Open Positions ({openings.length})
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Our DNA</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat">
                Our <span className="gradient-text">Values</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <h3 className="text-xl font-bold font-montserrat mb-3">{v.title}</h3>
                  <p className="text-gray text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Benefits</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat">
                Why <span className="gradient-text">Join Us</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -5, borderColor: 'rgba(255,107,0,0.2)' }}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center h-full"
                >
                  <div className="text-3xl mb-3">{perk.icon}</div>
                  <h3 className="font-bold font-montserrat mb-1 text-sm">{perk.title}</h3>
                  <p className="text-gray text-xs">{perk.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax */}
      <section className="py-16 overflow-hidden">
        <ParallaxText speed={-0.3}>
          <h2 className="text-[8rem] md:text-[12rem] font-bold font-montserrat gradient-text uppercase tracking-tight leading-none text-center">
            Careers
          </h2>
        </ParallaxText>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Openings</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat">
                Open <span className="gradient-text">Positions</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {openings.map((job, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <motion.div
                  className="border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
                >
                  <button
                    onClick={() => setSelectedJob(selectedJob === i ? null : i)}
                    className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div>
                      <h3 className="text-lg font-bold font-montserrat">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="text-xs text-orange">{job.department}</span>
                        <span className="text-xs text-gray">•</span>
                        <span className="text-xs text-gray">{job.location}</span>
                        <span className="text-xs text-gray">•</span>
                        <span className="text-xs text-gray">{job.type}</span>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: selectedJob === i ? 45 : 0 }}
                      className="text-orange text-2xl flex-shrink-0"
                    >
                      +
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: selectedJob === i ? 'auto' : 0,
                      opacity: selectedJob === i ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-white/5 pt-4">
                      <p className="text-gray text-sm leading-relaxed mb-4">{job.desc}</p>
                      <h4 className="text-sm font-semibold mb-3">Requirements</h4>
                      <ul className="space-y-2 mb-6">
                        {job.requirements.map((r) => (
                          <li key={r} className="text-gray text-sm flex items-center gap-2">
                            <span className="text-orange text-xs">✦</span> {r}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#apply"
                        onClick={() => setFormData(prev => ({ ...prev, position: job.title }))}
                        className="inline-block bg-orange hover:bg-[#ff8533] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                      >
                        Apply for this Role
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Apply Now</p>
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
                Join Our <span className="gradient-text">Team</span>
              </h2>
              <p className="text-gray text-lg">Fill out the form below. We review every application carefully.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray mb-2">Full Name *</label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray mb-2">Email *</label>
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray mb-2">Position Applying For *</label>
                  <select
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white"
                  >
                    <option value="" className="bg-dark">Select Position</option>
                    {openings.map((job) => (
                      <option key={job.title} value={job.title} className="bg-dark">{job.title}</option>
                    ))}
                    <option value="other" className="bg-dark">Other / General Application</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray mb-2">Years of Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white"
                  >
                    <option value="" className="bg-dark">Select</option>
                    <option value="0-1" className="bg-dark">0-1 years</option>
                    <option value="1-3" className="bg-dark">1-3 years</option>
                    <option value="3-5" className="bg-dark">3-5 years</option>
                    <option value="5-8" className="bg-dark">5-8 years</option>
                    <option value="8+" className="bg-dark">8+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray mb-2">Portfolio / LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray mb-2">Resume / CV Link *</label>
                <input
                  type="url" required
                  value={formData.resume}
                  onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50"
                  placeholder="Google Drive / Dropbox link to your resume"
                />
                <p className="text-gray/50 text-xs mt-1">Upload to Google Drive or Dropbox and share the link</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray mb-2">Cover Letter / Why Creatorstick?</label>
                <textarea
                  rows={5}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50 resize-none"
                  placeholder="Tell us why you want to join Creatorstick and what makes you the perfect fit..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${submitting ? 'bg-orange/50 cursor-wait' : 'bg-orange hover:bg-[#ff8533] hover:shadow-[0_0_30px_rgba(255,107,0,0.3)]'} text-white`}
              >
                {submitting ? 'Submitting...' : submitted ? '✓ Application Submitted Successfully!' : 'Submit Application'}
              </button>
              {submitError && <p className="text-red-400 text-sm text-center mt-3">{submitError}</p>}
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
