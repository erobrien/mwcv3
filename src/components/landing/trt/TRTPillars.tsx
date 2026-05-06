import { Stethoscope, TestTube2, ShieldCheck, Activity, type LucideIcon } from "lucide-react";

const pillars: { title: string; desc: string; Icon: LucideIcon }[] = [
  {
    title: "Licensed Providers",
    desc: "Licensed Virginia nurse practitioners and physicians. Not remote. Not an app. A real provider, every visit.",
    Icon: Stethoscope,
  },
  {
    title: "On-Site Labs",
    desc: "Blood draw and full panel done in our center. Results back before you walk out the door.",
    Icon: TestTube2,
  },
  {
    title: "Built For Men",
    desc: "A clinic built around men's health — designed around your schedule, your privacy, and your goals.",
    Icon: ShieldCheck,
  },
  {
    title: "Ongoing Monitoring",
    desc: "Regular check-ins, lab work, and protocol adjustments. We don't write a script and disappear.",
    Icon: Activity,
  },
];

export const TRTPillars = () => (
  <section className="py-16 md:py-24" style={{ background: "#000033" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <h2
        className="font-bold text-center mb-12"
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: "clamp(28px, 3.6vw, 40px)",
          color: "#FFFFFF",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}
      >
        Everything You Need To Get Your Health Back. Now.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-xl overflow-hidden text-center transition-all duration-300 px-5 pb-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div className="flex justify-center mt-8">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 96,
                  height: 96,
                  background: "#0A1A4A",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <p.Icon size={44} strokeWidth={1.5} color="#E8670A" aria-hidden="true" />
              </div>
            </div>
            <h3
              className="font-bold text-base uppercase mt-5 tracking-wide"
              style={{ fontFamily: "Oswald, sans-serif", color: "#FFFFFF", fontWeight: 700, letterSpacing: "0.04em" }}
            >
              {p.title}
            </h3>
            <p
              className="text-sm mt-2 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.70)", fontFamily: "Inter, sans-serif" }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
