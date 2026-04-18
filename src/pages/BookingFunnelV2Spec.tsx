import { Link } from "react-router-dom";
import { ArrowRight, Wrench, MousePointerClick, Eye, Layers } from "lucide-react";
import { SPEC_ANNOTATIONS, STEP_NAMES } from "@/components/booking-v2/spec/specAnnotations";

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const NAVY = "#0B1029";
const NAVY_DEEP = "#070B1F";
const ORANGE = "#E8670A";
const CREAM = "#F5F0EB";
const MUTED = "#AEB5BF";

// Entry points → Booking funnel
const entryPoints = [
  { group: "Wordpress Site", color: "#3B82F6", items: ["Homepage /", "How It Works", "Providers", "Locations Hub", "Service Pages"] },
  { group: "GHL Landing Pages", color: "#22C55E", items: ["General LP", "TRT LP", "ED LP", "Weight Loss LP", "Location - Richmond", "Location - Newport News", "Location - Virginia Beach"] },
];

// Funnel phases
const phases = [
  { name: "YOU", steps: [1], color: ORANGE, desc: "Identity + location captured." },
  { name: "YOUR VISIT", steps: [2, 3, 4], color: ORANGE, desc: "Clinical qualification: concern, duration, prior treatment." },
  { name: "YOUR TIME", steps: [5, 6], color: ORANGE, desc: "Email + appointment slot." },
  { name: "CONFIRMED", steps: [7, 8], color: ORANGE, desc: "Double opt-in verify, then confirmation screen." },
];

// Step-by-step
const stepDetails: Array<{ n: number; title: string; sub: string; bullets: string[]; outcome: string }> = [
  {
    n: 1,
    title: "Name · Phone · Location",
    sub: "Single screen, three fields. Mockup mode: all fields pre-validated.",
    bullets: [
      "First Name (text, required)",
      "Phone (formatted (XXX) XXX-XXXX, required)",
      "Location: Richmond / Newport News / Virginia Beach (card select, required)",
      "SMS consent checkbox (optional, unchecked by default — TCPA compliant)",
    ],
    outcome: "→ advances to Step 2 on CTA click",
  },
  {
    n: 2,
    title: "Primary Concern",
    sub: "Card-based qualification of clinical intent.",
    bullets: [
      "Low Energy / Fatigue",
      "Low Sex Drive / ED",
      "Weight Gain",
      "Mood / Focus",
      "Other / Not Sure",
    ],
    outcome: "→ auto-advances 300ms after card tap",
  },
  {
    n: 3,
    title: "Duration",
    sub: "How long has this been going on?",
    bullets: ["< 6 months", "6–12 months", "1–2 years", "More than 2 years"],
    outcome: "→ auto-advances 300ms after card tap",
  },
  {
    n: 4,
    title: "Prior Treatment",
    sub: "Have you been treated for this before?",
    bullets: ["Yes (treated previously)", "No (first-time)"],
    outcome: "→ auto-advances 300ms after selection",
  },
  {
    n: 5,
    title: "Email",
    sub: "Captured late to lower drop-off.",
    bullets: ["Email (required, regex-validated)", "Stored to send confirmation + double opt-in link"],
    outcome: "→ advances to calendar on CTA click",
  },
  {
    n: 6,
    title: "Calendar & Time",
    sub: "Date picker + time slot grid.",
    bullets: [
      "Month navigator (prev/next)",
      "Calendar grid (disabled past + closed days)",
      "Time slots (morning / afternoon)",
      "SMS reminder toggle (default ON)",
      "Summary line shows selected date + time",
    ],
    outcome: "→ advances to Verify on Confirm",
  },
  {
    n: 7,
    title: "Verify (Double Opt-In)",
    sub: "Email + SMS verification screen.",
    bullets: [
      "Email card with masked address",
      "Phone card with masked number",
      "Resend link (rate-limited)",
      "User must click link in email OR reply YES to SMS",
    ],
    outcome: "→ advances to Confirmed once a verification webhook fires",
  },
  {
    n: 8,
    title: "Confirmed",
    sub: "Animated success + appointment summary.",
    bullets: [
      "Checkmark animation",
      "Summary: date, time, location, provider",
      "Add to Google / Apple / Outlook calendar",
      "Health intake form upsell (link to /intake)",
      "What to expect block + referral CTA + trust footer",
    ],
    outcome: "End of funnel.",
  },
];

