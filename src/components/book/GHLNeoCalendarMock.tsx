import { useState } from "react";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";

interface Props {
  onConfirm?: (slot: string) => void;
  locationLabel?: string;
}

const MONTH_LABEL = "May 2026";
// May 2026: May 1 = Friday. Build a 5-week grid starting Sunday Apr 26.
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const DAYS: { d: number; outside?: boolean; disabled?: boolean }[] = [
  { d: 26, outside: true, disabled: true }, { d: 27, outside: true, disabled: true },
  { d: 28, outside: true, disabled: true }, { d: 29, outside: true, disabled: true },
  { d: 30, outside: true, disabled: true }, { d: 1, disabled: true }, { d: 2, disabled: true },
  { d: 3, disabled: true }, { d: 4, disabled: true }, { d: 5, disabled: true },
  { d: 6, disabled: true }, { d: 7, disabled: true }, { d: 8, disabled: true },
  { d: 9, disabled: true },
  { d: 10, disabled: true }, { d: 11 }, { d: 12 }, { d: 13 }, { d: 14 }, { d: 15 }, { d: 16, disabled: true },
  { d: 17, disabled: true }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }, { d: 23, disabled: true },
  { d: 24, disabled: true }, { d: 25, disabled: true }, { d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }, { d: 30, disabled: true },
];

const TIMES_BY_DAY: Record<number, string[]> = {
  11: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"],
  12: ["9:30 AM", "11:00 AM", "1:30 PM", "3:00 PM"],
  13: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "4:30 PM"],
  14: ["9:00 AM", "10:30 AM", "12:00 PM", "2:30 PM"],
  15: ["9:30 AM", "11:00 AM", "1:00 PM", "3:00 PM", "4:30 PM"],
};

const DEFAULT_TIMES = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

const GHLNeoCalendarMock = ({ onConfirm, locationLabel }: Props) => {
  const [selectedDay, setSelectedDay] = useState<number>(12);
  const [selectedTime, setSelectedTime] = useState<string>("10:30 AM");

  const times = TIMES_BY_DAY[selectedDay] || DEFAULT_TIMES;

  const handleConfirm = () => {
    const label = `Tuesday, May ${selectedDay} at ${selectedTime}`;
    onConfirm?.(label);
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#0B1029",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 md:px-6 md:py-5"
        style={{
          borderBottom: "1px solid #E5E7EB",
          background: "#FAFBFC",
        }}
      >
        <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>
          Men's Wellness Centers
        </div>
        <div className="text-lg md:text-[22px]" style={{ fontWeight: 700, color: "#0B1029", marginBottom: 2 }}>
          New Patient Consultation
        </div>
        <div className="text-sm md:text-[15px]" style={{ color: "#6B7280" }}>
          30 min · In-person {locationLabel ? `· ${locationLabel}` : ""}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
        <div className="md:grid md:grid-cols-[1.4fr_1fr]" style={{ display: "grid" }}>
          {/* Calendar */}
          <div style={{ padding: 20, borderRight: "1px solid #E5E7EB" }}>
            {/* Month nav */}
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <button
                type="button"
                aria-label="Previous month"
                style={{
                  width: 36, height: 36, borderRadius: 8, border: "1px solid #E5E7EB",
                  background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                }}
              >
                <ChevronLeft size={18} color="#0B1029" />
              </button>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0B1029" }}>{MONTH_LABEL}</div>
              <button
                type="button"
                aria-label="Next month"
                style={{
                  width: 36, height: 36, borderRadius: 8, border: "1px solid #E5E7EB",
                  background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                }}
              >
                <ChevronRight size={18} color="#0B1029" />
              </button>
            </div>

            {/* Weekday header */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
              {WEEKDAYS.map((w) => (
                <div key={w} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.05em" }}>
                  {w}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {DAYS.map((day, i) => {
                const isSelected = !day.disabled && !day.outside && day.d === selectedDay;
                const isAvailable = !day.disabled && !day.outside;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={day.disabled || day.outside}
                    onClick={() => {
                      setSelectedDay(day.d);
                      setSelectedTime((TIMES_BY_DAY[day.d] || DEFAULT_TIMES)[0]);
                    }}
                    style={{
                      aspectRatio: "1 / 1",
                      borderRadius: 999,
                      fontSize: 15,
                      fontWeight: isSelected ? 700 : 500,
                      border: 0,
                      background: isSelected ? "#0B1029" : isAvailable ? "#EEF1F6" : "transparent",
                      color: isSelected ? "#FFFFFF" : day.outside || day.disabled ? "#D1D5DB" : "#0B1029",
                      cursor: isAvailable ? "pointer" : "default",
                      transition: "background 120ms ease",
                    }}
                  >
                    {day.d}
                  </button>
                );
              })}
            </div>

            {/* Timezone */}
            <div className="flex items-center gap-2" style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #F3F4F6", fontSize: 13, color: "#6B7280" }}>
              <Globe size={14} />
              <span>Eastern time — US & Canada (10:30am)</span>
            </div>
          </div>

          {/* Time slots */}
          <div style={{ padding: 20, background: "#FAFBFC" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1029", marginBottom: 14 }}>
              Tuesday, May {selectedDay}
            </div>
            <div className="flex flex-col gap-2" style={{ maxHeight: 360, overflowY: "auto", paddingRight: 4 }}>
              {times.map((t) => {
                const active = t === selectedTime;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 8,
                      border: active ? "2px solid #0B1029" : "1px solid #D1D5DB",
                      background: active ? "#0B1029" : "#FFFFFF",
                      color: active ? "#FFFFFF" : "#0B1029",
                      fontSize: 15,
                      fontWeight: 600,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Confirm */}
      <div style={{ padding: 20, borderTop: "1px solid #E5E7EB", background: "#FFFFFF" }}>
        <button
          type="button"
          onClick={handleConfirm}
          style={{
            width: "100%",
            minHeight: 56,
            background: "#E8670A",
            color: "#FFFFFF",
            border: 0,
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(232,103,10,0.35)",
          }}
        >
          Confirm {selectedTime}
        </button>
        <div style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", marginTop: 10 }}>
          Powered by LeadConnector
        </div>
      </div>
    </div>
  );
};

export default GHLNeoCalendarMock;
