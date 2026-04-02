'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const serviceCategories = [
  {
    id: 'brand-strategy',
    name: 'Brand Strategy',
    desc: 'Strategic brand positioning and narrative development',
    icon: '◆',
  },
  {
    id: 'influencer-marketing',
    name: 'Influencer Marketing',
    desc: 'Creator partnerships and campaign management',
    icon: '▲',
  },
  {
    id: 'content-production',
    name: 'Content Production',
    desc: 'Video, photo, and creative content creation',
    icon: '●',
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    desc: 'Full social media management and growth',
    icon: '■',
  },
  {
    id: 'paid-media',
    name: 'Paid Media & Ads',
    desc: 'Strategic ad campaigns across all platforms',
    icon: '◈',
  },
  {
    id: 'corporate-film',
    name: 'Corporate Film & Video',
    desc: 'Professional corporate video production',
    icon: '✦',
  },
  {
    id: 'web-development',
    name: 'Web Design & Development',
    desc: 'Custom website design and development',
    icon: '⬡',
  },
  {
    id: 'consulting',
    name: 'Strategic Consulting',
    desc: 'Expert advisory and consulting sessions',
    icon: '◇',
  },
];

const budgetRanges = [
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000 - ₹5,00,000',
  '₹5,00,000+',
];

const timelines = [
  'ASAP (Rush)',
  '1-2 weeks',
  '2-4 weeks',
  '1-2 months',
  '3+ months',
  'Ongoing / Retainer',
];

