import { useEffect, useRef, useState } from "react";
import {
  Check,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Menu,
  X as CloseIcon,
  XCircle,
  Stethoscope,
  TestTube2,
  ShieldCheck,
  Activity,
  Building2,
  ChevronDown,
} from "lucide-react";

/* ─── CONSTANTS ────────────────────────────────────────────── */

const PHONE = "866-344-4955";
const PHONE_HREF = "tel:+18663444955";
const PRICE = "$199/mo";
const FONT_DISPLAY = "'Oswald', sans-serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

/* ─── DATA ─────────────────────────────────────────────────── */

const OUTCOMES = [
  { icon: "⚡", label: "More Energy" },
  { icon: "🔥", label: "Stronger Libido" },
  { icon: "🧠", label: "Sharper Focus" },
  { icon: "💪", label: "Lean Muscle" },
];

const TRUST_CHECKS = [
  "Licensed Virginia providers",
  "Same-day appointments available",
  "3 in-person Virginia clinics",
  "FSA / HSA accepted",
];

const STATS = [
  { value: "10,000+", label: "Men Treated" },
  { value: "10+", label: "Years in Virginia" },
  { value: "Same-Day", label: "Appointments" },
  { value: "4.9★", label: "Google Rating" },
];

const SYMPTOMS = [
  "Constant fatigue no matter how much you sleep",
  "Lost drive, confidence, and motivation",
  "Brain fog that won't lift no matter what you try",
  "Gaining belly fat, losing muscle despite working out",
  'Your doctor says your labs are "normal." You know better.',
];

const STEPS = [
  {
    num: "01",
    title: "Same-Day Blood Work",
    desc: "Full testosterone panel drawn on-site and reviewed in minutes — not two weeks.",
  },
  {
    num: "02",
    title: "A Doctor Who Actually Listens",
    desc: "A hormone specialist sits with you, walks through every number, and explains exactly what's going on.",
  },
  {
    num: "03",
    title: "Your Personalized Plan",
    desc: "Your protocol is built around your labs and symptoms. Many patients start the same day.",
  },
];

const COMPARISONS = [
  { bad: "10-min video call", good: "Face-to-face doctor" },
  { bad: "2-week lab wait", good: "Results same visit" },
  { bad: "Cookie-cutter script", good: "Plan built for you" },
];

const RESULT_STATS = [
  { value: "2–5×", label: "Increase in total testosterone within 2 months*" },
  { value: "84%", label: "Of patients report meaningful symptom improvement*" },
];

const TESTIMONIALS = [
  {
    quote:
      "Energy is back to where it was a decade ago. Better sleep, focused at work, and the team picks up the phone when I call.",
    name: "Mark T.",
    city: "Richmond, VA",
  },
  {
    quote:
      "I was skeptical, but the in-person visit and same-day labs made it feel real. Body composition has shifted noticeably.",
    name: "James R.",
    city: "Virginia Beach, VA",
  },
  {
    quote:
      "Mood and motivation were the biggest changes. The physician walked me through every number — first time anyone has done that.",
    name: "David K.",
    city: "Newport News, VA",
  },
];

const PILLARS = [
  {
    Icon: Stethoscope,
    title: "Licensed Providers",
    desc: "Licensed Virginia nurse practitioners and physicians. Not remote. Not an app. A real provider, every visit.",
  },
  {
    Icon: TestTube2,
    title: "On-Site Labs",
    desc: "Blood draw and full panel done in-house. Results back before you walk out the door.",
  },
  {
    Icon: ShieldCheck,
    title: "Built For Men",
    desc: "A clinic designed around your schedule, your privacy, and your goals. Nothing else.",
  },
  {
    Icon: Activity,
    title: "Ongoing Monitoring",
    desc: "Regular check-ins, labs, and protocol adjustments. We don't write a script and disappear.",
  },
  {
    Icon: Building2,
    title: "No Telehealth Runaround",
    desc: "You see a real doctor in a real clinic. No app. No video call. No waiting on hold with a call center.",
  },
];

const FAQS = [
  {
    q: "How much does it cost?",
    a: "Treatment plans start at $199/month after your physician evaluation. Your initial consultation and on-site labs are included with your first visit. FSA/HSA accepted.",
  },
  {
    q: "Do I need a referral?",
    a: "No referral needed. Book directly online or by phone. Same-day and next-day appointments are regularly available.",
  },
  {
    q: "What happens during my first visit?",
    a: "You come in, get blood drawn on-site, sit with a physician who reviews your results and health history, and leave with a personalized plan. One visit, typically one hour.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most patients notice changes in energy and mood within the first few weeks. Hormone levels typically normalize within 2–3 months. Your physician tracks your progress at every follow-up.",
  },
  {
    q: "Is my information confidential?",
    a: "Yes. Men's Wellness Centers is a fully HIPAA-compliant medical practice. Your records stay private.",
  },
];

