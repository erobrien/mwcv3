import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Clock } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import SurveyCard from "@/components/book/SurveyCard";
import OptionRow from "@/components/book/OptionRow";
import MissingParamBanner from "@/components/book/MissingParamBanner";

const OPTIONS = [
  { value: "lt6mo", label: "Less than 6 months" },
  { value: "6to12mo", label: "6 to 12 months" },
  { value: "1to2yr", label: "1 to 2 years" },
  { value: "gt2yr", label: "More than 2 years" },
];

const BookDuration = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const symptom = params.get("symptom");
  const [selected, setSelected] = useState<string>(params.get("duration") || "");

  const handleNext = () => {
    if (!selected) return;
    const sp = new URLSearchParams();
    if (symptom) sp.set("symptom", symptom);
    sp.set("duration", selected);
    navigate(`/book/schedule?${sp.toString()}`);
  };

  const handlePrev = () => {
    const sp = new URLSearchParams();
    if (symptom) sp.set("symptom", symptom);
    navigate(`/book/symptom${sp.toString() ? "?" + sp.toString() : ""}`);
  };

  return (
    <BookLayout page="duration" title="How long has this been going on? | Men's Wellness Centers">
      {!symptom && (
        <div className="px-4 md:px-6 pt-6">
          <MissingParamBanner />
        </div>
      )}
      <SurveyCard
        step={2}
        total={2}
        title="How Long Has This Been Going On?"
        subtitle="This helps your physician prepare for your visit."
        prevLabel="PREV"
        nextLabel="See Available Times"
        onPrev={handlePrev}
        onNext={handleNext}
        nextDisabled={!selected}
      >
        {OPTIONS.map((o) => (
          <OptionRow
            key={o.value}
            icon={Clock}
            label={o.label}
            selected={selected === o.value}
            onClick={() => setSelected(o.value)}
          />
        ))}
      </SurveyCard>
    </BookLayout>
  );
};

export default BookDuration;