export default function BookService() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    services: [],
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    budget: '',
    timeline: '',
    projectDetails: '',
    goals: '',
    audience: '',
    referral: '',
    date: '',
    time: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const totalSteps = 4;

  const toggleService = (id) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id],
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/bookings', {
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
    } catch (err) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.services.length > 0;
      case 2: return formData.name && formData.email;
      case 3: return formData.budget && formData.timeline;
      case 4: return true;
      default: return false;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <span className="text-5xl">✓</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
            Booking <span className="gradient-text">Confirmed!</span>
          </h1>
          <p className="text-gray text-lg mb-3">
            Thank you, <strong className="text-white">{formData.name}</strong>!
          </p>
          <p className="text-gray mb-8">
            We&apos;ve received your booking request and our team will reach out to you at{' '}
            <strong className="text-orange">{formData.email}</strong> within 24 hours to confirm the details.
          </p>
          <div className="glass-light rounded-2xl p-6 text-left mb-8">
            <h3 className="font-semibold text-white mb-4">Booking Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray">Services</span>
                <span className="text-white">
                  {formData.services.map(id => serviceCategories.find(s => s.id === id)?.name).join(', ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray">Budget</span>
                <span className="text-white">{formData.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray">Timeline</span>
                <span className="text-white">{formData.timeline}</span>
              </div>
              {formData.date && (
                <div className="flex justify-between">
                  <span className="text-gray">Preferred Date</span>
                  <span className="text-white">{formData.date}</span>
                </div>
              )}
            </div>
          </div>
          <a href="/" className="inline-block bg-orange hover:bg-[#ff8533] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid-pattern" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-4">
              Book a <span className="gradient-text">Service</span>
            </h1>
            <p className="text-gray text-lg max-w-xl mx-auto">
              Tell us about your project and we&apos;ll create a custom proposal tailored to your needs.
            </p>
          </div>
        </ScrollReveal>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: step >= s ? '#FF6B00' : 'rgba(255,255,255,0.05)',
                    borderColor: step >= s ? '#FF6B00' : 'rgba(255,255,255,0.1)',
                  }}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold"
                >
                  {step > s ? '✓' : s}
                </motion.div>
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-white/5 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-orange rounded-full"
              animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray">
            <span>Services</span>
            <span>Details</span>
            <span>Budget</span>
            <span>Schedule</span>
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Select Services */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-montserrat mb-2">Select Services</h2>
                <p className="text-gray text-sm mb-8">Choose one or more services you&apos;re interested in.</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {serviceCategories.map((service) => (
                    <motion.button
                      type="button"
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleService(service.id)}
                      className={`p-6 rounded-xl border text-left transition-all duration-300 ${
                        formData.services.includes(service.id)
                          ? 'border-orange bg-orange/10'
                          : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-2xl ${formData.services.includes(service.id) ? 'text-orange' : 'text-white/30'}`}>
                          {service.icon}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.services.includes(service.id)
                            ? 'border-orange bg-orange'
                            : 'border-white/20'
                        }`}>
                          {formData.services.includes(service.id) && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                      </div>
                      <h3 className="font-bold font-montserrat mb-1">{service.name}</h3>
                      <p className="text-gray text-xs">{service.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-montserrat mb-2">Your Details</h2>
                <p className="text-gray text-sm mb-8">Tell us about yourself and your business.</p>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray mb-2">Full Name *</label>
                      <input
                        type="text" required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50"
                        placeholder="Your name"
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
                      <label className="block text-sm font-medium text-gray mb-2">Company / Brand</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50"
                        placeholder="Company name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray mb-2">Website (if any)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray mb-2">Target Audience</label>
                    <input
                      type="text"
                      value={formData.audience}
                      onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50"
                      placeholder="e.g. Young professionals 25-35, Tech enthusiasts"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Budget & Timeline */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-montserrat mb-2">Budget & Timeline</h2>
                <p className="text-gray text-sm mb-8">Help us understand your budget and timeline expectations.</p>

                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-gray mb-4">Budget Range *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {budgetRanges.map((range) => (
                        <motion.button
                          type="button"
                          key={range}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, budget: range })}
                          className={`p-4 rounded-xl border text-sm text-left transition-all duration-300 ${
                            formData.budget === range
                              ? 'border-orange bg-orange/10 text-white'
                              : 'border-white/5 bg-white/[0.02] text-gray hover:border-white/10'
                          }`}
                        >
                          {range}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray mb-4">Timeline *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timelines.map((t) => (
                        <motion.button
                          type="button"
                          key={t}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, timeline: t })}
                          className={`p-4 rounded-xl border text-sm text-left transition-all duration-300 ${
                            formData.timeline === t
                              ? 'border-orange bg-orange/10 text-white'
                              : 'border-white/5 bg-white/[0.02] text-gray hover:border-white/10'
                          }`}
                        >
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray mb-2">Project Details</label>
                    <textarea
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50 resize-none"
                      placeholder="Describe your project, goals, and any specific requirements..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray mb-2">Key Goals / KPIs</label>
                    <textarea
                      rows={3}
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray/50 resize-none"
                      placeholder="What does success look like? e.g., 10K followers, 2x sales..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Schedule & Confirm */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-montserrat mb-2">Schedule & Confirm</h2>
                <p className="text-gray text-sm mb-8">Choose a preferred consultation time and review your booking.</p>

                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray mb-2">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray mb-2">Preferred Time</label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white"
                      >
                        <option value="" className="bg-dark">Select Time</option>
                        <option value="10:00 AM" className="bg-dark">10:00 AM</option>
                        <option value="11:00 AM" className="bg-dark">11:00 AM</option>
                        <option value="12:00 PM" className="bg-dark">12:00 PM</option>
                        <option value="02:00 PM" className="bg-dark">02:00 PM</option>
                        <option value="03:00 PM" className="bg-dark">03:00 PM</option>
                        <option value="04:00 PM" className="bg-dark">04:00 PM</option>
                        <option value="05:00 PM" className="bg-dark">05:00 PM</option>
                        <option value="06:00 PM" className="bg-dark">06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray mb-2">How did you hear about us?</label>
                    <select
                      value={formData.referral}
                      onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white"
                    >
                      <option value="" className="bg-dark">Select</option>
                      <option value="google" className="bg-dark">Google Search</option>
                      <option value="social" className="bg-dark">Social Media</option>
                      <option value="referral" className="bg-dark">Referral</option>
                      <option value="event" className="bg-dark">Event / Conference</option>
                      <option value="other" className="bg-dark">Other</option>
                    </select>
                  </div>

                  {/* Booking Summary */}
                  <div className="glass-light rounded-2xl p-6">
                    <h3 className="font-semibold text-white mb-4 text-lg">Booking Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-gray">Services</span>
                        <span className="text-white text-right max-w-[60%]">
                          {formData.services.map(id => serviceCategories.find(s => s.id === id)?.name).join(', ') || 'None selected'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-gray">Name</span>
                        <span className="text-white">{formData.name || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-gray">Email</span>
                        <span className="text-white">{formData.email || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-gray">Company</span>
                        <span className="text-white">{formData.company || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-gray">Budget</span>
                        <span className="text-orange font-semibold">{formData.budget || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-gray">Timeline</span>
                        <span className="text-white">{formData.timeline || '-'}</span>
                      </div>
                      {formData.date && (
                        <div className="flex justify-between">
                          <span className="text-gray">Consultation</span>
                          <span className="text-white">{formData.date} {formData.time && `at ${formData.time}`}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12">
            <button
              type="button"
              onClick={prevStep}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                step === 1
                  ? 'opacity-0 pointer-events-none'
                  : 'border border-white/20 hover:border-orange text-white'
              }`}
            >
              ← Back
            </button>

            {step < totalSteps ? (
              <motion.button
                type="button"
                whileHover={{ scale: canProceed() ? 1.03 : 1 }}
                whileTap={{ scale: canProceed() ? 0.97 : 1 }}
                onClick={nextStep}
                disabled={!canProceed()}
                className={`px-10 py-3 rounded-full font-semibold transition-all duration-300 ${
                  canProceed()
                    ? 'bg-orange hover:bg-[#ff8533] text-white hover:shadow-[0_0_30px_rgba(255,107,0,0.3)]'
                    : 'bg-white/5 text-gray cursor-not-allowed'
                }`}
              >
                Continue →
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                whileHover={{ scale: submitting ? 1 : 1.03 }}
                whileTap={{ scale: submitting ? 1 : 0.97 }}
                disabled={submitting}
                className={`px-10 py-3 rounded-full font-semibold transition-all duration-300 ${submitting ? 'bg-orange/50 cursor-wait' : 'bg-orange hover:bg-[#ff8533] hover:shadow-[0_0_40px_rgba(255,107,0,0.4)]'} text-white`}
              >
                {submitting ? 'Submitting...' : 'Confirm Booking ✓'}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
