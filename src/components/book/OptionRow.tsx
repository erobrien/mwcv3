import { Check, LucideIcon } from "lucide-react";

interface OptionRowProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const OptionRow = ({ icon: Icon, label, selected, onClick }: OptionRowProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className="flex w-full items-center gap-4 px-5 transition-all focus:outline-none focus-visible:ring-2"
    style={{
      minHeight: 64,
      padding: "20px",
      borderRadius: 12,
      border: `1.5px solid ${selected ? "#E8670A" : "#E5E7EB"}`,
      background: selected ? "#FFF5EE" : "#FFFFFF",
      cursor: "pointer",
      transition: "border-color 100ms, background-color 100ms",
      outlineColor: "#E8670A",
      outlineOffset: 2,
    }}
    onMouseEnter={(e) => {
      if (!selected) e.currentTarget.style.borderColor = "#E8670A";
    }}
    onMouseLeave={(e) => {
      if (!selected) e.currentTarget.style.borderColor = "#E5E7EB";
    }}
  >
    <Icon size={24} style={{ color: "#E8670A", flexShrink: 0 }} />
    <span
      className="flex-1 text-left"
      style={{ color: "#0B1029", fontSize: 16, fontWeight: 500, fontFamily: "Inter, sans-serif" }}
    >
      {label}
    </span>
    {selected && <Check size={20} style={{ color: "#E8670A", flexShrink: 0 }} />}
  </button>
);

export default OptionRow;
