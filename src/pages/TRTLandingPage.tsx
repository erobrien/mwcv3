import { useEffect } from "react";
import { TRTHeader } from "@/components/landing/trt/TRTHeader";
import { TRTHero } from "@/components/landing/trt/TRTHero";
import { TRTTrustBar } from "@/components/landing/trt/TRTTrustBar";
import { TRTHowItWorks } from "@/components/landing/trt/TRTHowItWorks";
import { TRTResults } from "@/components/landing/trt/TRTResults";
import { TRTManifesto } from "@/components/landing/trt/TRTManifesto";
import { TRTMarquee } from "@/components/landing/trt/TRTMarquee";
import { TRTPricingCTA } from "@/components/landing/trt/TRTPricingCTA";
import { TRTPillars } from "@/components/landing/trt/TRTPillars";
import { TRTFinalCTA } from "@/components/landing/trt/TRTFinalCTA";
import { TRTLocations } from "@/components/landing/trt/TRTLocations";
import { TRTFAQ } from "@/components/landing/trt/TRTFAQ";
import { TRTFooter } from "@/components/landing/trt/TRTFooter";
import { TRTMobileCTA } from "@/components/landing/trt/TRTMobileCTA";
import { TRTInlineLeadMobile } from "@/components/landing/trt/TRTInlineLeadMobile";
import { TRT_LOCATIONS } from "@/data/trt-locations";

const META = {
  title: "Physician-Led TRT in Virginia | Men's Wellness Centers",
  description:
    "In-person testosterone replacement therapy at 3 Virginia clinics. Same-day labs, face-to-face provider visit, personalized plan in one visit.",
  ogImage: "https://mwcv3.lovable.app/og/trt-lp.jpg",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": TRT_LOCATIONS.map((l) => ({
    "@type": "MedicalClinic",
    name: l.name,
    url: "https://menswellnesscenters.com/lp/testosterone",
    telephone: l.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: l.cityStateZip.split(",")[0].trim(),
      addressRegion: "VA",
      postalCode: l.cityStateZip.match(/\d{5}/)?.[0] ?? "",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
    medicalSpecialty: ["Endocrine", "Urologic"],
  })),
};

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
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

const TRTLandingPage = () => {
  useEffect(() => {
    document.title = META.title;
    setMeta('meta[name="description"]', "content", META.description);
    setMeta('meta[property="og:title"]', "content", META.title);
    setMeta('meta[property="og:description"]', "content", META.description);
    setMeta('meta[property="og:image"]', "content", META.ogImage);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[name="twitter:title"]', "content", META.title);
    setMeta('meta[name="twitter:description"]', "content", META.description);
    setMeta('meta[name="twitter:image"]', "content", META.ogImage);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "trt-lp-localbusiness";
    script.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);
    return () => {
      document.getElementById("trt-lp-localbusiness")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <TRTHeader />
      <main className="flex-1">
        <TRTHero />
        <TRTTrustBar />
        <TRTInlineLeadMobile />
        <TRTHowItWorks />
        <TRTManifesto />
        <TRTResults />
        <TRTMarquee />
        <TRTPricingCTA />
        <TRTPillars />
        <TRTLocations />
        <TRTFAQ />
        <TRTFinalCTA />
      </main>
      <TRTFooter />
      <TRTMobileCTA />
    </div>
  );
};

export default TRTLandingPage;