const LOCATIONS = [
  {
    name: "Richmond",
    address: "4050 Innslake Dr, Suite 360\nGlen Allen, VA 23060",
    phone: "804-346-4636",
    value: "richmond",
  },
  {
    name: "Newport News",
    address: "827 Diligence Drive, Suite 206\nNewport News, VA 23606",
    phone: "757-806-6263",
    value: "newport-news",
  },
  {
    name: "Virginia Beach",
    address: "996 First Colonial Road\nVirginia Beach, VA 23454",
    phone: "757-806-6263",
    value: "virginia-beach",
  },
];

/* ─── BANNER HEIGHT (shared constant so offsets stay in sync) ─ */
const BANNER_H = 36;
const HEADER_H = 64;
const TOTAL_OFFSET = BANNER_H + HEADER_H;

/* ─── UTILITY ──────────────────────────────────────────────── */

const smoothTo = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ─── SHARED STYLES ────────────────────────────────────────── */

const eyebrow = (text: string) => (
  <p
    style={{
      fontFamily: FONT_BODY,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.14em",
      color: "#E8670A",
      textTransform: "uppercase",
      marginBottom: 10,
    }}
  >
    {text}
  </p>
);

const sectionHead = (
  text: string,
  color: string = "#000033",
  align: "left" | "center" = "left"
) => (
  <h2
    style={{
      fontFamily: FONT_DISPLAY,
      fontSize: "clamp(26px, 3.5vw, 40px)",
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: "-0.01em",
      color,
      textAlign: align,
    }}
  >
    {text}
  </h2>
);

/* ─── URGENCY BANNER ───────────────────────────────────────── */

const UrgencyBanner = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 70,
      height: BANNER_H,
      background: "#E8670A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    }}
  >
    <span
      style={{
        fontFamily: FONT_BODY,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#fff",
        whiteSpace: "nowrap",
      }}
    >
      ⚡ Same-Day Appointments Available — Limited Slots This Week
    </span>
    <button
      onClick={smoothTo("form")}
      style={{
        fontFamily: FONT_BODY,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        background: "#fff",
        color: "#E8670A",
        border: "none",
        borderRadius: 99,
        padding: "4px 12px",
        cursor: "pointer",
        flexShrink: 0,
        display: "none",
      }}
      className="sm:block"
    >
      Book Now →
    </button>
  </div>
);

/* ─── HEADER ───────────────────────────────────────────────── */

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBg = scrolled
    ? "rgba(0,0,51,0.97)"
    : "transparent";

  return (
    <header
      style={{
        position: "fixed",
        top: BANNER_H,
        left: 0,
        right: 0,
        zIndex: 60,
        height: HEADER_H,
        background: navBg,
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/logos/Text_Logo_white.png"
          alt="Men's Wellness Centers"
          style={{ height: 28, width: "auto" }}
        />

        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 16 }}
        >
          <a
            href={PHONE_HREF}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.80)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#fff")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.80)")
            }
          >
            {PHONE}
          </a>
          <button
            onClick={smoothTo("form")}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "#E8670A",
              color: "#fff",
              border: "none",
              borderRadius: 99,
              height: 42,
              padding: "0 22px",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#C7560A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#E8670A")
            }
          >
            Book Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            padding: 4,
          }}
        >
          {menuOpen ? (
            <CloseIcon size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: HEADER_H,
            left: 0,
            right: 0,
            background: "rgba(0,0,51,0.99)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <a
            href={PHONE_HREF}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONT_BODY,
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <Phone size={16} />
            {PHONE}
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              smoothTo("form")();
            }}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "#E8670A",
              color: "#fff",
              border: "none",
              borderRadius: 99,
              height: 46,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Book My Consultation
          </button>
        </div>
      )}
    </header>
  );
};

/* ─── HERO ─────────────────────────────────────────────────── */

