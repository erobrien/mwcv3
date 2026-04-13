import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Lock, Stethoscope, Zap } from "lucide-react";

interface V2StepThreeProps {
  firstName: string;
  phone: string;
  email: string;
  locationLabel: string;
  onNext: (data: { selectedDate: string; selectedTime: string; smsReminder: boolean }) => void;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const noPressureCards = [
  { num: "1", title: "Quick health review", desc: "My physician reviews my lab work and health history." },
  { num: "2", title: "An honest conversation", desc: "No sales pitch. Just clinical recommendations based on my results." },
  { num: "3", title: "My decision", desc: "Start same day if I choose, or take time to decide. Zero pressure." },
];

const V2StepThree = ({ firstName, phone, email, locationLabel, onNext }: V2StepThreeProps) => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [smsReminder, setSmsReminder] = useState(true);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const days: { day: number; available: boolean }[] = [];
    for (let i = 0; i < firstDay; i++) days.push({ day: 0, available: false });
    for (let d = 1; d <= daysInMonth; d++) {
      const isPast = viewYear === today.getFullYear() && viewMonth === today.getMonth() && d < today.getDate();
      days.push({ day: d, available: !isPast });
    }
    return days;
  }, [viewMonth, viewYear, today]);

  const prevMonth = () => {
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) return;
    setViewMonth((m) => (m === 0 ? 11 : m - 1));
    if (viewMonth === 0) setViewYear((y) => y - 1);
    setSelectedDay(null);
    setSelectedTime("");
  };
  const nextMonth = () => {
    setViewMonth((m) => (m === 11 ? 0 : m + 1));
    if (viewMonth === 11) setViewYear((y) => y + 1);
    setSelectedDay(null);
    setSelectedTime("");
  };

  const selectedDateStr = selectedDay
    ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "";

  const isValid = selectedDay && selectedTime;

  return (
    <div className="flex flex-col items-center px-5 py-0 md:py-8">
      {/* Urgency banner */}
      <div className="mb-6 flex w-full max-w-[480px] items-center justify-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#34D399" }} />
        <span style={{ fontFamily: font, fontWeight: 500, fontSize: 13, color: "#B0ADA8", letterSpacing: "0.02em" }}>
          Same-day appointments available today
        </span>
      </div>

      <h1 className="text-center uppercase" style={{ fontFamily: headingFont, fontSize: "clamp(26px, 5.5vw, 38px)", color: "#fff", letterSpacing: "0.05em", marginBottom: 8 }}>
        My Consultation Is Ready
      </h1>
      <p className="mb-4 text-center" style={{ fontFamily: font, fontSize: 15, color: "#B0ADA8" }}>
        Select a time at our {locationLabel} center.
      </p>

      {/* Trust signal */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3" style={{ fontFamily: font, fontSize: 12, fontWeight: 500, color: "#B0ADA8" }}>
        <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Private & Discreet</span>
        <span className="flex items-center gap-1"><Stethoscope className="h-3.5 w-3.5" /> Physician-Led</span>
        <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> Results Same Day</span>
      </div>

      {/* White card container */}
      <div className="w-full max-w-[480px] rounded-2xl p-6 md:p-8" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 40px rgba(0,0,0,0.25)" }}>
        <div className="space-y-6">
          {/* Calendar card */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#F5F0EB" }}>
            {/* Month nav */}
            <div className="mb-4 flex items-center justify-between">
              <button type="button" onClick={prevMonth} className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ color: "#1A1A2E", cursor: "pointer", background: "none", border: "none" }} aria-label="Previous month">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span style={{ fontFamily: font, fontWeight: 600, fontSize: 16, color: "#1A1A2E" }}>
                {monthNames[viewMonth]} {viewYear}
              </span>
              <button type="button" onClick={nextMonth} className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ color: "#1A1A2E", cursor: "pointer", background: "none", border: "none" }} aria-label="Next month">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="mb-2 grid grid-cols-7 text-center">
              {dayNames.map((d) => (
                <span key={d} style={{ fontFamily: font, fontWeight: 500, fontSize: 12, color: "#6B7280" }}>{d}</span>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((cell, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={!cell.available || cell.day === 0}
                  onClick={() => { setSelectedDay(cell.day); setSelectedTime(""); }}
                  className="relative flex h-10 w-full flex-col items-center justify-center rounded-lg transition-all"
                  style={{
                    fontFamily: font, fontSize: 14, fontWeight: 400,
                    color: cell.day === 0 ? "transparent" : !cell.available ? "rgba(156,163,175,0.4)" : selectedDay === cell.day ? "#fff" : "#1A1A2E",
                    backgroundColor: selectedDay === cell.day ? "#E8670A" : "transparent",
                    cursor: cell.available && cell.day > 0 ? "pointer" : "default",
                    border: "none",
                  }}
                  aria-label={cell.day > 0 ? `Select ${monthNames[viewMonth]} ${cell.day}` : undefined}
                >
                  {cell.day > 0 && cell.day}
                  {cell.available && cell.day > 0 && selectedDay !== cell.day && (
                    <div className="absolute bottom-1 h-1 w-1 rounded-full" style={{ backgroundColor: "#E8670A" }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <div>
            <label className="mb-3 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 11, color: "#6B7280", letterSpacing: "0.08em" }}>
              Available Times
            </label>
            {!selectedDay ? (
              <p className="text-center italic" style={{ fontFamily: font, fontSize: 13, color: "#9CA3AF" }}>
                Select a date above to see available times
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className="rounded-3xl px-5 transition-all"
                    style={{
                      minHeight: 44, fontFamily: font, fontWeight: 500, fontSize: 14,
                      color: selectedTime === t ? "#fff" : "#1A1A2E", cursor: "pointer",
                      backgroundColor: selectedTime === t ? "#E8670A" : "#F5F0EB",
                      border: "none",
                    }}
                    aria-label={`Select time ${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Booking summary */}
          <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#F5F0EB" }}>
            <span style={{ fontFamily: font, fontSize: 13, color: "#6B7280" }}>
              Booking for: <strong style={{ color: "#1A1A2E" }}>{firstName || "—"}</strong> · {phone || "—"} · {email || "—"}
            </span>
          </div>

          {/* SMS reminder */}
          <div className="flex items-start gap-2">
            <input type="checkbox" checked={smsReminder} onChange={(e) => setSmsReminder(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0" style={{ accentColor: "#E8670A" }} id="sms-reminder-v2" aria-label="SMS reminder opt-in" />
            <div>
              <label htmlFor="sms-reminder-v2" style={{ fontFamily: font, fontSize: 13, color: "#6B7280" }}>Send me appointment reminders via text</label>
              <p style={{ fontFamily: font, fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>We'll send a confirmation and reminder. Reply STOP to opt out.</p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => isValid && onNext({ selectedDate: selectedDateStr, selectedTime, smsReminder })}
            disabled={!isValid}
            className="flex w-full items-center justify-center gap-2 rounded-xl uppercase transition-all"
            style={{
              height: 56, backgroundColor: "#E8670A", color: "#fff",
              fontFamily: font, fontWeight: 700, fontSize: 14, letterSpacing: "0.1em",
              cursor: isValid ? "pointer" : "default", opacity: isValid ? 1 : 0.4, border: "none",
            }}
            onMouseEnter={(e) => { if (isValid) e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,103,10,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            aria-label="Confirm my appointment"
          >
            Confirm My Appointment <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* No Pressure section - outside white card */}
      <div className="w-full max-w-[480px] pt-8">
        <h2 className="mb-4 text-center uppercase" style={{ fontFamily: headingFont, fontSize: 20, color: "#fff", letterSpacing: "0.05em" }}>
          No Pressure. Just Answers.
        </h2>
        <div className="space-y-3">
          {noPressureCards.map((card) => (
            <div
              key={card.num}
              className="flex gap-4 rounded-2xl p-4"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span style={{ fontFamily: headingFont, fontSize: 24, color: "#E8670A", lineHeight: 1 }}>{card.num}</span>
              <div>
                <p style={{ fontFamily: font, fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 4 }}>{card.title}</p>
                <p style={{ fontFamily: font, fontWeight: 400, fontSize: 13, color: "#B0ADA8" }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default V2StepThree;
