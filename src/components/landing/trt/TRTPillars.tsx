import imgDoctor from "@/assets/lp/provider-headshot.jpg";
import imgLobby from "@/assets/lp/onsite-labs-centrifuge.jpg";
import imgGymConfident from "@/assets/lp/man-gym-confident.jpeg";
import imgTeam from "@/assets/lp/mwc-team.webp";

const NAVY = "#122256";

const pillars = [
  {
    title: "LICENSED PROVIDERS",
    desc: "Licensed Virginia physicians and nurse practitioners. A real provider, every visit.",
    image: imgDoctor,
  },
  {
    title: "ON-SITE LABS",
    desc: "Full labs done in-center, with results back before you walk out.",
    image: imgLobby,
  },
  {
    title: "BUILT FOR MEN",
    desc: "TRT, ED, and weight loss is all we do. Not a side service at a general practice.",
    image: imgGymConfident,
  },
  {
    title: "ONGOING MONITORING",
    desc: "Regular check-ins, labs, and protocol adjustments. We don't write a script and disappear.",
    image: imgTeam,
  },
];

export const TRTPillars = () => (
  <section style={{ background: "#FFFFFF", paddingTop: "clamp(64px, 10vw, 120px)", paddingBottom: "clamp(64px, 10vw, 120px)" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <div
        className="uppercase mb-3 text-center"
        style={{ color: "#6B7F94", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em" }}
      >
        Under One Roof
      </div>
      <h2
        className="text-center mb-12"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(32px, 4.5vw, 48px)",
          color: NAVY,
          fontWeight: 400,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          lineHeight: 1.1,
        }}
      >
        Everything You Need For TRT, ED,<br />
        And Weight Loss.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="overflow-hidden text-center transition-all duration-300"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E5E0",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(13,8,7,0.04)",
              padding: "24px 16px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,8,7,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,8,7,0.04)";
            }}
          >
            <div className="flex justify-center">
              <img
                src={p.image}
                alt={p.title}
                className="w-[140px] h-[140px] rounded-full object-cover"
                style={{ border: "3px solid #F2F1EB" }}
                loading="lazy"
              />
            </div>
            <h3
              className="text-base uppercase mt-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: NAVY, fontWeight: 400, fontSize: 20, letterSpacing: "0.02em" }}
            >
              {p.title}
            </h3>
            <p
              className="text-sm px-3 pb-2 mt-2"
              style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif", lineHeight: 1.65 }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