const Hero = () => (
  <section
    id="hero"
    style={{
      background: "#000033",
      paddingTop: TOTAL_OFFSET + 40,
      paddingBottom: 80,
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-12"
        style={{ gap: 40, alignItems: "start" }}
      >
        {/* Left: headline + trust */}
        <div className="lg:col-span-7">
          {/* H1 */}
          <h1
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(52px, 7.5vw, 96px)",
              fontWeight: 800,
              lineHeight: 0.93,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              color: "#fff",
              margin: 0,
            }}
          >
            Testosterone
            <span
              style={{ display: "block", color: "#E8670A" }}
            >
              Done Right.
            </span>
          </h1>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: "clamp(15px, 1.6vw, 18px)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.65,
              marginTop: 18,
              maxWidth: 520,
            }}
          >
            In-person. Same-day labs. A real doctor who reads your results
            with you — not at you.
          </p>

          {/* Rating pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 20,
              padding: "10px 18px",
              borderRadius: 99,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.13)",
            }}
          >
            <div style={{ display: "flex", gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill="#FFC107"
                  stroke="#FFC107"
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              4.9
            </span>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                fontWeight: 500,
              }}
            >
              200+ Google Reviews
            </span>
          </div>

          {/* Trust checklist */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "22px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {TRUST_CHECKS.map((t) => (
              <li
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: FONT_BODY,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                <Check
                  size={15}
                  strokeWidth={3}
                  style={{ color: "#E8670A", flexShrink: 0 }}
                />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: CTA cards */}
        <div
          className="lg:col-span-5"
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          {/* Primary card */}
          <button
            onClick={smoothTo("form")}
            style={{
              background: "#E8670A",
              border: "none",
              borderRadius: 20,
              padding: "28px 28px 24px",
              textAlign: "left",
              cursor: "pointer",
              minHeight: 190,
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 16px 40px rgba(232,103,10,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Open Today badge */}
            <span
              style={{
                display: "inline-block",
                fontFamily: FONT_BODY,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "rgba(0,255,80,0.22)",
                color: "#00E564",
                borderRadius: 99,
                padding: "4px 10px",
                marginBottom: 12,
              }}
            >
              ● OPEN TODAY
            </span>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(20px, 2.6vw, 30px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              Same-Day Labs +<br />Results In One Visit
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 18,
                background: "#fff",
                color: "#000033",
                fontFamily: FONT_BODY,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                borderRadius: 99,
                height: 40,
                padding: "0 18px",
              }}
            >
              Book My Consultation <ArrowRight size={14} />
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 11,
                color: "rgba(255,255,255,0.75)",
                marginTop: 10,
              }}
            >
              Plans start at {PRICE} after approval
            </p>
          </button>

          {/* Secondary card */}
          <button
            onClick={smoothTo("locations")}
            style={{
              background: "#080D2A",
              border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: 20,
              padding: "24px 28px 20px",
              textAlign: "left",
              cursor: "pointer",
              minHeight: 160,
              transition:
                "transform 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor =
                "rgba(232,103,10,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,0.13)";
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontFamily: FONT_BODY,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "rgba(232,103,10,0.18)",
                color: "#E8670A",
                borderRadius: 99,
                padding: "4px 10px",
                marginBottom: 12,
              }}
            >
              Available This Week
            </span>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(18px, 2.2vw, 26px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              3 Virginia Clinics Near You
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 14,
                border: "2px solid rgba(255,255,255,0.65)",
                color: "#fff",
                fontFamily: FONT_BODY,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                borderRadius: 99,
                height: 40,
                padding: "0 18px",
              }}
            >
              <MapPin size={13} /> See Locations
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 11,
                color: "rgba(255,255,255,0.45)",
                marginTop: 10,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span>Richmond</span>
              <span style={{ opacity: 0.35 }}>·</span>
              <span>Newport News</span>
              <span style={{ opacity: 0.35 }}>·</span>
              <span>Virginia Beach</span>
            </p>
          </button>
        </div>
      </div>

      {/* Outcome pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 36,
        }}
      >
        {OUTCOMES.map((o) => (
          <button
            key={o.label}
            onClick={smoothTo("form")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              background: "#12183A",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 99,
              height: 40,
              padding: "0 16px",
              cursor: "pointer",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#E8670A";
              e.currentTarget.style.background = "#1C2245";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,0.12)";
              e.currentTarget.style.background = "#12183A";
            }}
          >
            {o.icon} {o.label}{" "}
            <ArrowRight
              size={13}
              style={{ opacity: 0.5 }}
            />
          </button>
        ))}
      </div>

      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          color: "rgba(255,255,255,0.35)",
          marginTop: 20,
        }}
      >
        Medically reviewed by licensed Virginia providers. Individual
        results vary.
      </p>
    </div>
  </section>
);

/* ─── TRUST BAR ────────────────────────────────────────────── */

const TrustBar = () => (
  <section
    style={{
      background: "#05061E",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "52px 20px",
      }}
    >
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        Trusted by Virginia men since 2015
      </p>
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ gap: "24px 16px", textAlign: "center" }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(34px, 4.5vw, 52px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                borderBottom: "3px solid #E8670A",
                paddingBottom: 5,
                display: "inline-block",
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.50)",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── PROBLEM + HOW IT WORKS ───────────────────────────────── */

const ProblemSection = () => (
  <section
    id="symptoms"
    style={{ background: "#F5F0EB", padding: "80px 0" }}
  >
    <div
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        gap: 56,
        alignItems: "start",
      }}
    >
      {/* Left: Problem agitation */}
      <div>
        {eyebrow("Sound Familiar?")}
        {sectionHead(
          "Tired of Feeling Like a Worse Version of Yourself?"
        )}
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: "#4A4A4A",
            lineHeight: 1.7,
            marginTop: 14,
            maxWidth: 500,
          }}
        >
          You used to have energy. You used to have drive. Now you drag
          through the day, can't focus, can't sleep right, and the weight
          won't move no matter what you do. Your doctor says your labs are
          "normal." You know they're not.
        </p>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "24px 0 0",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {SYMPTOMS.map((s) => (
            <li
              key={s}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontFamily: FONT_BODY,
                fontSize: 14,
                color: "#1A1A1A",
                lineHeight: 1.5,
              }}
            >
              <XCircle
                size={16}
                strokeWidth={2}
                style={{
                  color: "#E8670A",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: How it works */}
      <div>
        {eyebrow("The Fix")}
        {sectionHead("Here's How It Works in One Visit")}
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: "#4A4A4A",
            lineHeight: 1.7,
            marginTop: 14,
          }}
        >
          No referrals. No waiting weeks. Book online, come in, leave
          with a plan.
        </p>

        <div
          style={{
            marginTop: 28,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.num}
              style={{ display: "flex", gap: 16 }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#000033",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_DISPLAY,
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {s.num}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#000033",
                    margin: 0,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 14,
                    color: "#4A4A4A",
                    lineHeight: 1.6,
                    marginTop: 4,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* What happens next callout */}
        <div
          style={{
            marginTop: 28,
            background: "#000033",
            borderRadius: 14,
            padding: "18px 20px",
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 700,
              color: "#E8670A",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            What happens next?
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.6,
            }}
          >
            Most patients leave with a prescription the same day.
            Treatment starts at {PRICE}/month.
          </p>
        </div>

        <button
          onClick={smoothTo("form")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 22,
            background: "#E8670A",
            color: "#fff",
            border: "none",
            borderRadius: 99,
            height: 52,
            padding: "0 28px",
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#C7560A")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#E8670A")
          }
        >
          Start Today — Book My Same-Day Visit{" "}
          <ArrowRight size={15} />
        </button>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 12,
            color: "#888",
            marginTop: 10,
          }}
        >
          📅 Appointments filling this week. Secure your slot.
        </p>
      </div>
    </div>
  </section>
);

