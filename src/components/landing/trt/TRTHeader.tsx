import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

const NAVY = "#122256";
const ORANGE = "#E8670A";
const ORANGE_HOVER = "#D45A00";

export const TRTHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(18,34,86,0.96)" : "rgba(18,34,86,0.85)",
        backdropFilter: "blur(12px)",
        height: 64,
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="flex items-center justify-between px-6 mx-auto max-w-[1200px] h-full">
        <img
          src="/logos/Text_Logo_white.png"
          alt="Men's Wellness Centers"
          className="h-7 w-auto"
        />

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:8663444955"
            className="text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
          >
            866-344-4955
          </a>
          <button
            onClick={() => scrollTo("final-cta")}
            className="text-xs font-semibold uppercase cursor-pointer transition-all duration-200"
            style={{
              background: ORANGE,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              fontFamily: "Inter, sans-serif",
              padding: "12px 24px",
              borderRadius: 4,
              border: "none",
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
            Book My Consult
          </button>
        </div>

        {/* Mobile: phone icon only */}
        <div className="md:hidden flex items-center">
          <a
            href="tel:8663444955"
            aria-label="Call 866-344-4955"
            className="relative inline-flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: ORANGE,
              color: "#FFFFFF",
              borderRadius: 4,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-ping"
              style={{ background: ORANGE, opacity: 0.4, borderRadius: 4 }}
            />
            <Phone size={20} className="relative" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </header>
  );
};
