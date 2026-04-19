import { KeyboardEvent, ReactNode } from "react";
import { Check, LucideIcon } from "lucide-react";

interface CardRadioProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  icon?: LucideIcon;
  children?: ReactNode;
}

const CardRadio = ({ label, selected, onSelect, icon: Icon, children }: CardRadioProps) => {
  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      onKeyDown={handleKey}
      className="intake-select-card"
    >
      {Icon && <Icon size={20} color="var(--accent-orange)" strokeWidth={2} />}
      <span className="flex-1">{label}</span>
      {children}
      {selected && <Check size={20} color="var(--accent-orange)" strokeWidth={2.5} />}
    </button>
  );
};

export default CardRadio;
