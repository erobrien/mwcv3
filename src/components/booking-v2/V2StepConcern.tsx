import { useState } from "react";
import { Zap, Heart, Scale, MoreHorizontal } from "lucide-react";

interface V2StepConcernProps {
  initialValue?: string;
  onNext: (concern: string) => void;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const concerns = [
  { value: "energy", label: "Low energy / fatigue", icon: Zap },
  { value: "sex-drive", label: "Low sex drive / ED", icon: Heart },
  { value: "weight", label: "Weight gain / difficulty losing weight", icon: Scale },
  { value: "other", label: "Other", icon: MoreHorizontal },
];

const V2StepConcern = ({ initialValue, onNext }: V2StepConcernProps) => {
  const [selected, setSelected] = useState(initialValue || "");

  const handleSelect = (value: string) => {
    setSelected(value);
    setTimeout(() => onNext(value), 300);
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-5">
      <h1
        className="mb-2 text-center uppercase"
        style={{
          fontFamily: headingFont,
          fontSize: "clamp(24px, 5.5vw, 36px)",
          color: "#fff",
          letterSpacing: "0.05em",
          lineHeight: 1.1,
        }}
      >
        What Brings You In?
      </h1>
      <p
        className="mb-8 text-center"
        style={{ fontFamily: font, fontWeight: 400, fontSize: 14, color: "#B8B6B2" }}
      >
        Select your primary concern.
      </p>

      <div className="w-full max-w-[480px] space-y-3">
        {concerns.map((c) => {
          const isSelected = selected === c.value;
          const Icon = c.icon;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => handleSelect(c.value)}
              className="flex w-full items-center gap-4 rounded-2xl px-5 transition-all"
              style={{
                minHeight: 56,
                fontFamily: font,
                fontWeight: 500,
                fontSize: 15,
                color: "#fff",
                backgroundColor: isSelected
                  ? "rgba(232,103,10,0.08)"
                  : "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
                border: isSelected
                  ? "2px solid #E8670A"
                  : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
              }}
              aria-label={c.label}
            >
              <Icon
                className="h-5 w-5 shrink-0"
                style={{ color: isSelected ? "#E8670A" : "#AEB5BF" }}
              />
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default V2StepConcern;