/* ─── WHY US ────────────────────────────────────────────────── */

const WhyUs = () => (
  <section style={{ background: "#000033", padding: "80px 0" }}>
    <div
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        gap: 56,
        alignItems: "center",
      }}
    >
      {/* Image */}
      <div>
        <img
          src="/images/hero-still.jpg"
          alt="Face-to-face TRT consultation at Men's Wellness Centers Virginia"
          style={{
            borderRadius: 20,
            objectFit: "cover",
            width: "100%",
            aspectRatio: "4/3",
            display: "block",
          }}
          loading="lazy"
        />
      </div>

      {/* Copy */}
      <div>
        {eyebrow("The MWC Difference")}
        {sectionHead(
          "Most Clinics Send You Home With a Lab Slip. We Don't.",
          "#fff"
        )}
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: "rgba(255,255,255,0.70)",
            lineHeight: 1.7,
            marginTop: 16,
          }}
        >
          On-site labs, a face-to-face consultation, and a personalized
          TRT protocol — all in one visit. Same provider, every
          follow-up. No app. No mail-order doctor. No middleman.
        </p>

        {/* Comparison rows */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {COMPARISONS.map((c) => (
            <div
              key={c.bad}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#FF8585",
                  background: "rgba(255,80,80,0.14)",
                  borderRadius: 99,
                  padding: "5px 12px",
                }}
              >
                ❌ {c.bad}
              </span>
              <ArrowRight
                size={13}
                style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#4DD884",
                  background: "rgba(46,204,113,0.14)",
                  borderRadius: 99,
                  padding: "5px 12px",
                }}
              >
                ✅ {c.good}
              </span>
            </div>
          ))}
        </div>

        {/* Mini stats row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px 32px",
            marginTop: 32,
          }}
        >
          {[
            { num: "10,000+", label: "Men Treated" },
            { num: "Since 2015", label: "Serving Virginia" },
            { num: "4.9★", label: "Rating" },
            { num: "3", label: "VA Clinics" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── RESULTS ───────────────────────────────────────────────── */

const Results = () => (
  <section style={{ background: "#F5F0EB", padding: "80px 0" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      {sectionHead("Real Results From Real Patients", "#000033", "center")}

      {/* Stat cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ gap: 16, marginTop: 36 }}
      >
        {RESULT_STATS.map((r) => (
          <div
            key={r.value}
            style={{
              background: "#E8670A",
              borderRadius: 20,
              padding: "36px 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(56px, 8vw, 80px)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {r.value}
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                color: "rgba(255,255,255,0.85)",
                marginTop: 10,
                lineHeight: 1.5,
              }}
            >
              {r.label}
            </p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 16, marginTop: 24 }}
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            style={{
              background: "#0A0A1A",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill="#FFC107"
                  stroke="#FFC107"
                />
              ))}
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.65,
                flex: 1,
              }}
            >
              "{t.quote}"
            </p>
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.40)",
                  marginTop: 2,
                }}
              >
                {t.city}
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontFamily: FONT_BODY,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  background: "rgba(46,204,113,0.14)",
                  color: "#4DD884",
                  borderRadius: 4,
                  padding: "2px 7px",
                }}
              >
                ✓ Verified Review
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 28 }}>
        <a
          href="https://www.google.com/search?q=Men%27s+Wellness+Centers+Virginia+reviews"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 700,
            color: "#000033",
            textDecoration: "underline",
            textUnderlineOffset: 4,
          }}
        >
          Read all 200+ reviews on Google →
        </a>
      </div>

      {/* Outcome micro-CTAs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          marginTop: 48,
        }}
      >
        {[
          "Want more energy →",
          "Want to lose fat →",
          "Want better focus →",
          "All of the above →",
        ].map((label) => (
          <button
            key={label}
            onClick={smoothTo("form")}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              background: "#12183A",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 99,
              height: 42,
              padding: "0 20px",
              cursor: "pointer",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#E8670A";
              e.currentTarget.style.background = "#1A2048";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,0.14)";
              e.currentTarget.style.background = "#12183A";
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </section>
);

/* ─── PRICING / INCLUDED ────────────────────────────────────── */

const Pricing = () => (
  <section style={{ background: "#E8670A", padding: "80px 0" }}>
    <div
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        gap: 56,
        alignItems: "center",
      }}
    >
      {/* Copy — order 2 on mobile, 1 on desktop */}
      <div className="order-2 md:order-1">
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(28px, 3.8vw, 46px)",
            fontWeight: 800,
            lineHeight: 1.0,
            color: "#fff",
          }}
        >
          Walk In Today.
          <br />
          Walk Out With a Plan.
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.65,
            marginTop: 14,
          }}
        >
          No commitment. No credit card to book. Walk into any of our 3
          Virginia centers for a same-day consultation.
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "20px 0 0",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {[
            "On-site testosterone panel — results same visit",
            "Face-to-face physician consultation",
            "Personalized protocol built around your labs",
          ].map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontFamily: FONT_BODY,
                fontSize: 14,
                color: "#fff",
                lineHeight: 1.5,
              }}
            >
              <Check
                size={15}
                strokeWidth={3}
                style={{
                  color: "rgba(255,255,255,0.90)",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              />
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={smoothTo("form")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 28,
            background: "#fff",
            color: "#000033",
            border: "none",
            borderRadius: 99,
            height: 54,
            padding: "0 30px",
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "rgba(255,255,255,0.90)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#fff")
          }
        >
          Book My Consultation <ArrowRight size={15} />
        </button>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            color: "rgba(255,255,255,0.78)",
            marginTop: 12,
          }}
        >
          Starting at {PRICE} after approval · FSA/HSA accepted
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 10,
            background: "rgba(0,0,0,0.15)",
            color: "#fff",
            fontFamily: FONT_BODY,
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 99,
            padding: "5px 14px",
          }}
        >
          <Check size={13} /> No contract · Cancel anytime
        </div>
      </div>

      {/* Image — order 1 on mobile */}
      <div className="order-1 md:order-2">
        <img
          src="/images/services/labs.jpg"
          alt="On-site testosterone blood panel at Men's Wellness Centers"
          style={{
            borderRadius: 20,
            objectFit: "cover",
            width: "100%",
            aspectRatio: "4/3",
            display: "block",
            boxShadow: "0 20px 60px rgba(0,0,0,0.20)",
          }}
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

