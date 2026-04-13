import { useState } from "react";

interface V2StepDurationProps {
  initialValue?: string;
  onNext: (duration: string) => void;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const durations = [
  { value: "<6mo", label: "Less than 6 months" },
  { value: "6-12mo", label: "6–12 months" },
  { value: "1-2yr", label: "1–2 years" },
  { value: "2+yr", label: "More than 2 years" },
];

const V2StepDuration = ({ initialValue, onNext }: V2StepDurationProps) => {
  const [selected, setSelected] = useState(initialValue || "");

  const handleSelect = (value: string) => {
    setSelected(value);
    setTimeout(() => onNext(value), 300);
  };

  return (
    <div className="flex flex-col items-center px-5 pt-6 md:pt-10">
      <div
        className="w-full max-w-[480px] p-6 md:p-8"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
      >
        <h1
          className="mb-2 text-center uppercase"
          style={{ fontFamily: headingFont, fontSize: "clamp(24px, 5.5vw, 36px)", color: "#0B1029", letterSpacing: "0.05em", lineHeight: 1.1 }}
        >
          How Long Has This Been Going On?
        </h1>
        <p className="mb-6 text-center" style={{ fontFamily: font, fontWeight: 400, fontSize: 14, color: "#6B7280" }}>
          This helps us prepare for your visit.
        </p>

        <div className="space-y-3">
          {durations.map((d) => {
            const isSelected = selected === d.value;
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => handleSelect(d.value)}
                className="flex w-full items-center gap-4 rounded-2xl px-5 transition-all"
                style={{
                  minHeight: 56,
                  fontFamily: font, fontWeight: 500, fontSize: 15,
                  color: "#0B1029",
                  backgroundColor: isSelected ? "rgba(232,103,10,0.05)" : "#F5F3F0",
                  border: isSelected ? "2px solid #E8670A" : "1px solid #D1CCC5",
                  cursor: "pointer",
                }}
                aria-label={d.label}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default V2StepDuration;
