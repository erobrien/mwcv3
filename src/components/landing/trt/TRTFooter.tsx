import { Link } from "react-router-dom";

export const TRTFooter = () => (
  <footer
    className="py-10"
    style={{
      background: "#000033",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Col 1 */}
      <div>
        <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-7 w-auto" />
        <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
          Virginia's trusted men's health centers since 2015.
        </p>
      </div>

      {/* Col 2 */}
      <div>
        <p className="text-xs font-bold uppercase mb-3" style={{ color: "rgba(255,255,255,0.50)", letterSpacing: "0.1em" }}>
          The Small Print
        </p>
        <div className="space-y-2">
          <Link to="/privacy-policy" className="block text-xs transition-colors duration-200" style={{ color: "rgba(255,255,255,0.50)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.50)"; }}
          >Privacy Policy</Link>
          <Link to="/terms-of-service" className="block text-xs transition-colors duration-200" style={{ color: "rgba(255,255,255,0.50)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.50)"; }}
          >Terms of Service</Link>
        </div>
      </div>

      {/* Col 3 */}
      <div>
        <p className="text-xs font-bold uppercase mb-3" style={{ color: "rgba(255,255,255,0.50)", letterSpacing: "0.1em" }}>
          Contact
        </p>
        <a href="tel:8663444955" className="block font-bold text-base" style={{ color: "#FFFFFF" }}>
          866-344-4955
        </a>
        <a href="mailto:info@menswellnesscenters.com" className="block text-sm mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
          info@menswellnesscenters.com
        </a>
      </div>
    </div>

    <p className="text-xs text-center mt-8" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif" }}>
      © 2026 Men's Wellness Centers. All rights reserved.
    </p>
  </footer>
);
