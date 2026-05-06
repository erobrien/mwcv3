import imgDoctor from "@/assets/lp/provider-headshot.jpg";

export const TRTPricingCTA = () => {
  const scrollToForm = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  const trust = [
    { icon: "🩺", label: "Physician-Led" },
    { icon: "✓", label: "LegitScript Certified" },
    { icon: "🔒", label: "HIPAA Compliant" },
    { icon: "📍", label: "3 Virginia Locations" },
  ];

  return (
    <section id="pricing-cta" className="py-14" style={{ background: "#E8670A" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <h2
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            YOUR FIRST VISIT IS .
          </h2>
          <p
            className="text-base mt-3 leading-[1.6]"
            style={{ color: "rgba(255,255,255,0.90)", fontFamily: "Inter, sans-serif" }}
          >
            Walk into any of our 3 Virginia centers. Testosterone test, physician consultation, results reviewed in-visit. No commitment, no credit card.
          </p>
          <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.70)", fontFamily: "Inter, sans-serif" }}>
            Treatment plans start at $199/month after approval.
          </p>

          <button
            onClick={scrollToForm}
            className="mt-6 rounded-full px-8 py-4 font-bold text-sm uppercase cursor-pointer transition-colors duration-200"
            style={{
              background: "#FFFFFF",
              color: "#000033",
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
              border: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.90)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
          >
            Book My Consultation
          </button>

          <div className="flex flex-wrap gap-6 mt-4">
            {trust.map((t) => (
              <span key={t.label} className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.80)", fontFamily: "Inter, sans-serif" }}>
                {t.icon} {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <img
            src={imgDoctor}
            alt="Dr. Popariello, Medical Director at Men's Wellness Centers"
            className="rounded-2xl object-cover object-top h-[360px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
