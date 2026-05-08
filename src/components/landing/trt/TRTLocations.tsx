import { useState } from "react";
import { MapPin, Phone, Clock, ChevronDown } from "lucide-react";

const NAVY = "#122256";
const ORANGE = "#E8670A";
const ORANGE_HOVER = "#D45A00";

const locations = [
  {
    slug: "richmond-va",
    name: "Men's Wellness Centers, Richmond",
    city: "Glen Allen",
    address: "4050 Innslake Dr, Suite 360",
    cityStateZip: "Glen Allen, VA 23060",
    phone: "(804) 346-4636",
    phoneHref: "tel:8043464636",
    hours: "Mon–Sat 9:00 AM – 5:00 PM",
    driveTime: "5 min from I-64",
  },
  {
    slug: "newport-news-va",
    name: "Men's Wellness Centers, Newport News",
    city: "Newport News",
    address: "827 Diligence Drive, Suite 206",
    cityStateZip: "Newport News, VA 23606",
    phone: "(757) 806-6263",
    phoneHref: "tel:7578066263",
    hours: "Mon–Sat 9:00 AM – 5:00 PM",
    driveTime: "3 min from I-64, Exit 258A",
  },
  {
    slug: "virginia-beach-va",
    name: "Men's Wellness Centers, Virginia Beach",
    city: "Virginia Beach",
    address: "996 First Colonial Road",
    cityStateZip: "Virginia Beach, VA 23454",
    phone: "(757) 806-6263",
    phoneHref: "tel:7578066263",
    hours: "Mon–Sat 9:00 AM – 5:00 PM",
    driveTime: "5 min from I-264",
  },
];

export const TRTLocations = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const bookAt = (slug: string) => () => {
    const el = document.getElementById("booking") || document.getElementById("final-cta");
    el?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lp_trt_cta_click", { detail: { location: "locations", clinic: slug } }));
  };

  return (
    <section id="locations" style={{ background: "#F2F1EB" }}>
      <div className="max-w-[1200px] mx-auto px-6" style={{ paddingTop: "clamp(64px, 10vw, 120px)", paddingBottom: "clamp(64px, 10vw, 120px)" }}>
        <div
          className="uppercase mb-3 text-center"
          style={{ color: "#6B7F94", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em" }}
        >
          Find A Center
        </div>
        <h2 className="text-center" style={{ fontFamily: "'Bebas Neue', sans-serif", color: NAVY, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "0.02em", fontWeight: 400, textTransform: "uppercase" }}>
          3 Virginia Centers
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((l, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={l.slug} className="p-8 flex flex-col" style={{ border: "1px solid #E8E5E0", background: "#FFFFFF", borderRadius: 8, boxShadow: "0 2px 8px rgba(13,8,7,0.04)" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", color: NAVY, fontSize: 28, letterSpacing: "0.02em", fontWeight: 400, textTransform: "uppercase" }}>
                  {l.city}
                </div>
                <div className="text-xs mt-1 mb-3" style={{ color: "#6B7F94", fontFamily: "Inter, sans-serif" }}>{l.name}</div>
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase" style={{ color: ORANGE, fontFamily: "Inter, sans-serif", letterSpacing: "0.08em" }}>
                  <MapPin className="h-3.5 w-3.5" /> {l.driveTime}
                </div>

                {/* Mobile: collapsed by default */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="md:hidden flex items-center justify-between w-full text-sm font-semibold uppercase py-2 mb-2 cursor-pointer"
                  style={{ color: NAVY, fontFamily: "Inter, sans-serif", background: "none", border: "none", letterSpacing: "0.08em" }}
                >
                  <span>Address &amp; Hours</span>
                  <ChevronDown className="h-4 w-4 transition-transform" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} />
                </button>

                <div className={`space-y-2.5 text-sm ${isOpen ? "block" : "hidden"} md:block`} style={{ color: "#1A1A1A", fontFamily: "Inter, sans-serif" }}>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${l.name}, ${l.address}, ${l.cityStateZip}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:opacity-70 transition-opacity"
                    style={{ color: "#1A1A1A", textDecoration: "none" }}
                  >
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: ORANGE }} />
                    <div className="underline underline-offset-2">{l.address}<br />{l.cityStateZip}</div>
                  </a>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0" style={{ color: ORANGE }} />
                    <span>{l.hours}</span>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t flex flex-col gap-2" style={{ borderColor: "#E8E5E0" }}>
                  <a
                    href={l.phoneHref}
                    className="text-xs font-semibold uppercase text-center inline-flex items-center justify-center gap-2 transition-colors duration-200"
                    style={{ height: 48, color: NAVY, border: `1.5px solid ${NAVY}`, letterSpacing: "0.02em", fontFamily: "Inter, sans-serif", textDecoration: "none", borderRadius: 4, background: "transparent" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = "#FFFFFF"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = NAVY; }}
                  >
                    <Phone className="h-4 w-4" /> Call {l.phone}
                  </a>
                  <button
                    onClick={bookAt(l.slug)}
                    className="text-xs font-semibold uppercase text-center cursor-pointer inline-flex items-center justify-center transition-all duration-200"
                    style={{ height: 48, background: ORANGE, color: "#FFFFFF", letterSpacing: "0.02em", fontFamily: "Inter, sans-serif", border: "none", borderRadius: 4 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = ORANGE_HOVER;
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(232,103,10,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = ORANGE;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Book My Consult
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
