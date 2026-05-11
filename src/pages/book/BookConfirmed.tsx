import { CheckCircle2, MapPin, Phone, PlayCircle } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import { useBookingSync, labelFor } from "@/lib/bookingState";

const PHONE_DISPLAY = "(866) 344-4955";
const PHONE_TEL = "tel:8663444955";

// GHL merge placeholder. Replace with {{location.address}} when wired up.
const ADDRESS = "1234 Example Drive, Newport News, VA 23601";

// "What to expect" video — placeholder. Replace with real Vimeo/Wistia src.
const EXPECT_VIDEO_SRC = "https://player.vimeo.com/video/76979871?h=8272103f6e&title=0&byline=0&portrait=0";

const BookConfirmed = () => {
  const state = useBookingSync();
  const apptTime = state.appointmentTime || "Tuesday, May 12 at 10:30 AM";
  const locationName = labelFor("location", state.location) || "Newport News";
  const firstName = state.name ? state.name.split(" ")[0] : "";

  return (
    <BookLayout page="confirmed" title="You're booked | Men's Wellness Centers">
      {/* Compact confirmation header */}
      <section className="px-4 py-4 md:py-6" style={{ background: "#0B1029" }}>
        <div className="mx-auto flex items-center justify-center gap-3 text-center" style={{ maxWidth: 760 }}>
          <CheckCircle2 size={28} strokeWidth={2.5} style={{ color: "#22C55E", flexShrink: 0 }} />
          <h1
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(18px, 2.6vw, 26px)",
              color: "#FFFFFF",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {firstName ? `You're booked, ${firstName}.` : "You're booked."}{" "}
            <span style={{ color: "rgba(255,255,255,0.78)", fontWeight: 500 }}>{apptTime}</span>
          </h1>
        </div>
      </section>

      <div className="px-3 md:px-6 py-4 md:py-6 space-y-4 md:space-y-5 pb-28 md:pb-10">
        {/* PRIMARY — Center address */}
        <section
          className="mx-auto"
          style={{
            maxWidth: 760,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 14,
            padding: "18px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex items-start gap-3">
            <MapPin size={28} strokeWidth={2.5} style={{ color: "#E8670A", flexShrink: 0, marginTop: 2 }} />
            <div className="flex-1 min-w-0">
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#6B7280",
                  marginBottom: 4,
                }}
              >
                Your Center
              </div>
              <div
                className="text-lg md:text-2xl"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  color: "#0B1029",
                  lineHeight: 1.25,
                }}
              >
                {locationName}
              </div>
              <div
                className="text-base md:text-lg"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  color: "#3A4258",
                  lineHeight: 1.4,
                  marginTop: 2,
                }}
              >
                {ADDRESS}
              </div>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 mt-4"
            style={{
              border: "2px solid #0B1029",
              color: "#0B1029",
              background: "#FFFFFF",
              padding: "10px 20px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <MapPin size={18} strokeWidth={2.5} /> Open in maps
          </a>
        </section>

        {/* PRIMARY — What to expect video */}
        <section
          className="mx-auto"
          style={{
            maxWidth: 760,
            background: "#FFFFFF",
            border: "3px solid #5A6478",
            borderRadius: 14,
            padding: "18px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <PlayCircle size={22} strokeWidth={2.5} style={{ color: "#E8670A" }} />
            <h2
              className="text-lg md:text-xl"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                color: "#0B1029",
                lineHeight: 1.3,
              }}
            >
              What to expect at your visit (2 min)
            </h2>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
              borderRadius: 10,
              overflow: "hidden",
              background: "#000",
            }}
          >
            <iframe
              src={EXPECT_VIDEO_SRC}
              title="What to expect at your visit"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          </div>
          <p
            className="text-sm md:text-base"
            style={{
              color: "#3A4258",
              fontWeight: 500,
              fontFamily: "Inter, sans-serif",
              marginTop: 10,
              lineHeight: 1.4,
            }}
          >
            Bring photo ID. Eat normally. Arrive 10 minutes early.
          </p>
        </section>

        {/* SECONDARY — Need to reschedule */}
        <p
          className="mx-auto text-center text-sm md:text-base"
          style={{
            maxWidth: 760,
            color: "#6B7280",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
          }}
        >
          Running late or need to move it? Call or text{" "}
          <a href={PHONE_TEL} style={{ color: "#0B1029", fontWeight: 700, textDecoration: "underline" }}>
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>

      {/* Sticky mobile tap-to-call */}
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
    </BookLayout>
  );
};

export default BookConfirmed;
