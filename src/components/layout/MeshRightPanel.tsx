import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const days = [
  { label: "ПН", num: 21 },
  { label: "ВТ", num: 22 },
  { label: "СР", num: 23 },
  { label: "ЧТ", num: 24 },
  { label: "ПТ", num: 25 },
  { label: "СБ", num: 26 },
  { label: "ВС", num: 27, active: true },
];

export function MeshRightPanel() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeStr = `${hours}:${minutes}`;

  const weekdays = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  const dayName = weekdays[now.getDay()].charAt(0).toUpperCase() + weekdays[now.getDay()].slice(1);
  const dateStr = `${dayName}, ${now.getDate()} ${months[now.getMonth()]}`;

  return (
    <aside className="w-[280px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col">
      {/* Time widget */}
      <div
        className="relative mx-3 mt-3 rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 60%, #93c5fd 100%)",
          minHeight: "90px",
        }}
      >
        <div className="p-4">
          <div className="text-3xl font-bold text-blue-900">{timeStr}</div>
          <div className="text-sm text-blue-700/80 mt-0.5">{dateStr}</div>
        </div>
        {/* Decorative cat illustration (МЭШ mascot) */}
        <div
          className="absolute right-3 bottom-0 text-4xl"
          style={{ lineHeight: 1 }}
        >
          🐱
        </div>
      </div>

      {/* Mini calendar */}
      <div className="px-3 mt-4">
        <div className="flex items-center justify-between mb-2">
          <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-blue-600">
            Моё расписание
            <ChevronRight size={14} className="text-gray-400" />
          </button>
          <div className="flex gap-1">
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
              <ChevronLeft size={14} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <div key={day.num} className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] text-gray-400 font-medium">{day.label}</span>
              <div
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold cursor-pointer transition-colors",
                  day.active
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

      {/* No data placeholder */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-gray-400">Нет данных</p>
      </div>
    </aside>
  );
}
