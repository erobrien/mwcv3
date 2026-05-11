import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Heart, Scale, HelpCircle } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import SurveyCard from "@/components/book/SurveyCard";
import OptionRow from "@/components/book/OptionRow";
import { useBookingSync, updateBookingState, toQueryString } from "@/lib/bookingState";

const OPTIONS = [
  { value: "energy", label: "Low energy or fatigue", icon: Zap },
  { value: "libido", label: "Low sex drive or ED", icon: Heart },
  { value: "weight", label: "Trouble losing weight", icon: Scale },
  { value: "other", label: "Something else", icon: HelpCircle },
] as const;

/**
 * Q1: What brings you in?
 *
 * Single-tap auto-advance: tapping an option locks the selection visually for
 * ~600ms so an AMD user sees the orange confirmation state, then navigates.
 *
 * "Something else" routes to /book/lets-talk (a phone-conversion termination
 * page), NOT a disqualifier — these are still leads.
 */
const BookSymptom = () => {
  const navigate = useNavigate();
  const state = useBookingSync();
  const [selected, setSelected] = useState<string>("");
  const advanceTimer = useRef<number | null>(null);

  // Clean up any pending timer on unmount.
  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  const handleSelect = (value: string) => {
    // Prevent double-tap from queueing two navigations.
    if (advanceTimer.current) return;
    setSelected(value);
    const next = updateBookingState({ symptom: value });
    const target = value === "other"
      ? `/book/lets-talk?${toQueryString(next)}`
      : `/book/duration?${toQueryString(next)}`;
    advanceTimer.current = window.setTimeout(() => {
      navigate(target);
    }, 600);
  };

  return (
    <BookLayout page="symptom" title="What brings you in? | Men's Wellness Centers">
      <SurveyCard
        step={1}
        total={2}
        title="What brings you in?"
        subtitle="Pick the one that fits best."
        prevLabel="Back to home"
        onPrev={() => navigate("/")}
      >
        {OPTIONS.map((o) => (
          <OptionRow
            key={o.value}
            icon={o.icon}
            label={o.label}
            selected={selected === o.value}
            onClick={() => handleSelect(o.value)}
          />
        ))}
      </SurveyCard>
    </BookLayout>
  );
};

export default BookSymptom;