/* ─── PILLARS ───────────────────────────────────────────────── */

const PillarCard = ({
  Icon,
  title,
  desc,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  title: string;
  desc: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "28px 20px 24px",
        textAlign: "center",
        transition: "border-color 0.2s ease, background 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={() => {
        if (ref.current) {
          ref.current.style.borderColor = "#E8670A";
          ref.current.style.background = "rgba(232,103,10,0.06)";
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.style.borderColor =
            "rgba(255,255,255,0.08)";
          ref.current.style.background =
            "rgba(255,255,255,0.04)";
        }
      }}
    >
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: "#081640",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
        }}
      >
        <Icon size={34} strokeWidth={1.5} color="#E8670A" />
      </div>
      <h3
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#fff",
          margin: "0 0 8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 13,
          color: "rgba(255,255,255,0.60)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
};

const Pillars = () => (
  <section style={{ background: "#000033", padding: "80px 0" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <h2
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: "clamp(24px, 3.2vw, 38px)",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "#fff",
          textAlign: "center",
          marginBottom: 44,
        }}
      >
        Why 10,000+ Men Choose MWC Over Everyone Else
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        style={{ gap: 16 }}
      >
        {PILLARS.map((p) => (
          <PillarCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  </section>
);

/* ─── LOCATIONS ─────────────────────────────────────────────── */

const Locations = () => (
  <section
    id="locations"
    style={{ background: "#F5F0EB", padding: "80px 0" }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      {sectionHead(
        "3 Virginia Clinics. Same-Day Appointments.",
        "#000033",
        "center"
      )}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 16, marginTop: 36 }}
      >
        {LOCATIONS.map((l) => (
          <div
            key={l.name}
            style={{
              background: "#fff",
              border: "1px solid #E5E5E5",
              borderRadius: 20,
              padding: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <MapPin
                size={16}
                style={{ color: "#E8670A", flexShrink: 0 }}
              />
              <h3
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "#000033",
                  margin: 0,
                }}
              >
                {l.name}
              </h3>
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 13,
                color: "#555",
                lineHeight: 1.6,
                whiteSpace: "pre-line",
                flex: 1,
              }}
            >
              {l.address}
            </p>
            <a
              href={`tel:${l.phone}`}
              style={{
                display: "block",
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 700,
                color: "#000033",
                textDecoration: "none",
                marginTop: 10,
              }}
            >
              {l.phone}
            </a>
            <div
              style={{
                display: "inline-block",
                marginTop: 8,
                fontFamily: FONT_BODY,
                fontSize: 11,
                fontWeight: 700,
                background: "rgba(46,204,113,0.12)",
                color: "#1B7A3A",
                borderRadius: 99,
                padding: "4px 12px",
                alignSelf: "flex-start",
              }}
            >
              ● Same-Day Available
            </div>
            <button
              onClick={smoothTo("form")}
              style={{
                marginTop: 18,
                background: "#000033",
                color: "#fff",
                border: "none",
                borderRadius: 99,
                height: 44,
                width: "100%",
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1A2055")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#000033")
              }
            >
              Book at {l.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── FAQ ───────────────────────────────────────────────────── */

const FAQItem = ({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) => (
  <div
    style={{
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 12,
      overflow: "hidden",
    }}
  >
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        background: open
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.03)",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.15s",
      }}
    >
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 14,
          fontWeight: 600,
          color: "#fff",
          paddingRight: 16,
        }}
      >
        {q}
      </span>
      <ChevronDown
        size={16}
        style={{
          color: "rgba(255,255,255,0.45)",
          flexShrink: 0,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
      />
    </button>
    {open && (
      <div style={{ padding: "0 20px 18px" }}>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 14,
            color: "rgba(255,255,255,0.68)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    )}
  </div>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section style={{ background: "#000033", padding: "80px 0" }}>
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            marginBottom: 36,
          }}
        >
          Common Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={openIdx === i}
              onToggle={() =>
                setOpenIdx(openIdx === i ? null : i)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── LEAD FORM ─────────────────────────────────────────────── */

const LeadForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [tcpa, setTcpa] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidPhone = (v: string) =>
    v.replace(/\D/g, "").length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!isValidEmail(email)) errs.email = "Enter a valid email";
    if (!phone.trim()) errs.phone = "Phone is required";
    else if (!isValidPhone(phone)) errs.phone = "Enter a valid phone number";
    if (!location) errs.location = "Select a location";
    if (!tcpa) errs.tcpa = "You must consent to continue";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    const params = new URLSearchParams({
      name,
      email,
      phone,
      location,
      source: "lp-trt-v3",
      service: "trt",
    });
    const urls: Record<string, string> = {
      richmond: "https://menswellnesscenters.com/thank-you-richmond/",
      "newport-news":
        "https://menswellnesscenters.com/thank-you-newport-news/",
      "virginia-beach":
        "https://menswellnesscenters.com/thank-you-virginia-beach/",
    };
    window.location.href = `${urls[location]}?${params.toString()}`;
  };

  const baseInput: React.CSSProperties = {
    width: "100%",
    height: 50,
    background: "#F8F8FC",
    border: "1px solid #D6DAE6",
    borderRadius: 10,
    padding: "0 16px",
    fontSize: 15,
    color: "#0E1230",
    outline: "none",
    fontFamily: FONT_BODY,
    boxSizing: "border-box",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  const focusIn = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.currentTarget.style.borderColor = "#E8670A";
    e.currentTarget.style.boxShadow =
      "0 0 0 3px rgba(232,103,10,0.16)";
    e.currentTarget.style.background = "#fff";
  };
  const focusOut = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.currentTarget.style.borderColor = "#D6DAE6";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "#F8F8FC";
  };

  const FieldError = ({ msg }: { msg?: string }) =>
    msg ? (
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          color: "#D94444",
          marginTop: 4,
          textAlign: "left",
        }}
      >
        {msg}
      </p>
    ) : null;

  return (
    <section id="form" style={{ background: "#000033", padding: "80px 0" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        {/* Why today chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          {[
            "⚡ Same-day appointments",
            "🔬 On-site labs & results",
            "📋 Leave with a plan",
          ].map((chip) => (
            <span
              key={chip}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                background: "rgba(255,255,255,0.09)",
                borderRadius: 99,
                padding: "8px 16px",
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#fff",
          }}
        >
          Claim Your Free Consultation
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: "rgba(255,255,255,0.72)",
            maxWidth: 500,
            margin: "12px auto 0",
            lineHeight: 1.65,
          }}
        >
          Walk into any of our 3 Virginia centers. No commitment. No
          credit card. Leave knowing exactly where you stand.
        </p>

        {/* Stars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 14,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: "#D4A017", fontSize: 18 }}>
              ★
            </span>
          ))}
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              color: "rgba(255,255,255,0.70)",
            }}
          >
            200+ Reviews
          </span>
        </div>

        {/* Form card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: "36px 32px 28px",
            maxWidth: 460,
            margin: "28px auto 0",
            boxShadow: "0 16px 60px rgba(0,0,0,0.40)",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: "#000033",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            Book My Consultation
          </h3>

          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Full Name"
                aria-label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={focusIn}
                onBlur={focusOut}
                style={baseInput}
                autoComplete="name"
              />
              <FieldError msg={errors.name} />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={focusIn}
                onBlur={focusOut}
                style={baseInput}
                autoComplete="email"
              />
              <FieldError msg={errors.email} />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                aria-label="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={focusIn}
                onBlur={focusOut}
                style={baseInput}
                autoComplete="tel"
              />
              <FieldError msg={errors.phone} />
            </div>
            <div>
              <select
                aria-label="Preferred clinic location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={focusIn as React.FocusEventHandler<HTMLSelectElement>}
                onBlur={focusOut as React.FocusEventHandler<HTMLSelectElement>}
                style={{
                  ...baseInput,
                  color: location ? "#0E1230" : "#999",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: 42,
                }}
              >
                <option value="" disabled>
                  Select Location
                </option>
                {LOCATIONS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.name}, VA
                  </option>
                ))}
              </select>
              <FieldError msg={errors.location} />
            </div>

            {/* TCPA */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={tcpa}
                  onChange={(e) => setTcpa(e.target.checked)}
                  style={{
                    width: 16,
                    height: 16,
                    marginTop: 2,
                    flexShrink: 0,
                    cursor: "pointer",
                    accentColor: "#E8670A",
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 11,
                    color: "#777",
                    lineHeight: 1.6,
                  }}
                >
                  I consent to receive appointment and marketing texts
                  from Men's Wellness Centers. Msg frequency varies. Msg
                  & data rates may apply. Reply STOP to opt out or HELP
                  for help. Consent is not required to receive services.{" "}
                  <a
                    href="/privacy-policy"
                    style={{ color: "#000033" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              <FieldError msg={errors.tcpa} />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                height: 54,
                background: submitting ? "#aaa" : "#E8670A",
                color: "#fff",
                border: "none",
                borderRadius: 99,
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                cursor: submitting ? "default" : "pointer",
                transition: "background 0.15s",
                marginTop: 4,
              }}
              onMouseEnter={(e) => {
                if (!submitting)
                  e.currentTarget.style.background = "#C7560A";
              }}
              onMouseLeave={(e) => {
                if (!submitting)
                  e.currentTarget.style.background = "#E8670A";
              }}
            >
              {submitting ? "Submitting…" : "Claim My Consultation"}
            </button>
          </form>

          {/* Trust badge row */}
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22,
              paddingTop: 18,
              borderTop: "1px solid #F0F0F0",
            }}
          >
            <img
              src="/images/badges/hipaa.png"
              alt="HIPAA Compliant"
              style={{ height: 38, filter: "grayscale(1)", opacity: 0.6 }}
            />
            <img
              src="/images/badges/clia.png"
              alt="CLIA Certified"
              style={{ height: 38, filter: "grayscale(1)", opacity: 0.6 }}
            />
            <img
              src="/images/badges/legitscript.png"
              alt="LegitScript Certified"
              style={{ height: 38, filter: "grayscale(1)", opacity: 0.6 }}
            />
          </div>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 11,
              color: "#aaa",
              textAlign: "center",
              marginTop: 12,
            }}
          >
            HIPAA Compliant · No Spam · Response Within 1 Hour
          </p>
          <p style={{ textAlign: "center", marginTop: 8 }}>
            <a
              href={PHONE_HREF}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 700,
                color: "#000033",
                textDecoration: "none",
              }}
            >
              Or call: {PHONE}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ────────────────────────────────────────────────── */

