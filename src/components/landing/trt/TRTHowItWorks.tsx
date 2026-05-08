import { X } from "lucide-react";

const NAVY = "#122256";
const ORANGE = "#E8670A";
const ORANGE_HOVER = "#D45A00";

const symptoms = [
  "Persistent fatigue.",
  "Loss of drive and motivation.",
  "Difficulty focusing.",
  "Stubborn belly fat and muscle loss.",
  '"Normal" labs that do not match how you feel.',
];

const steps = [
  {
    num: "1",
    title: "Book Online In Under 5 Minutes",
    desc: "Pick the location and time that works for you. No referral, no phone tag.",
  },
  {
    num: "2",
    title: "Doctor Who Actually Listens",
    desc: "A physician who specializes in men's hormones sits with you, goes over every number, and actually explains what's going on.",
  },
  {
    num: "3",
    title: "Walk Out The Same Day With A Plan",
    desc: "A personalized plan built around your labs and your goals. Many patients begin treatment the same day, when clinically appropriate.",
  },
];

export const TRTHowItWorks = () => {
  const scrollToForm = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  const eyebrow = (text: string) => (
    <div
      className="uppercase mb-3"
      style={{
        color: "#6B7F94",
        fontFamily: "Inter, sans-serif",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.18em",
      }}
    >
      {text}
    </div>
  );

  const heading = (text: string) => (
    <h2
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(32px, 4.5vw, 52px)",
        color: NAVY,
        fontWeight: 400,
        lineHeight: 1.05,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      {text}
    </h2>
  );

  return (
    <section
      id="how-it-works"
      style={{ background: "#F2F1EB", paddingTop: "clamp(64px, 10vw, 120px)", paddingBottom: "clamp(64px, 10vw, 120px)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left: Symptoms (mobile shown second) */}
        <div className="order-2 md:order-1">
          {eyebrow("Sound Familiar?")}
          {heading("Common signs men ask us about")}
          <p
            className="mt-5 text-base"
            style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif", maxWidth: 520, lineHeight: 1.65 }}
          >
            Many men in their 40s, 50s, and beyond tell us the same story. The energy, focus, and drive they used to have just are not there. Their doctor says their labs are "normal," but they know something is off.
          </p>
          <ul className="mt-8 space-y-4">
            {symptoms.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <X className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={3} style={{ color: ORANGE }} />
                <span className="text-base" style={{ color: "#1A1A1A", fontFamily: "Inter, sans-serif" }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: How it works (mobile shown first) */}
        <div className="order-1 md:order-2">
          {eyebrow("The Fix")}
          {heading("Here's how it works in one visit")}

          <div className="mt-8 flex flex-col gap-6">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: NAVY, borderRadius: 4 }}
                >
                  <span className="font-bold text-sm" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
                    {s.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: NAVY, fontFamily: "Inter, sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-base mt-1" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif", lineHeight: 1.65 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollToForm}
            className="mt-10 inline-flex items-center justify-center font-semibold text-sm uppercase cursor-pointer transition-all duration-200"
            style={{
              background: ORANGE,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              fontFamily: "Inter, sans-serif",
              border: "none",
              padding: "14px 28px",
              borderRadius: 4,
            }}
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
            Book My First Visit
          </button>
        </div>
      </div>
    </section>
  );
};
