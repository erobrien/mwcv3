import { useNavigate } from "react-router-dom";
import { Star, Users, Beaker, Stethoscope } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import MissingParamBanner from "@/components/book/MissingParamBanner";
import { useBookingSync, updateBookingState, toQueryString, labelFor } from "@/lib/bookingState";

const TRUST = [
  { icon: Star, text: "4.9★ · 200+ reviews" },
  { icon: Users, text: "10,000+ men treated" },
  { icon: Beaker, text: "Same-day labs" },
  { icon: Stethoscope, text: "Face-to-face physician" },
];

const TESTIMONIALS = [
  {
    quote: "Walked in skeptical. Walked out with labs in hand and a real plan. No runaround.",
    name: "Mike R.",
    location: "Newport News",
  },
  {
    quote: "Energy is back. Sleep is back. My wife noticed before I did. Wish I had done this years ago.",
    name: "David T.",
    location: "Richmond",
  },
  {
    quote: "Direct, no-nonsense physician. They explained my numbers like I was a person, not a chart.",
    name: "James K.",
    location: "Virginia Beach",
  },
];

const BookSchedule = () => {
  const navigate = useNavigate();
  const state = useBookingSync();
  const missing = !state.symptom || !state.duration;

  const handleConfirmDemo = () => {
    // Demo: in production, GHL fires a webhook with the picked slot. Until then,
    // expose a button so the funnel is end-to-end clickable.
    const next = updateBookingState({
      appointmentTime: "Tuesday, May 12 at 10:30 AM",
    });
    navigate(`/book/confirmed?${toQueryString(next)}`);
  };

  return (
    <BookLayout page="schedule" title="Pick your consult time | Men's Wellness Centers">
      {/* Hero band */}
      <section style={{ background: "#0B1029", padding: "32px 16px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 900 }}>
          <h1
            className="uppercase"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              lineHeight: 1.05,
              textWrap: "balance",
            } as React.CSSProperties}
          >
            Pick Your Consult Time
          </h1>
          <p className="mt-3" style={{ color: "rgba(255,255,255,0.78)", fontSize: 16 }}>
            Same or next day. Your first visit is on us.
          </p>
        </div>
      </section>

      <div className="px-4 md:px-6 py-10">
        {missing && <MissingParamBanner />}

        {/* Calendar card */}
        <div
          className="mx-auto"
          style={{
            maxWidth: 900,
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div
            id="ghl-calendar-embed"
            className="flex flex-col items-center justify-center text-center gap-4"
            style={{
              minHeight: 700,
              border: "1px dashed #E5E7EB",
              borderRadius: 8,
              color: "#8A95AD",
              fontSize: 14,
              padding: 24,
            }}
          >
            <div>GHL Calendar Widget. Loaded in production.</div>
            {state.location && (
              <div className="text-xs">Booking for: {labelFor("location", state.location)}</div>
            )}
            <button
              type="button"
              onClick={handleConfirmDemo}
              className="uppercase font-bold text-white"
              style={{
                background: "#E8670A", padding: "14px 28px", borderRadius: 6,
                fontSize: 14, letterSpacing: "0.05em", cursor: "pointer", border: 0,
              }}
            >
              Pick This Slot (demo) →
            </button>
          </div>

        </div>

        {/* Trust strip */}
        <div className="mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ maxWidth: 900 }}>
          {TRUST.map((t) => (
            <div key={t.text} className="flex items-center justify-center gap-2 text-center">
              <t.icon size={18} style={{ color: "#E8670A", flexShrink: 0 }} />
              <span style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 500 }}>{t.text}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-5" style={{ maxWidth: 1040 }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                padding: 24,
                maxWidth: 320,
                margin: "0 auto",
              }}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="#E8670A" style={{ color: "#E8670A" }} />
                ))}
              </div>
              <p style={{ color: "#0B1029", fontSize: 15, lineHeight: 1.55 }}>"{t.quote}"</p>
              <div className="mt-4 text-xs uppercase" style={{ color: "#8A95AD", letterSpacing: "0.08em", fontWeight: 600 }}>
                {t.name} · {t.location}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
          Individual results vary.
        </p>
      </div>
    </BookLayout>
  );
};

export default BookSchedule;
