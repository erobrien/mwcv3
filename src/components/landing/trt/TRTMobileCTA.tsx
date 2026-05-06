import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export const TRTMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) setVisible(window.scrollY > hero.offsetHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const scrollToForm = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch"
      style={{ height: 56, boxShadow: "0 -2px 12px rgba(0,0,0,0.20)" }}
    >
      <a
        href="tel:8663444955"
        className="flex-1 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.06em]"
        style={{
          background: "#000033",
          color: "#FFFFFF",
          textDecoration: "none",
          fontFamily: "Inter, sans-serif",
          borderRight: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <Phone size={14} /> Call Now
      </a>
      <button
        onClick={scrollToForm}
        className="flex-1 flex items-center justify-center text-[12px] font-bold uppercase tracking-[0.06em] cursor-pointer border-none"
        style={{ background: "#E8670A", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
      >
        Book Consultation
      </button>
    </div>
  );
};
