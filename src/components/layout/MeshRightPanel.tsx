import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const shortDayLabels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const months = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];
const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];
const weekdays = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];

// Upcoming lessons for the schedule preview
const todayLessons = [
  { time: "10:20", subject: "Алгебра", class: "2А" },
  { time: "12:00", subject: "Математика", class: "3С" },
  { time: "13:30", subject: "Классный час", class: "4А" },
];

export function MeshRightPanel() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);

  // Live clock — tick every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeStr = `${hours}:${minutes}:${seconds}`;

  const dayName = weekdays[now.getDay()].charAt(0).toUpperCase() + weekdays[now.getDay()].slice(1);
  const dateStr = `${dayName}, ${now.getDate()} ${months[now.getMonth()]}`;

  // Build week days for current week + offset
  const getWeekDays = () => {
    const today = new Date(now);
    // Get monday of current week
    const dayOfWeek = today.getDay(); // 0=Sun
    const diffToMonday = (dayOfWeek + 6) % 7; // days since monday
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday + weekOffset * 7);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return {
        label: shortDayLabels[i],
        num: d.getDate(),
        isToday: d.toDateString() === now.toDateString(),
        date: d,
      };
    });
  };

  const weekDays = getWeekDays();
  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];

  const getWeekLabel = () => {
    const startMonth = monthNames[weekStart.date.getMonth()];
    const endMonth = monthNames[weekEnd.date.getMonth()];
    if (weekStart.date.getMonth() === weekEnd.date.getMonth()) {
      return `${startMonth} ${weekStart.date.getFullYear()}`;
    }
    return `${startMonth} — ${endMonth}`;
  };

  return (
    <aside className="w-[280px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-y-auto">
      {/* Time widget */}
      <div
        className="relative mx-3 mt-3 rounded-xl overflow-hidden flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 60%, #93c5fd 100%)",
          minHeight: "90px",
        }}
      >
        <div className="p-4">
          <div className="text-3xl font-bold text-blue-900 tabular-nums">{timeStr}</div>
          <div className="text-sm text-blue-700/80 mt-0.5">{dateStr}</div>
        </div>
        <div
          className="absolute right-3 bottom-0 text-4xl"
          style={{ lineHeight: 1 }}
        >
          🐱
        </div>
      </div>

      {/* Mini calendar */}
      <div className="px-3 mt-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigate("/schedule")}
            className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Моё расписание
            <ChevronRight size={14} className="text-gray-400" />
          </button>
          <div className="flex gap-1">
            <button
              onClick={() => setWeekOffset((w) => w - 1)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setWeekOffset(0)}
              className="px-1.5 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 text-[10px] font-medium transition-colors"
              title="Сегодня"
            >
              сег.
            </button>
            <button
              onClick={() => setWeekOffset((w) => w + 1)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Month label */}
        <div className="text-[11px] text-gray-400 font-medium mb-2 text-center">{getWeekLabel()}</div>

        {/* Week days */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day.num + day.label} className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] text-gray-400 font-medium">{day.label}</span>
              <div
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold cursor-pointer transition-colors",
                  day.isToday
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {day.num}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-3 my-3 border-t border-gray-100" />

      {/* Today's upcoming lessons */}
      <div className="px-3 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={13} className="text-blue-500" />
          <span className="text-xs font-semibold text-gray-600">Ближайшие уроки</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {todayLessons.map((lesson, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => navigate("/schedule")}
            >
              <div className="text-xs font-bold text-blue-600 w-10 flex-shrink-0 tabular-nums">
                {lesson.time}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-700 truncate">{lesson.subject}</div>
                <div className="text-[10px] text-gray-400">{lesson.class}</div>
              </div>
              <BookOpen size={12} className="text-gray-300 flex-shrink-0" />
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/schedule")}
          className="mt-2 w-full text-xs text-blue-500 hover:text-blue-700 transition-colors py-1.5 rounded-lg hover:bg-blue-50 font-medium"
        >
          Всё расписание →
        </button>
      </div>

      {/* Divider */}
      <div className="mx-3 my-3 border-t border-gray-100" />

      {/* Quick stats */}
      <div className="px-3 pb-4">
        <div className="text-xs font-semibold text-gray-600 mb-2">Сегодня</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate("/homework")}
            className="flex flex-col items-center p-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <span className="text-lg font-bold text-amber-700">3</span>
            <span className="text-[10px] text-amber-600 text-center leading-tight">ДЗ на проверку</span>
          </button>
          <button
            onClick={() => navigate("/my-classes")}
            className="flex flex-col items-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <span className="text-lg font-bold text-blue-700">9</span>
            <span className="text-[10px] text-blue-600 text-center leading-tight">Классов</span>
          </button>
          <button
            onClick={() => navigate("/events")}
            className="flex flex-col items-center p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
          >
            <span className="text-lg font-bold text-green-700">4</span>
            <span className="text-[10px] text-green-600 text-center leading-tight">Мероприятия</span>
          </button>
          <button
            onClick={() => navigate("/news")}
            className="flex flex-col items-center p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
          >
            <span className="text-lg font-bold text-purple-700">2</span>
            <span className="text-[10px] text-purple-600 text-center leading-tight">Новых новостей</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
