import { useEffect, useState } from "react";
import { Check, ArrowRight, Star, MapPin, Phone, Menu, X, Stethoscope, TestTube2, ShieldCheck, Activity, Building2, ChevronDown } from "lucide-react";

/* ─── COPY / DATA ─────────────────────────────────────────── */

const PHONE = "866-344-4955";
const PHONE_HREF = "tel:+18663444955";
const PRICE = "$199/mo";

const OUTCOMES = [
  { icon: "⚡", label: "More Energy" },
  { icon: "🔥", label: "Stronger Libido" },
  { icon: "🧠", label: "Sharper Focus" },
  { icon: "💪", label: "Lean Muscle" },
];

const TRUST_CHECKS = [
  "Licensed Virginia providers",
  "Same/next-day appointments",
  "3 in-person Virginia clinics",
  "FSA/HSA Accepted",
];

const STATS = [
  { value: "10,000+", label: "Men Treated" },
  { value: "10+", label: "Years in Virginia" },
  { value: "Same-Day", label: "Appointments" },
  { value: "4.9★", label: "Google Rating" },
];

const SYMPTOMS = [
  "Constant fatigue no matter how much you sleep",
  "Lost your drive, confidence, and motivation",
  "Brain fog that won't lift no matter what you try",
  "Gaining belly fat and losing muscle despite working out",
  'Your doctor says your labs are "normal." You know better.',
];

const STEPS = [
  {
    num: "01",
    title: "Same-Day Blood Work",
    desc: "On-site labs. Full testosterone panel drawn and reviewed in minutes — not two weeks.",
  },
  {
    num: "02",
    title: "A Doctor Who Actually Listens",
    desc: "A physician who specializes in men's hormones sits with you, goes through every number, and explains what's actually going on.",
  },
  {
    num: "03",
    title: "Your Personalized Plan",
    desc: "Your doctor builds a protocol around your labs and symptoms. Many patients start their plan the same day.",
  },
];

const COMPARISONS = [
  { bad: "10-min video call", good: "Face-to-face doctor" },
  { bad: "2-week lab wait", good: "Results same visit" },
  { bad: "Cookie-cutter script", good: "Plan built for you" },
];

const RESULT_STATS = [
  { value: "2–5×", label: "Increase in total testosterone within 2 months*" },
  { value: "84%", label: "Of patients report meaningful symptom improvement*" },
];

const TESTIMONIALS = [
  {
    quote: "Energy is back to where it was a decade ago. Better sleep, focused at work, and the team picks up the phone when I call.",
    name: "Mark T.",
    city: "Richmond, VA",
  },
  {
    quote: "I was skeptical, but the in-person visit and same-day labs made it feel real. Body composition has shifted noticeably alongside training.",
    name: "James R.",
    city: "Virginia Beach, VA",
  },
  {
    quote: "Mood and motivation were the biggest changes. The physician walked me through every number — first time anyone has actually done that.",
    name: "David K.",
    city: "Newport News, VA",
  },
];

const PILLARS = [
  {
    Icon: Stethoscope,
    title: "Licensed Providers",
    desc: "Licensed Virginia nurse practitioners and physicians. Not remote. Not an app. A real provider, every visit.",
  },
  {
    Icon: TestTube2,
    title: "On-Site Labs",
    desc: "Blood draw and full panel done in our center. Results back before you walk out.",
  },
  {
    Icon: ShieldCheck,
    title: "Built For Men",
    desc: "A clinic designed around your schedule, your privacy, and your goals. Nothing else.",
  },
  {
    Icon: Activity,
    title: "Ongoing Monitoring",
    desc: "Regular check-ins, lab work, and protocol adjustments. We don't write a script and disappear.",
  },
  {
    Icon: Building2,
    title: "No Telehealth Runaround",
    desc: "You see a real doctor in a real clinic. No app. No video call. No waiting on hold with a call center.",
  },
];

