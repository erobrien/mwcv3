import { useState } from "react";
import SurveyCard from "./SurveyCard";

const font = "'Montserrat', sans-serif";

interface SurveyRecommendStepProps {
  initialValue?: boolean | null;
  ctaLabel: string;
  onSubmit: (recommend: boolean) => void;
}

const SurveyRecommendStep = ({
  initialValue = null,
  ctaLabel,
  onSubmit,
}: SurveyRecommendStepProps) => {
  const [value, setValue] = useState<boolean | null>(initialValue);

  const chip = (val: boolean, label: string) => {
    const isSelected = value === val;
    return (
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        onClick={() => setValue(val)}
        className="flex-1 transition-all"
        style={{
          height: 64,
          borderRadius: 12,
          fontFamily: font,
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: "0.04em",
          cursor: "pointer",
          color: isSelected ? "#FFFFFF" : "#0B1029",
          backgroundColor: isSelected ? "#E8670A" : "#FFFFFF",
          border: isSelected ? "2px solid #E8670A" : "2px solid #D1CCC5",
          boxShadow: isSelected
            ? "0 0 0 3px rgba(232,103,10,0.15)"
            : "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <SurveyCard
      title="Would you recommend us?"
      subtitle="To a friend or family member."
    >
      <div role="radiogroup" aria-label="Recommend us" className="flex gap-3 mb-6">
        {chip(true, "Yes")}
        {chip(false, "No")}
      </div>

      <button
        type="button"
        disabled={value === null}
        onClick={() => value !== null && onSubmit(value)}
        className="inline-flex w-full items-center justify-center gap-2 transition-all"
        style={{
          height: 56,
          borderRadius: 9999,
          fontFamily: font,
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          backgroundColor: "#E8670A",
          border: "none",
          cursor: value === null ? "not-allowed" : "pointer",
          opacity: value === null ? 0.4 : 1,
        }}
      >
        {ctaLabel}
      </button>
    </SurveyCard>
  );
};

export default SurveyRecommendStep;