const Pill = ({ children, bg = ORANGE, fg = "#FFFFFF" }: { children: React.ReactNode; bg?: string; fg?: string }) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 999,
      backgroundColor: bg,
      color: fg,
      fontFamily: font,
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </span>
);

const SectionHeading = ({ eyebrow, title }: { eyebrow?: string; title: string }) => (
  <div className="mb-10">
    {eyebrow && (
      <div style={{ fontFamily: font, fontWeight: 700, fontSize: 12, letterSpacing: "0.18em", color: ORANGE, textTransform: "uppercase", marginBottom: 12 }}>
        {eyebrow}
      </div>
    )}
    <h2 className="uppercase" style={{ fontFamily: headingFont, fontSize: "clamp(32px, 5vw, 56px)", color: "#FFFFFF", letterSpacing: "0.04em", lineHeight: 1.05 }}>
      {title}
    </h2>
  </div>
);

const BookingFunnelV2Spec = () => {
  return (
    <div style={{ backgroundColor: NAVY_DEEP, minHeight: "100vh" }}>
      {/* Top bar */}
      <header
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: NAVY,
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <div className="flex items-center gap-3">
            <Wrench style={{ color: ORANGE }} className="h-5 w-5" />
            <span style={{ fontFamily: font, fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", color: "#FFFFFF", textTransform: "uppercase" }}>
              /bookv2 — Mockup Spec for Dev Team
            </span>
          </div>
          <Link
            to="/bookv2?spec=1"
            style={{
              backgroundColor: ORANGE,
              color: "#FFFFFF",
              padding: "10px 18px",
              borderRadius: 999,
              fontFamily: font,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Open Live Funnel <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: "80px 24px 60px" }}>
        <div className="mx-auto max-w-[1100px]">
          <Pill>Spec Document · v2</Pill>
          <h1
            className="mt-5 uppercase"
            style={{
              fontFamily: headingFont,
              fontSize: "clamp(44px, 7vw, 88px)",
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            The /bookv2 Booking Funnel
          </h1>
          <p
            className="mt-6 max-w-[720px]"
            style={{ fontFamily: font, fontSize: 17, lineHeight: 1.6, color: MUTED }}
          >
            A progressive 8-step lead-capture and appointment funnel for Men's Wellness Centers.
            This page is a clickable spec: every screen, field, validation rule, behavior and copy
            decision is annotated on the live funnel via Spec Mode (already enabled by default).
          </p>

          {/* Quick reference */}
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Layers, title: "8 steps · 4 phases", desc: "YOU → YOUR VISIT → YOUR TIME → CONFIRMED" },
              { icon: MousePointerClick, title: "Auto-advance on cards", desc: "Steps 2, 3, 4 advance 300ms after tap. No CTA needed." },
              { icon: Eye, title: "Spec Mode default ON", desc: "Numbered orange badges anchor every annotated element." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  backgroundColor: NAVY,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <Icon className="h-6 w-6" style={{ color: ORANGE }} />
                <div className="mt-3" style={{ fontFamily: font, fontWeight: 700, fontSize: 15, color: "#FFFFFF" }}>{title}</div>
                <div className="mt-1" style={{ fontFamily: font, fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow diagram */}
      <section style={{ padding: "60px 24px", backgroundColor: NAVY }}>
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading eyebrow="Architecture" title="Traffic Flow → Funnel → Confirmation" />

          {/* Entry points row */}
          <div className="mb-8">
            <div style={{ fontFamily: font, fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginBottom: 16 }}>
              ① Entry points (all routes that send traffic to /bookv2)
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div
                  key={ep.group}
                  style={{
                    backgroundColor: NAVY_DEEP,
                    border: `1px solid ${ep.color}55`,
                    borderTop: `3px solid ${ep.color}`,
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <div style={{ fontFamily: font, fontWeight: 700, fontSize: 13, color: ep.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                    {ep.group}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {ep.items.map((it) => (
                      <li
                        key={it}
                        style={{
                          fontFamily: font,
                          fontSize: 13,
                          color: "#E5E7EB",
                          padding: "6px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Down arrow */}
          <div className="my-6 flex justify-center">
            <div style={{ fontFamily: font, fontSize: 24, color: ORANGE }}>↓</div>
          </div>

          {/* CTA convergence */}
          <div
            className="mx-auto mb-8 max-w-[640px] text-center"
            style={{
              backgroundColor: ORANGE,
              borderRadius: 16,
              padding: "20px 24px",
              fontFamily: headingFont,
              fontSize: 22,
              letterSpacing: "0.06em",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            All "Book My Free Consultation" CTAs → /bookv2
          </div>

          <div className="my-6 flex justify-center">
            <div style={{ fontFamily: font, fontSize: 24, color: ORANGE }}>↓</div>
          </div>

          {/* Phases */}
          <div style={{ fontFamily: font, fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginBottom: 16 }}>
            ② Funnel phases (8 steps grouped into 4 narrative chunks)
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {phases.map((ph) => (
              <div
                key={ph.name}
                style={{
                  backgroundColor: NAVY_DEEP,
                  borderRadius: 14,
                  padding: 20,
                  border: "1px solid rgba(255,255,255,0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: ph.color }} />
                <div style={{ fontFamily: headingFont, fontSize: 26, color: "#FFFFFF", letterSpacing: "0.04em", lineHeight: 1 }}>{ph.name}</div>
                <div className="mt-2" style={{ fontFamily: font, fontSize: 12, color: ORANGE, fontWeight: 700, letterSpacing: "0.1em" }}>
                  STEP{ph.steps.length > 1 ? "S" : ""} {ph.steps.join(", ")}
                </div>
                <div className="mt-3" style={{ fontFamily: font, fontSize: 13, color: MUTED, lineHeight: 1.5 }}>
                  {ph.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="my-6 flex justify-center">
            <div style={{ fontFamily: font, fontSize: 24, color: ORANGE }}>↓</div>
          </div>

          {/* End state */}
          <div
            className="mx-auto max-w-[640px] text-center"
            style={{
              backgroundColor: "#0E2818",
              border: "1px solid #16A34A",
              borderRadius: 16,
              padding: "20px 24px",
            }}
          >
            <div style={{ fontFamily: headingFont, fontSize: 22, color: "#22C55E", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              ✓ Lead booked + double opt-in verified
            </div>
            <div className="mt-2" style={{ fontFamily: font, fontSize: 13, color: "#A7F3D0" }}>
              Pushed to GHL with appointment + intake-form upsell shown.
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-step */}
      <section style={{ padding: "80px 24px" }}>
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="Screen-by-screen" title="The 8 Steps in Detail" />

          <div className="grid grid-cols-1 gap-5">
            {stepDetails.map((s) => (
              <div
                key={s.n}
                style={{
                  backgroundColor: NAVY,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: `4px solid ${ORANGE}`,
                  borderRadius: 14,
                  padding: 28,
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 24,
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    backgroundColor: ORANGE,
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: headingFont,
                    fontSize: 28,
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3
                      className="uppercase"
                      style={{
                        fontFamily: headingFont,
                        fontSize: 28,
                        color: "#FFFFFF",
                        letterSpacing: "0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-2" style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
                    {s.sub}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        style={{
                          fontFamily: font,
                          fontSize: 14,
                          color: "#E5E7EB",
                          paddingLeft: 18,
                          position: "relative",
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: ORANGE }}>›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="mt-4 inline-block"
                    style={{
                      fontFamily: font,
                      fontWeight: 700,
                      fontSize: 12,
                      color: ORANGE,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "6px 12px",
                      borderRadius: 999,
                      backgroundColor: "rgba(232,103,10,0.1)",
                      border: "1px solid rgba(232,103,10,0.3)",
                    }}
                  >
                    {s.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spec mode usage */}
      <section style={{ padding: "60px 24px", backgroundColor: NAVY }}>
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="How to use this spec" title="Spec Mode on /bookv2" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div
              style={{
                backgroundColor: NAVY_DEEP,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: "#FFFFFF", marginBottom: 10 }}>
                ① Open the live funnel
              </div>
              <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                Spec Mode is on by default. You'll see numbered orange badges floating next to every annotated element across all 8 steps. Toggle it off via the pill in the bottom-right corner if you want a clean preview.
              </p>
            </div>
            <div
              style={{
                backgroundColor: NAVY_DEEP,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: "#FFFFFF", marginBottom: 10 }}>
                ② Click any badge
              </div>
              <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                A right-side panel slides in with the field's spec: type, validation, behavior, copy rationale, and notes. Press Esc or click outside to close.
              </p>
            </div>
            <div
              style={{
                backgroundColor: NAVY_DEEP,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: "#FFFFFF", marginBottom: 10 }}>
                ③ Force ON / OFF via URL
              </div>
              <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                Append <code style={{ color: ORANGE }}>?spec=1</code> to force spec mode on, or <code style={{ color: ORANGE }}>?spec=0</code> to force it off — useful for screen-shotting clean states.
              </p>
            </div>
            <div
              style={{
                backgroundColor: NAVY_DEEP,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: "#FFFFFF", marginBottom: 10 }}>
                ④ Read the registry
              </div>
              <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                Every annotation lives in <code style={{ color: ORANGE }}>src/components/booking-v2/spec/specAnnotations.ts</code> — a single typed file you can grep, export, or paste into Linear / Notion.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/bookv2?spec=1"
              style={{
                backgroundColor: ORANGE,
                color: "#FFFFFF",
                padding: "16px 32px",
                borderRadius: 999,
                fontFamily: font,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Launch Spec-Annotated Funnel <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Annotation index */}
      <section style={{ padding: "60px 24px" }}>
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="Reference" title={`Annotation Registry (${SPEC_ANNOTATIONS.length} entries)`} />
          <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6, marginBottom: 32, maxWidth: 720 }}>
            Flat list of every annotation for offline review. Each entry corresponds to a numbered badge on the live funnel.
          </p>

          {Object.entries(STEP_NAMES).map(([stepKey, stepName]) => {
            const step = Number(stepKey);
            const items = SPEC_ANNOTATIONS.filter((a) => a.step === step);
            if (items.length === 0) return null;
            return (
              <div key={step} className="mb-8">
                <div
                  style={{
                    fontFamily: headingFont,
                    fontSize: 22,
                    color: "#FFFFFF",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    paddingBottom: 10,
                    borderBottom: `2px solid ${ORANGE}`,
                    marginBottom: 14,
                  }}
                >
                  {stepName}
                  <span style={{ fontFamily: font, fontSize: 12, color: MUTED, marginLeft: 12, letterSpacing: 0, textTransform: "none" }}>
                    {items.length} annotation{items.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {items.map((a) => (
                    <div
                      key={a.id}
                      style={{
                        backgroundColor: NAVY,
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 10,
                        padding: "12px 16px",
                        display: "grid",
                        gridTemplateColumns: "32px 1fr auto",
                        gap: 14,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: ORANGE,
                          color: "#FFFFFF",
                          fontFamily: font,
                          fontWeight: 700,
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {a.number}
                      </div>
                      <div>
                        <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: "#FFFFFF" }}>{a.label}</div>
                        <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>
                          <code style={{ color: ORANGE }}>{a.id}</code>
                          {a.required && <span style={{ marginLeft: 10, color: "#F87171" }}>· required</span>}
                        </div>
                      </div>
                      <Pill bg="rgba(232,103,10,0.12)" fg={ORANGE}>{a.type}</Pill>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "32px 24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: NAVY,
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: font, fontSize: 12, color: MUTED, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Internal spec · Men's Wellness Centers · /bookv2 v2
        </div>
      </footer>
    </div>
  );
};

export default BookingFunnelV2Spec;
