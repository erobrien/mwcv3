import { useNavigate } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import MissingParamBanner from "@/components/book/MissingParamBanner";
import GHLNeoCalendarMock from "@/components/book/GHLNeoCalendarMock";
import { useBookingSync, updateBookingState, toQueryString, labelFor } from "@/lib/bookingState";

const PHONE_DISPLAY = "(866) 344-4955";
const PHONE_TEL = "tel:8663444955";

const STEPS = [
  { n: 1, text: "Tap a day on the calendar below." },
  { n: 2, text: "Tap a time that works for you." },
  { n: 3, text: "Confirm your details." },
];

const BookSchedule = () => {
  const navigate = useNavigate();
  const state = useBookingSync();
  const missing = !state.symptom || !state.duration;

  const handleConfirmDemo = () => {
    const next = updateBookingState({
      appointmentTime: "Tuesday, May 12 at 10:30 AM",
    });
    navigate(`/book/confirmed?${toQueryString(next)}`);
  };

  const trackCallClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "phone_click", page: "schedule" });
    }
  };

  return (
    <BookLayout page="schedule" title="Pick your consult time | Men's Wellness Centers">
      {/* Hero band */}
      <section className="px-4 py-5 md:py-8" style={{ background: "#0B1029" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 720 }}>
          <h1
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 3.4vw, 32px)",
              color: "#FFFFFF",
              lineHeight: 1.25,
              letterSpacing: "0",
              textTransform: "none",
              textWrap: "balance",
            } as React.CSSProperties}
          >
            Pick a day, then a time.
          </h1>
        </div>
      </section>

      <div className="px-3 md:px-6 py-4 md:py-8 space-y-4 md:space-y-8 pb-28 md:pb-12">
        {missing && <MissingParamBanner />}

        {/* CALENDAR — GHL Neo widget mockup */}
        <section className="mx-auto" aria-label="Pick a date and time" style={{ maxWidth: 720 }}>
          <GHLNeoCalendarMock
            locationLabel={state.location ? labelFor("location", state.location) : undefined}
            onConfirm={(slot) => {
              const next = updateBookingState({ appointmentTime: slot });
              navigate(`/book/confirmed?${toQueryString(next)}`);
            }}
          />
        </section>

      </div>

      {/* STICKY MOBILE TAP-TO-CALL BAR — schedule page only.
          Permanently visible escape hatch on mobile for AMD users. */}
      <a
        href={PHONE_TEL}
        onClick={trackCallClick}
        aria-label={`Call ${PHONE_DISPLAY} to book by phone`}
        className="md:hidden fixed inset-x-0 bottom-0 flex items-center justify-center gap-3 z-50"
        style={{
          background: "#E8670A",
          color: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 22,
          textDecoration: "none",
          minHeight: 72,
          padding: "16px 20px",
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.25)",
        }}
      >
        <Phone size={24} strokeWidth={2.5} />
        <span>CALL {PHONE_DISPLAY}</span>
      </a>
    </BookLayout>
  );
};

export default BookSchedule;
