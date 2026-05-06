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
      className="relative overflow-hidden"
      style={{ background: "#000814" }}
    >
      {/* Subtle navy depth gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(22,51,110,0.55) 0%, rgba(10,31,74,0.25) 40%, rgba(0,8,20,0) 70%)",
        }}
      />
      {/* Orange glow behind headline */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "-5%",
          width: "55%",
          height: "70%",
          background:
            "radial-gradient(circle at 30% 40%, rgba(232,103,10,0.22) 0%, rgba(232,103,10,0.08) 35%, rgba(232,103,10,0) 65%)",
          filter: "blur(40px)",
        }}
      />
      {/* Soft top vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-20">
        {/* Top row: headline left, trust + rating right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left — Headline */}
          <div className="lg:col-span-7">
            <h1
              className="font-bold uppercase"
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(44px, 6.4vw, 84px)",
                color: "#FFFFFF",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 0.98,
              }}
            >
              Leading The Charge
              <span className="block" style={{ color: "#E8670A" }}>
                In Testosterone Care
              </span>
            </h1>
            <p
              className="mt-6 text-base md:text-lg leading-relaxed max-w-[560px]"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
            >
              Physician-led TRT at three Virginia clinics. On-site bloodwork, face-to-face consultation, and a personalized care plan — all in one visit.
            </p>
          </div>

          {/* Right — Trust + rating */}
          <div className="lg:col-span-5 lg:pt-4">
            <ul className="space-y-3">
              {trustChecks.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-3 text-base"
                  style={{ color: "rgba(255,255,255,0.92)", fontFamily: "Inter, sans-serif" }}
                >
                  <Check className="h-5 w-5 flex-shrink-0" style={{ color: "#E8670A" }} aria-hidden="true" strokeWidth={2.5} />
                  <span>{t.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1" aria-label="Rated 4.9 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" aria-hidden="true" />
                  ))}
                </div>
                <div
                  className="text-[11px] uppercase mt-1"
                  style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                >
                  200+ Google Reviews
                </div>
              </div>
              <div
                style={{ fontFamily: "Oswald, sans-serif", fontSize: 44, color: "#FFFFFF", fontWeight: 700, lineHeight: 1 }}
              >
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
            className="group relative overflow-hidden rounded-2xl text-left p-7 md:p-9 cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
            style={{
              background:
                "linear-gradient(135deg, #1A0B05 0%, #6B2A05 60%, #E8670A 100%)",
              border: "1px solid rgba(232,103,10,0.35)",
              minHeight: 220,
            }}
          >
            <div
              className="text-[11px] uppercase font-bold mb-3"
              style={{ color: "rgba(255,255,255,0.85)", letterSpacing: "0.14em", fontFamily: "Inter, sans-serif" }}
            >
              Same-Day TRT Visit
            </div>
            <div
              className="font-bold uppercase"
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(22px, 2.6vw, 32px)",
                color: "#FFFFFF",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                maxWidth: 360,
              }}
            >
              Bloodwork, Visit & Plan In One Hour
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-[#000814] font-bold uppercase"
                 style={{ height: 44, paddingLeft: 20, paddingRight: 20, fontSize: 13, letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}>
              Book My Consultation <ArrowRight className="h-4 w-4" />
            </div>
            <div className="absolute right-6 top-6 hidden md:block opacity-30">
              <CalendarClock size={120} color="#FFFFFF" strokeWidth={1} aria-hidden="true" />
            </div>
            <div
              className="mt-6 text-xs"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}
            >
              Treatment plans start at $199/month after approval.
            </div>
          </button>

          {/* Card 2 — Locations */}
          <button
            onClick={scrollTo("locations")}
            className="group relative overflow-hidden rounded-2xl text-left p-7 md:p-9 cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
            style={{
              background:
                "linear-gradient(135deg, #050B1A 0%, #0A1F4A 70%, #16336E 100%)",
              border: "1px solid rgba(255,255,255,0.10)",
              minHeight: 220,
            }}
          >
            <div
              className="text-[11px] uppercase font-bold mb-3"
              style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.14em", fontFamily: "Inter, sans-serif" }}
            >
              3 Virginia Clinics
            </div>
            <div
              className="font-bold uppercase"
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(22px, 2.6vw, 32px)",
                color: "#FFFFFF",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                maxWidth: 360,
              }}
            >
              Walk Into A Real Clinic Near You
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full font-bold uppercase"
                 style={{ height: 44, paddingLeft: 20, paddingRight: 20, fontSize: 13, letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", background: "transparent", color: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.5)" }}>
              See Locations <ArrowRight className="h-4 w-4" />
            </div>
            <div className="absolute right-6 top-6 hidden md:block opacity-25">
              <MapPin size={120} color="#FFFFFF" strokeWidth={1} aria-hidden="true" />
            </div>
            <div
              className="mt-6 text-xs flex items-center gap-3"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
            >
              <span>Glen Allen</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
              <span>Newport News</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
              <span>Virginia Beach</span>
            </div>
          </button>
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
