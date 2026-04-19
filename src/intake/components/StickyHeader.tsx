import { Phone } from "lucide-react";

const StickyHeader = () => {
  return (
    <header
      className="intake-safe-top sticky top-0 z-40"
      style={{
        backgroundColor: "var(--bg-navy)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ height: 60, maxWidth: 560, padding: "0 20px" }}
      >
        <div
          className="leading-[1.05] text-white"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 15,
            letterSpacing: "0.08em",
          }}
        >
          <div>MEN'S</div>
          <div>WELLNESS CENTERS</div>
        </div>

        <a
          href="tel:7579379990"
          className="hidden items-center gap-2 min-[480px]:inline-flex"
          style={{
            color: "#B0ADA8",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <Phone size={16} strokeWidth={2} />
          <span>(757) 937-9990</span>
        </a>
      </div>
    </header>
  );
};

export default StickyHeader;
