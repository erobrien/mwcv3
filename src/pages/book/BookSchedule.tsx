import { useNavigate } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import MissingParamBanner from "@/components/book/MissingParamBanner";
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
      <section style={{ background: "#0B1029", padding: "32px 16px 24px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 720 }}>
          <h1
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.4vw, 32px)",
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

      <div className="px-4 md:px-6 py-8 space-y-8" style={{ paddingBottom: 120 }}>
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

        {/* SAFETY NET — repeat the phone CTA below the calendar */}
        <section
          className="mx-auto text-center"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 12,
            padding: 28,
            boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 22,
              fontWeight: 600,
              color: "#0B1029",
              lineHeight: 1.4,
              marginBottom: 16,
            }}
          >
            Still stuck? We'll do the work for you.
          </p>
          <a
            href={PHONE_TEL}
            onClick={trackCallClick}
            className="inline-flex items-center justify-center gap-3"
            style={{
              minHeight: 64,
              width: "100%",
              background: "#E8670A",
              color: "#FFFFFF",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              borderRadius: 8,
              textDecoration: "none",
              padding: "16px 24px",
              boxShadow: "0 2px 6px rgba(232,103,10,0.35)",
            }}
          >
            <Phone size={24} strokeWidth={2.5} />
            <span>CALL {PHONE_DISPLAY}</span>
          </a>
        </section>

        {/* Address / location strip — kept minimal, large type */}
        {state.location && (
          <div
            className="mx-auto flex items-center justify-center gap-2 text-center"
            style={{
              maxWidth: 720,
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            <MapPin size={20} style={{ color: "#E8670A" }} />
            <span>Your visit will be at our {labelFor("location", state.location)} center.</span>
          </div>
        )}
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
