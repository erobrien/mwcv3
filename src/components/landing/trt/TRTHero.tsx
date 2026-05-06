import { Check, ArrowRight, Star, MapPin, CalendarClock } from "lucide-react";

const trustChecks = [
  { icon: "💉", label: "Licensed Virginia providers" },
  { icon: "🩺", label: "Same/next-day appointments" },
  { icon: "📍", label: "3 in-person Virginia clinics" },
  { icon: "💳", label: "FSA/HSA Accepted" },
];

const outcomePills = [
  { emoji: "⚡", label: "More Energy" },
  { emoji: "🔥", label: "Stronger Libido" },
  { emoji: "🧠", label: "Sharper Focus" },
  { emoji: "💪", label: "Lean Muscle" },
];

export const TRTHero = () => {
  const scrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="dark relative overflow-hidden bg-background"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-20">

        {/* Urgency ticker */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-sm font-semibold"
          style={{
            background: "rgba(232,103,10,0.15)",
            border: "1px solid rgba(232,103,10,0.40)",
            color: "#E8670A",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <span>⚡</span>
          <span>Same-Day Appointments Available — Limited This Week</span>
        </div>

        {/* Top row: headline left, trust + rating right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left, Headline */}
          <div className="lg:col-span-7">
            <h1
              className="font-oswald font-bold uppercase text-foreground"
              style={{
                fontSize: "clamp(44px, 6.4vw, 84px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 0.98,
              }}
            >
              Testosterone
              <span className="block text-accent">
                Done Right
              </span>
            </h1>
            <p
              className="mt-4 font-oswald uppercase"
              style={{
                fontSize: "clamp(18px, 2.2vw, 26px)",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.04em",
                lineHeight: 1.2,
              }}
            >
              In-Person. Same-Day Labs. A Real Doctor.
            </p>

            {/* Review badge */}
            <div
              className="inline-flex items-center gap-2 mt-5 rounded-full px-4 py-2"
              style={{
                background: "rgba(255,193,7,0.12)",
                border: "1px solid rgba(255,193,7,0.30)",
              }}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-[#FFC107]" fill="currentColor" stroke="currentColor" aria-hidden="true" />
                ))}
              </div>
              <span
                className="font-bold text-sm"
                style={{ color: "#FFC107", fontFamily: "Inter, sans-serif" }}
              >
                4.9
              </span>
              <span
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.70)", fontFamily: "Inter, sans-serif" }}
              >
                · 200+ Google Reviews
              </span>
            </div>

            <p className="mt-6 font-inter text-base md:text-lg leading-relaxed max-w-[560px] text-foreground/75">
              Physician-led TRT at three Virginia clinics. On-site labs, face-to-face consultation, and a personalized care plan — all in one visit.
            </p>
          </div>

          {/* Right, Trust checks */}
          <div className="lg:col-span-5 lg:pt-4">
            <ul className="space-y-3">
              {trustChecks.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-3 text-base font-inter text-foreground/90"
                >
                  <Check className="h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" strokeWidth={2.5} />
                  <span>{t.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA cards row */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1, Primary booking */}
          <button
            onClick={scrollTo("final-cta")}
            className="group relative overflow-hidden rounded-2xl text-left p-7 md:p-9 cursor-pointer transition-transform duration-200 hover:scale-[1.01] bg-accent border border-accent/40"
            style={{ minHeight: 220 }}
          >
            <div
              className="text-[11px] uppercase font-inter font-bold mb-3 tracking-[0.14em] inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ background: "rgba(46,204,113,0.25)", color: "#2ECC71" }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2ECC71", display: "inline-block" }} />
              OPEN TODAY
            </div>
            <div
              className="font-oswald font-bold uppercase text-accent-foreground"
              style={{
                fontSize: "clamp(22px, 2.6vw, 32px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                maxWidth: 360,
              }}
            >
              Same-Day Labs + Results in One Visit
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-background text-foreground font-inter font-bold uppercase h-11 px-5 text-[13px] tracking-[0.08em]">
              Book My Consultation <ArrowRight className="h-4 w-4" />
            </div>
            <div className="absolute right-6 top-6 hidden md:block opacity-30">
              <CalendarClock size={120} className="text-accent-foreground" strokeWidth={1} aria-hidden="true" />
            </div>
            <div className="mt-6 text-xs font-inter text-accent-foreground/85">
              Treatment plans start at $199/month after approval.
            </div>
          </button>

          {/* Card 2, Locations */}
          <button
            onClick={scrollTo("locations")}
            className="group relative overflow-hidden rounded-2xl text-left p-7 md:p-9 cursor-pointer transition-all duration-200 hover:scale-[1.01] border border-foreground/20 hover:border-accent focus-visible:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-[var(--bg-charcoal)]"
            style={{ minHeight: 220 }}
          >
            {/* Hover overlay */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse 70% 90% at 100% 0%, hsl(var(--accent) / 0.10) 0%, hsl(var(--accent) / 0) 60%), linear-gradient(135deg, hsl(var(--foreground) / 0.04) 0%, hsl(var(--foreground) / 0) 60%)",
              }}
            />
            <div className="relative flex items-center gap-2 mb-3">
              <div className="text-[11px] uppercase font-inter font-bold text-accent tracking-[0.14em]">
                3 Virginia Clinics
              </div>
              <div
                className="text-[10px] uppercase font-inter font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(46,204,113,0.20)", color: "#2ECC71", letterSpacing: "0.08em" }}
              >
                Available This Week
              </div>
            </div>
            <div
              className="relative font-oswald font-bold uppercase text-foreground"
              style={{
                fontSize: "clamp(22px, 2.6vw, 32px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                maxWidth: 360,
              }}
            >
              Walk Into A Real Clinic Near You
            </div>
            <div className="relative mt-6 inline-flex items-center gap-2 rounded-full font-inter font-bold uppercase h-11 px-5 text-[13px] tracking-[0.08em] bg-transparent text-foreground border-2 border-foreground/90 transition-colors duration-150 group-hover:bg-foreground group-hover:text-[var(--bg-charcoal)] group-hover:border-foreground group-focus-visible:bg-foreground group-focus-visible:text-[var(--bg-charcoal)]">
              See Locations <ArrowRight className="h-4 w-4" />
            </div>
            <div className="absolute right-6 top-6 hidden md:block opacity-30 transition-opacity duration-300 group-hover:opacity-50">
              <MapPin size={120} className="text-foreground" strokeWidth={1} aria-hidden="true" />
            </div>
            <div className="mt-6 text-xs font-inter text-foreground/85 flex items-center gap-3">
              <span>Glen Allen</span>
              <span className="text-foreground/40">•</span>
              <span>Newport News</span>
              <span className="text-foreground/40">•</span>
              <span>Virginia Beach</span>
            </div>
          </button>
        </div>

        {/* Outcome pill chips */}
        <div className="mt-8 flex flex-wrap gap-3">
          {outcomePills.map((pill) => (
            <div
              key={pill.label}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "#1A1A2E",
                color: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <span style={{ color: "#E8670A" }}>{pill.emoji}</span>
              {pill.label}
            </div>
          ))}
        </div>

        <div className="mt-6 text-xs font-inter text-foreground/55">
          Medically reviewed by licensed Virginia providers. Individual results vary.
        </div>
      </div>
    </section>
  );
};
