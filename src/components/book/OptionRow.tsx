import { ChevronRight, LucideIcon } from "lucide-react";

interface OptionRowProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}

/**
 * AMD-friendly tappable option row.
 *
 * Design targets a 60yo male with macular degeneration on mobile:
 *   - 88px min tap target (single-tap auto-advance; no need to chase a NEXT button)
 *   - 22px label, weight 600, Inter (no Oswald display face)
 *   - 3px slate border so the boundary is unambiguous in peripheral vision
 *   - On selection: 4px orange border + orange tint fill + bold label color shift
 *   - Right-side chevron is the universal "tap to continue" affordance
 *   - WCAG AA contrast: #0B1029 on #FFFFFF and on #FFF5EE both >7:1
 */
const OptionRow = ({ icon: Icon, label, selected, onClick }: OptionRowProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className="flex w-full items-center gap-3 md:gap-4 transition-colors focus:outline-none focus-visible:ring-4 min-h-[68px] md:min-h-[88px] p-3 md:p-5"
    style={{
      borderRadius: 12,
      border: `${selected ? 4 : 3}px solid ${selected ? "#E8670A" : "#5A6478"}`,
      background: selected ? "#FFF5EE" : "#FFFFFF",
      cursor: "pointer",
      marginTop: selected ? -1 : 0,
      marginBottom: selected ? -1 : 0,
      transition: "border-color 120ms, background-color 120ms, box-shadow 120ms",
      outlineColor: "#E8670A",
      outlineOffset: 2,
      boxShadow: selected
        ? "0 0 0 4px rgba(232,103,10,0.18), 0 2px 4px rgba(0,0,0,0.06)"
        : "0 1px 2px rgba(0,0,0,0.04)",
      WebkitTapHighlightColor: "transparent",
    }}
  >
    <span
      aria-hidden="true"
      className="flex items-center justify-center flex-shrink-0 w-11 h-11 md:w-14 md:h-14"
      style={{
        borderRadius: 10,
        background: selected ? "#E8670A" : "#FFF5EE",
        transition: "background-color 120ms",
      }}
    >
      <Icon
        size={26}
        strokeWidth={2.25}
        style={{ color: selected ? "#FFFFFF" : "#E8670A" }}
      />
    </span>
    <span
      className="flex-1 text-left text-[17px] md:text-[22px]"
      style={{
        color: "#0B1029",
        fontWeight: selected ? 700 : 600,
        lineHeight: 1.3,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {label}
    </span>
    <ChevronRight
      size={26}
      strokeWidth={2.5}
      style={{ color: selected ? "#E8670A" : "#5A6478", flexShrink: 0 }}
      aria-hidden="true"
    />
  </button>
);

export default OptionRow;