const SiteFooter = () => (
  <footer
    style={{
      background: "#05061E",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "36px 20px",
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
        textAlign: "center",
      }}
      className="md:flex-row md:justify-between md:text-left"
    >
      <img
        src="/logos/Text_Logo_white.png"
        alt="Men's Wellness Centers"
        style={{ height: 24, opacity: 0.75 }}
      />
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          color: "rgba(255,255,255,0.35)",
          maxWidth: 480,
          lineHeight: 1.6,
        }}
      >
        © 2026 Men's Wellness Centers. Individual results vary.
        Testimonials do not guarantee outcomes. Not a substitute for
        medical advice. *Based on internal patient data; results may
        vary.
      </p>
      <div
        style={{
          display: "flex",
          gap: 20,
          fontFamily: FONT_BODY,
          fontSize: 12,
          color: "rgba(255,255,255,0.38)",
        }}
      >
        <a
          href="/privacy-policy"
          style={{ color: "inherit", textDecoration: "none" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.38)")
          }
        >
          Privacy
        </a>
        <a
          href="/terms-of-service"
          style={{ color: "inherit", textDecoration: "none" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.38)")
          }
        >
          Terms
        </a>
        <a
          href={PHONE_HREF}
          style={{ color: "inherit", textDecoration: "none" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.38)")
          }
        >
          {PHONE}
        </a>
      </div>
    </div>
  </footer>
);

