import { CheckCircle2, Play, MapPin, Check, CalendarPlus, Phone } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";

const STEPS = [
  { n: 1, title: "Quick check-in", body: "5 minutes, photo ID required." },
  { n: 2, title: "Same-day labs", body: "Drawn on-site, results before you leave." },
  { n: 3, title: "Face-to-face physician", body: "Full review of your numbers and concerns." },
  { n: 4, title: "Walk out with a plan", body: "Personalized protocol. Treatment may begin same day." },
];

const BEFORE = [
  "Bring photo ID",
  "Eat normally. No fasting required.",
  "Arrive 10 minutes early",
];

const ADDRESS = "1234 Example Drive, Newport News, VA";

const BookConfirmed = () => {
  return (
    <BookLayout page="confirmed" title="You're booked | Men's Wellness Centers">
      {/* Top band */}
      <section style={{ background: "#0B1029", padding: "32px 16px 40px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 720 }}>
          <CheckCircle2 size={56} style={{ color: "#22C55E", margin: "0 auto" }} />
          <h1
            className="mt-4 uppercase"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 6vw, 56px)",
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              lineHeight: 1,
              textWrap: "balance",
            } as React.CSSProperties}
          >
            You're Booked.
          </h1>
          <p className="mt-3" style={{ color: "rgba(255,255,255,0.85)", fontSize: 20 }}>
            {/* GHL merge: {{appointment.time}} · {{location.name}} */}
            Tuesday, May 12 at 10:30 AM · Newport News
          </p>
        </div>
      </section>

      <div className="px-4 md:px-6 py-10 space-y-10">
        {/* Video card */}
        <div
          className="mx-auto"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: 16,
          }}
        >
          {/* YouTube unlisted embed gets dropped in here in GHL */}
          <div
            id="welcome-video"
            className="relative w-full flex items-center justify-center"
            style={{ aspectRatio: "16/9", background: "#0B1029", borderRadius: 8 }}
          >
            <button
              type="button"
              aria-label="Play welcome video"
              className="flex items-center justify-center rounded-full"
              style={{ width: 72, height: 72, background: "#E8670A" }}
            >
              <Play size={28} fill="#FFFFFF" style={{ color: "#FFFFFF", marginLeft: 4 }} />
            </button>
          </div>
          <p className="mt-3 text-center" style={{ color: "#5A6478", fontSize: 14 }}>
            A quick note from your physician. 60 seconds.
          </p>
        </div>

        {/* What to expect */}
        <section className="mx-auto" style={{ maxWidth: 1040 }}>
          <h2
            className="text-center uppercase mb-8"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 4vw, 36px)",
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              textWrap: "balance",
            } as React.CSSProperties}
          >
            What to Expect at Your Visit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div
                  className="mx-auto mb-4 flex items-center justify-center rounded-full"
                  style={{
                    width: 56, height: 56, background: "#E8670A", color: "#FFFFFF",
                    fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 24,
                  }}
                >
                  {s.n}
                </div>
                <div className="uppercase" style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 16, letterSpacing: "0.04em" }}>
                  {s.title}
                </div>
                <p className="mt-2" style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, lineHeight: 1.5 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Before you come in */}
        <section
          className="mx-auto"
          style={{
            maxWidth: 720,
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: 32,
          }}
        >
          <h2
            className="uppercase mb-5"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 28px)",
              color: "#0B1029",
              letterSpacing: "0.02em",
            }}
          >
            Before You Come In
          </h2>
          <ul className="space-y-3 mb-6">
            {BEFORE.map((b) => (
              <li key={b} className="flex items-start gap-3" style={{ color: "#0B1029", fontSize: 16 }}>
                <Check size={20} style={{ color: "#E8670A", flexShrink: 0, marginTop: 2 }} />
                <span>{b}</span>
              </li>
            ))}
            <li className="flex items-start gap-3" style={{ color: "#0B1029", fontSize: 16 }}>
              <MapPin size={20} style={{ color: "#E8670A", flexShrink: 0, marginTop: 2 }} />
              {/* GHL merge: {{location.address}} */}
              <span>{ADDRESS}</span>
            </li>
          </ul>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 uppercase"
            style={{
              border: "1.5px solid #0B1029", color: "#0B1029",
              padding: "12px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, letterSpacing: "0.05em",
            }}
          >
            <MapPin size={16} /> Open in Maps
          </a>
        </section>

        {/* Calendar add buttons */}
        <div className="mx-auto flex flex-col md:flex-row gap-3 justify-center" style={{ maxWidth: 720 }}>
          {["Add to Google Calendar", "Add to Apple Calendar"].map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center justify-center gap-2 uppercase"
              style={{
                border: "1.5px solid rgba(255,255,255,0.4)", color: "#FFFFFF", background: "transparent",
                padding: "14px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, letterSpacing: "0.05em",
                cursor: "pointer",
              }}
            >
              <CalendarPlus size={16} /> {label}
            </button>
          ))}
        </div>

        {/* Running late */}
        <div
          className="mx-auto text-center"
          style={{
            maxWidth: 720,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            padding: "20px 24px",
            color: "rgba(255,255,255,0.85)",
            fontSize: 15,
          }}
        >
          Running late or need to move it? Just text or call{" "}
          <a href="tel:8663444955" className="inline-flex items-center gap-1 font-semibold" style={{ color: "#FFFFFF" }}>
            <Phone size={14} /> (866) 344-4955
          </a>
          .
        </div>
      </div>

      {/* Meta Pixel Schedule event fires here */}
      {/* Google Ads conversion fires here */}
      {/* GA4 appointment_booked event fires here */}
    </BookLayout>
  );
};

export default BookConfirmed;
