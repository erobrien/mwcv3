import imgManifesto from "@/assets/lp/man-athletic-smiling.jpeg";

export const TRTManifesto = () => {
  const stats = [
    { num: "10,000+", label: "MEN TREATED" },
    { num: "Since 2015", label: "SERVING VIRGINIA" },
    { num: "4.9★", label: "AVERAGE RATING" },
  ];

  return (
    <section className="py-10 md:py-16" style={{ background: "#000033" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left: copy (mobile second) */}
        <div className="order-2 md:order-1">
          <h2
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#FFFFFF",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            COMMON SIGNS MEN<br />
            ASK US ABOUT.
          </h2>

          <p
            className="text-base mt-4 leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.80)", fontFamily: "Inter, sans-serif", fontSize: 16 }}
          >
            Many men in their 40s, 50s, and beyond tell us the same story. The energy, focus, and drive they used to have just are not there. Their doctor says their labs are "normal," but they know something is off.
          </p>

          <ul className="mt-6 space-y-2 text-base" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif", fontSize: 16 }}>
            <li>• Persistent fatigue.</li>
            <li>• Loss of drive and motivation.</li>
            <li>• Difficulty focusing.</li>
            <li>• Stubborn belly fat and muscle loss.</li>
            <li>• "Normal" labs that do not match how you feel.</li>
          </ul>

          <p className="mt-6 text-base leading-[1.6]" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif", fontSize: 16 }}>
            Sound familiar? A Virginia physician can review your labs and give you real answers.
          </p>

          <button
            onClick={() => document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-6 inline-flex items-center justify-center rounded-full px-8 font-bold uppercase cursor-pointer border-none"
            style={{ height: 56, minHeight: 56, background: "#E8670A", color: "#FFFFFF", fontSize: 15, letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
          >
            Book My Consult
          </button>

          <div className="flex gap-8 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="font-bold"
                  style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(24px, 3vw, 32px)", color: "#FFFFFF", fontWeight: 700 }}
                >
                  {s.num}
                </span>
                <span
                  className="text-xs uppercase mt-1"
                  style={{ color: "rgba(255,255,255,0.50)", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-8 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="font-bold"
                  style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(24px, 3vw, 32px)", color: "#FFFFFF", fontWeight: 700 }}
                >
                  {s.num}
                </span>
                <span
                  className="text-xs uppercase mt-1"
                  style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image (mobile first) */}
        <div className="order-1 md:order-2">
          <img
            src={imgManifesto}
            alt="Confident man after treatment"
            className="rounded-2xl object-cover w-full aspect-[4/3] md:aspect-auto md:h-[400px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
