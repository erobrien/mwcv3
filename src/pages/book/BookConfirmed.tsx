import { CheckCircle2, MapPin, Check, Phone } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import { useBookingSync, labelFor } from "@/lib/bookingState";

const PHONE_DISPLAY = "(866) 344-4955";
const PHONE_TEL = "tel:8663444955";

// GHL merge placeholder. Replace with {{location.address}} when wired up.
const ADDRESS = "1234 Example Drive, Newport News, VA";

const BEFORE = [
  "Bring your photo ID",
  "Eat normally — no fasting required",
  "Arrive 10 minutes early",
];

/**
 * /book/confirmed — Post-booking confirmation.
 *
 * Condensed from 8 sections to 3:
 *   1. Confirmation hero + booking summary (what, where, who)
 *   2. Before you come in (3 bullets + address + open-in-maps)
 *   3. Running late / need to move it (phone + sticky mobile call bar)
 *
 * Removed: welcome video card, 4-step "what to expect" grid, separate
 * calendar-add buttons. Those belong in the GHL confirmation email, not
 * crammed onto this page where AMD users have to scroll forever.
 */
const BookConfirmed = () => {
  const state = useBookingSync();
  const apptTime = state.appointmentTime || "Tuesday, May 12 at 10:30 AM";
  const locationName = labelFor("location", state.location) || "Newport News";
  const firstName = state.name ? state.name.split(" ")[0] : "";

  const summaryRows: { label: string; value: string }[] = [
    { label: "Date & time", value: apptTime },
    { label: "Center", value: locationName },
    ...(state.symptom ? [{ label: "Primary concern", value: labelFor("symptom", state.symptom) }] : []),
    ...(state.duration ? [{ label: "Duration", value: labelFor("duration", state.duration) }] : []),
    ...(state.name ? [{ label: "Name", value: state.name }] : []),
    ...(state.phone ? [{ label: "Phone", value: state.phone }] : []),
    ...(state.email ? [{ label: "Email", value: state.email }] : []),
  ];

  return (
    <BookLayout page="confirmed" title="You're booked | Men's Wellness Centers">
      {/* SECTION 1 — Confirmation hero + booking summary */}
      <section className="px-4 py-6 md:py-10" style={{ background: "#0B1029" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 720 }}>
          <CheckCircle2 size={56} strokeWidth={2.25} style={{ color: "#22C55E", margin: "0 auto 10px" }} />
          <h1
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 5vw, 44px)",
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              textTransform: "none",
              textWrap: "balance",
            } as React.CSSProperties}
          >
            {firstName ? `You're booked, ${firstName}.` : "You're booked."}
          </h1>
          <p
            className="mt-3 text-lg md:text-2xl"
            style={{
              color: "rgba(255,255,255,0.92)",
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {apptTime}
          </p>
          <p
            className="mt-1 text-base md:text-xl"
            style={{
              color: "rgba(255,255,255,0.78)",
              fontWeight: 500,
            }}
          >
            {locationName}
          </p>
        </div>
      </section>

      <div className="px-4 md:px-6 py-8 space-y-8" style={{ paddingBottom: 120 }}>
        {/* Booking summary card */}
        <section
          className="mx-auto"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 16,
            padding: 28,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
          }}
        >
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: "#0B1029",
              marginBottom: 20,
              lineHeight: 1.3,
            }}
          >
            Your booking
          </h2>
          <dl style={{ borderTop: "2px solid #E5E7EB" }}>
            {summaryRows.map((r) => (
              <div
                key={r.label}
                className="flex items-start justify-between gap-4"
                style={{
                  padding: "16px 0",
                  borderBottom: "2px solid #E5E7EB",
                }}
              >
                <dt
                  style={{
                    color: "#3A4258",
                    fontSize: 18,
                    fontWeight: 500,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {r.label}
                </dt>
                <dd
                  style={{
                    color: "#0B1029",
                    fontSize: 18,
                    fontWeight: 700,
                    textAlign: "right",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* SECTION 2 — Before you come in */}
        <section
          className="mx-auto"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 16,
            padding: 28,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
          }}
        >
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 26,
              color: "#0B1029",
              marginBottom: 20,
              lineHeight: 1.3,
            }}
          >
            Before you come in
          </h2>
          <ul className="space-y-4" style={{ marginBottom: 24 }}>
            {BEFORE.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3"
                style={{
                  color: "#0B1029",
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Check size={28} strokeWidth={2.5} style={{ color: "#E8670A", flexShrink: 0, marginTop: 2 }} />
                <span>{b}</span>
              </li>
            ))}
            <li
              className="flex items-start gap-3"
              style={{
                color: "#0B1029",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: 1.4,
                fontFamily: "Inter, sans-serif",
              }}
            >
              <MapPin size={28} strokeWidth={2.5} style={{ color: "#E8670A", flexShrink: 0, marginTop: 2 }} />
              <span>{ADDRESS}</span>
            </li>
          </ul>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2"
            style={{
              border: "3px solid #0B1029",
              color: "#0B1029",
              background: "#FFFFFF",
              padding: "14px 28px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              minHeight: 56,
              textTransform: "none",
            }}
          >
            <MapPin size={20} strokeWidth={2.5} /> Open in maps
          </a>
        </section>

        {/* SECTION 3 — Running late / need to move it */}
        <section
          className="mx-auto"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 16,
            padding: 28,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
          }}
        >
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: "#0B1029",
              marginBottom: 12,
              lineHeight: 1.3,
            }}
          >
            Running late or need to move it?
          </h2>
          <p
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#3A4258",
              lineHeight: 1.4,
              marginBottom: 20,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Just call or text us. We'll take care of it.
          </p>
          <a
            href={PHONE_TEL}
            className="flex items-center justify-center gap-3"
            style={{
              width: "100%",
              minHeight: 64,
              background: "#E8670A",
              color: "#FFFFFF",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              borderRadius: 12,
              textDecoration: "none",
              padding: "16px 24px",
              boxShadow: "0 2px 6px rgba(232,103,10,0.35)",
            }}
          >
            <Phone size={24} strokeWidth={2.5} />
            <span>CALL {PHONE_DISPLAY}</span>
          </a>
        </section>
      </div>

      {/* Sticky mobile tap-to-call — same pattern as schedule and lets-talk */}
      <a
        href={PHONE_TEL}
        aria-label={`Call ${PHONE_DISPLAY}`}
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

      {/* Meta Pixel Schedule event fires here */}
      {/* Google Ads conversion fires here */}
      {/* GA4 appointment_booked event fires here */}
    </BookLayout>
  );
};

export default BookConfirmed;
