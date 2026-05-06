import { Check, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-trt-surfers.webp";

const badges = ["LegitScript Certified", "Google Healthcare Certified"];

const benefits = [
  "No referral needed",
  "FSA/HSA accepted",
  "Same-day appointments",
];

const subhead = "Same-day and next-day appointments at 3 Virginia clinics. Book in under 5 minutes. Labs, results, and your care plan – all in one visit.";

export const TRTHero = () => {
  const scrollToForm = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-end md:items-center"
      style={{ background: "#000033", minHeight: "100vh" }}
    >
      {/* Full-bleed background image */}
      <img
        src={heroBg}
        alt="Surfers walking on beach"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35 }}
        loading="eager"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(0,0,51,0.85) 0%, rgba(0,0,51,0.5) 50%, rgba(0,0,51,0.2) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,51,0.9) 0%, transparent 40%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          {badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.80)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              ✓ {b}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1
          className="font-bold uppercase leading-[0.95] max-w-[900px]"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(40px, 8vw, 96px)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            fontWeight: 700,
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          GET YOUR ENERGY, DRIVE, AND CONFIDENCE BACK
        </h1>

        {/* Subhead */}
        <p
          className="mt-6 max-w-[640px] text-base md:text-lg"
          style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}
        >
          {subhead}
        </p>

        {/* CTA */}
        <div className="mt-8">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "#E8670A",
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
              border: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Book My Consultation
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Benefit bullets */}
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <Check className="h-[18px] w-[18px] flex-shrink-0" style={{ color: "#2ECC71" }} />
              <span className="text-sm font-medium" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