const FAQS = [
  {
    q: "How much does it cost?",
    a: "Treatment plans start at $199/month after your physician evaluation. Your initial consultation and on-site labs are included with your first visit. FSA/HSA accepted.",
  },
  {
    q: "Do I need a referral?",
    a: "No referral needed. Book directly online or by phone. Same-day and next-day appointments are regularly available.",
  },
  {
    q: "What happens during my first visit?",
    a: "You come in, get blood drawn on-site, sit with a physician who reviews your results and health history, and leave with a personalized plan. One visit, typically one hour.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most patients notice changes in energy and mood within the first few weeks. Hormone levels typically normalize within 2–3 months. Your physician tracks your progress at every follow-up.",
  },
  {
    q: "Is my information confidential?",
    a: "Yes. Men's Wellness Centers is a fully HIPAA-compliant medical practice. Your records stay private.",
  },
];

const LOCATIONS = [
  { name: "Richmond", address: "4050 Innslake Dr, Suite 360, Glen Allen, VA 23060", phone: "804-346-4636", value: "richmond" },
  { name: "Newport News", address: "827 Diligence Drive, Suite 206, Newport News, VA 23606", phone: "757-806-6263", value: "newport-news" },
  { name: "Virginia Beach", address: "996 First Colonial Road, Virginia Beach, VA 23454", phone: "757-806-6263", value: "virginia-beach" },
];

/* ─── UTILITY ─────────────────────────────────────────────── */

const scrollTo = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

/* ─── SUB-COMPONENTS ──────────────────────────────────────── */

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,51,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        height: 64,
      }}
    >
      <div className="flex items-center justify-between h-full max-w-[1200px] mx-auto px-5">
        <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-7 w-auto" />

        <div className="hidden md:flex items-center gap-4">
          <a href={PHONE_HREF} className="text-sm font-semibold text-white/80 hover:text-white transition-colors">
            {PHONE}
          </a>
          <button
            onClick={scrollTo("form")}
            className="rounded-full font-bold uppercase text-[13px] text-white cursor-pointer transition-colors duration-150"
            style={{ background: "#E8670A", height: 42, paddingLeft: 22, paddingRight: 22, letterSpacing: "0.08em", border: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C7560A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#E8670A")}
          >
            Book Now
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 px-5 py-4 space-y-3" style={{ background: "rgba(0,0,51,0.98)" }}>
          <a href={PHONE_HREF} className="flex items-center gap-2 text-sm font-semibold text-white">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <button
            onClick={() => { setOpen(false); scrollTo("form")(); }}
            className="w-full rounded-full font-bold uppercase text-[13px] text-white cursor-pointer"
            style={{ background: "#E8670A", height: 44, letterSpacing: "0.08em", border: "none" }}
          >
            Book My Consultation
          </button>
        </div>
      )}
    </header>
  );
};

const UrgencyBanner = () => (
  <div
    className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-2 text-white text-xs font-semibold uppercase tracking-wide"
    style={{ background: "#E8670A", height: 32, letterSpacing: "0.1em" }}
  >
    <span>⚡</span>
    <span>Same-Day Appointments Available — Limited Slots This Week</span>
    <button
      onClick={scrollTo("form")}
      className="ml-3 rounded-full bg-white font-bold uppercase text-[10px] cursor-pointer hidden sm:inline-flex items-center px-3 py-1"
      style={{ color: "#E8670A", letterSpacing: "0.08em" }}
    >
      Book Now →
    </button>
  </div>
);

