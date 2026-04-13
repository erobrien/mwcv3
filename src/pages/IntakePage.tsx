import { useEffect } from "react";
import GHLTRTHeader from "@/components/landing/ghl-trt/GHLTRTHeader";
import GHLTRTFooter from "@/components/landing/ghl-trt/GHLTRTFooter";

const IntakePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.src = "https://form.jotform.com/jsform/260688598543071";
    script.type = "text/javascript";
    script.async = true;
    document.getElementById("jotform-container")?.appendChild(script);
    return () => {
      const container = document.getElementById("jotform-container");
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <GHLTRTHeader />
      <main className="flex-1 pt-20" style={{ backgroundColor: "#f5f5f5" }}>
        <div id="jotform-container" className="max-w-[900px] mx-auto px-4 py-8" />
      </main>
      <GHLTRTFooter />
    </div>
  );
};

export default IntakePage;
