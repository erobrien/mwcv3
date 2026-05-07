import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import mwcTeam from "@/assets/lp/mwc-team-scrubs.webp";

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const F_HEAD = "'Bebas Neue', sans-serif";
const F_BODY = "'Inter', system-ui, sans-serif";
const NAVY = "#000033";
const NAVY2 = "#2c3345";
const ORANGE = "#E8670A";
// const ORANGE_H = "#D06A1E";
const CREAM = "#F5F0EB";
const TEXT = "#666666";
const MUTED = "#888888";
const GREEN = "#2ECC71";
const WHITE = "#FFFFFF";

/* ─── REDIRECT MAP ──────────────────────────────────────────── */
const REDIRECT: Record<string, string> = {
  richmond: "https://menswellnesscenters.com/thank-you-richmond/?source=lp-go",
  "newport-news":
    "https://menswellnesscenters.com/thank-you-newport-news/?source=lp-go",
  "virginia-beach":
    "https://menswellnesscenters.com/thank-you-virginia-beach/?source=lp-go",
};

/* ─── MINI FORM ─────────────────────────────────────────────── */
const MiniForm = ({
  submitLabel = "GET STARTED",
  dark = true,
  id,
}: {
  submitLabel?: string;
  dark?: boolean;
  id?: string;
}) => {
  const [location, setLocation] = useState("");
  const [tcpa, setTcpa] = useState(false);
  const [error, setError] = useState("");
  const [locHovered, setLocHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      setError("Please select a location.");
      return;
    }
    if (!tcpa) {
      setError("Please agree to the consent to continue.");
      return;
    }
    setError("");
    window.location.href = REDIRECT[location];
  };

  const cardBg = dark ? NAVY2 : WHITE;
  const labelColor = dark ? "rgba(255,255,255,0.85)" : NAVY;
  const inputBg = dark ? "rgba(255,255,255,0.08)" : "#f5f5f5";
  const inputColor = dark ? WHITE : NAVY;
  const inputBorder = dark ? "1px solid rgba(255,255,255,0.18)" : `1px solid #D2D1D0`;
  const tcpaColor = dark ? "rgba(255,255,255,0.65)" : TEXT;

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      style={{
        background: cardBg,
        borderRadius: 16,
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Location select */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label
          style={{
            fontFamily: F_BODY,
            fontSize: 13,
            fontWeight: 600,
            color: labelColor,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Select Your Location
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setLocHovered(true)}
          onBlur={() => setLocHovered(false)}
          style={{
            background: locHovered ? (dark ? "rgba(255,255,255,0.14)" : "#eee") : inputBg,
            color: location ? inputColor : (dark ? "rgba(255,255,255,0.45)" : "#999"),
            border: inputBorder,
            borderRadius: 8,
            padding: "12px 14px",
            fontFamily: F_BODY,
            fontSize: 15,
            width: "100%",
            outline: "none",
            cursor: "pointer",
            transition: "background 0.2s",
            appearance: "auto",
          }}
        >
          <option value="" disabled>
            Choose a location…
          </option>
          <option value="richmond">Richmond, VA</option>
          <option value="newport-news">Newport News, VA</option>
          <option value="virginia-beach">Virginia Beach, VA</option>
        </select>
      </div>

      {/* TCPA */}
      <label
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={tcpa}
          onChange={(e) => setTcpa(e.target.checked)}
          style={{ marginTop: 2, accentColor: ORANGE, flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: F_BODY,
            fontSize: 11,
            color: tcpaColor,
            lineHeight: 1.5,
          }}
        >
          By submitting, I consent to receive calls, texts, and emails from
          Men's Wellness Centers at the number provided, including automated
          messages. Consent is not required to purchase. Msg & data rates may
          apply. Reply STOP to opt out.
        </span>
      </label>

      {/* Error */}
      {error && (
        <p
          style={{
            fontFamily: F_BODY,
            fontSize: 12,
            color: "#FF6B6B",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        style={{
          background: ORANGE,
          color: WHITE,
          border: "none",
          borderRadius: 8,
          height: 56,
          fontFamily: F_HEAD,
          fontSize: 18,
          letterSpacing: "0.06em",
          cursor: "pointer",
          width: "100%",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "#D06A1E")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = ORANGE)
        }
      >
        {submitLabel}
      </button>
    </form>
  );
};

/* ─── HERO TRUST BULLETS ────────────────────────────────────── */
const HeroBullets = () => {
  const items = [
    "Physician-supervised TRT at 3 Virginia centers",
    "On-site labs with same-day results",
    "Free testosterone testing and consultation",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
      {items.map((item) => (
        <div
          key={item}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: ORANGE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: WHITE,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            ✓
          </span>
          <span style={{ fontFamily: F_BODY, fontSize: 14, color: "rgba(255,255,255,0.80)" }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ─── FAQ DATA ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: "How much does treatment cost?",
    a: "Your initial consultation is free and includes a comprehensive physician-led evaluation with our licensed medical providers. This includes a review of your health history, discussion of your wellness goals, and appropriate laboratory testing. Based on your evaluation, your provider will discuss potential wellness options that may be suitable for your individual needs. Our programs are designed as all-inclusive annual plans with no hidden fees. HSA/FSA cards are accepted, and flexible payment options may be available.",
  },
  {
    q: "How quickly will I see results?",
    a: "Every patient responds differently. Some men notice changes in energy, mood, or focus earlier, while other effects may occur gradually as treatment is adjusted over time. Your physician will review your labs and health history during your consultation and discuss realistic expectations. Ongoing follow-ups allow your treatment plan to be optimized based on how your body responds.",
  },
  {
    q: "What should I expect during my consultation?",
    a: "During your consultation, our licensed medical providers will conduct a comprehensive evaluation that includes reviewing your medical history, discussing your health concerns, and ordering appropriate laboratory testing. Based on your evaluation results, your provider will discuss potential wellness options that may be appropriate for your individual circumstances. All care decisions are made collaboratively between you and your provider, with ongoing monitoring and follow-up to ensure your wellness plan remains safe and effective over time.",
  },
  {
    q: "Do you accept insurance?",
    a: "Men's health and hormone optimization services are typically not covered by most insurance plans. For that reason, Men's Wellness Centers offers transparent self-pay pricing, allowing patients to access care without insurance-related delays. HSA/FSA cards are accepted, and documentation can be provided if patients choose to submit claims independently.",
  },
  {
    q: "How do I schedule an appointment?",
    a: "Appointments can be scheduled online, by phone, or by submitting a consultation request through the website. Same-day appointments are often available at select locations. Initial visits typically last about one hour and include a medical evaluation and initial lab testing. If medically appropriate, many patients may begin treatment the same day.",
  },
  {
    q: "Who will be treating me?",
    a: "Care at Men's Wellness Centers is physician-led. Your care team works together to provide evaluation, treatment planning, and ongoing monitoring throughout your program. All treatment decisions are guided by licensed medical professionals experienced in men's health and hormone care.",
  },
  {
    q: "What's included in my treatment plan?",
    a: "Treatment programs are designed to provide comprehensive, ongoing care. Plans include prescribed medications, follow-up visits, ongoing lab monitoring, and treatment adjustments as needed. Routine monitoring and adjustments are included as part of your program, with no hidden fees or surprise costs.",
  },
  {
    q: "Do I need a referral from my primary care doctor?",
    a: "No referral is required. Patients can schedule directly with Men's Wellness Centers. If desired, documentation can be shared with your primary care provider so care can be coordinated.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Yes. Men's Wellness Centers is a HIPAA-compliant medical practice. All personal and medical information is handled in accordance with applicable privacy regulations and our Notice of Privacy Practices.",
  },
  {
    q: "What if treatment doesn't work for me?",
    a: "Treatment plans are individualized and adjusted over time based on your response. If progress is not meeting expectations, your physician will review your plan and make appropriate changes.",
  },
  {
    q: "Can I switch between locations?",
    a: "Yes. Medical records are accessible across all Men's Wellness Centers locations, and patients may visit any clinic that is most convenient.",
  },
  {
    q: "Which services are offered at each location?",
    a: "All Men's Wellness Centers locations offer men's health services, including hormone therapy, erectile dysfunction treatment, weight management programs, and ongoing medical monitoring. Availability of specific services may vary based on individual medical evaluation.",
  },
];

/* ─── OUTCOME CARDS ─────────────────────────────────────────── */
const OUTCOMES = [
  {
    title: "Increased Energy",
    subtitle: "Wake Up Ready",
    img: "https://assets.cdn.filesafe.space/Ghstz8eIsHWLeXek47dk/media/69b702f287f0f2773215a592.jpg",
  },
  {
    title: "Improved Mood & Focus",
    subtitle: "Think Clearer",
    img: "https://assets.cdn.filesafe.space/Ghstz8eIsHWLeXek47dk/media/69b704af260db8670f2249ad.jpg",
  },
  {
    title: "Enhanced Libido",
    subtitle: "Perform with Confidence",
    img: "https://assets.cdn.filesafe.space/Ghstz8eIsHWLeXek47dk/media/69b704c00c9f1e474115bc70.png",
  },
  {
    title: "Better Sleep",
    subtitle: "Rest & Recover",
    img: "https://assets.cdn.filesafe.space/Ghstz8eIsHWLeXek47dk/media/69b7051eeaf0810ae484e649.png",
  },
  {
    title: "Reduced Brain Fog",
    subtitle: "Sharpen Your Mind",
    img: "https://assets.cdn.filesafe.space/Ghstz8eIsHWLeXek47dk/media/69b70531ad02765d5a01cffb.jpg",
  },
  {
    title: "Stronger Muscle Tone",
    subtitle: "Build & Maintain",
    img: "https://assets.cdn.filesafe.space/Ghstz8eIsHWLeXek47dk/media/69b705350c9f1e2e3215cab8.jpg",
  },
];

/* ─── TESTIMONIALS ──────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "Six months on TRT and I finally feel like myself again. Energy is up, mood is stable, and I'm sleeping through the night for the first time in years.",
    name: "Mark B.",
    city: "Richmond, VA",
  },
  {
    quote:
      "The nursing staff here is top-notch. They walk you through everything, answer every question, and actually follow up after your visits. Never experienced that anywhere else.",
    name: "Howard B.",
    city: "Virginia Beach, VA",
  },
  {
    quote:
      "From the front desk to the physician, every person I've dealt with has been professional and genuinely helpful. You can tell they care about results, not just billing.",
    name: "Douglas H.",
    city: "Newport News, VA",
  },
  {
    quote:
      "Got my labs back in two days and started treatment the same week. No runaround, no waiting months. The team moves fast and knows what they're doing.",
    name: "James R.",
    city: "Richmond, VA",
  },
  {
    quote:
      "I feel stronger and more focused than I have in years. My wife says I'm a different person. Should've done this years ago.",
    name: "Steve P.",
    city: "Chesapeake, VA",
  },
  {
    quote:
      "I was hesitant about hormone therapy but the doctor laid everything out honestly. No pressure, just facts. Three months in and I wish I'd started sooner.",
    name: "David K.",
    city: "Norfolk, VA",
  },
];

/* ─── SCROLL HELPER ─────────────────────────────────────────── */
const scrollToForm = () => {
  const el = document.getElementById("hero-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */
const GoLandingPage = () => {
  return (
    <div
      style={{
        fontFamily: F_BODY,
        margin: 0,
        padding: 0,
        background: NAVY,
        overflowX: "hidden",
      }}
    >
      {/* ── 1. NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: NAVY,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <img
          src="/logos/Text_Logo_white.png"
          alt="Men's Wellness Centers"
          style={{ height: 32, objectFit: "contain" }}
        />

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a
            href="tel:+18663444955"
            style={{
              fontFamily: F_BODY,
              fontSize: 14,
              color: WHITE,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            (866) 344-4955
          </a>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontFamily: F_BODY,
                fontSize: 11,
                color: GREEN,
                fontWeight: 600,
              }}
            >
              ✓ LegitScript Certified
            </span>
            <span
              style={{
                fontFamily: F_BODY,
                fontSize: 11,
                color: GREEN,
                fontWeight: 600,
              }}
            >
              ✓ Google Healthcare Certified
            </span>
          </div>
        </div>
      </nav>

      {/* ── 2. HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          background: NAVY,
          padding: "64px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
          className="go-hero-grid"
        >
          {/* Left */}
          <div>
            <h1
              style={{
                fontFamily: F_HEAD,
                fontSize: "clamp(44px, 5vw, 64px)",
                color: WHITE,
                margin: "0 0 24px",
                lineHeight: 1.05,
                textTransform: "uppercase",
              }}
            >
              VIRGINIA'S MEN'S HEALTH CENTERS.
            </h1>

            {/* Bullet list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 32,
              }}
            >
              {[
                "TRT, ED treatment & weight loss at 3 Virginia clinics",
                "Same-day labs and results reviewed on-site",
                "Free consultation — no referral needed",
              ].map((item) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span
                    style={{
                      color: ORANGE,
                      fontFamily: F_HEAD,
                      fontSize: 20,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    —
                  </span>
                  <span
                    style={{
                      fontFamily: F_BODY,
                      fontSize: 16,
                      color: WHITE,
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={scrollToForm}
              style={{
                background: ORANGE,
                color: WHITE,
                border: "none",
                borderRadius: 8,
                padding: "16px 32px",
                fontFamily: F_HEAD,
                fontSize: 20,
                letterSpacing: "0.06em",
                cursor: "pointer",
                marginBottom: 24,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#D06A1E")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  ORANGE)
              }
            >
              Book Free Consultation
            </button>

            {/* Star rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontFamily: F_BODY,
                  fontSize: 15,
                  color: WHITE,
                  fontWeight: 700,
                }}
              >
                4.9
              </span>
              <span style={{ color: "#FFC107", fontSize: 16 }}>★★★★★</span>
              <span
                style={{ fontFamily: F_BODY, fontSize: 14, color: "rgba(255,255,255,0.70)" }}
              >
                200+ Reviews
              </span>
            </div>
          </div>

          {/* Right — form */}
          <div id="hero-form">
            <MiniForm submitLabel="GET STARTED" dark={true} />
            <HeroBullets />
          </div>
        </div>
      </section>

      {/* ── 3. STATS STRIP ──────────────────────────────────────── */}
      <section
        style={{
          background: NAVY2,
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            textAlign: "center",
          }}
          className="go-stats-grid"
        >
          {[
            { value: "10,000+", label: "Members Across Virginia" },
            { value: "10+", label: "Years of Experience" },
            { value: "Same-Day", label: "Appointments Available" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: F_HEAD,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  color: WHITE,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: F_BODY,
                  fontSize: 13,
                  color: MUTED,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. SYMPTOMS SECTION ─────────────────────────────────── */}
      <section style={{ background: NAVY, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 12,
              fontWeight: 700,
              color: ORANGE,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              margin: "0 0 8px",
            }}
          >
            TREATMENTS THAT GET RESULTS
          </p>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 4px",
            }}
          >
            Are You Experiencing
          </p>
          <h2
            style={{
              fontFamily: F_HEAD,
              fontSize: "clamp(36px, 4.5vw, 52px)",
              color: WHITE,
              margin: "0 0 20px",
              textTransform: "uppercase",
            }}
          >
            THESE SYMPTOMS?
          </h2>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: TEXT,
              maxWidth: 640,
              margin: "0 0 48px",
              lineHeight: 1.7,
            }}
          >
            We treat low testosterone, ED, and weight loss. Walk in, get tested,
            and start treatment the same day. Most men feel a real difference
            within weeks.
          </p>

          {/* 3×2 symptom cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              marginBottom: 40,
            }}
            className="go-symptom-grid"
          >
            {[
              {
                title: "Low Energy",
                desc: "Fatigue, brain fog, and feeling drained no matter how much rest you get.",
              },
              {
                title: "Decreased Libido",
                desc: "Low sex drive and performance issues that affect your confidence and relationships.",
              },
              {
                title: "Weight Gain",
                desc: "Unexplained weight gain, especially around the midsection, despite diet and exercise.",
              },
              {
                title: "Mood Swings",
                desc: "Irritability, anxiety, and emotional ups and downs that affect daily life.",
              },
              {
                title: "Poor Sleep",
                desc: "Trouble falling asleep, staying asleep, or waking up feeling unrested.",
              },
              {
                title: "Brain Fog",
                desc: "Difficulty concentrating, poor memory, and mental cloudiness that slows you down.",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: NAVY2,
                  borderRadius: 16,
                  padding: 24,
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div
                  style={{
                    fontFamily: F_HEAD,
                    fontSize: 24,
                    color: WHITE,
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontFamily: F_BODY,
                    fontSize: 15,
                    color: MUTED,
                    lineHeight: 1.6,
                  }}
                >
                  {card.desc}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={scrollToForm}
              style={{
                background: ORANGE,
                color: WHITE,
                border: "none",
                borderRadius: 8,
                padding: "16px 36px",
                fontFamily: F_HEAD,
                fontSize: 20,
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#D06A1E")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  ORANGE)
              }
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ─────────────────────────────────────── */}
      <section style={{ background: CREAM, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 14,
              color: MUTED,
              margin: "0 0 4px",
            }}
          >
            How It Works
          </p>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: TEXT,
              margin: "0 0 4px",
            }}
          >
            Our Straightforward
          </p>
          <h2
            style={{
              fontFamily: F_HEAD,
              fontSize: "clamp(36px, 4.5vw, 52px)",
              color: NAVY,
              margin: "0 0 12px",
              textTransform: "uppercase",
            }}
          >
            3-Step Process
          </h2>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: TEXT,
              margin: "0 0 48px",
            }}
          >
            Walk in. Get tested. Start treatment. Same day.
          </p>

          {/* 3 steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
              marginBottom: 40,
            }}
            className="go-steps-grid"
          >
            {[
              {
                num: "01",
                title: "Walk In, No Judgment",
                desc: "Book a private visit at any of our 3 Virginia centers. No crowded waiting rooms. No awkward conversations at a pharmacy counter.",
              },
              {
                num: "02",
                title: "Find the Cause",
                desc: "Your physician runs labs and reviews your full health history to identify what is actually causing the issue. Not a guess. A diagnosis.",
              },
              {
                num: "03",
                title: "Get What Works",
                desc: "Based on your results, your doctor prescribes treatment tailored to you. Oral medications, injectables, or combination therapy. Dispensed on-site, that day.",
              },
            ].map((step) => (
              <div key={step.num}>
                <div
                  style={{
                    fontFamily: F_HEAD,
                    fontSize: "clamp(48px, 5vw, 64px)",
                    color: ORANGE,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    fontFamily: F_HEAD,
                    fontSize: 28,
                    color: NAVY,
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontFamily: F_BODY,
                    fontSize: 16,
                    color: TEXT,
                    lineHeight: 1.65,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={scrollToForm}
              style={{
                background: ORANGE,
                color: WHITE,
                border: "none",
                borderRadius: 8,
                padding: "16px 36px",
                fontFamily: F_HEAD,
                fontSize: 20,
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#D06A1E")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  ORANGE)
              }
            >
              Start My Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. MWC DIFFERENCE ───────────────────────────────────── */}
      <section style={{ background: NAVY, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 12,
              fontWeight: 700,
              color: ORANGE,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              margin: "0 0 12px",
            }}
          >
            In-Person Only
          </p>
          <h2
            style={{
              fontFamily: F_HEAD,
              fontSize: "clamp(36px, 4.5vw, 52px)",
              color: WHITE,
              margin: "0 0 16px",
              textTransform: "uppercase",
            }}
          >
            The MWC Difference
          </h2>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: TEXT,
              maxWidth: 680,
              margin: "0 0 36px",
              lineHeight: 1.65,
            }}
          >
            All care is in-person at our Virginia centers in Richmond, Newport
            News, or Virginia Beach. Real care requires real medicine.
          </p>

          {/* Two-col bullets */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 40,
            }}
            className="go-diff-bullets"
          >
            {[
              "10,000+ members treated across 10 years of practice",
              "Comprehensive in-center testing with same-day results",
              "Your treatment is managed by a licensed physician from start to finish",
              "Long-term optimization focus, not quick fixes",
            ].map((item) => (
              <div
                key={item}
                style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    color: ORANGE,
                    fontSize: 18,
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: F_BODY,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.80)",
                    lineHeight: 1.6,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Team photo */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <img
              src={mwcTeam}
              alt="Men's Wellness Centers Virginia Medical Team"
              style={{
                width: "100%",
                maxWidth: 800,
                borderRadius: 16,
                objectFit: "cover",
                display: "block",
                margin: "0 auto 12px",
              }}
            />
            <p
              style={{
                fontFamily: F_BODY,
                fontSize: 14,
                color: MUTED,
                textAlign: "center",
                margin: 0,
              }}
            >
              Our Virginia Medical Team
            </p>
          </div>

          {/* 4 feature cards 2×2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
            className="go-diff-cards"
          >
            {[
              {
                title: "Real Doctor-Patient Relationship",
                desc: "Face-to-face with the same licensed physician every visit. Not a PA on a screen.",
              },
              {
                title: "Comprehensive Testing",
                desc: "On-site labs with same-day results. No waiting days for a phone call.",
              },
              {
                title: "Personalized Protocols",
                desc: "Your treatment plan is designed for your body, your symptoms, your goals.",
              },
              {
                title: "Ongoing Monitoring",
                desc: "We track your levels and health markers to help support the best possible outcomes.",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: NAVY2,
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: F_HEAD,
                    fontSize: 22,
                    color: WHITE,
                    marginBottom: 10,
                    textTransform: "uppercase",
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontFamily: F_BODY,
                    fontSize: 15,
                    color: MUTED,
                    lineHeight: 1.6,
                  }}
                >
                  {card.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. RESULTS / OUTCOMES ───────────────────────────────── */}
      <section style={{ background: CREAM, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 12,
              fontWeight: 700,
              color: ORANGE,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              margin: "0 0 4px",
            }}
          >
            Real Results
          </p>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: TEXT,
              margin: "0 0 4px",
            }}
          >
            What Members Report
          </p>
          <h2
            style={{
              fontFamily: F_HEAD,
              fontSize: "clamp(36px, 4.5vw, 52px)",
              color: NAVY,
              margin: "0 0 12px",
              textTransform: "uppercase",
            }}
          >
            FROM TREATMENT
          </h2>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 13,
              color: MUTED,
              margin: "0 0 40px",
            }}
          >
            Individual results vary. These reflect commonly reported member
            experiences.
          </p>

          {/* 3×2 outcome cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
            className="go-outcome-grid"
          >
            {OUTCOMES.map((card) => (
              <div
                key={card.title}
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  background: WHITE,
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div style={{ padding: 16 }}>
                  <div
                    style={{
                      fontFamily: F_HEAD,
                      fontSize: 22,
                      color: NAVY,
                      marginBottom: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontFamily: F_BODY,
                      fontSize: 14,
                      color: TEXT,
                    }}
                  >
                    {card.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. MIDPAGE CTA ──────────────────────────────────────── */}
      <section
        style={{
          background: NAVY,
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: F_HEAD,
              fontSize: "clamp(32px, 4.5vw, 52px)",
              color: WHITE,
              margin: "0 0 20px",
              textTransform: "uppercase",
            }}
          >
            You Know Something's Off. Let's Find Out Why.
          </h2>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 18,
              color: "rgba(255,255,255,0.80)",
              maxWidth: 560,
              margin: "0 auto 32px",
              lineHeight: 1.65,
            }}
          >
            This is not about vanity. It's about remaining who you've always
            been: driven, confident, and high-functioning.
          </p>
          <button
            onClick={scrollToForm}
            style={{
              background: ORANGE,
              color: WHITE,
              border: "none",
              borderRadius: 8,
              padding: "16px 40px",
              fontFamily: F_HEAD,
              fontSize: 22,
              letterSpacing: "0.06em",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "#D06A1E")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = ORANGE)
            }
          >
            Book My Appointment
          </button>
        </div>
      </section>

      {/* ── 9. TESTIMONIALS ─────────────────────────────────────── */}
      <section style={{ background: CREAM, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: TEXT,
              textAlign: "center",
              margin: "0 0 40px",
            }}
          >
            Real Members. Real Experiences.
          </p>

          {/* 3×2 testimonial cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
            className="go-testimonial-grid"
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{
                  background: WHITE,
                  borderRadius: 16,
                  padding: 24,
                  border: "1px solid #e0dbd5",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <blockquote
                  style={{
                    fontFamily: F_BODY,
                    fontSize: 16,
                    color: TEXT,
                    fontStyle: "italic",
                    margin: 0,
                    lineHeight: 1.65,
                  }}
                >
                  "{t.quote}"
                </blockquote>
                <div>
                  <div
                    style={{
                      fontFamily: F_BODY,
                      fontSize: 16,
                      fontWeight: 600,
                      color: NAVY,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: F_BODY,
                      fontSize: 14,
                      color: MUTED,
                    }}
                  >
                    {t.city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ─────────────────────────────────────────────── */}
      <section style={{ background: NAVY, padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 12,
              fontWeight: 700,
              color: ORANGE,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              textAlign: "center",
              margin: "0 0 4px",
            }}
          >
            Got Questions?
          </p>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: "rgba(255,255,255,0.65)",
              textAlign: "center",
              margin: "0 0 4px",
            }}
          >
            Frequently Asked
          </p>
          <h2
            style={{
              fontFamily: F_HEAD,
              fontSize: "clamp(36px, 4.5vw, 52px)",
              color: WHITE,
              textAlign: "center",
              margin: "0 0 40px",
              textTransform: "uppercase",
            }}
          >
            Questions
          </h2>

          {/* Accordion */}
          <Accordion type="single" collapsible style={{ width: "100%" }}>
            {FAQS.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <AccordionTrigger
                  style={{
                    fontFamily: F_HEAD,
                    fontSize: 20,
                    color: WHITE,
                    textAlign: "left",
                    padding: "16px 0",
                    background: "transparent",
                    border: "none",
                    textTransform: "uppercase",
                  }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  style={{
                    fontFamily: F_BODY,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.70)",
                    lineHeight: 1.7,
                    paddingBottom: 16,
                  }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── 11. FINAL CTA ───────────────────────────────────────── */}
      <section style={{ background: CREAM, padding: "64px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 14,
              color: MUTED,
              margin: "0 0 8px",
            }}
          >
            What to Expect
          </p>
          <h2
            style={{
              fontFamily: F_HEAD,
              fontSize: "clamp(32px, 4vw, 52px)",
              color: NAVY,
              margin: "0 0 16px",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            You've Read Enough. Let's Get Your Levels Checked.
          </h2>
          <p
            style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: TEXT,
              margin: "0 0 24px",
              lineHeight: 1.65,
            }}
          >
            This isn't about vanity. It's about getting back to being the man
            you've always been: sharp, confident, and performing at your level.
          </p>

          {/* 3 bullets */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 32,
            }}
          >
            {["No obligation", "Same-day appointments", "100% confidential"].map(
              (b) => (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: ORANGE, fontWeight: 700 }}>✓</span>
                  <span
                    style={{
                      fontFamily: F_BODY,
                      fontSize: 15,
                      color: NAVY,
                      fontWeight: 600,
                    }}
                  >
                    {b}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Location links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            {[
              {
                label: "Richmond, VA",
                href: "https://www.google.com/maps?q=Men%27s+Wellness+Centers+Richmond+VA",
              },
              {
                label: "Newport News, VA",
                href: "https://www.google.com/maps?q=Men%27s+Wellness+Centers+Newport+News+VA",
              },
              {
                label: "Virginia Beach, VA",
                href: "https://www.google.com/maps?q=Men%27s+Wellness+Centers+Virginia+Beach+VA",
              },
            ].map((loc) => (
              <a
                key={loc.label}
                href={loc.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: F_BODY,
                  fontSize: 14,
                  color: ORANGE,
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >
                📍 {loc.label}
              </a>
            ))}
          </div>

          {/* Final form */}
          <MiniForm
            id="final-form"
            submitLabel="GET STARTED"
            dark={false}
          />

          <div style={{ marginTop: 20 }}>
            <p
              style={{
                fontFamily: F_BODY,
                fontSize: 14,
                color: TEXT,
                margin: "0 0 4px",
              }}
            >
              Call – Live Schedulers Available Now
            </p>
            <p
              style={{
                fontFamily: F_BODY,
                fontSize: 14,
                color: TEXT,
                margin: 0,
              }}
            >
              Same &amp; Next-Day Appointment Availability
            </p>
          </div>
        </div>
      </section>

      {/* ── 12. FOOTER ──────────────────────────────────────────── */}
      <footer style={{ background: NAVY, padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Top row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 40,
              marginBottom: 40,
            }}
            className="go-footer-grid"
          >
            {/* Left — logo + tagline */}
            <div>
              <img
                src="/logos/Text_Logo_white.png"
                alt="Men's Wellness Centers"
                style={{ height: 32, marginBottom: 16, objectFit: "contain" }}
              />
              <p
                style={{
                  fontFamily: F_BODY,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.65,
                  maxWidth: 360,
                }}
              >
                Virginia's trusted men's health centers since 2015.
                Physician-supervised TRT at our Richmond, Newport News, and
                Virginia Beach locations.
              </p>
            </div>

            {/* Right — contact */}
            <div>
              <p
                style={{
                  fontFamily: F_HEAD,
                  fontSize: 18,
                  color: WHITE,
                  margin: "0 0 16px",
                  textTransform: "uppercase",
                }}
              >
                Contact Us
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {[
                  { label: "Richmond", num: "804-346-4636", href: "tel:+18043464636" },
                  { label: "Newport News", num: "757-806-6263", href: "tel:+17578066263" },
                  { label: "Virginia Beach", num: "757-806-6263", href: "tel:+17578066263" },
                ].map((loc) => (
                  <div
                    key={loc.label}
                    style={{
                      fontFamily: F_BODY,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    {loc.label}:{" "}
                    <a
                      href={loc.href}
                      style={{ color: WHITE, textDecoration: "none" }}
                    >
                      {loc.num}
                    </a>
                  </div>
                ))}
                <div
                  style={{
                    fontFamily: F_BODY,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  <a
                    href="mailto:info@menswellnesscenters.com"
                    style={{ color: WHITE, textDecoration: "none" }}
                  >
                    info@menswellnesscenters.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto 32px",
            }}
          >
            <p
              style={{
                fontFamily: F_BODY,
                fontSize: 12,
                color: "rgba(255,255,255,0.50)",
                lineHeight: 1.7,
                textAlign: "center",
              }}
            >
              The information presented on this website is provided for general
              informational purposes only and is not intended to constitute
              medical advice, diagnosis, or treatment. Men's Wellness Centers
              does not provide medical advice through this website. All content
              is informational in nature only. Men's Wellness Centers operates
              physical center locations only. Medical services are provided
              exclusively in person following an individualized evaluation and
              are rendered by licensed medical professionals exercising
              independent clinical judgment. Testimonials and reviews reflect
              individual experiences only and are not intended to represent
              typical outcomes.
            </p>
          </div>

          {/* Bottom row */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.10)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: F_BODY,
                fontSize: 13,
                color: "rgba(255,255,255,0.50)",
              }}
            >
              © 2026 Men's Wellness Centers. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: 20 }}>
              {[
                { label: "Safety Policy", href: "/prescribing-policy" },
                { label: "Terms", href: "/terms-of-service" },
                { label: "Privacy", href: "/privacy-policy" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: F_BODY,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.50)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = WHITE)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.50)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── 13. MOBILE STICKY CTA ───────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 65,
          background: NAVY,
          borderTop: "1px solid rgba(255,255,255,0.10)",
          padding: "10px 16px",
          display: "none", // controlled by CSS class below
        }}
        className="go-mobile-cta"
      >
        <button
          onClick={scrollToForm}
          style={{
            width: "100%",
            height: 56,
            background: ORANGE,
            color: WHITE,
            border: "none",
            borderRadius: 8,
            fontFamily: F_HEAD,
            fontSize: 20,
            letterSpacing: "0.06em",
            cursor: "pointer",
          }}
        >
          Book Free Consultation
        </button>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .go-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .go-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .go-symptom-grid {
            grid-template-columns: 1fr !important;
          }
          .go-steps-grid {
            grid-template-columns: 1fr !important;
          }
          .go-diff-bullets {
            grid-template-columns: 1fr !important;
          }
          .go-diff-cards {
            grid-template-columns: 1fr !important;
          }
          .go-outcome-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .go-testimonial-grid {
            grid-template-columns: 1fr !important;
          }
          .go-footer-grid {
            grid-template-columns: 1fr !important;
          }
          .go-mobile-cta {
            display: block !important;
          }
        }
        @media (max-width: 480px) {
          .go-outcome-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GoLandingPage;
