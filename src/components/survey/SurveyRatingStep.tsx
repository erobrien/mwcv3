import { useState } from "react";
import { Check } from "lucide-react";
import SurveyCard from "./SurveyCard";

export type RatingValue = "excellent" | "good" | "average" | "poor" | "very-poor";

const OPTIONS: { value: RatingValue; label: string }[] = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "average", label: "Average" },
  { value: "poor", label: "Poor" },
  { value: "very-poor", label: "Very Poor" },
];

const font = "'Montserrat', sans-serif";

interface SurveyRatingStepProps {
  title: string;
  subtitle?: string;
  greeting?: string;
  initialValue?: RatingValue | "";
  onSelect: (value: RatingValue) => void;
}

const SurveyRatingStep = ({
  title,
  subtitle,
  greeting,
  initialValue = "",
  onSelect,
}: SurveyRatingStepProps) => {
  const [selected, setSelected] = useState<RatingValue | "">(initialValue);

  const handleSelect = (value: RatingValue) => {
    setSelected(value);
    setTimeout(() => onSelect(value), 300);
  };

  return (
    <SurveyCard title={title} subtitle={subtitle} greeting={greeting}>
      <div role="radiogroup" aria-label={title} className="space-y-3">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(opt.value)}
              className="flex w-full items-center gap-4 px-5 transition-all"
              style={{
                minHeight: 56,
                fontFamily: font,
                fontWeight: isSelected ? 700 : 600,
                fontSize: 15,
                color: "#0B1029",
                backgroundColor: isSelected ? "rgba(232,103,10,0.06)" : "#FFFFFF",
                border: isSelected ? "2px solid #E8670A" : "2px solid #D1CCC5",
                borderRadius: 12,
                cursor: "pointer",
                boxShadow: isSelected
                  ? "0 0 0 3px rgba(232,103,10,0.1)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <span className="flex-1 text-left">{opt.label}</span>
              {isSelected && (
                <Check className="h-[18px] w-[18px] shrink-0" style={{ color: "#E8670A" }} />
              )}
            </button>
          );
        })}
      </div>
    </SurveyCard>
  );
};

export default SurveyRatingStep;
