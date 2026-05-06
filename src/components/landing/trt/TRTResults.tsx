import { Star, ShieldCheck } from "lucide-react";

const resultStats = [
  { value: "2–5×", label: "Increase in Total Testosterone Within 2 Months*" },
  { value: "84%", label: "Of Patients Report Meaningful Symptom Improvement*" },
];

const testimonials = [
  {
    quote:
      "Energy is back to where it was a decade ago. I'm sleeping better, focused at work, and the team actually answers when I call.",
    name: "Mark T.",
    city: "Richmond, VA",
  },
  {
    quote:
      "I was skeptical of any clinic that wasn't my regular doctor, but the in-person visit and on-site labs made it feel legit. Body comp has shifted noticeably alongside training.",
    name: "James R.",
    city: "Virginia Beach, VA",
  },
  {
    quote:
      "Mood and motivation were the biggest changes for me. The physician walked me through every number on the panel, first time anyone has actually done that.",
    name: "David K.",
    city: "Newport News, VA",
  },
];

const outcomeCTAs = [
  "Want more energy →",
  "Want to lose fat →",
  "Want better focus →",
  "All of the above →",
];

export const TRTResults = () => {
  const scrollToFinalCTA = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="results" style={{ background: "#F5F0EB" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-24">
        <h2
          className="font-bold uppercase text-center"
          style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "0.02em" }}
        >
          Patient Reviews
        </h2>

        {/* Stat cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[760px] mx-auto">
          {resultStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-7 flex flex-col items-center text-center"
              style={{ background: "#E8670A" }}
            >
              <div
                className="font-bold"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "clamp(44px, 5.5vw, 64px)",
                  color: "#FFFFFF",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div
                className="mt-2 text-sm leading-snug font-semibold"
                style={{ color: "rgba(255,255,255,0.90)", fontFamily: "Inter, sans-serif" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-6 flex flex-col"
              style={{
                background: "#0A0A1A",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" />)}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}>
                "{t.quote}"
              </p>
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                <div className="text-sm font-semibold" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>{t.name}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.50)", fontFamily: "Inter, sans-serif" }}>{t.city}</div>
                <div
                  className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded"
                  style={{ background: "rgba(46,204,113,0.15)", color: "#2ECC71", letterSpacing: "0.08em" }}
                >
                  <ShieldCheck className="h-3 w-3" /> Verified Patient Review
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=Men%27s+Wellness+Centers+Virginia+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold underline underline-offset-4"
            style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}
          >
            Read all 200+ reviews on Google →
          </a>
        </div>

        {/* Outcome CTA row */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {outcomeCTAs.map((label) => (
            <button
              key={label}
              onClick={scrollToFinalCTA}
              className="rounded-full px-5 py-2.5 text-sm font-semibold cursor-pointer transition-colors duration-200"
              style={{
                background: "#1A1A2E",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.20)",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E8670A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)"; }}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "rgba(0,0,0,0.40)", fontFamily: "Inter, sans-serif" }}>
          *Individual results vary. Based on patient-reported outcomes at Men's Wellness Centers Virginia locations.
        </p>
      </div>
    </section>
  );
};
