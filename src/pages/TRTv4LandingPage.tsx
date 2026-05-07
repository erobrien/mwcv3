import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CONTENT } from './trt-v4/content';

/* ============================================================
   /lp/trt-v4 — Editorial physician-led rebuild
   Brand tokens (scoped):
     --mwc-navy: #0B1733
     --mwc-navy-2: #1A2255
     --mwc-orange: #E86A2C
     --mwc-cream: #F7F3EC
     --mwc-bone: #FFFFFF
     --mwc-ink: #14181F
     --mwc-ink-muted: #4A5160
     --mwc-line: #E4DDD1
   Fonts: Fraunces (display) + Inter (body)
   ============================================================ */

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

const Eyebrow = ({
  children,
  tone = 'orange',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'orange' | 'navy' | 'white';
  className?: string;
}) => {
  const color =
    tone === 'orange' ? 'var(--mwc-orange)' : tone === 'navy' ? 'var(--mwc-navy)' : 'rgba(255,255,255,0.7)';
  return (
    <div
      className={`uppercase ${className}`}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: '0.18em',
        color,
      }}
    >
      {children}
    </div>
  );
};

const TRTv4LandingPage: React.FC = () => {
  const C = CONTENT;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ firstName: '', email: '', phone: '', location: '' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Inject Fraunces (page-scoped). Inter is already loaded globally.
  useEffect(() => {
    const id = 'fraunces-font-trtv4';
    if (document.getElementById(id)) return;
    const l1 = document.createElement('link');
    l1.rel = 'preconnect';
    l1.href = 'https://fonts.googleapis.com';
    const l2 = document.createElement('link');
    l2.rel = 'preconnect';
    l2.href = 'https://fonts.gstatic.com';
    l2.crossOrigin = 'anonymous';
    const l3 = document.createElement('link');
    l3.id = id;
    l3.rel = 'stylesheet';
    l3.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap';
    document.head.appendChild(l1);
    document.head.appendChild(l2);
    document.head.appendChild(l3);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[trt-v4 lead]', form);
    window.location.href = '/thank-you';
  };

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const display = { fontFamily: "'Fraunces', Georgia, serif", fontFeatureSettings: '"ss01"' };
  const body = { fontFamily: "Inter, system-ui, sans-serif" };

  return (
    <div
      className="trtv4-root"
      style={{
        ...body,
        color: 'var(--mwc-ink)',
        background: 'var(--mwc-bone)',
        // expose tokens locally
        ['--mwc-navy' as any]: '#0B1733',
        ['--mwc-navy-2' as any]: '#1A2255',
        ['--mwc-orange' as any]: '#E86A2C',
        ['--mwc-cream' as any]: '#F7F3EC',
        ['--mwc-bone' as any]: '#FFFFFF',
        ['--mwc-ink' as any]: '#14181F',
        ['--mwc-ink-muted' as any]: '#4A5160',
        ['--mwc-line' as any]: '#E4DDD1',
      }}
    >
      <style>{`
        .trtv4-root :focus-visible { outline: 2px solid var(--mwc-orange); outline-offset: 2px; border-radius: 4px; }
        .trtv4-root .h-display { font-family: 'Fraunces', Georgia, serif; letter-spacing: -0.02em; line-height: 1.02; font-weight: 600; }
        .trtv4-root .h2 { font-family: 'Fraunces', Georgia, serif; font-size: clamp(2rem, 3.5vw, 3.25rem); line-height: 1.05; letter-spacing: -0.015em; font-weight: 600; }
        .trtv4-root .body-lg { font-size: 17px; line-height: 1.55; }
        @media (max-width: 768px) { .trtv4-root .body-lg { font-size: 16px; line-height: 1.6; } }
        .trtv4-root .container-lg { max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
        .trtv4-root .section { padding-top: 96px; padding-bottom: 96px; }
        @media (min-width: 768px) { .trtv4-root .section { padding-top: 128px; padding-bottom: 128px; } }
        .trtv4-root .hairline-card { border-radius: 16px; border: 1px solid var(--mwc-line); transition: border-color 200ms ease; }
        .trtv4-root .hairline-card:hover { border-color: var(--mwc-orange); }
        .trtv4-root .hairline-card-dark { border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); transition: border-color 200ms ease; }
        .trtv4-root .hairline-card-dark:hover { border-color: var(--mwc-orange); }
        .trtv4-root .btn-primary { background: var(--mwc-orange); color: #fff; border: none; border-radius: 10px; font-weight: 600; letter-spacing: 0.01em; transition: background 200ms; cursor: pointer; }
        .trtv4-root .btn-primary:hover { background: #d15a20; }
        .trtv4-root .field-label { font-family: Inter, sans-serif; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mwc-ink-muted); font-weight: 600; margin-bottom: 6px; display: block; }
        .trtv4-root .field-input { width: 100%; height: 48px; padding: 0 14px; background: #fff; border: 1px solid var(--mwc-line); border-radius: 10px; font-size: 16px; color: var(--mwc-ink); font-family: Inter, sans-serif; transition: border-color 150ms, box-shadow 150ms; }
        .trtv4-root .field-input:focus { border-color: var(--mwc-orange); box-shadow: 0 0 0 3px rgba(232,106,44,0.15); outline: none; }
        .trtv4-root .divider-orange { height: 1px; width: 100%; background: var(--mwc-orange); }
        .trtv4-root .nav-link { color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 500; transition: color 150ms; }
        .trtv4-root .nav-link:hover { color: var(--mwc-orange); }
      `}</style>

      {/* ============= NAV ============= */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: 72,
          background: 'var(--mwc-navy)',
          boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
          transition: 'box-shadow 200ms',
        }}
      >
        <div className="container-lg" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" aria-label="Men's Wellness Centers" style={{ ...display, color: '#fff', fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>
            MWC
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="nav-link">How It Works</a>
            <a href="#doctor" className="nav-link">Our Doctors</a>
            <a href="#locations" className="nav-link">Locations</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href={C.phoneHref} className="nav-link" style={{ fontWeight: 600 }}>
              (804) 346-4636
            </a>
            <button onClick={scrollToForm} className="btn-primary" style={{ height: 40, padding: '0 18px', fontSize: 13 }}>
              Book Same-Day Visit
            </button>
          </div>
          <button
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 100, background: 'var(--mwc-navy)',
            display: 'flex', flexDirection: 'column', padding: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 48 }}>
            <span style={{ ...display, color: '#fff', fontSize: 20, fontWeight: 700 }}>MWC</span>
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              ['How It Works', '#how'],
              ['Our Doctors', '#doctor'],
              ['Locations', '#locations'],
              ['FAQ', '#faq'],
            ].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{ ...display, color: '#fff', fontSize: 32, fontWeight: 600 }}>
                {l}
              </a>
            ))}
            <a href={C.phoneHref} style={{ color: 'var(--mwc-orange)', fontSize: 18, fontWeight: 600, marginTop: 16 }}>
              (804) 346-4636
            </a>
            <button onClick={() => { setMenuOpen(false); scrollToForm(); }} className="btn-primary" style={{ height: 56, marginTop: 16 }}>
              Book Same-Day Visit
            </button>
          </div>
        </div>
      )}

      {/* ============= HERO ============= */}
      <header style={{ background: 'var(--mwc-navy)', minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-lg" style={{ width: '100%' }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <Eyebrow>PHYSICIAN-LED · IN-PERSON · VIRGINIA</Eyebrow>
              </FadeIn>
              <FadeIn delay={0.06}>
                <h1
                  className="h-display"
                  style={{
                    ...display,
                    color: '#fff',
                    fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                    marginTop: 20,
                  }}
                >
                  Testosterone, done right<span style={{ color: 'var(--mwc-orange)' }}>.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 20, lineHeight: 1.5, maxWidth: 560, marginTop: 24 }}>
                  Same-day labs. Face-to-face with a real doctor who walks you through every number. Three Virginia clinics. No apps, no mail-order scripts.
                </p>
              </FadeIn>

              {/* Trust row */}
              <FadeIn delay={0.2}>
                <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 16, maxWidth: 520 }}>
                  {[
                    ['HIPAA', 'Compliant'],
                    ['CLIA', 'Certified'],
                    ['LegitScript', 'Verified'],
                    ['Licensed', 'in Virginia'],
                  ].map(([a, b]) => (
                    <div key={a} style={{ textAlign: 'left', opacity: 0.9 }}>
                      <div
                        aria-hidden
                        style={{
                          width: 42, height: 42, borderRadius: 8,
                          border: '1px solid rgba(255,255,255,0.18)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--mwc-orange)', fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 14,
                          marginBottom: 8,
                        }}
                      >
                        {a.slice(0, 2).toUpperCase()}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>
                        <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{a}</div>
                        {b}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Form card */}
            <FadeIn delay={0.1}>
              <form
                id="lead-form"
                onSubmit={handleSubmit}
                style={{
                  background: 'var(--mwc-cream)',
                  borderRadius: 16,
                  padding: 32,
                  border: '1px solid var(--mwc-line)',
                }}
              >
                <h2 style={{ ...display, fontSize: 24, color: 'var(--mwc-ink)', fontWeight: 600 }}>
                  Book your same-day visit
                </h2>
                <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label htmlFor="v4-firstname" className="field-label">First Name</label>
                    <input id="v4-firstname" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="field-input" autoComplete="given-name" />
                  </div>
                  <div>
                    <label htmlFor="v4-email" className="field-label">Email</label>
                    <input id="v4-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field-input" autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="v4-phone" className="field-label">Phone</label>
                    <input id="v4-phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="field-input" autoComplete="tel" />
                  </div>
                  <div>
                    <label htmlFor="v4-location" className="field-label">Location</label>
                    <select
                      id="v4-location" required value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="field-input"
                      style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='%234A5160' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 40 }}
                    >
                      <option value="" disabled>Select a location</option>
                      <option value="richmond">Richmond</option>
                      <option value="newport-news">Newport News</option>
                      <option value="virginia-beach">Virginia Beach</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', height: 56, marginTop: 24, fontSize: 15 }}>
                  Request My Appointment
                </button>
                <p style={{ marginTop: 12, fontSize: 13, color: 'var(--mwc-ink-muted)', textAlign: 'center' }}>
                  No credit card. No commitment.
                </p>
                <p style={{ marginTop: 14, fontSize: 12, color: 'var(--mwc-ink-muted)', lineHeight: 1.5 }}>
                  By submitting this form, you consent to receive calls, SMS, and emails from Men's Wellness Centers regarding your inquiry. Message and data rates may apply. Reply STOP to opt out.
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* ============= STATS STRIP ============= */}
      <section style={{ background: 'var(--mwc-navy-2)', borderTop: '1px solid var(--mwc-orange)', borderBottom: '1px solid var(--mwc-orange)', padding: '40px 0' }}>
        <div className="container-lg">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {C.stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '12px 24px', textAlign: 'center',
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.10)' : 'none',
                }}
              >
                <div style={{ ...display, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#fff', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= PROBLEM ============= */}
      <section className="section" style={{ background: 'var(--mwc-cream)' }}>
        <div className="container-lg">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <FadeIn><Eyebrow tone="navy">IF THIS SOUNDS LIKE YOU</Eyebrow></FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="h2" style={{ marginTop: 16, color: 'var(--mwc-ink)', maxWidth: 520 }}>
                  You don't feel like yourself anymore. Your labs say you're "fine."
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="body-lg" style={{ marginTop: 24, color: 'var(--mwc-ink-muted)' }}>
                  {C.problem.p1}
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="body-lg" style={{ marginTop: 18, color: 'var(--mwc-ink-muted)' }}>
                  {C.problem.p2}
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid var(--mwc-line)' }}>
                {C.problem.symptoms.map((s) => (
                  <li
                    key={s}
                    className="body-lg"
                    style={{
                      borderBottom: '1px solid var(--mwc-line)',
                      padding: '20px 0',
                      color: 'var(--mwc-ink)',
                      display: 'flex', gap: 16,
                    }}
                  >
                    <span aria-hidden style={{ color: 'var(--mwc-orange)' }}>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============= HOW IT WORKS ============= */}
      <section id="how" className="section" style={{ background: 'var(--mwc-bone)' }}>
        <div className="container-lg">
          <FadeIn><Eyebrow tone="navy">ONE VISIT. ONE PLAN.</Eyebrow></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="h2" style={{ marginTop: 16, color: 'var(--mwc-ink)', maxWidth: 720 }}>
              Walk in with questions. Walk out with a protocol.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 md:gap-10" style={{ marginTop: 56 }}>
            {C.howItWorks.steps.map((step, i) => (
              <FadeIn key={step.num} delay={0.06 * i}>
                <div className="hairline-card" style={{ padding: 32, height: '100%' }}>
                  <div style={{ ...display, fontSize: 56, color: 'var(--mwc-orange)', fontWeight: 600, lineHeight: 1 }}>
                    {step.num}
                  </div>
                  <h3 style={{ ...display, fontSize: 22, color: 'var(--mwc-ink)', marginTop: 20, fontWeight: 600 }}>
                    {step.title}
                  </h3>
                  <p style={{ marginTop: 12, color: 'var(--mwc-ink-muted)', fontSize: 16, lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <p style={{ marginTop: 48, textAlign: 'center', fontSize: 18, color: 'var(--mwc-ink)' }}>
              {C.howItWorks.footer}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============= COMPARISON ============= */}
      <section className="section" style={{ background: 'var(--mwc-navy)' }}>
        <div className="container-lg">
          <FadeIn><Eyebrow tone="orange">MOST CLINICS HAND YOU A LAB SLIP. WE DON'T.</Eyebrow></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="h2" style={{ marginTop: 16, color: '#fff', maxWidth: 720 }}>
              What in-person care actually looks like.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ marginTop: 56, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="grid grid-cols-2" style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                  {C.comparison.leftHeader}
                </div>
                <div style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mwc-orange)' }}>
                  {C.comparison.rightHeader}
                </div>
              </div>
              {C.comparison.rows.map((r) => (
                <div key={r.left} className="grid grid-cols-2 gap-6" style={{ padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: 1.5, fontWeight: 400 }}>
                    {r.left}
                  </div>
                  <div style={{ color: '#fff', fontSize: 17, lineHeight: 1.5, fontWeight: 600 }}>
                    {r.right}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============= OUTCOMES ============= */}
      <section className="section" style={{ background: 'var(--mwc-cream)' }}>
        <div className="container-lg">
          <FadeIn><Eyebrow tone="navy">OUTCOMES</Eyebrow></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="h2" style={{ marginTop: 16, color: 'var(--mwc-ink)', maxWidth: 720 }}>
              Real numbers from real patients.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-10 md:gap-20" style={{ marginTop: 56 }}>
            {C.outcomes.stats.map((s) => (
              <FadeIn key={s.value}>
                <div style={{ borderTop: '1px solid var(--mwc-orange)', paddingTop: 32 }}>
                  <div style={{ ...display, fontSize: 'clamp(3.5rem, 7vw, 6rem)', color: 'var(--mwc-ink)', fontWeight: 600, lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <p style={{ marginTop: 20, fontSize: 18, color: 'var(--mwc-ink-muted)', lineHeight: 1.5, maxWidth: 380 }}>
                    {s.desc}<sup>*</sup>
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.15}>
            <p style={{ marginTop: 32, fontSize: 13, color: 'var(--mwc-ink-muted)' }}>
              *{C.outcomes.footnote}
            </p>
          </FadeIn>

          {/* Testimonials scroller */}
          <div style={{ marginTop: 64, overflowX: 'auto', scrollSnapType: 'x mandatory' }} className="scrollbar-hide">
            <div className="grid md:grid-cols-3 gap-6" style={{ minWidth: 'min(900px, 100%)' }}>
              {C.outcomes.testimonials.map((t, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <figure className="hairline-card" style={{ padding: 32, background: 'var(--mwc-bone)', height: '100%', scrollSnapAlign: 'start' }}>
                    <blockquote style={{ ...display, fontSize: 20, color: 'var(--mwc-ink)', lineHeight: 1.4, fontWeight: 500, margin: 0 }}>
                      "{t.quote}"
                    </blockquote>
                    <figcaption style={{ marginTop: 24, fontSize: 13, color: 'var(--mwc-ink-muted)', letterSpacing: '0.05em' }}>
                      — {t.attr}
                    </figcaption>
                  </figure>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= PHYSICIAN ============= */}
      <section id="doctor" className="section" style={{ background: 'var(--mwc-bone)' }}>
        <div className="container-lg">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeIn>
              <div
                role="img"
                aria-label="Real photo of Dr. Steven Papariello, Medical Director — placeholder"
                style={{
                  background: 'var(--mwc-navy)',
                  aspectRatio: '4 / 5',
                  borderRadius: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
                  textAlign: 'center', padding: 24,
                }}
              >
                REAL_PHOTO_NEEDED<br/>Dr. Steven Papariello, MD
              </div>
            </FadeIn>
            <div>
              <FadeIn><Eyebrow tone="navy">PHYSICIAN-LED CARE</Eyebrow></FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="h2" style={{ marginTop: 16, color: 'var(--mwc-ink)' }}>
                  You'll see a real doctor. Every visit.
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="body-lg" style={{ marginTop: 24, color: 'var(--mwc-ink-muted)' }}>
                  {C.physician.body}
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {C.physician.credentials.map((c) => (
                    <span key={c} style={{ border: '1px solid var(--mwc-navy)', color: 'var(--mwc-navy)', borderRadius: 999, padding: '8px 16px', fontSize: 13, fontWeight: 500 }}>
                      {c}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============= WHY MWC ============= */}
      <section className="section" style={{ background: 'var(--mwc-navy)' }}>
        <div className="container-lg">
          <FadeIn><Eyebrow tone="orange">WHY MWC</Eyebrow></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="h2" style={{ marginTop: 16, color: '#fff', maxWidth: 720 }}>
              Five things we don't compromise on.
            </h2>
          </FadeIn>
          <div style={{ marginTop: 56, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {C.whyMwc.items.map((item, i) => (
              <FadeIn key={item.num} delay={0.04 * i}>
                <div className="grid md:grid-cols-12 gap-6" style={{ padding: '32px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', alignItems: 'baseline' }}>
                  <div className="md:col-span-1" style={{ ...display, color: 'var(--mwc-orange)', fontSize: 32, fontWeight: 600 }}>
                    {item.num}
                  </div>
                  <h3 className="md:col-span-4" style={{ ...display, color: '#fff', fontSize: 24, fontWeight: 600 }}>
                    {item.title}
                  </h3>
                  <p className="md:col-span-7" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============= LOCATIONS ============= */}
      <section id="locations" className="section" style={{ background: 'var(--mwc-cream)' }}>
        <div className="container-lg">
          <FadeIn><Eyebrow tone="navy">THREE VIRGINIA CLINICS</Eyebrow></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="h2" style={{ marginTop: 16, color: 'var(--mwc-ink)', maxWidth: 720 }}>
              Same-day appointments at every location.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8" style={{ marginTop: 56 }}>
            {C.locations.map((loc) => (
              <FadeIn key={loc.value}>
                <div className="hairline-card" style={{ background: 'var(--mwc-bone)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Static map placeholder — REPLACE_WITH_GOOGLE_MAPS_API_KEY */}
                  <div
                    style={{
                      aspectRatio: '16 / 9',
                      background: `linear-gradient(135deg, var(--mwc-navy) 0%, var(--mwc-navy-2) 100%)`,
                      backgroundImage: `url("https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(loc.address.replace('\n', ' '))}&zoom=14&size=600x340&maptype=roadmap&key=REPLACE_WITH_GOOGLE_MAPS_API_KEY")`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      borderBottom: '1px solid var(--mwc-line)',
                    }}
                    aria-label={`Map of ${loc.city}`}
                  />
                  <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ ...display, fontSize: 28, color: 'var(--mwc-ink)', fontWeight: 600 }}>{loc.city}</h3>
                    <address style={{ fontStyle: 'normal', marginTop: 12, color: 'var(--mwc-ink-muted)', fontSize: 16, lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                      {loc.address}
                    </address>
                    <a href={loc.phoneHref} style={{ marginTop: 12, color: 'var(--mwc-orange)', fontSize: 16, fontWeight: 600 }}>
                      {loc.phone}
                    </a>
                    <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: 'var(--mwc-navy)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Get Directions →
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============= FAQ ============= */}
      <section id="faq" className="section" style={{ background: 'var(--mwc-bone)' }}>
        <div className="container-lg" style={{ maxWidth: 880 }}>
          <FadeIn><Eyebrow tone="navy">COMMON QUESTIONS</Eyebrow></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="h2" style={{ marginTop: 16, color: 'var(--mwc-ink)' }}>
              Everything you might be wondering.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Accordion type="single" collapsible className="w-full" style={{ marginTop: 48 }}>
              {C.faq.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} style={{ borderBottom: '1px solid var(--mwc-line)' }}>
                  <AccordionTrigger
                    style={{ ...display, fontSize: 19, color: 'var(--mwc-ink)', fontWeight: 600, padding: '24px 0', textAlign: 'left' }}
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--mwc-ink-muted)', paddingBottom: 24 }}>
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ============= FINAL CTA ============= */}
      <section style={{ background: 'var(--mwc-navy)', borderTop: '1px solid var(--mwc-orange)', padding: '96px 0' }}>
        <div className="container-lg" style={{ textAlign: 'center' }}>
          <FadeIn><Eyebrow>READY WHEN YOU ARE</Eyebrow></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="h2" style={{ marginTop: 16, color: '#fff' }}>
              Book your same-day visit.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ marginTop: 16, fontSize: 18, color: 'rgba(255,255,255,0.75)' }}>
              Three Virginia clinics. On-site labs. A real doctor.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <button onClick={scrollToForm} className="btn-primary" style={{ marginTop: 32, height: 56, padding: '0 32px', fontSize: 15 }}>
              Request My Appointment
            </button>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              No credit card. No commitment.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============= FOOTER ============= */}
      <footer style={{ background: 'var(--mwc-navy-2)', padding: '64px 0 80px' }}>
        <div className="container-lg">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h4 style={{ ...display, color: '#fff', fontSize: 16, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Locations</h4>
              <ul style={{ marginTop: 20, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {C.footer.locations.map((l) => (
                  <li key={l.city} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.5 }}>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{l.city}</div>
                    {l.address}<br/>
                    <a href={l.phoneHref} style={{ color: 'var(--mwc-orange)' }}>{l.phone}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ ...display, color: '#fff', fontSize: 16, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Care</h4>
              <ul style={{ marginTop: 20, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {C.footer.care.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ ...display, color: '#fff', fontSize: 16, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Legal</h4>
              <ul style={{ marginTop: 20, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {C.footer.legal.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
            © 2026 Men's Wellness Centers · Licensed in Virginia · HIPAA Compliant
          </div>
        </div>
      </footer>

      {/* ============= STICKY MOBILE CTA ============= */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 65,
          padding: '12px 16px calc(12px + env(safe-area-inset-bottom)) 16px',
          background: 'var(--mwc-navy)', borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <button onClick={scrollToForm} className="btn-primary" style={{ width: '100%', height: 56, fontSize: 15 }}>
          Book Same-Day Visit
        </button>
      </div>
    </div>
  );
};

export default TRTv4LandingPage;