/* ─── MOBILE STICKY CTA ─────────────────────────────────────── */

const MobileCTA = () => (
  <div
    className="md:hidden"
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 55,
      display: "flex",
      gap: 10,
      padding: "10px 14px",
      background: "#000033",
      borderTop: "1px solid rgba(255,255,255,0.09)",
    }}
  >
    <a
      href={PHONE_HREF}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        background: "rgba(255,255,255,0.09)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 99,
        height: 48,
        fontFamily: FONT_BODY,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "#fff",
        textDecoration: "none",
      }}
    >
      <Phone size={15} /> Call
    </a>
    <button
      onClick={smoothTo("form")}
      style={{
        flex: 2.5,
        background: "#E8670A",
        border: "none",
        borderRadius: 99,
        height: 48,
        fontFamily: FONT_BODY,
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Book My Consultation
    </button>
  </div>
);

/* ─── PAGE ROOT ─────────────────────────────────────────────── */

const TRTv3LandingPage = () => {
  useEffect(() => {
    document.title =
      "Physician-Led TRT in Virginia | Men's Wellness Centers";

    const setMeta = (
      selector: string,
      attr: string,
      value: string
    ) => {
      let el = document.querySelector(
        selector
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const isProperty = selector.includes("property=");
        const key = selector.match(/"([^"]+)"/)?.[1] ?? "";
        if (isProperty) el.setAttribute("property", key);
        else el.setAttribute("name", key);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta(
      'meta[name="description"]',
      "content",
      "Same-day testosterone replacement therapy at 3 Virginia clinics. On-site labs, face-to-face physician consultation, and a personalized plan — all in one visit."
    );
    setMeta(
      'meta[property="og:title"]',
      "content",
      "Physician-Led TRT in Virginia | Men's Wellness Centers"
    );
    setMeta('meta[property="og:type"]', "content", "website");
  }, []);

  return (
    /*
     * paddingTop = BANNER_H so the page content starts below the
     * fixed urgency banner. The header sits on top of that offset.
     * Body has a global padding-bottom:56px on mobile (from index.css)
     * which naturally clears the MobileCTA bar.
     */
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT_BODY,
      }}
    >
      <UrgencyBanner />
      <SiteHeader />
      <main style={{ flex: 1 }}>
        <Hero />
        <TrustBar />
        <ProblemSection />
        <WhyUs />
        <Results />
        <Pricing />
        <Pillars />
        <Locations />
        <FAQSection />
        <LeadForm />
      </main>
      <SiteFooter />
      <MobileCTA />
    </div>
  );
};

export default TRTv3LandingPage;
