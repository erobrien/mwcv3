import { useState, useEffect } from "react";

export const TRTMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        setVisible(window.scrollY > hero.offsetHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToForm}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center font-bold text-sm uppercase cursor-pointer"
      style={{
        height: 56,
        background: "#E8670A",
        color: "#FFFFFF",
        letterSpacing: "0.08em",
        fontFamily: "Inter, sans-serif",
        border: "none",
      }}
    >
      Book My Free Consultation
    </button>
  );
};
