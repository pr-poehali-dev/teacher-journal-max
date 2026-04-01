import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { Search, ChevronRight, Plus, BookOpen, CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: 1,
    subject: "Математика",
    class: "3А",
    topic: "Умножение трёхзначных чисел",
    lesson: 47,
    date: "07 апр 2026",
    status: "done",
    goals: "Научить учащихся выполнять умножение трёхзначных чисел в столбик.",
    homework: "Задачник стр. 84, №4–7",
  },
  {
    id: 2,
    subject: "Математика",
    class: "4А",
    topic: "Деление с остатком",
    lesson: 51,
    date: "07 апр 2026",
    status: "done",
    goals: "Закрепить понятие деления с остатком, решение задач.",
    homework: "Рабочая тетрадь стр. 31",
  },
  {
    id: 3,
    subject: "Алгебра",
    class: "2А",
    topic: "Порядок действий в выражениях",
    lesson: 38,
    date: "08 апр 2026",
    status: "planned",
    goals: "Изучить правила порядка выполнения математических действий.",
    homework: "Учебник стр. 56, №1–5",
  },
  {
    id: 4,
    subject: "Математика",
    class: "3С",
    topic: "Задачи на движение",
    lesson: 49,
    date: "08 апр 2026",
    status: "planned",
    goals: "Решение задач на нахождение скорости, времени и расстояния.",
    homework: "Задачник стр. 91, №1–4",
  },
  {
    id: 5,
    subject: "Математика",
    class: "4Б",
    topic: "Объём прямоугольного параллелепипеда",
    lesson: 52,
    date: "09 апр 2026",
    status: "draft",
    goals: "Ввести понятие объёма, единицы измерения, формулу вычисления.",
    homework: "",
  },
  {
    id: 6,
    subject: "Алгебра",
    class: "2Б",
    topic: "Числовые выражения и их значения",
    lesson: 39,
    date: "09 апр 2026",
    status: "draft",
    goals: "",
    homework: "",
  },
];

const statusConfig = {
  done: { label: "Проведён", color: "text-green-600 bg-green-50 border-green-200", dot: "bg-green-500", icon: CheckCircle2 },
  planned: { label: "Запланирован", color: "text-blue-600 bg-blue-50 border-blue-200", dot: "bg-blue-500", icon: Clock },
  draft: { label: "Черновик", color: "text-gray-500 bg-gray-50 border-gray-200", dot: "bg-gray-400", icon: Circle },
};

export default function LessonPlanning() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("Все");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const classes = ["Все", ...Array.from(new Set(plans.map((p) => p.class)))];

  const filtered = plans.filter((p) => {
    const matchClass = selectedClass === "Все" || p.class === selectedClass;
    const matchSearch = p.topic.toLowerCase().includes(search.toLowerCase()) || p.subject.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  const doneCount = plans.filter((p) => p.status === "done").length;
  const plannedCount = plans.filter((p) => p.status === "planned").length;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl font-bold text-gray-800">Поурочное планирование</h1>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                <Plus size={15} />
                Новый план
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <BookOpen size={18} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{plans.length}</div>
                  <div className="text-xs text-gray-400">Всего планов</div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-green-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{doneCount}</div>
                  <div className="text-xs text-gray-400">Проведено</div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Clock size={18} className="text-amber-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{plannedCount}</div>
                  <div className="text-xs text-gray-400">Запланировано</div>
                </div>
              </div>
            </div>

            {/* Search + class filter */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
                <Search size={15} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Поиск по теме или предмету..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
                />
              </div>
              <div className="flex gap-2 items-center bg-white rounded-xl border border-gray-100 shadow-sm px-3">
                {classes.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-sm font-medium transition-colors",
                      selectedClass === cls
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Plans list */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <div className="py-16 text-center text-gray-400 text-sm">Планов не найдено</div>
                ) : (
                  filtered.map((plan) => {
                    const st = statusConfig[plan.status as keyof typeof statusConfig];
                    return (
                      <div
                        key={plan.id}
                        className="px-5 py-4 hover:bg-gray-50/50 cursor-pointer transition-colors"
                        onClick={() => setExpandedId(expandedId === plan.id ? null : plan.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-400">Урок {plan.lesson}</span>
                              <span className="text-xs text-gray-400">·</span>
                              <span className="text-xs text-gray-400">{plan.date}</span>
                              <span className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded border font-medium ml-1",
                                st.color
                              )}>
                                {st.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                {plan.class}
                              </span>
                              <span className="text-sm font-semibold text-gray-800">{plan.topic}</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">{plan.subject}</div>
                            {expandedId === plan.id && (
                              <div className="mt-3 space-y-2">
                                {plan.goals && (
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium text-gray-700">Цели урока: </span>
                                    {plan.goals}
                                  </div>
                                )}
                                {plan.homework && (
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium text-gray-700">Домашнее задание: </span>
                                    {plan.homework}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <ChevronRight
                            size={14}
                            className={cn(
                              "text-gray-300 flex-shrink-0 transition-transform",
                              expandedId === plan.id && "rotate-90"
                            )}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </main>
          <MeshRightPanel />
        </div>
      </div>
    </div>
  );
}
