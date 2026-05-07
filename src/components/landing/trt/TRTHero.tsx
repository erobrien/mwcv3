import { Check, ArrowRight, Star } from "lucide-react";
import heroBg from "@/assets/hero-trt-surfers.webp";

const trustChecks = [
  "No referral needed",
  "Same/next-day appointments",
  "FSA/HSA accepted",
  "Licensed Virginia providers",
];

export const TRTHero = () => {
  const scrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: "#000033" }}
    >
      {/* Full-bleed background image */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35 }}
        loading="eager"
      />
      {/* Dark gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(0,0,51,0.92) 0%, rgba(0,0,51,0.65) 55%, rgba(0,0,51,0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,51,0.9) 0%, transparent 40%)" }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-20 pb-12 md:pt-36 md:pb-24">
        <span
          className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase mb-6"
          style={{ background: "#F5F0EB", color: "#000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
        >
          Virginia's In-Person Men's Health Clinics
        </span>

        <h1
          className="font-bold uppercase leading-[1.05] max-w-[900px]"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(40px, 7vw, 84px)",
            color: "#FFFFFF",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          Physician-Led <span style={{ color: "#E8670A" }}>TRT and ED Therapy</span>, In One Visit
        </h1>

        <p
          className="mt-5 text-base md:text-lg leading-relaxed max-w-[680px]"
          style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}
        >
          Book your visit in under 5 minutes. Pick one of our 3 Virginia clinics, choose a same-day or next-day time, and you're set. No referral, no phone tag, no waiting weeks for care.
        </p>

        <div className="mt-5 flex items-center gap-2 flex-wrap" style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Inter, sans-serif" }}>
          <span className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" />)}
          </span>
          <span className="text-sm font-medium">4.9 average from 200+ verified Google reviews</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={scrollTo("final-cta")}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02] w-full sm:w-auto justify-center"
            style={{ height: 52, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Book My Consultation <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={scrollTo("how-it-works")}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200"
            style={{ height: 52, background: "transparent", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "1px solid rgba(255,255,255,0.4)" }}
          >
            See If You Qualify
          </button>
        </div>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
          {trustChecks.map((t) => (
            <li key={t} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Inter, sans-serif" }}>
              <Check className="h-[18px] w-[18px] flex-shrink-0" style={{ color: "#2ECC71" }} />
              <span className="text-sm font-medium">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
          Medically reviewed by licensed Virginia providers.
        </div>
      </div>
    </section>
  );
};
