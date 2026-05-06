import { X } from "lucide-react";

const symptoms = [
  "Constant fatigue no matter how much you sleep",
  "Lost your drive, confidence, and motivation",
  "Brain fog so bad you can't focus at work",
  "Gaining belly fat and losing muscle despite working out",
  'Your doctor says your labs are "normal" but you feel anything but',
];

const steps = [
  {
    num: "1",
    title: "Same-Day Blood Work",
    desc: "On-site labs. Results typically reviewed in minutes — not 2 weeks.",
  },
  {
    num: "2",
    title: "Doctor Who Actually Listens",
    desc: "A physician who specializes in men's hormones sits with you, goes over every number, and actually explains what's going on.",
  },
  {
    num: "3",
    title: "Get Your Personalized Plan",
    desc: "Your doctor builds a plan around your labs and symptoms. Many patients are able to begin their personalized plan the same day, based on their evaluation.",
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
        color: "#E8670A",
        fontFamily: "Inter, sans-serif",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.12em",
      }}
    >
      {text}
    </div>
  );

  const heading = (text: string) => (
    <h2
      className="font-bold uppercase"
      style={{
        fontFamily: "Oswald, sans-serif",
        fontSize: "clamp(28px, 4vw, 44px)",
        color: "#000033",
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: "-0.01em",
      }}
    >
      {text}
    </h2>
  );

  return (
    <section id="how-it-works" className="py-14 md:py-20" style={{ background: "#F5F0EB" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Left: Symptoms */}
        <div>
          {eyebrow("Sound Familiar?")}
          {heading("Tired of feeling like a worse version of yourself?")}
          <p
            className="mt-5 text-base leading-relaxed"
            style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif", maxWidth: 520 }}
          >
            You used to have energy. You used to have drive. Now you drag yourself through the day, can't focus, can't sleep right, and the weight won't come off no matter what you do. Your doctor says your labs are "normal." You know they're wrong.
          </p>
          <ul className="mt-8 space-y-4">
            {symptoms.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <X className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={3} style={{ color: "#E8670A" }} />
                <span className="text-base" style={{ color: "#1A1A1A", fontFamily: "Inter, sans-serif" }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: How it works */}
        <div>
          {eyebrow("The Fix")}
          {heading("Here's how it works in one visit")}
          <p
            className="mt-5 text-base leading-relaxed"
            style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif", maxWidth: 520 }}
          >
            No referrals. No waiting weeks. Book online in minutes, come in, and leave with a plan.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#000033" }}
                >
                  <span className="font-bold text-sm" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
                    {s.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-base mt-1 leading-relaxed" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollToForm}
            className="mt-10 inline-flex items-center justify-center rounded-full px-8 py-4 font-bold text-sm uppercase cursor-pointer transition-colors duration-200"
            style={{
              background: "#E8670A",
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
              border: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Schedule My Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
