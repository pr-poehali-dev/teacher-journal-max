import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { Calendar, MapPin, Users, Clock, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const months = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];

const events = [
  {
    id: 1,
    title: "Олимпиада по математике — отборочный тур",
    date: "5 апр 2026",
    time: "10:00",
    location: "Актовый зал",
    participants: "4А, 4Б, 4В",
    status: "upcoming",
    type: "olimpiad",
    description: "Отборочный тур школьной олимпиады по математике для учащихся 4-х классов. Победители пройдут на городской этап.",
  },
  {
    id: 2,
    title: "Субботник «Чистый двор»",
    date: "6 апр 2026",
    time: "09:00",
    location: "Школьный двор",
    participants: "Все классы",
    status: "upcoming",
    type: "school",
    description: "Общешкольный субботник по уборке пришкольной территории. Участие обязательно для всех классов.",
  },
  {
    id: 3,
    title: "Родительское собрание — 4А класс",
    date: "7 апр 2026",
    time: "18:30",
    location: "Каб. 12",
    participants: "Родители 4А",
    status: "upcoming",
    type: "meeting",
    description: "Итоги третьей четверти. Подготовка к итоговым контрольным. Вопросы летнего лагеря.",
  },
  {
    id: 4,
    title: "День открытых дверей",
    date: "12 апр 2026",
    time: "11:00",
    location: "Вся школа",
    participants: "Абитуриенты",
    status: "upcoming",
    type: "school",
    description: "Ежегодный день открытых дверей для будущих первоклассников и их родителей.",
  },
  {
    id: 5,
    title: "Педагогический совет",
    date: "2 апр 2026",
    time: "15:00",
    location: "Актовый зал",
    participants: "Педколлектив",
    status: "past",
    type: "meeting",
    description: "Подведение итогов третьей четверти.",
  },
  {
    id: 6,
    title: "Конкурс чтецов «Родное слово»",
    date: "28 мар 2026",
    time: "12:00",
    location: "Библиотека",
    participants: "2А, 2Б, 3А",
    status: "past",
    type: "culture",
    description: "Школьный конкурс по художественному чтению.",
  },
];

const typeColors: Record<string, string> = {
  olimpiad: "bg-yellow-100 text-yellow-700 border-yellow-200",
  school: "bg-green-100 text-green-700 border-green-200",
  meeting: "bg-blue-100 text-blue-700 border-blue-200",
  culture: "bg-purple-100 text-purple-700 border-purple-200",
};

const typeLabels: Record<string, string> = {
  olimpiad: "Олимпиада",
  school: "Школьное",
  meeting: "Совещание",
  culture: "Культура",
};

const typeDotColors: Record<string, string> = {
  olimpiad: "bg-yellow-400",
  school: "bg-green-400",
  meeting: "bg-blue-400",
  culture: "bg-purple-400",
};

export default function Events() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = events.filter((e) => {
    if (filter === "upcoming") return e.status === "upcoming";
    if (filter === "past") return e.status === "past";
    return true;
  });

  const upcomingCount = events.filter((e) => e.status === "upcoming").length;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-800">Мероприятия</h1>
                {upcomingCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold border border-amber-200">
                    {upcomingCount} предстоящих
                  </span>
                )}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                <Plus size={15} />
                Добавить
              </button>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-4">
              {[
                { key: "all", label: "Все" },
                { key: "upcoming", label: "Предстоящие" },
                { key: "past", label: "Прошедшие" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as "all" | "upcoming" | "past")}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    filter === tab.key
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-3 mb-4 flex items-center gap-4 flex-wrap">
              {Object.entries(typeLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className={cn("w-2.5 h-2.5 rounded-full", typeDotColors[key])}></span>
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>

            {/* Events list */}
            <div className="flex flex-col gap-3">
              {filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 text-center text-gray-400 text-sm">
                  Нет мероприятий
                </div>
              ) : (
                filtered.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer transition-shadow hover:shadow-md",
                      event.status === "past" && "opacity-70"
                    )}
                    onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
                  >
                    <div className="px-5 py-4">
                      <div className="flex items-start gap-4">
                        {/* Date block */}
                        <div className="w-12 text-center flex-shrink-0">
                          <div className="text-xs text-gray-400 font-medium">
                            {event.date.split(" ")[1]} {event.date.split(" ")[2]}
                          </div>
                          <div className="text-2xl font-bold text-gray-800 leading-tight">
                            {event.date.split(" ")[0]}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px self-stretch bg-gray-100 mx-1" />

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded border font-medium",
                              typeColors[event.type]
                            )}>
                              {typeLabels[event.type]}
                            </span>
                            {event.status === "upcoming" && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-600 font-medium border border-green-200">
                                Предстоящее
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-semibold text-gray-800 mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock size={11} />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <MapPin size={11} />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Users size={11} />
                              {event.participants}
                            </div>
                          </div>
                          {expandedId === event.id && (
                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">{event.description}</p>
                          )}
                        </div>

                        <ChevronRight
                          size={14}
                          className={cn(
                            "text-gray-300 flex-shrink-0 transition-transform mt-1",
                            expandedId === event.id && "rotate-90"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
          <MeshRightPanel />
        </div>
      </div>
    </div>
  );
}
