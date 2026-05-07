import { Check, ArrowRight, Star } from "lucide-react";

const trustChecks = [
  "No referral needed",
  "Same/next-day visits",
  "FSA/HSA accepted",
  "Licensed VA providers",
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
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-20 pb-10 md:pt-36 md:pb-24">
        <span
          className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase mb-5"
          style={{ background: "#F5F0EB", color: "#000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
        >
          Virginia's In-Person Men's Health Clinics
        </span>

        <h1
          className="font-bold uppercase leading-[1.05] max-w-[900px]"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(32px, 7vw, 84px)",
            color: "#FFFFFF",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          TRT &amp; ED Care, <span style={{ color: "#E8670A" }}>In One Visit</span>
        </h1>

        <p
          className="mt-4 text-base md:text-lg leading-relaxed max-w-[680px]"
          style={{ color: "rgba(255,255,255,0.90)", fontFamily: "Inter, sans-serif", fontSize: 16 }}
        >
          Same-day labs, a Virginia physician, and your plan. All booked online in minutes.
        </p>

        <div className="mt-4 flex items-center gap-2 flex-wrap" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "Inter, sans-serif" }}>
          <span className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" />)}
          </span>
          <span className="text-sm font-medium" style={{ fontSize: 14 }}>4.9 average from 200+ verified Google reviews</span>
        </div>

        {/* Trust chips moved above CTA on mobile */}
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
          {trustChecks.map((t) => (
            <li key={t} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "Inter, sans-serif" }}>
              <Check className="h-[18px] w-[18px] flex-shrink-0" style={{ color: "#2ECC71" }} />
              <span className="font-medium" style={{ fontSize: 16 }}>{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={scrollTo("final-cta")}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02] w-full sm:w-auto justify-center"
            style={{ height: 56, minHeight: 56, background: "#E8670A", color: "#FFFFFF", fontSize: 15, letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Book My Consult <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
          Book entirely online. FSA/HSA accepted.
        </p>

        <div className="mt-4">
          <a
            href="#how-it-works"
            onClick={(e) => { e.preventDefault(); scrollTo("how-it-works")(); }}
            className="text-sm underline underline-offset-4"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
          >
            New to TRT? Read what to expect.
          </a>
        </div>

        <div className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}>
          Medically reviewed by licensed Virginia providers.
        </div>
      </div>
    </section>
  );
};
