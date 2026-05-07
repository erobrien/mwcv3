import { Check, Star } from "lucide-react";
import { TRTHeroForm } from "./TRTHeroForm";

const trustChecks = [
  "No referral needed",
  "Same/next-day visits",
  "Face-to-face physician",
  "Licensed VA providers",
];

export const TRTHero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: "#000033" }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
        <div>
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase mb-5"
            style={{ background: "#F5F0EB", color: "#000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
          >
            Virginia's In-Person Men's Health Centers
          </span>

          <h1
            className="font-bold uppercase leading-[1.05]"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(32px, 5.6vw, 72px)",
              color: "#FFFFFF",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            Get Your Edge Back. <span style={{ color: "#E8670A" }}>In One Visit.</span>
          </h1>

          <p
            className="mt-4 text-base md:text-lg leading-relaxed max-w-[640px]"
            style={{ color: "rgba(255,255,255,0.90)", fontFamily: "Inter, sans-serif", fontSize: 16 }}
          >
            Same-day labs, a face-to-face Virginia physician, and a personalized plan. Free consult, every time.
          </p>

          <div className="mt-4 flex items-center gap-2 flex-wrap" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "Inter, sans-serif" }}>
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" />)}
            </span>
            <span className="text-sm font-medium" style={{ fontSize: 14 }}>4.9 average from 200+ verified Google reviews</span>
          </div>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 max-w-[560px]">
            {trustChecks.map((t) => (
              <li key={t} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "Inter, sans-serif" }}>
                <Check className="h-[18px] w-[18px] flex-shrink-0" style={{ color: "#2ECC71" }} />
                <span className="font-medium" style={{ fontSize: 16 }}>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}>
            Medically reviewed by licensed Virginia providers. Individual results vary.
          </div>
        </div>

        {/* Form */}
        <div id="hero-form" className="lg:sticky lg:top-24">
          <TRTHeroForm />
        </div>
      </div>
    </section>
  );
};
