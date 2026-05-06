import { MapPin, Phone, Clock } from "lucide-react";
import { TRT_LOCATIONS } from "@/data/trt-locations";

export const TRTLocations = () => {
  const bookAt = (slug: string) => () => {
    const el = document.getElementById("booking") || document.getElementById("final-cta");
    el?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lp_trt_cta_click", { detail: { location: "locations", clinic: slug } }));
  };

  return (
    <section id="locations" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <h2
          className="font-bold text-center"
          style={{
            fontFamily: "Oswald, sans-serif",
            color: "#000033",
            fontSize: "clamp(28px, 3.6vw, 40px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          3 Virginia Clinics
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRT_LOCATIONS.map((l) => (
            <div key={l.slug} className="rounded-2xl p-6 flex flex-col" style={{ border: "1px solid #E5E5EA", background: "#FFFFFF" }}>
              <div className="font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: 22, letterSpacing: "0.02em" }}>
                {l.city}
              </div>
              <div className="text-xs mt-1 mb-4" style={{ color: "#5A6079", fontFamily: "Inter, sans-serif" }}>{l.name}</div>

              <div className="space-y-2.5 text-sm flex-1" style={{ color: "#0E1230", fontFamily: "Inter, sans-serif" }}>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "#E8670A" }} aria-hidden="true" />
                  <div>{l.address}<br />{l.cityStateZip}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0" style={{ color: "#E8670A" }} aria-hidden="true" />
                  <span>{l.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "#E8670A" }} aria-hidden="true" />
                  <a href={l.phoneHref} className="underline underline-offset-2">{l.phone}</a>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t grid grid-cols-2 gap-2" style={{ borderColor: "#E5E5EA" }}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${l.name}, ${l.address}, ${l.cityStateZip}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase text-center rounded-full inline-flex items-center justify-center"
                  style={{ height: 44, color: "#000033", border: "1.5px solid #000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
                >
                  Get Directions
                </a>
                <button
                  onClick={bookAt(l.slug)}
                  className="text-xs font-bold uppercase text-center rounded-full cursor-pointer inline-flex items-center justify-center"
                  style={{ height: 44, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
                >
                  Book Here
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
