import { useState } from "react";
import { Star } from "lucide-react";

const NAVY = "#122256";
const ORANGE = "#E8670A";
const ORANGE_HOVER = "#D45A00";

const testimonials = [
  {
    quote:
      "Six months on TRT and I finally feel like myself again. Energy is up, mood is stable, and I'm sleeping through the night for the first time in years.",
    name: "Mark B.",
    city: "Richmond, VA",
  },
  {
    quote:
      "The nursing staff here is top-notch. They walk you through everything, answer every question, and actually follow up after your visits. Never experienced that anywhere else.",
    name: "Howard B.",
    city: "Virginia Beach, VA",
  },
  {
    quote:
      "From the front desk to the physician, every person I've dealt with has been professional and genuinely helpful. You can tell they care about results, not just billing.",
    name: "Douglas H.",
    city: "Newport News, VA",
  },
  {
    quote:
      "Got my labs back in two days and started treatment the same week. No runaround, no waiting months. The team moves fast and knows what they're doing.",
    name: "James R.",
    city: "Richmond, VA",
  },
  {
    quote:
      "I feel stronger and more focused than I have in years. My wife says I'm a different person. Should've done this years ago.",
    name: "Steve P.",
    city: "Chesapeake, VA",
  },
  {
    quote:
      "I was hesitant about hormone therapy but the doctor laid everything out honestly. No pressure, just facts. Three months in and I wish I'd started sooner.",
    name: "David K.",
    city: "Norfolk, VA",
  },
];

export const TRTResults = () => {
  const [showAll, setShowAll] = useState(false);
  const scrollToForm = () => document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="results" style={{ background: "#F2F1EB" }}>
      <div className="max-w-[1200px] mx-auto px-6" style={{ paddingTop: "clamp(64px, 10vw, 120px)", paddingBottom: "clamp(64px, 10vw, 120px)" }}>
        <h2
          className="text-center"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: NAVY, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "0.02em", fontWeight: 400, textTransform: "uppercase" }}
        >
          Real Members. Real Experiences.
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`p-6 flex flex-col ${i >= 3 && !showAll ? "hidden md:flex" : ""}`}
              style={{
                background: "#FFFFFF",
                border: "1px solid #D0CEBC",
                borderTop: "3px solid #E8670A",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(13,8,7,0.04)",
              }}
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill={ORANGE} stroke={ORANGE} />)}
              </div>
              <p className="text-sm italic flex-1" style={{ color: "#1A1A1A", fontFamily: "Inter, sans-serif", lineHeight: 1.65 }}>
                "{t.quote}"
              </p>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "#E8E5E0" }}>
                <div className="text-sm font-semibold" style={{ color: NAVY, fontFamily: "Inter, sans-serif" }}>{t.name}</div>
                <div className="text-xs" style={{ color: "#6B7F94", fontFamily: "Inter, sans-serif" }}>{t.city}</div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="md:hidden text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="text-sm font-semibold underline underline-offset-4 cursor-pointer"
              style={{ color: NAVY, fontFamily: "Inter, sans-serif", background: "none", border: "none" }}
            >
              Show more reviews
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <p className="text-base mb-4" style={{ color: "#1A1A1A", fontFamily: "Inter, sans-serif", fontSize: 16 }}>
            Join 10,000+ Virginia men who have taken the first step.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center font-semibold uppercase cursor-pointer border-none transition-all duration-200"
            style={{ background: ORANGE, color: "#FFFFFF", fontSize: 14, letterSpacing: "0.02em", fontFamily: "Inter, sans-serif", padding: "14px 28px", borderRadius: 4 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ORANGE_HOVER;
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(232,103,10,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ORANGE;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Start My Consult
          </button>
        </div>
      </div>
    </section>
  );
};
