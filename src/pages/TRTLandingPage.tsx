import { useEffect } from "react";
import { TRTHeader } from "@/components/landing/trt/TRTHeader";
import { TRTHero } from "@/components/landing/trt/TRTHero";
import { TRTTrustBar } from "@/components/landing/trt/TRTTrustBar";


import { TRTHowItWorks } from "@/components/landing/trt/TRTHowItWorks";
import { TRTSymptomToggle } from "@/components/landing/trt/TRTSymptomToggle";
import { TRTResults } from "@/components/landing/trt/TRTResults";
import { TRTManifesto } from "@/components/landing/trt/TRTManifesto";
import { TRTMarquee } from "@/components/landing/trt/TRTMarquee";
import { TRTPricingCTA } from "@/components/landing/trt/TRTPricingCTA";
import { TRTPillars } from "@/components/landing/trt/TRTPillars";
import { TRTFinalCTA } from "@/components/landing/trt/TRTFinalCTA";
import { TRTFooter } from "@/components/landing/trt/TRTFooter";
import { TRTMobileCTA } from "@/components/landing/trt/TRTMobileCTA";

const TRTLandingPage = () => {
  useEffect(() => {
    document.title = "TRT in Virginia | Testing | Men's Wellness Centers";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Physician-supervised testosterone replacement therapy at 3 Virginia locations. Testing, results reviewed in-visit. Walk in today.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <TRTHeader />
      <main className="flex-1">
        <TRTHero />
        <TRTTrustBar />
        
        
        <TRTHowItWorks />
        <TRTSymptomToggle />
        <TRTResults />
        <TRTManifesto />
        <TRTMarquee />
        <TRTPricingCTA />
        <TRTPillars />
        <TRTFinalCTA />
      </main>
      <TRTFooter />
      <TRTMobileCTA />
    </div>
  );
};

export default TRTLandingPage;
