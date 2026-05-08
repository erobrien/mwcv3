import { Check, Star } from "lucide-react";
import { TRTHeroForm } from "./TRTHeroForm";
import chesapeakeBg from "@/assets/trt-hero-physician.png";

const trustChecks = [
  "No referral needed",
  "Same/next-day visits",
  "Face-to-face physician",
  "Licensed VA providers",
];

const COLORS = {
  navyDeep: "#0A1628",
  navy: "#122036",
  cream: "#F5F1E8",
  orange: "#E87722",
  gold: "#C9A961",
};

export const TRTHero = () => {
  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-center"
      style={{
        background: COLORS.navyDeep,
        minHeight: 720,
        maxHeight: "100vh",
      }}
    >
      <a
        href="#hero-form"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-white focus:text-black focus:rounded"
      >
        Skip to lead form
      </a>

      {/* Background pattern */}
      <picture>
        <img
          src={chesapeakeBg}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          // @ts-ignore
          fetchpriority="high"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
      </picture>

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.75) 45%, rgba(10,22,40,0.40) 100%)",
        }}
      />

      {/* Subtle grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Bottom fade into stats bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(180deg, rgba(10,22,40,0) 0%, ${COLORS.navyDeep} 100%)` }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-6 pt-24 pb-12 lg:pt-32 lg:pb-24 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-center">
        {/* LEFT */}
        <div>
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase mb-6"
            style={{
              background: "transparent",
              border: `1px solid ${COLORS.cream}`,
              color: COLORS.cream,
              letterSpacing: "0.15em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Virginia's In-Person Men's Health Centers
          </span>

          <h1
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, 'Bebas Neue', Anton, sans-serif",
              fontSize: "clamp(48px, 6vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              color: COLORS.cream,
              fontWeight: 700,
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}
          >
            Get Your Edge Back.
            <br />
            <span style={{ color: COLORS.orange }}>In One Visit.</span>
          </h1>

          <p
            className="mt-6 max-w-[520px]"
            style={{
              color: "rgba(245,241,232,0.85)",
              fontFamily: "Inter, sans-serif",
              fontSize: 18,
              lineHeight: 1.5,
            }}
          >
            Same-day labs, a face-to-face Virginia physician, and a personalized plan. Free consult, every time.
          </p>

          <div
            className="mt-5 inline-flex items-center gap-2"
            style={{ color: COLORS.cream, fontFamily: "Inter, sans-serif" }}
          >
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4" fill={COLORS.gold} stroke={COLORS.gold} />
              ))}
            </span>
            <span style={{ fontSize: 14 }}>4.9 average from 200+ verified Google reviews</span>
          </div>

          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-[560px]">
            {trustChecks.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2.5"
                style={{ color: COLORS.cream, fontFamily: "Inter, sans-serif" }}
              >
                <Check className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={3} style={{ color: COLORS.orange }} />
                <span style={{ fontSize: 15, fontWeight: 500 }}>{t}</span>
              </li>
            ))}
          </ul>

          {/* Mobile primary CTA (hidden on lg+) */}
          <button
            onClick={scrollToForm}
            className="lg:hidden mt-7 w-full uppercase font-bold cursor-pointer"
            style={{
              height: 56,
              background: COLORS.orange,
              color: "#FFFFFF",
              fontSize: 14,
              border: "none",
              borderRadius: 8,
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Book My Free Consult
          </button>

          <div
            className="mt-6"
            style={{ color: "rgba(245,241,232,0.60)", fontFamily: "Inter, sans-serif", fontSize: 12 }}
          >
            Medically reviewed by licensed Virginia providers. Individual results vary.
          </div>
        </div>

        {/* RIGHT — form */}
        <div id="hero-form" className="w-full flex lg:justify-end">
          <TRTHeroForm />
        </div>
      </div>
    </section>
  );
};
