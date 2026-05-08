import imgManifesto from "@/assets/lp/man-athletic-smiling.jpeg";
import { Quote } from "lucide-react";

const NAVY = "#122256";
const ORANGE = "#E8670A";
const ORANGE_HOVER = "#D45A00";

export const TRTManifesto = () => {
  return (
    <section style={{ background: "#FFFFFF", paddingTop: "clamp(64px, 10vw, 120px)", paddingBottom: "clamp(64px, 10vw, 120px)" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left: copy (mobile second) */}
        <div className="order-2 md:order-1">
          <div
            className="uppercase mb-3"
            style={{ color: "#6B7F94", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em" }}
          >
            Why Men Choose Us
          </div>
          <h2
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4.5vw, 48px)", color: NAVY, fontWeight: 400, lineHeight: 1.1, letterSpacing: "0.02em", textTransform: "uppercase" }}
          >
            This isn't about vanity.<br />It's about getting your edge back.
          </h2>

          <p className="text-base mt-5" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.65 }}>
            Sharp. Confident. Performing at your level. That's the man your wife married, your team respects, and your kids look up to. When the energy goes, the rest follows.
          </p>
          <p className="text-base mt-4" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.65 }}>
            We are men's health. Not a side service at a general practice. Not a faceless app. A Virginia physician, your numbers, and a plan that fits your life.
          </p>

          <figure
            className="mt-7 p-6"
            style={{ background: "#F2F1EB", border: "1px solid #D0CEBC", borderTop: "3px solid #E8670A", borderRadius: 8 }}
          >
            <Quote className="h-5 w-5 mb-2" style={{ color: ORANGE }} />
            <blockquote
              className="text-base italic"
              style={{ color: "#1A1A1A", fontFamily: "Inter, sans-serif", lineHeight: 1.65 }}
            >
              "I felt like I was running on fumes for two years. One visit, real labs, a real plan. Six weeks in I was sleeping again. Six months in I felt like myself."
            </blockquote>
            <figcaption className="mt-3 text-sm" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
              Mark B., 52, Richmond
            </figcaption>
          </figure>

          <button
            onClick={() => document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-7 inline-flex items-center justify-center font-semibold uppercase cursor-pointer border-none transition-all duration-200"
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
            See If You Qualify
          </button>
          <p className="mt-3 text-xs" style={{ color: "#888888", fontFamily: "Inter, sans-serif" }}>
            No-obligation consult. Individual results vary.
          </p>
        </div>

        {/* Right: image (mobile first) */}
        <div className="order-1 md:order-2">
          <img
            src={imgManifesto}
            alt="Confident Virginia man after testosterone optimization"
            className="object-cover w-full aspect-[4/3] md:aspect-auto md:h-[460px]"
            style={{ borderRadius: 16 }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
