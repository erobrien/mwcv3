import { TickerStrip } from "@/components/shared/TickerStrip";
import { BreadcrumbBar } from "@/components/shared/BreadcrumbBar";

const TICKER_ITEMS = [
  "SAME-DAY LAB RESULTS",
  "EST. 2015",
  "10,000+ MEN TREATED",
  "4.9★ GOOGLE RATING",
  "3 VIRGINIA LOCATIONS",
  "NO COST CONSULTATION",
];

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background: "#000033",
        paddingTop: "clamp(112px, 16vh, 160px)",
        paddingBottom: "clamp(48px, 8vh, 96px)",
      }}
    >
      <img
        src="/images/hero-still.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
      />
      {/* Top-down navy gradient — heavier at the top so headline & nav read cleanly over the pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,51,0.85) 0%, rgba(0,0,51,0.55) 30%, rgba(0,0,51,0.55) 70%, rgba(0,0,51,0.80) 100%)",
        }}
      />
      {/* Left vignette to keep copy legible over the brightest ripples */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,51,0.55) 0%, rgba(0,0,51,0.20) 45%, rgba(0,0,51,0) 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-5 flex flex-col items-center justify-center text-center" style={{ minHeight: "clamp(320px, 50vh, 500px)" }}>
        {/* Heritage eyebrow — establishes Virginia trust before the headline */}
        <p
          className="mb-3 md:mb-4 uppercase"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.7rem, 1.3vw, 0.8rem)",
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "#E8670A",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          }}
        >
          Trusted by Virginia men since 2015 · 10,000+ treated
        </p>
        <h1
          id="hero-heading"
          className="uppercase mx-auto"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.06em",
            color: "#FFFFFF",
            textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)",
            fontStyle: "italic",
            transform: "skewX(-4deg) scaleX(1.08)",
            display: "inline-block",
            WebkitTextStroke: "0.5px rgba(255,255,255,0.15)",
            paintOrder: "stroke fill",
            maxWidth: "min(900px, 75vw)",
          }}
        >
          Virginia's Men's Health Centers
        </h1>
        <p
          className="mt-3 md:mt-4 max-w-lg md:max-w-none italic"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.8)",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          Giving men's sexual and restorative healthcare a good name.
        </p>
        <p
          className="mt-2 max-w-md md:max-w-none"
          style={{
            fontSize: "clamp(0.8rem, 1.6vw, 1rem)",
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.65)",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          TRT, ED Treatment, Peptides at in-person medical centers across Virginia.
        </p>
        <p
          className="mt-2"
          style={{
            fontSize: "clamp(0.75rem, 1.4vw, 0.9rem)",
            color: "rgba(255,255,255,0.55)",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            letterSpacing: "0.04em",
          }}
        >
          10,000+ men treated · Walk-ins welcome · No referral
        </p>
        <div className="mt-5 md:mt-6 flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
          <a
            href="/book"
            className="rounded-full px-8 py-4 font-semibold text-sm uppercase tracking-[0.05em] transition-all duration-200 text-center cursor-pointer hover:scale-[1.02]"
            style={{ backgroundColor: "#E8670A", color: "#FFFFFF", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#E8670A"; }}
          >
            Book My Consultation
          </a>
          <a
            href="#locations"
            className="rounded-full px-8 py-4 font-semibold text-sm transition-all duration-200 text-center cursor-pointer hover:opacity-90"
            style={{ backgroundColor: "#FFFFFF", color: "#000033", textDecoration: "none" }}
          >
            See Virginia Locations
          </a>
        </div>
      </div>

      {/* Ticker strip */}
      <TickerStrip items={TICKER_ITEMS} />
    </section>
  );
};
