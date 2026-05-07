import imgFirstVisit from "@/assets/lp/first-visit-bloodwork.png";
import { Check } from "lucide-react";

export const TRTPricingCTA = () => {
  const scrollToForm = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  const trust = [
    "Physician-Led",
    "LegitScript Certified",
    "HIPAA Compliant",
    "3 Virginia Locations",
  ];

  return (
    <section id="pricing-cta" className="py-10 md:py-14" style={{ background: "#E8670A" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left: copy (mobile second) */}
        <div className="order-2 md:order-1">
          <h2
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            YOUR FIRST VISIT IS SIMPLE.
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

          <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
            {trust.map((label) => (
              <li key={label} className="flex items-center gap-2">
                <Check className="h-[18px] w-[18px] flex-shrink-0" style={{ color: "#2ECC71" }} />
                <span className="text-sm font-medium" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: image (mobile first) */}
        <div className="order-1 md:order-2">
          <img
            src={imgFirstVisit}
            alt="Phlebotomist drawing blood for on-site testosterone panel at Men's Wellness Centers"
            className="rounded-2xl object-cover w-full aspect-[4/3] md:aspect-auto md:h-[360px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
