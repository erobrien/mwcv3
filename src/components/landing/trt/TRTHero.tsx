import { Check, ArrowRight, Star } from "lucide-react";

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
      style={{
        background: "#000033",
      }}
    >
      {/* Navy left-to-right gradient (back) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #000033 0%, #000033 30%, #001A66 70%, #002A99 100%)",
        }}
      />
      {/* Medical grid pattern (on top, fades in from left) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.6) 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* Soft orange glow accent in top-right */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 90% 10%, rgba(232,103,10,0.18) 0%, transparent 70%)",
        }}
      />
      {/* Left-to-right navy gradient ensures headline always sits on solid color */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #000033 0%, #000033 35%, rgba(0,0,51,0.55) 70%, rgba(0,0,51,0.2) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-24 pb-12 md:pt-36 md:pb-24">
        <span
          className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase mb-6"
          style={{ background: "#F5F0EB", color: "#000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
        >
          Virginia's In-Person Men's Health Clinics
        </span>

        <h1
          className="font-bold uppercase max-w-[820px]"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(40px, 6vw, 68px)",
            color: "#FFFFFF",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Physician-Led{" "}
          <span style={{ color: "#E8670A" }}>Testosterone Care</span>
          <span className="block">In One Visit</span>
        </h1>

        <p
          className="mt-5 text-base md:text-lg leading-relaxed max-w-[680px]"
          style={{ color: "rgba(255,255,255,0.90)", fontFamily: "Inter, sans-serif" }}
        >
          Walk into one of our 3 Virginia clinics for blood work, a face-to-face consultation with a licensed provider, and a personalized care plan — typically completed in under 60 minutes. Same-day and next-day appointments available.
        </p>

        <div className="mt-5 flex items-center gap-2 flex-wrap" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "Inter, sans-serif" }}>
          <span className="flex items-center gap-0.5" aria-label="Rated 4.9 out of 5 stars">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" aria-hidden="true" />)}
          </span>
          <span className="text-sm font-medium">4.9 average from 200+ verified Google reviews</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={scrollTo("final-cta")}
            className="inline-flex items-center gap-2 rounded-full font-bold uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02] w-full sm:w-auto justify-center"
            style={{ height: 52, paddingLeft: 28, paddingRight: 28, fontSize: 14, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#C7560A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Book My Consultation <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={scrollTo("how-it-works")}
            className="hidden sm:inline-flex items-center gap-2 rounded-full font-bold uppercase cursor-pointer transition-all duration-200"
            style={{ height: 52, paddingLeft: 28, paddingRight: 28, fontSize: 14, background: "transparent", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "1.5px solid rgba(255,255,255,0.6)" }}
          >
            See If You Qualify
          </button>
        </div>

        <ul className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
          {trustChecks.map((t) => (
            <li key={t} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "Inter, sans-serif" }}>
              <Check className="h-[18px] w-[18px] flex-shrink-0" style={{ color: "#2ECC71" }} aria-hidden="true" />
              <span className="text-sm font-medium">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}>
          Medically reviewed by licensed Virginia providers.
        </div>
      </div>
    </section>
  );
};
