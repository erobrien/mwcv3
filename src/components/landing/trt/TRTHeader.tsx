import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

export const TRTHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,51,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        height: 64,
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
            className="rounded-full px-5 py-2.5 text-xs font-bold uppercase cursor-pointer transition-colors duration-200"
            style={{
              background: "#E8670A",
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Book Now
          </button>
        </div>

        {/* Mobile phone link */}
        <a
          href="tel:8663444955"
          className="md:hidden flex items-center gap-2 text-sm font-semibold"
          style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
          aria-label="Call 866-344-4955"
        >
          <Phone className="h-4 w-4" />
          (866) 344-4955
        </a>
      </div>
    </header>
  );
};
