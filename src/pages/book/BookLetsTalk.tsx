import { Phone, MessageSquareText, Clock } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import { useBookingSync } from "@/lib/bookingState";

const PHONE_DISPLAY = "(866) 344-4955";
const PHONE_TEL = "tel:8663444955";
const SMS_HREF = "sms:8663444955";

/**
 * /book/lets-talk — Termination page for the "Something else" symptom path.
 *
 * Goal: phone conversion. These are still leads — they just don't fit our
 * three primary service buckets, so we want a human to triage. NOT a
 * disqualifier or a dead-end. Tag in GHL as lead_quality: needs_qualifying.
 *
 * Design follows the same AMD playbook as the schedule page:
 *   - 22px+ body, 32px+ headlines, sentence case
 *   - 3px slate borders on cards (visible boundaries)
 *   - 64px+ primary CTAs (call) and 64px+ secondary CTAs (text)
 *   - Sticky mobile tap-to-call bar
 *   - Two contact methods so the user picks whichever they're comfortable with
 */
const BookLetsTalk = () => {
  // Hydrate state so we can log/track the symptom value they picked (still
  // "other" but URL params persist forward for GHL).
  useBookingSync();

  const trackCallClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "phone_click", page: "lets-talk" });
    }
  };
  const trackSmsClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "sms_click", page: "lets-talk" });
    }
  };

  return (
    <BookLayout page="lets-talk" title="Let's talk it through | Men's Wellness Centers">
      {/* Hero band */}
      <section className="px-4 py-6 md:py-10" style={{ background: "#0B1029" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 720 }}>
          <h1
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4.5vw, 40px)",
              color: "#FFFFFF",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              textTransform: "none",
              textWrap: "balance",
              marginBottom: 16,
            } as React.CSSProperties}
          >
            Let's talk it through.
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.88)",
              fontSize: 22,
              fontWeight: 500,
              lineHeight: 1.45,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Every guy's situation is different. A two-minute call with our
            team is the fastest way to get you matched with the right visit.
          </p>
        </div>
      </section>

      <div className="px-4 md:px-6 py-8 space-y-8" style={{ paddingBottom: 140 }}>
        {/* PRIMARY: Call card */}
        <section
          className="mx-auto"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 16,
            padding: "18px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-start gap-4 mb-6">
            <span
              aria-hidden="true"
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 56, height: 56, borderRadius: 12, background: "#E8670A",
              }}
            >
              <Phone size={32} strokeWidth={2.25} style={{ color: "#FFFFFF" }} />
            </span>
            <div>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 26,
                  color: "#0B1029",
                  lineHeight: 1.25,
                  marginBottom: 6,
                }}
              >
                Call us
              </h2>
              <p
                style={{
                  fontSize: 20,
                  color: "#3A4258",
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}
              >
                A real person picks up. No phone tree.
              </p>
            </div>
          </div>

          <a
            href={PHONE_TEL}
            onClick={trackCallClick}
            className="flex items-center justify-center gap-3"
            style={{
              width: "100%",
              minHeight: 72,
              background: "#E8670A",
              color: "#FFFFFF",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              borderRadius: 12,
              textDecoration: "none",
              padding: "16px 24px",
              boxShadow: "0 4px 12px rgba(232,103,10,0.35)",
            }}
          >
            <Phone size={26} strokeWidth={2.5} />
            <span>CALL {PHONE_DISPLAY}</span>
          </a>

          <div
            className="flex items-center justify-center gap-2 mt-4"
            style={{ color: "#5A6478", fontSize: 16, fontWeight: 500 }}
          >
            <Clock size={18} />
            <span>Mon–Fri 8am to 6pm ET · Sat 9am to 1pm ET</span>
          </div>
        </section>

        {/* SECONDARY: Text us card */}
        <section
          className="mx-auto"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 16,
            padding: "18px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-start gap-4 mb-6">
            <span
              aria-hidden="true"
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 56, height: 56, borderRadius: 12, background: "#FFF5EE",
              }}
            >
              <MessageSquareText size={32} strokeWidth={2.25} style={{ color: "#E8670A" }} />
            </span>
            <div>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 26,
                  color: "#0B1029",
                  lineHeight: 1.25,
                  marginBottom: 6,
                }}
              >
                Prefer to text?
              </h2>
              <p
                style={{
                  fontSize: 20,
                  color: "#3A4258",
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}
              >
                Same number. We usually reply in under 10 minutes during business hours.
              </p>
            </div>
          </div>

          <a
            href={SMS_HREF}
            onClick={trackSmsClick}
            className="flex items-center justify-center gap-3"
            style={{
              width: "100%",
              minHeight: 64,
              background: "#FFFFFF",
              color: "#0B1029",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              borderRadius: 12,
              textDecoration: "none",
              padding: "16px 24px",
              border: "3px solid #0B1029",
            }}
          >
            <MessageSquareText size={24} strokeWidth={2.5} />
            <span>TEXT {PHONE_DISPLAY}</span>
          </a>
        </section>

        {/* Reassurance strip */}
        <div
          className="mx-auto text-center"
          style={{
            maxWidth: 720,
            color: "rgba(255,255,255,0.88)",
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.5,
            padding: "0 8px",
          }}
        >
          No pressure, no sales pitch. We'll listen, point you in the right
          direction, and book you a visit if it's the right fit.
        </div>
      </div>

      {/* STICKY MOBILE TAP-TO-CALL BAR */}
      <a
        href={PHONE_TEL}
        onClick={trackCallClick}
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
    </BookLayout>
  );
};

export default BookLetsTalk;
