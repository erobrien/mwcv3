import { Check, ArrowRight, Star, MapPin, CalendarClock } from "lucide-react";

const trustChecks = [
  { icon: "💉", label: "Licensed Virginia providers" },
  { icon: "🩺", label: "Same/next-day appointments" },
  { icon: "📍", label: "3 in-person Virginia clinics" },
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
        {/* Top row: headline left, trust + rating right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left — Headline */}
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
            <p className="mt-6 font-inter text-base md:text-lg leading-relaxed max-w-[560px] text-foreground/75">
              Physician-led TRT at three Virginia clinics. On-site bloodwork, face-to-face consultation, and a personalized care plan — all in one visit.
            </p>
          </div>

          {/* Right — Trust + rating */}
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

            <div className="mt-8 flex items-center gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1" aria-label="Rated 4.9 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#FFC107]" fill="currentColor" stroke="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <div className="text-[11px] uppercase mt-1 font-inter font-semibold text-foreground/55 tracking-[0.14em]">
                  200+ Google Reviews
                </div>
              </div>
              <div className="font-oswald font-bold text-foreground leading-none text-[44px]">
                4.9
              </div>
            </div>
          </div>
        </div>

        {/* CTA cards row */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1 — Primary booking */}
          <button
            onClick={scrollTo("final-cta")}
            className="group relative overflow-hidden rounded-2xl text-left p-7 md:p-9 cursor-pointer transition-transform duration-200 hover:scale-[1.01] bg-accent border border-accent/40"
            style={{ minHeight: 220 }}
          >
            <div className="text-[11px] uppercase font-inter font-bold mb-3 text-accent-foreground/85 tracking-[0.14em]">
              Same-Day TRT Visit
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
              Bloodwork, Visit & Plan In One Hour
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

          {/* Card 2 — Locations */}
          <button
            onClick={scrollTo("locations")}
            className="group relative overflow-hidden rounded-2xl text-left p-7 md:p-9 cursor-pointer transition-transform duration-200 hover:scale-[1.01] bg-card border border-foreground/10"
            style={{ minHeight: 220 }}
          >
            <div className="text-[11px] uppercase font-inter font-bold mb-3 text-foreground/75 tracking-[0.14em]">
              3 Virginia Clinics
            </div>
            <div
              className="font-oswald font-bold uppercase text-foreground"
              style={{
                fontSize: "clamp(22px, 2.6vw, 32px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                maxWidth: 360,
              }}
            >
              Walk Into A Real Clinic Near You
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full font-inter font-bold uppercase h-11 px-5 text-[13px] tracking-[0.08em] bg-transparent text-foreground border border-foreground/50">
              See Locations <ArrowRight className="h-4 w-4" />
            </div>
            <div className="absolute right-6 top-6 hidden md:block opacity-25">
              <MapPin size={120} className="text-foreground" strokeWidth={1} aria-hidden="true" />
            </div>
            <div className="mt-6 text-xs font-inter text-foreground/75 flex items-center gap-3">
              <span>Glen Allen</span>
              <span className="text-foreground/30">•</span>
              <span>Newport News</span>
              <span className="text-foreground/30">•</span>
              <span>Virginia Beach</span>
            </div>
          </button>
        </div>

        <div className="mt-8 text-xs font-inter text-foreground/55">
          Medically reviewed by licensed Virginia providers. Individual results vary.
        </div>

        <div
          className="mt-8 text-xs"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}
        >
          Medically reviewed by licensed Virginia providers. Individual results vary.
        </div>
      </div>
    </section>
  );
};
