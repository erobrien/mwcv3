import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Menu, X, Phone } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CONTENT } from './trt-v4/content';

import heroClinic from '@/assets/lp/trt-hero-clinic.jpg';
import providerPatient from '@/assets/lp/trt-provider-patient.jpg';
import firstVisitBloodwork from '@/assets/lp/first-visit-bloodwork.png';
import trtLab from '@/assets/lp/trt-lab.jpg';
import drPapariello from '@/assets/lp/dr-popariello.jpeg';
import mwcTeam from '@/assets/lp/mwc-team-scrubs.webp';
import lobbyInnslake from '@/assets/lp/lobby-innslake.jpg';

// ---------------------------------------------------------------------------
// FadeIn wrapper
// ---------------------------------------------------------------------------
const FadeIn = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.4, ease: 'easeOut', delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ---------------------------------------------------------------------------
// Eyebrow
// ---------------------------------------------------------------------------
const Eyebrow = ({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <p
    className={`text-xs font-semibold tracking-[0.18em] uppercase mb-4 ${
      light ? 'text-mwc-orange' : 'text-mwc-navy/60'
    }`}
  >
    {children}
  </p>
);

// ---------------------------------------------------------------------------
// Hero Form
// ---------------------------------------------------------------------------
interface FormState {
  name: string;
  email: string;
  phone: string;
  location: string;
  tcpa: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  tcpa?: string;
}

const THANK_YOU_URLS: Record<string, string> = {
  richmond: 'https://menswellnesscenters.com/thank-you-richmond/?source=lp-trt-v4',
  'newport-news': 'https://menswellnesscenters.com/thank-you-newport-news/?source=lp-trt-v4',
  'virginia-beach': 'https://menswellnesscenters.com/thank-you-virginia-beach/?source=lp-trt-v4',
};

const HeroForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    location: '',
    tcpa: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim() || !/^\+?[\d\s\-().]{7,}$/.test(form.phone))
      e.phone = 'Valid phone number is required';
    if (!form.location) e.location = 'Please select a location';
    if (!form.tcpa) e.tcpa = 'Please confirm your consent to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const url = THANK_YOU_URLS[form.location];
    if (url) window.location.href = url;
  };

  const inputClass =
    'h-12 w-full bg-white border border-mwc-line rounded-lg px-4 text-mwc-navy text-base outline-none focus:ring-2 focus:ring-mwc-orange/50 focus:border-mwc-orange transition-colors';
  const labelClass = 'block text-[11px] font-semibold uppercase tracking-[0.12em] text-mwc-inkMuted mb-2';

  return (
    <div
      id="hero-form"
      className="bg-mwc-cream rounded-2xl p-8 border border-mwc-line sticky top-[88px]"
    >
      <h3 className="font-fraunces text-2xl text-mwc-navy mb-6">{CONTENT.hero.formTitle}</h3>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            className={inputClass}
            placeholder="John Smith"
            value={form.name}
            onChange={(ev) => setForm({ ...form, name: ev.target.value })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            className={inputClass}
            placeholder="john@email.com"
            value={form.email}
            onChange={(ev) => setForm({ ...form, email: ev.target.value })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            className={inputClass}
            placeholder="(555) 000-0000"
            value={form.phone}
            onChange={(ev) => setForm({ ...form, phone: ev.target.value })}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>Nearest Location</label>
          <div className="relative">
            <select
              className={`${inputClass} appearance-none pr-10 cursor-pointer`}
              value={form.location}
              onChange={(ev) => setForm({ ...form, location: ev.target.value })}
            >
              <option value="">Select a location</option>
              {CONTENT.locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="h-4 w-4 text-mwc-inkMuted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        {/* TCPA */}
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id="tcpa-v4"
            checked={form.tcpa}
            onChange={(ev) => setForm({ ...form, tcpa: ev.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-mwc-line flex-shrink-0 cursor-pointer accent-[#E86A2C]"
          />
          <label htmlFor="tcpa-v4" className="text-[11px] text-mwc-inkMuted leading-relaxed cursor-pointer">
            By submitting, I consent to be contacted by Men's Wellness Centers via phone, text, or email
            regarding my inquiry. Message &amp; data rates may apply. Reply STOP to opt out.
          </label>
        </div>
        {errors.tcpa && <p className="text-red-500 text-xs -mt-3">{errors.tcpa}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full h-14 bg-mwc-orange text-white font-semibold text-[15px] tracking-wide rounded-xl hover:bg-[#C95A20] active:scale-[0.98] transition-all duration-150 disabled:opacity-60"
        >
          {submitting ? 'Redirecting...' : CONTENT.hero.ctaLabel}
        </button>
        <p className="text-[12px] text-mwc-inkMuted text-center">{CONTENT.hero.noCommitment}</p>
      </form>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------
const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Our Doctors', id: 'physician' },
    { label: 'Locations', id: 'locations' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled ? 'bg-mwc-navy/95 backdrop-blur-sm' : 'bg-mwc-navy'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 w-full flex items-center justify-between">
          {/* Logo */}
          <a href="/lp/trt-v4" className="flex-shrink-0">
            <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-8 w-auto" />
          </a>

          {/* Desktop center links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[14px] font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={CONTENT.phoneHref}
              className="text-[14px] font-medium text-white/80 hover:text-white transition-colors flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              {CONTENT.phone}
            </a>
            <button
              onClick={() => scrollTo('hero-form')}
              className="h-10 px-5 bg-mwc-orange text-white text-sm font-semibold rounded-full hover:bg-[#C95A20] transition-colors"
            >
              Book Same-Day Visit
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-mwc-navy flex flex-col p-8">
          <div className="flex justify-between items-center mb-12">
            <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-8 w-auto" />
            <button onClick={() => setMobileOpen(false)} className="text-white" aria-label="Close menu">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-fraunces text-4xl text-white text-left hover:text-mwc-orange transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto">
            <button
              onClick={() => scrollTo('hero-form')}
              className="w-full h-14 bg-mwc-orange text-white font-semibold rounded-xl"
            >
              Book Same-Day Visit
            </button>
            <a
              href={CONTENT.phoneHref}
              className="block text-center mt-4 text-white/70 text-sm"
            >
              {CONTENT.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

// ---------------------------------------------------------------------------
// Trust Badges
// ---------------------------------------------------------------------------
const TrustBadges: React.FC = () => {
  const badges = [
    { src: '/images/badges/hipaa.png', label: 'HIPAA Compliant', isImg: true },
    { src: '/images/badges/clia.png', label: 'CLIA Certified', isImg: true },
    { src: '/images/badges/legitscript.png', label: 'LegitScript Verified', isImg: true },
    { src: '', label: 'Licensed in Virginia', isImg: false },
  ];

  return (
    <div className="flex flex-wrap items-end gap-6 mt-8">
      {badges.map((b) => (
        <div key={b.label} className="flex flex-col items-center gap-1.5">
          {b.isImg ? (
            <img src={b.src} alt={b.label} className="h-[42px] w-auto opacity-90 object-contain" />
          ) : (
            <ShieldCheck className="h-[42px] w-[42px] text-white/80" />
          )}
          <span className="text-[11px] font-medium uppercase tracking-wide text-white/60">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Mobile Sticky CTA
// ---------------------------------------------------------------------------
const MobileStickyBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const formEl = document.getElementById('hero-form');
    if (!formEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(formEl);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('hero-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[65] bg-mwc-navy border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="p-3">
        <button
          onClick={scrollToForm}
          className="w-full h-14 bg-mwc-orange text-white font-semibold text-[15px] rounded-xl hover:bg-[#C95A20] active:scale-[0.98] transition-all"
        >
          Book Same-Day Visit
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
const TRTv4LandingPage: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('hero-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans bg-white text-mwc-navy">
      <Nav />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative min-h-[90vh] bg-mwc-navy overflow-hidden pt-[72px]">
        {/* Background image */}
        <img
          src={heroClinic}
          alt="Men's Wellness Centers clinic"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-mwc-navy/95 via-mwc-navy/80 to-mwc-navy/40 z-[1]" />

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: copy */}
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-mwc-orange mb-4">
                  {CONTENT.hero.eyebrow}
                </p>
              </FadeIn>
              <FadeIn delay={0.06}>
                <h1
                  className="font-fraunces text-white leading-[1.02] tracking-[0.01em]"
                  style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}
                >
                  {CONTENT.hero.h1Line1}
                  <br />
                  <span>
                    {CONTENT.hero.h1Line2.replace('.', '')}<span className="text-mwc-orange">.</span>
                  </span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="mt-5 text-[19px] font-normal text-white/85 max-w-[540px] leading-[1.6]">
                  {CONTENT.hero.subhead}
                </p>
              </FadeIn>
              <FadeIn delay={0.18}>
                <TrustBadges />
              </FadeIn>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.1}>
                <HeroForm />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* STATS STRIP                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-mwc-navy2 border-y border-mwc-orange/30 py-10">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {CONTENT.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.06}>
                <div
                  className={`text-center py-4 ${
                    i < CONTENT.stats.length - 1 ? 'border-r border-white/10' : ''
                  }`}
                >
                  <p className="font-fraunces text-[48px] text-white leading-none">{stat.value}</p>
                  <p className="text-[13px] uppercase tracking-[0.14em] text-white/60 mt-2">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px w-full bg-mwc-orange/50" />

      {/* ------------------------------------------------------------------ */}
      {/* PROBLEM                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-mwc-cream py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid lg:grid-cols-11 gap-12 lg:gap-16 items-start">
            {/* Copy */}
            <div className="lg:col-span-6">
              <FadeIn>
                <Eyebrow>{CONTENT.problem.eyebrow}</Eyebrow>
              </FadeIn>
              <FadeIn delay={0.06}>
                <h2
                  className="font-fraunces text-mwc-navy leading-[1.06] tracking-[0.005em] mb-6"
                  style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
                >
                  {CONTENT.problem.h2}
                </h2>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="space-y-4">
                  <p className="text-[17px] text-mwc-inkMuted leading-[1.6]">{CONTENT.problem.p1}</p>
                  <p className="text-[17px] text-mwc-inkMuted leading-[1.6]">{CONTENT.problem.p2}</p>
                </div>
              </FadeIn>
            </div>

            {/* Symptoms */}
            <div className="lg:col-span-5 lg:pt-16">
              <FadeIn delay={0.08}>
                <ul>
                  {CONTENT.problem.symptoms.map((s, i) => (
                    <li
                      key={i}
                      className={`flex gap-3 text-[17px] text-mwc-navy py-4 ${
                        i < CONTENT.problem.symptoms.length - 1 ? 'border-b border-mwc-line' : ''
                      }`}
                    >
                      <span className="text-mwc-orange font-semibold flex-shrink-0">&ndash;</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* HOW IT WORKS                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeIn>
            <div className="text-center max-w-[560px] mx-auto mb-16">
              <Eyebrow>{CONTENT.howItWorks.eyebrow}</Eyebrow>
              <h2
                className="font-fraunces text-mwc-navy leading-[1.06] tracking-[0.005em]"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
              >
                {CONTENT.howItWorks.h2}
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-10">
            {CONTENT.howItWorks.steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.06}>
                <div className="p-8 rounded-2xl border border-mwc-line hover:border-mwc-orange transition-colors duration-200">
                  <p className="font-fraunces text-[56px] text-mwc-orange leading-none mb-4">
                    {step.num}
                  </p>
                  <h3 className="font-fraunces text-[22px] text-mwc-navy mb-3">{step.title}</h3>
                  <p className="text-[16px] text-mwc-inkMuted leading-[1.6]">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.18}>
            <p className="text-[18px] text-mwc-navy text-center border-t border-mwc-line mt-16 pt-8 max-w-[640px] mx-auto">
              {CONTENT.howItWorks.footer}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COMPARISON                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-mwc-navy py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeIn>
            <div className="text-center">
              <Eyebrow light>{CONTENT.comparison.eyebrow}</Eyebrow>
              <h2
                className="font-fraunces text-white leading-[1.06] tracking-[0.005em]"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
              >
                {CONTENT.comparison.h2}
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-[800px] mx-auto mt-12">
              {/* Header row */}
              <div className="grid grid-cols-2 pb-4 mb-2">
                <p className="text-[13px] font-semibold uppercase tracking-wide text-white/50">
                  {CONTENT.comparison.leftHeader}
                </p>
                <p className="text-[13px] font-semibold uppercase tracking-wide text-mwc-orange">
                  {CONTENT.comparison.rightHeader}
                </p>
              </div>
              {/* Data rows */}
              {CONTENT.comparison.rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 border-t border-white/10 py-5 gap-4"
                >
                  <p className="text-[16px] text-white/55">{row.left}</p>
                  <p className="text-[16px] font-semibold text-white">{row.right}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* OUTCOMES                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-mwc-cream py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeIn>
            <div className="text-center mb-12">
              <Eyebrow>{CONTENT.outcomes.eyebrow}</Eyebrow>
              <h2
                className="font-fraunces text-mwc-navy leading-[1.06] tracking-[0.005em]"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
              >
                {CONTENT.outcomes.h2}
              </h2>
            </div>
          </FadeIn>

          {/* Stat blocks */}
          <FadeIn delay={0.06}>
            <div className="flex flex-col sm:flex-row gap-8 max-w-[800px] mx-auto">
              {CONTENT.outcomes.stats.map((s, i) => (
                <div key={i} className="flex-1 border-l-4 border-mwc-orange pl-8 py-2">
                  <p
                    className="font-fraunces text-mwc-navy leading-none"
                    style={{ fontSize: 'clamp(56px, 7vw, 80px)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[18px] text-mwc-inkMuted leading-[1.5] mt-3 max-w-[280px]">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-[13px] text-mwc-inkMuted/70 mt-6 text-center">
              {CONTENT.outcomes.footnote}
            </p>
          </FadeIn>

          {/* Testimonials */}
          <FadeIn delay={0.12}>
            <div className="mt-16 flex gap-6 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory">
              {CONTENT.outcomes.testimonials.map((t, i) => (
                <div
                  key={i}
                  className="min-w-[320px] max-w-[380px] bg-white rounded-2xl p-8 border border-mwc-line flex-shrink-0 snap-start"
                >
                  <p className="font-fraunces text-[20px] text-mwc-navy leading-[1.5] mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-[14px] text-mwc-inkMuted tracking-wide">{t.attr}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PHYSICIAN                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section id="physician" className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <FadeIn>
              <img
                src={drPapariello}
                alt={CONTENT.physician.photoAlt}
                className="rounded-2xl object-cover w-full aspect-[3/4] max-h-[520px]"
              />
            </FadeIn>

            {/* Copy */}
            <FadeIn delay={0.08}>
              <div>
                <Eyebrow>{CONTENT.physician.eyebrow}</Eyebrow>
                <h2 className="font-fraunces text-[40px] text-mwc-navy leading-[1.08] tracking-[0.005em] mb-6">
                  {CONTENT.physician.h2}
                </h2>
                <p className="text-[17px] text-mwc-inkMuted leading-[1.6]">{CONTENT.physician.body}</p>
                <div className="inline-flex flex-wrap gap-2 mt-6">
                  {CONTENT.physician.credentials.map((c) => (
                    <span
                      key={c}
                      className="border border-mwc-navy text-mwc-navy text-[12px] font-semibold tracking-wide uppercase px-4 py-2 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHY MWC                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-mwc-navy py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeIn>
            <div className="text-center mb-4">
              <Eyebrow light>{CONTENT.whyMwc.eyebrow}</Eyebrow>
              <h2
                className="font-fraunces text-white leading-[1.06] tracking-[0.005em]"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
              >
                {CONTENT.whyMwc.h2}
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-[800px] mx-auto mt-8">
            {CONTENT.whyMwc.items.map((item, i) => (
              <FadeIn key={item.num} delay={i * 0.06}>
                <div className="flex gap-8 items-start border-t border-white/10 py-10">
                  <p className="font-fraunces text-[32px] text-mwc-orange w-16 flex-shrink-0 pt-1 leading-none">
                    {item.num}
                  </p>
                  <div>
                    <h3 className="font-fraunces text-[24px] text-white leading-tight">{item.title}</h3>
                    <p className="text-[17px] text-white/70 mt-2 leading-[1.6]">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* LOCATIONS                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section id="locations" className="bg-mwc-cream py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeIn>
            <div className="text-center mb-12">
              <Eyebrow>OUR LOCATIONS</Eyebrow>
              <h2
                className="font-fraunces text-mwc-navy leading-[1.06] tracking-[0.005em]"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
              >
                Three Virginia clinics, ready today.
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {CONTENT.locations.map((loc, i) => (
              <FadeIn key={loc.city} delay={i * 0.06}>
                <div className="bg-white rounded-2xl p-8 border border-mwc-line flex flex-col h-full">
                  <h3 className="font-fraunces text-[28px] text-mwc-navy mb-3">{loc.city}</h3>
                  <p className="text-[16px] text-mwc-inkMuted leading-[1.6] whitespace-pre-line mb-3">
                    {loc.address}
                  </p>
                  <a
                    href={loc.phoneHref}
                    className="text-[16px] font-semibold text-mwc-orange hover:underline"
                  >
                    {loc.phone}
                  </a>
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-[14px] text-mwc-navy/60 underline underline-offset-4 hover:text-mwc-navy"
                  >
                    Get Directions
                  </a>
                  <button
                    onClick={scrollToForm}
                    className="mt-6 w-full h-12 bg-mwc-navy text-white font-semibold rounded-xl text-sm hover:bg-mwc-navy2 transition-colors"
                  >
                    Book at {loc.city}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ                                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section id="faq" className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeIn>
            <div className="text-center max-w-[680px] mx-auto">
              <Eyebrow>COMMON QUESTIONS</Eyebrow>
              <h2
                className="font-fraunces text-mwc-navy leading-[1.06] tracking-[0.005em]"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
              >
                What patients ask before their first visit.
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Accordion type="single" collapsible className="w-full max-w-[680px] mx-auto mt-12">
              {CONTENT.faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-mwc-line"
                >
                  <AccordionTrigger className="text-[17px] font-medium text-mwc-navy text-left py-5 hover:no-underline hover:text-mwc-navy">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] text-mwc-inkMuted leading-[1.7] pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FINAL CTA                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-mwc-navy py-24 border-t border-mwc-orange/30">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <FadeIn>
            <Eyebrow light>{CONTENT.finalCta.eyebrow}</Eyebrow>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2
              className="font-fraunces text-white leading-[1.04] tracking-[0.01em]"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              {CONTENT.finalCta.h2}
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-[20px] text-white/75 mt-4 mb-10">{CONTENT.finalCta.subhead}</p>
          </FadeIn>
          <FadeIn delay={0.16}>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center h-14 px-10 bg-mwc-orange text-white font-semibold text-[15px] rounded-full hover:bg-[#C95A20] transition-colors active:scale-[0.98]"
            >
              {CONTENT.finalCta.cta}
            </button>
            <p className="text-[13px] text-white/50 mt-4">{CONTENT.finalCta.sub}</p>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                               */}
      {/* ------------------------------------------------------------------ */}
      <footer className="bg-mwc-navy2 py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Locations */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 mb-4">
                Locations
              </p>
              <div className="space-y-4">
                {CONTENT.footer.locations.map((loc) => (
                  <div key={loc.city}>
                    <p className="text-[14px] text-white/80 font-semibold">{loc.city}</p>
                    <p className="text-[13px] text-white/60 leading-relaxed">{loc.address}</p>
                    <a
                      href={loc.phoneHref}
                      className="text-[13px] text-white/60 hover:text-white transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Care */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 mb-4">
                Care
              </p>
              <ul className="space-y-2">
                {CONTENT.footer.care.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 mb-4">
                Legal
              </p>
              <ul className="space-y-2">
                {CONTENT.footer.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[13px] text-white/45">
              &copy; 2026 Men&apos;s Wellness Centers &middot; Licensed in Virginia &middot; HIPAA Compliant
            </p>
            <a
              href={CONTENT.phoneHref}
              className="text-[13px] text-white/45 hover:text-white/70 transition-colors"
            >
              {CONTENT.phone}
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <MobileStickyBar />
    </div>
  );
};

export default TRTv4LandingPage;
