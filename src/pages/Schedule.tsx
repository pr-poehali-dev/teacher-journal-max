import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const weekDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
const shortDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ"];

const schedule: Record<string, { time: string; subject: string; class: string; room: string; type?: string }[]> = {
  "ПН": [
    { time: "08:30–09:15", subject: "Математика", class: "3А", room: "Каб. 12", type: "lesson" },
    { time: "09:25–10:10", subject: "Математика", class: "4Б", room: "Каб. 12", type: "lesson" },
    { time: "10:20–11:05", subject: "Алгебра", class: "2А", room: "Каб. 12", type: "lesson" },
    { time: "12:00–12:45", subject: "Математика", class: "3С", room: "Каб. 15", type: "lesson" },
    { time: "13:30–14:15", subject: "Классный час", class: "4А", room: "Каб. 12", type: "class_hour" },
  ],
  "ВТ": [
    { time: "08:30–09:15", subject: "Алгебра", class: "2Б", room: "Каб. 12", type: "lesson" },
    { time: "10:20–11:05", subject: "Математика", class: "4В", room: "Каб. 18", type: "lesson" },
    { time: "11:15–12:00", subject: "Математика", class: "3Р", room: "Каб. 12", type: "lesson" },
    { time: "14:20–15:05", subject: "Факультатив", class: "4А", room: "Каб. 3", type: "elective" },
  ],
  "СР": [
    { time: "09:25–10:10", subject: "Математика", class: "2А", room: "Каб. 12", type: "lesson" },
    { time: "10:20–11:05", subject: "Математика", class: "3А", room: "Каб. 12", type: "lesson" },
    { time: "12:00–12:45", subject: "Алгебра", class: "4Р", room: "Каб. 12", type: "lesson" },
    { time: "13:30–14:15", subject: "Педсовет", class: "Учителя", room: "Актовый зал", type: "meeting" },
  ],
  "ЧТ": [
    { time: "08:30–09:15", subject: "Математика", class: "4Б", room: "Каб. 12", type: "lesson" },
    { time: "09:25–10:10", subject: "Математика", class: "2Б", room: "Каб. 12", type: "lesson" },
    { time: "11:15–12:00", subject: "Математика", class: "3С", room: "Каб. 12", type: "lesson" },
    { time: "13:30–14:15", subject: "Математика", class: "4В", room: "Каб. 12", type: "lesson" },
  ],
  "ПТ": [
    { time: "09:25–10:10", subject: "Алгебра", class: "2А", room: "Каб. 12", type: "lesson" },
    { time: "10:20–11:05", subject: "Математика", class: "3Р", room: "Каб. 12", type: "lesson" },
    { time: "11:15–12:00", subject: "Математика", class: "4А", room: "Каб. 12", type: "lesson" },
    { time: "14:20–15:05", subject: "Консультация", class: "4А, 4Б", room: "Каб. 12", type: "elective" },
  ],
};

const typeColors: Record<string, string> = {
  lesson: "border-l-blue-500 bg-blue-50",
  class_hour: "border-l-green-500 bg-green-50",
  elective: "border-l-purple-500 bg-purple-50",
  meeting: "border-l-orange-500 bg-orange-50",
};

const typeLabels: Record<string, string> = {
  lesson: "Урок",
  class_hour: "Классный час",
  elective: "Факультатив",
  meeting: "Совещание",
};

export default function Schedule() {
  const today = new Date();
  const todayDayIdx = today.getDay(); // 0=Sun
  const currentDayKey = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"][todayDayIdx];
  const defaultDay = Object.keys(schedule).includes(currentDayKey) ? currentDayKey : "ПН";
  const [selectedDay, setSelectedDay] = useState(defaultDay);

  const getWeekDates = () => {
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    return shortDays.map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.getDate();
    });
  };

  const weekDates = getWeekDates();
  const lessons = schedule[selectedDay] || [];
  const totalLessons = lessons.filter(l => l.type === "lesson").length;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl font-bold text-gray-800">Моё расписание</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={15} />
                <span>{totalLessons} уроков сегодня</span>
              </div>
            </div>

            {/* Week selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-gray-700">
                  Неделя {weekDates[0]}–{weekDates[4]} {["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"][today.getMonth()]}
                </span>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {shortDays.map((day, i) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      "flex flex-col items-center py-2 rounded-xl transition-colors",
                      selectedDay === day
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-50 text-gray-600"
                    )}
                  >
                    <span className="text-[11px] font-medium">{day}</span>
                    <span className={cn("text-lg font-bold", selectedDay === day ? "text-white" : "text-gray-800")}>
                      {weekDates[i]}
                    </span>
                    <span className={cn("text-[10px]", selectedDay === day ? "text-blue-100" : "text-gray-400")}>
                      {weekDays[i]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lessons for selected day */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="text-sm font-semibold text-gray-700">
                  {weekDays[shortDays.indexOf(selectedDay)]} — {lessons.length} записей
                </h2>
              </div>
              {lessons.length === 0 ? (
                <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
                  Нет уроков в этот день
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {lessons.map((lesson, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center gap-4 px-5 py-4 border-l-4 hover:bg-gray-50/50 transition-colors",
                        typeColors[lesson.type || "lesson"]
                      )}
                    >
                      <div className="w-28 flex-shrink-0">
                        <span className="text-sm font-semibold text-gray-700">{lesson.time}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-800">{lesson.subject}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
                            {typeLabels[lesson.type || "lesson"]}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Users size={11} />
                            {lesson.class}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <MapPin size={11} />
                            {lesson.room}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
          <MeshRightPanel />
        </div>
      </div>
    </div>
  );
}
