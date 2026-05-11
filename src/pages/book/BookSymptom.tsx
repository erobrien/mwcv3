import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Heart, Scale, HelpCircle } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import SurveyCard from "@/components/book/SurveyCard";
import OptionRow from "@/components/book/OptionRow";
import { useBookingSync, updateBookingState, toQueryString } from "@/lib/bookingState";

const OPTIONS = [
  { value: "energy", label: "Low Energy / Fatigue", icon: Zap },
  { value: "libido", label: "Low Sex Drive / ED", icon: Heart },
  { value: "weight", label: "Weight Gain / Difficulty Losing Weight", icon: Scale },
  { value: "other", label: "Something else", icon: HelpCircle },
];

const BookSymptom = () => {
  const navigate = useNavigate();
  const state = useBookingSync();
  const [selected, setSelected] = useState<string>(state.symptom || "");

  const handleNext = () => {
    if (!selected) return;
    const next = updateBookingState({ symptom: selected });
    navigate(`/book/duration?${toQueryString(next)}`);
  };

  return (
    <BookLayout page="symptom" title="What brings you in? | Men's Wellness Centers">
      <SurveyCard
        step={1}
        total={2}
        title="What Brings You In?"
        subtitle="Select your primary concern."
        prevLabel="PREV"
        nextLabel="NEXT"
        onPrev={() => navigate("/")}
        onNext={handleNext}
        nextDisabled={!selected}
      >
        {OPTIONS.map((o) => (
          <OptionRow
            key={o.value}
            icon={o.icon}
            label={o.label}
            selected={selected === o.value}
            onClick={() => setSelected(o.value)}
          />
        ))}
      </SurveyCard>
    </BookLayout>
  );
};

export default BookSymptom;