const Hero = () => (
  <section
    id="hero"
    className="relative overflow-hidden"
    style={{ background: "#000033", paddingTop: 96 + 32 }}
  >
    <div className="max-w-[1200px] mx-auto px-5 pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left */}
        <div className="lg:col-span-7">
          <h1
            className="font-oswald font-bold uppercase text-white"
            style={{ fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
          >
            Testosterone
            <span className="block" style={{ color: "#E8670A" }}>Done Right.</span>
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[520px]" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}>
            In-person. Same-day labs. A real doctor who reads your results with you — not at you.
          </p>

          {/* Rating pill */}
          <div
            className="inline-flex items-center gap-3 mt-5 px-4 py-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5" fill="#FFC107" stroke="#FFC107" />
              ))}
            </div>
            <span className="text-sm font-bold text-white">4.9</span>
            <span className="text-xs text-white/60 font-medium">200+ Google Reviews</span>
          </div>

          {/* Trust checks */}
          <ul className="mt-6 space-y-2.5">
            {TRUST_CHECKS.map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.88)", fontFamily: "Inter, sans-serif" }}>
                <Check className="h-4 w-4 flex-shrink-0" strokeWidth={3} style={{ color: "#E8670A" }} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: CTA cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Primary card */}
          <button
            onClick={scrollTo("form")}
            className="relative overflow-hidden rounded-2xl text-left p-6 cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
            style={{ background: "#E8670A", minHeight: 180 }}
          >
            <div
              className="inline-block text-[10px] uppercase font-bold px-2.5 py-1 rounded-full mb-3"
              style={{ background: "rgba(0,255,100,0.2)", color: "#00FF64", letterSpacing: "0.1em" }}
            >
              ● OPEN TODAY
            </div>
            <div
              className="font-oswald font-bold uppercase text-white"
              style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
            >
              Same-Day Labs +<br />Results In One Visit
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white font-bold uppercase text-[12px] h-10 px-5 cursor-pointer" style={{ color: "#000033", letterSpacing: "0.08em" }}>
              Book My Consultation <ArrowRight className="h-3.5 w-3.5" />
            </div>
            <div className="mt-3 text-xs text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>
              Plans start at {PRICE} after approval
            </div>
          </button>

          {/* Secondary card */}
          <button
            onClick={scrollTo("locations")}
            className="relative overflow-hidden rounded-2xl text-left p-6 cursor-pointer transition-all duration-200 hover:scale-[1.01] group"
            style={{ background: "#0A0F2E", border: "1px solid rgba(255,255,255,0.12)", minHeight: 160 }}
          >
            <div
              className="inline-block text-[10px] uppercase font-bold px-2.5 py-1 rounded-full mb-3"
              style={{ background: "rgba(232,103,10,0.2)", color: "#E8670A", letterSpacing: "0.1em" }}
            >
              Available This Week
            </div>
            <div
              className="font-oswald font-bold uppercase text-white"
              style={{ fontSize: "clamp(18px, 2.2vw, 24px)", lineHeight: 1.05 }}
            >
              3 Virginia Clinics Near You
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-white/70 text-white font-bold uppercase text-[12px] h-10 px-5 cursor-pointer transition-all group-hover:bg-white group-hover:text-[#000033]" style={{ letterSpacing: "0.08em" }}>
              <MapPin className="h-3.5 w-3.5" /> See Locations
            </div>
            <div className="mt-3 text-xs text-white/60 flex gap-2 flex-wrap" style={{ fontFamily: "Inter, sans-serif" }}>
              <span>Richmond</span><span className="opacity-40">·</span><span>Newport News</span><span className="opacity-40">·</span><span>Virginia Beach</span>
            </div>
          </button>
        </div>
      </div>

      {/* Outcome pills */}
      <div className="mt-10 flex flex-wrap gap-3">
        {OUTCOMES.map((o) => (
          <button
            key={o.label}
            onClick={scrollTo("form")}
            className="inline-flex items-center gap-2 rounded-full font-semibold text-sm text-white cursor-pointer transition-all duration-150 hover:border-[#E8670A]"
            style={{ background: "#1A1A2E", border: "1px solid rgba(255,255,255,0.12)", paddingLeft: 16, paddingRight: 16, height: 40, fontFamily: "Inter, sans-serif" }}
          >
            <span>{o.icon}</span>
            {o.label} <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.40)", fontFamily: "Inter, sans-serif" }}>
        Medically reviewed by licensed Virginia providers. Individual results vary.
      </p>
    </div>
  </section>
);

const TrustBar = () => (
  <section style={{ background: "#060622", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
    <div className="max-w-[1200px] mx-auto px-5 py-12 md:py-16">
      <p className="text-center text-xs uppercase font-semibold mb-8" style={{ color: "rgba(255,255,255,0.40)", letterSpacing: "0.14em", fontFamily: "Inter, sans-serif" }}>
        Trusted by Virginia men since 2015
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1.5">
            <div
              className="font-oswald font-bold text-white"
              style={{ fontSize: "clamp(36px, 4.5vw, 52px)", lineHeight: 1, borderBottom: "3px solid #E8670A", paddingBottom: 4 }}
            >
              {s.value}
            </div>
            <div className="text-[11px] uppercase font-semibold text-white/55" style={{ letterSpacing: "0.12em", fontFamily: "Inter, sans-serif" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section id="symptoms" style={{ background: "#F5F0EB" }} className="py-16 md:py-24">
    <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Left: Problem */}
      <div>
        <p className="text-xs uppercase font-bold mb-3" style={{ color: "#E8670A", letterSpacing: "0.14em", fontFamily: "Inter, sans-serif" }}>Sound Familiar?</p>
        <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", color: "#000033", lineHeight: 1.1 }}>
          Tired of Feeling Like a Worse Version of Yourself?
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif", maxWidth: 500 }}>
          You used to have energy. You used to have drive. Now you drag through the day, can't focus, can't sleep right, and the weight won't move no matter what you do. Your doctor says your labs are "normal." You know they're not.
        </p>
        <ul className="mt-6 space-y-3">
          {SYMPTOMS.map((s) => (
            <li key={s} className="flex items-start gap-3 text-sm" style={{ color: "#1A1A1A", fontFamily: "Inter, sans-serif" }}>
              <X className="h-4 w-4 flex-shrink-0 mt-0.5" strokeWidth={3} style={{ color: "#E8670A" }} />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: How It Works */}
      <div>
        <p className="text-xs uppercase font-bold mb-3" style={{ color: "#E8670A", letterSpacing: "0.14em", fontFamily: "Inter, sans-serif" }}>The Fix</p>
        <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", color: "#000033", lineHeight: 1.1 }}>
          Here's How It Works in One Visit
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
          No referrals. No waiting weeks. Book online, come in, leave with a plan.
        </p>

        <div className="mt-7 space-y-6">
          {STEPS.map((s) => (
            <div key={s.num} className="flex gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm font-oswald"
                style={{ background: "#000033", color: "#FFFFFF" }}
              >
                {s.num}
              </div>
              <div>
                <h3 className="font-bold text-base" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>{s.title}</h3>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What happens next */}
        <div className="mt-8 rounded-xl p-5" style={{ background: "#000033" }}>
          <p className="text-sm font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>What happens next?</p>
          <p className="text-sm mt-1 text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
            Most patients leave with a prescription the same day. Treatment starts at {PRICE}/month.
          </p>
        </div>

        <button
          onClick={scrollTo("form")}
          className="mt-6 inline-flex items-center gap-2 rounded-full font-bold uppercase text-sm text-white cursor-pointer transition-colors duration-150"
          style={{ background: "#E8670A", height: 50, paddingLeft: 28, paddingRight: 28, letterSpacing: "0.08em", border: "none", fontFamily: "Inter, sans-serif" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#C7560A")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#E8670A")}
        >
          Start Today — Book My Same-Day Visit <ArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-3 text-xs" style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>
          📅 Appointments filling this week. Secure your slot.
        </p>
      </div>
    </div>
  </section>
);

const WhyUs = () => (
  <section style={{ background: "#000033" }} className="py-16 md:py-24">
    <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Image placeholder — reuse existing asset */}
      <div className="order-1">
        <img
          src="/images/hero-still.jpg"
          alt="Licensed Virginia provider in face-to-face TRT consultation"
          className="rounded-2xl object-cover w-full aspect-[4/3]"
          loading="lazy"
        />
      </div>

      <div className="order-2">
        <p className="text-xs uppercase font-bold mb-3" style={{ color: "#E8670A", letterSpacing: "0.14em", fontFamily: "Inter, sans-serif" }}>The MWC Difference</p>
        <h2 className="font-oswald font-bold text-white" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", lineHeight: 1.1 }}>
          Most Clinics Send You Home With a Lab Slip. We Don't.
        </h2>
        <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.72)", fontFamily: "Inter, sans-serif" }}>
          On-site labs, a face-to-face consultation, and a personalized TRT protocol — all in one visit. Same provider, every follow-up. No app. No mail-order doctor. No middleman.
        </p>

        {/* Comparison pills */}
        <div className="mt-7 space-y-3">
          {COMPARISONS.map((c) => (
            <div key={c.bad} className="flex items-center gap-3 flex-wrap">
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,80,80,0.15)", color: "#FF8080", fontFamily: "Inter, sans-serif" }}
              >
                ❌ {c.bad}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: "rgba(46,204,113,0.15)", color: "#4DD884", fontFamily: "Inter, sans-serif" }}
              >
                ✅ {c.good}
              </span>
            </div>
          ))}
        </div>

        {/* Mini stats */}
        <div className="flex flex-wrap gap-8 mt-8">
          {[
            { num: "10,000+", label: "Men Treated" },
            { num: "Since 2015", label: "Serving Virginia" },
            { num: "4.9★", label: "Average Rating" },
            { num: "3", label: "Virginia Clinics" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-oswald font-bold text-white" style={{ fontSize: "clamp(22px, 2.5vw, 28px)" }}>{s.num}</span>
              <span className="text-[11px] uppercase font-semibold text-white/50 mt-0.5" style={{ letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Results = () => (
  <section style={{ background: "#F5F0EB" }} className="py-16 md:py-24">
    <div className="max-w-[1200px] mx-auto px-5">
      <h2 className="font-oswald font-bold text-center uppercase mb-10" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#000033", letterSpacing: "0.02em" }}>
        Real Results From Real Patients
      </h2>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {RESULT_STATS.map((r) => (
          <div key={r.value} className="rounded-2xl p-7 text-center" style={{ background: "#E8670A" }}>
            <div className="font-oswald font-bold text-white" style={{ fontSize: "clamp(48px, 7vw, 72px)", lineHeight: 1 }}>
              {r.value}
            </div>
            <p className="mt-2 text-sm text-white/85" style={{ fontFamily: "Inter, sans-serif" }}>{r.label}</p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl p-6 flex flex-col"
            style={{ background: "#0A0A1A", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" />)}
            </div>
            <p className="text-sm leading-relaxed flex-1 text-white/85" style={{ fontFamily: "Inter, sans-serif" }}>
              "{t.quote}"
            </p>
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-sm font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>{t.name}</div>
              <div className="text-xs text-white/45 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{t.city}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded" style={{ background: "rgba(46,204,113,0.15)", color: "#4DD884", letterSpacing: "0.07em" }}>
                ✓ Verified Review
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="https://www.google.com/search?q=Men%27s+Wellness+Centers+Virginia+reviews" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-4" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>
          Read all 200+ reviews on Google →
        </a>
      </div>

      {/* Outcome micro-CTAs */}
      <div className="mt-12 flex flex-wrap gap-3 justify-center">
        {["Want more energy →", "Want to lose fat →", "Want better focus →", "All of the above →"].map((label) => (
          <button
            key={label}
            onClick={scrollTo("form")}
            className="rounded-full font-semibold text-sm text-white cursor-pointer transition-all duration-150 hover:border-[#E8670A]"
            style={{ background: "#1A1A2E", border: "1px solid rgba(255,255,255,0.15)", paddingLeft: 20, paddingRight: 20, height: 42, fontFamily: "Inter, sans-serif" }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section style={{ background: "#E8670A" }} className="py-16 md:py-24">
    <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
        <h2 className="font-oswald font-bold text-white" style={{ fontSize: "clamp(26px, 3.5vw, 42px)", lineHeight: 1.05 }}>
          Walk In Today.<br />Walk Out With a Plan.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-white/90" style={{ fontFamily: "Inter, sans-serif" }}>
          No commitment. No credit card to book. Walk into any of our 3 Virginia centers for a same-day consultation.
        </p>

        <ul className="mt-5 space-y-2.5">
          {[
            "On-site testosterone panel — results same visit",
            "Face-to-face physician consultation",
            "Personalized protocol built around your labs",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-white" style={{ fontFamily: "Inter, sans-serif" }}>
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" strokeWidth={3} style={{ color: "rgba(255,255,255,0.9)" }} />
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={scrollTo("form")}
          className="mt-7 inline-flex items-center gap-2 rounded-full font-bold uppercase text-sm cursor-pointer transition-colors duration-150"
          style={{ background: "#FFFFFF", color: "#000033", height: 52, paddingLeft: 28, paddingRight: 28, letterSpacing: "0.08em", border: "none", fontFamily: "Inter, sans-serif" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
        >
          Book My Consultation <ArrowRight className="h-4 w-4" />
        </button>

        <p className="mt-3 text-sm text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>
          Starting at {PRICE} after approval · FSA/HSA accepted
        </p>
        <div
          className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: "rgba(0,0,0,0.15)", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
        >
          <Check className="h-3.5 w-3.5" /> No contract · Cancel anytime
        </div>
      </div>

      <div className="order-1 md:order-2">
        <img
          src="/images/services/labs.jpg"
          alt="On-site testosterone blood panel at Men's Wellness Centers Virginia"
          className="rounded-2xl object-cover w-full aspect-[4/3]"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

const Pillars = () => (
  <section style={{ background: "#000033" }} className="py-16 md:py-24">
    <div className="max-w-[1200px] mx-auto px-5">
      <h2 className="font-oswald font-bold text-white text-center mb-12" style={{ fontSize: "clamp(24px, 3.2vw, 38px)", lineHeight: 1.1 }}>
        Why 10,000+ Men Choose MWC Over Everyone Else
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="rounded-xl px-5 pb-6 text-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid #E8670A")}
            onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)")}
          >
            <div className="flex justify-center mt-7">
              <div className="flex items-center justify-center rounded-full" style={{ width: 80, height: 80, background: "#0A1A4A", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p.Icon size={36} strokeWidth={1.5} color="#E8670A" />
              </div>
            </div>
            <h3 className="font-oswald font-bold text-white uppercase text-sm mt-4" style={{ letterSpacing: "0.04em" }}>{p.title}</h3>
            <p className="text-xs mt-2 leading-relaxed text-white/65" style={{ fontFamily: "Inter, sans-serif" }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Locations = () => (
  <section id="locations" style={{ background: "#F5F0EB" }} className="py-16 md:py-24">
    <div className="max-w-[1200px] mx-auto px-5">
      <h2 className="font-oswald font-bold text-center uppercase mb-10" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#000033" }}>
        3 Virginia Clinics. Same-Day Appointments.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {LOCATIONS.map((l) => (
          <div key={l.name} className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E5E5" }}>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: "#E8670A" }} />
              <h3 className="font-oswald font-bold text-lg uppercase" style={{ color: "#000033" }}>{l.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>{l.address}</p>
            <a href={`tel:${l.phone}`} className="block mt-3 text-sm font-semibold" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>
              {l.phone}
            </a>
            <div className="mt-2 inline-block text-[11px] px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(46,204,113,0.12)", color: "#1B7A3A" }}>
              ● Same-Day Available
            </div>
            <button
              onClick={scrollTo("form")}
              className="mt-5 w-full rounded-full font-bold uppercase text-sm text-white cursor-pointer transition-colors duration-150"
              style={{ background: "#000033", height: 44, border: "none", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1A1A4A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#000033")}
            >
              Book at {l.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section style={{ background: "#000033" }} className="py-16 md:py-24">
      <div className="max-w-[720px] mx-auto px-5">
        <h2 className="font-oswald font-bold text-white text-center mb-10" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
          Common Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
                style={{ background: openIdx === i ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)" }}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-sm font-semibold text-white pr-4" style={{ fontFamily: "Inter, sans-serif" }}>{f.q}</span>
                <ChevronDown
                  className="h-4 w-4 flex-shrink-0 text-white/50 transition-transform duration-200"
                  style={{ transform: openIdx === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-white/70 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LeadForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [tcpa, setTcpa] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!validateEmail(email)) errs.email = "Enter a valid email";
    if (!phone.trim()) errs.phone = "Phone is required";
    else if (!validatePhone(phone)) errs.phone = "Enter a valid phone number";
    if (!location) errs.location = "Select a location";
    if (!tcpa) errs.tcpa = "You must consent to continue";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const params = new URLSearchParams({ name, email, phone, location, source: "lp-trt-v3", service: "trt" });
    const urls: Record<string, string> = {
      richmond: "https://menswellnesscenters.com/thank-you-richmond/",
      "newport-news": "https://menswellnesscenters.com/thank-you-newport-news/",
      "virginia-beach": "https://menswellnesscenters.com/thank-you-virginia-beach/",
    };
    window.location.href = `${urls[location]}?${params.toString()}`;
  };

  const inp: React.CSSProperties = {
    width: "100%", height: 48, background: "#FFFFFF", border: "1px solid #D6DAE6",
    borderRadius: 8, padding: "0 16px", fontSize: 16, color: "#0E1230",
    outline: "none", fontFamily: "Inter, sans-serif", transition: "border-color 200ms ease, box-shadow 200ms ease",
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#E8670A";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.18)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#D6DAE6";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section id="form" style={{ background: "#000033" }} className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 text-center">
        {/* Why today chips */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {["⚡ Same-day appointments", "🔬 On-site labs & results", "📋 Leave with a plan"].map((chip) => (
            <span key={chip} className="text-sm font-semibold text-white rounded-full px-4 py-2" style={{ background: "rgba(255,255,255,0.10)", fontFamily: "Inter, sans-serif" }}>
              {chip}
            </span>
          ))}
        </div>

        <h2 className="font-oswald font-bold text-white" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", lineHeight: 1.1 }}>
          Claim Your Free Consultation
        </h2>
        <p className="mt-3 text-base text-white/75 max-w-[520px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
          Walk into any of our 3 Virginia centers. No commitment. No credit card. Leave knowing exactly where you stand.
        </p>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#D4A017", fontSize: 18 }}>★</span>)}
          <span className="text-sm text-white/75" style={{ fontFamily: "Inter, sans-serif" }}>200+ Reviews</span>
        </div>

        {/* Form card */}
        <div
          className="mx-auto mt-8 rounded-2xl p-8"
          style={{ background: "#FFFFFF", maxWidth: 480, boxShadow: "0 12px 50px rgba(0,0,0,0.35)" }}
        >
          <h3 className="font-oswald font-bold uppercase text-center mb-6" style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#000033" }}>
            Book My Consultation
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <input type="text" placeholder="Full Name" aria-label="Full name" value={name} onChange={(e) => setName(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={inp} autoComplete="name" />
              {errors.name && <p className="text-xs mt-1 text-left text-red-500">{errors.name}</p>}
            </div>
            <div>
              <input type="email" placeholder="Email Address" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={inp} autoComplete="email" />
              {errors.email && <p className="text-xs mt-1 text-left text-red-500">{errors.email}</p>}
            </div>
            <div>
              <input type="tel" placeholder="Phone Number" aria-label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={inp} autoComplete="tel" />
              {errors.phone && <p className="text-xs mt-1 text-left text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <select
                aria-label="Preferred clinic location" value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={onFocus as any} onBlur={onBlur as any}
                style={{ ...inp, color: location ? "#000033" : "#999", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 40 }}
              >
                <option value="" disabled>Select Location</option>
                {LOCATIONS.map((l) => <option key={l.value} value={l.value}>{l.name}, VA</option>)}
              </select>
              {errors.location && <p className="text-xs mt-1 text-left text-red-500">{errors.location}</p>}
            </div>

            {/* TCPA */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tcpa}
                  onChange={(e) => setTcpa(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 cursor-pointer"
                  style={{ width: 16, height: 16, accentColor: "#E8670A" }}
                />
                <span className="text-[11px] leading-relaxed text-left" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
                  I consent to receive appointment and marketing texts from Men's Wellness Centers. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out or HELP for help. Consent is not required to receive services.
                </span>
              </label>
              {errors.tcpa && <p className="text-xs mt-1 text-left text-red-500">{errors.tcpa}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-full uppercase font-bold cursor-pointer transition-colors duration-150 text-white"
              style={{ height: 52, background: "#E8670A", fontSize: 14, border: "none", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", marginTop: 4 }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#C7560A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#E8670A")}
            >
              Claim My Consultation
            </button>
          </form>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <img src="/images/badges/hipaa.png" alt="HIPAA Compliant" style={{ height: 40, filter: "grayscale(1)", opacity: 0.65 }} />
            <img src="/images/badges/clia.png" alt="CLIA Certified" style={{ height: 40, filter: "grayscale(1)", opacity: 0.65 }} />
            <img src="/images/badges/legitscript.png" alt="LegitScript Certified" style={{ height: 40, filter: "grayscale(1)", opacity: 0.65 }} />
          </div>

          <p className="text-center text-xs mt-4" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>
            HIPAA Compliant · No Spam · Response Within 1 Hour
          </p>
          <p className="text-center text-sm mt-2">
            <a href={PHONE_HREF} className="font-bold" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>
              Or call: {PHONE}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer style={{ background: "#060622", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="py-10">
    <div className="max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
      <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-6 w-auto opacity-80" />
      <p className="text-xs text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
        © 2026 Men's Wellness Centers. Individual results vary. Not a substitute for medical advice.
      </p>
      <div className="flex items-center gap-4 text-xs text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
        <a href="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy</a>
        <a href="/terms-of-service" className="hover:text-white/70 transition-colors">Terms</a>
        <a href={PHONE_HREF} className="hover:text-white/70 transition-colors">{PHONE}</a>
      </div>
    </div>
  </footer>
);

const MobileCTA = () => (
  <div
    className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex gap-3"
    style={{ background: "#000033", borderTop: "1px solid rgba(255,255,255,0.10)" }}
  >
    <a
      href={PHONE_HREF}
      className="flex-1 flex items-center justify-center gap-2 rounded-full font-bold uppercase text-[13px] text-white"
      style={{ background: "rgba(255,255,255,0.10)", height: 48, letterSpacing: "0.06em", border: "1px solid rgba(255,255,255,0.15)" }}
    >
      <Phone className="h-4 w-4" /> Call
    </a>
    <button
      onClick={scrollTo("form")}
      className="flex-[2] rounded-full font-bold uppercase text-[13px] text-white cursor-pointer"
      style={{ background: "#E8670A", height: 48, letterSpacing: "0.08em", border: "none" }}
    >
      Book My Consultation
    </button>
  </div>
);

/* ─── PAGE ─────────────────────────────────────────────────── */

const TRTv3LandingPage = () => {
  useEffect(() => {
    document.title = "Physician-Led TRT in Virginia | Men's Wellness Centers";
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const isProperty = selector.includes("property=");
        const key = selector.match(/"([^"]+)"/)?.[1] ?? "";
        if (isProperty) el.setAttribute("property", key);
        else el.setAttribute("name", key);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", "Same-day testosterone replacement therapy at 3 Virginia clinics. On-site labs, face-to-face physician consultation, and a personalized plan — all in one visit.");
    setMeta('meta[property="og:title"]', "content", "Physician-Led TRT in Virginia | Men's Wellness Centers");
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif", paddingTop: 32 }}>
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ProblemSection />
        <WhyUs />
        <Results />
        <Pricing />
        <Pillars />
        <Locations />
        <FAQSection />
        <LeadForm />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
};

export default TRTv3LandingPage;
