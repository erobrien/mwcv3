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

        {/* INSTRUCTION CARD — tells AMD/older users what to do, and offers phone escape BEFORE the calendar */}
        <section
          className="mx-auto"
          aria-label="How to book"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 12,
            padding: 28,
            boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
          }}
        >
          <h2
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: "#0B1029",
              marginBottom: 20,
              lineHeight: 1.3,
            }}
          >
            How to book your visit
          </h2>

          <ol className="space-y-4" style={{ marginBottom: 24 }}>
            {STEPS.map((s) => (
              <li key={s.n} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#E8670A",
                    color: "#FFFFFF",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "#0B1029",
                    lineHeight: 1.4,
                    paddingTop: 4,
                  }}
                >
                  {s.text}
                </span>
              </li>
            ))}
          </ol>

          <div
            style={{
              borderTop: "2px solid #E5E7EB",
              paddingTop: 24,
              marginTop: 8,
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 20,
                fontWeight: 500,
                color: "#3A4258",
                lineHeight: 1.4,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Trouble seeing the calendar? We'll book you in 30 seconds.
            </p>
            <a
              href={PHONE_TEL}
              onClick={trackCallClick}
              className="flex items-center justify-center gap-3"
              style={{
                width: "100%",
                minHeight: 64,
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
          </div>
        </section>

        {/* CALENDAR CARD */}
        <section
          className="mx-auto"
          aria-label="Pick a date and time"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div
            className="uppercase mb-4"
            style={{
              color: "#5A6478",
              fontSize: 16,
              letterSpacing: "0.08em",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Calendar
          </div>

          {/* GHL calendar embed target. Custom CSS injected into the GHL widget
              settings is what bumps date/time targets to AMD-friendly sizes —
              this wrapper does layout only. */}
          <div
            id="ghl-calendar-embed"
            className="flex flex-col items-center justify-center text-center gap-4"
            style={{
              minHeight: 900,
              border: "2px dashed #CBD2DD",
              borderRadius: 8,
              color: "#3A4258",
              fontSize: 18,
              padding: 24,
              background: "#F4F6FA",
            }}
          >
            <div style={{ fontWeight: 600 }}>GHL Calendar Widget</div>
            <div style={{ fontSize: 16, color: "#5A6478" }}>(Loaded from GHL in production)</div>
            {state.location && (
              <div style={{ fontSize: 16, color: "#5A6478" }}>
                Booking for: {labelFor("location", state.location)}
              </div>
            )}
            {import.meta.env.DEV && (
              <button
                type="button"
                onClick={handleConfirmDemo}
                className="uppercase font-bold text-white"
                style={{
                  background: "#5A6478",
                  padding: "14px 28px",
                  borderRadius: 6,
                  fontSize: 14,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  border: 0,
                  marginTop: 12,
                }}
              >
                Dev: Skip to Confirmation →
              </button>
            )}
          </div>
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
