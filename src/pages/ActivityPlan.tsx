import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { Plus, Star, CheckCircle2, Circle, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const quarters = ["I четверть", "II четверть", "III четверть", "IV четверть"];

const planItems: Record<string, {
  id: number;
  category: string;
  title: string;
  deadline: string;
  status: "done" | "progress" | "planned";
}[]> = {
  "I четверть": [
    { id: 1, category: "Учебная работа", title: "Составить календарно-тематическое планирование", deadline: "01 сен", status: "done" },
    { id: 2, category: "Воспитательная работа", title: "Провести классный час «Правила школы»", deadline: "10 сен", status: "done" },
    { id: 3, category: "Работа с родителями", title: "Организовать первое родительское собрание", deadline: "20 сен", status: "done" },
    { id: 4, category: "Самообразование", title: "Пройти курс по работе с МЭШ", deadline: "30 окт", status: "done" },
  ],
  "II четверть": [
    { id: 5, category: "Учебная работа", title: "Провести входную диагностическую работу", deadline: "10 ноя", status: "done" },
    { id: 6, category: "Воспитательная работа", title: "Организовать новогодний праздник для класса", deadline: "25 дек", status: "done" },
    { id: 7, category: "Работа с родителями", title: "Родительское собрание: итоги полугодия", deadline: "20 дек", status: "done" },
  ],
  "III четверть": [
    { id: 8, category: "Учебная работа", title: "Подготовить учеников к олимпиаде по математике", deadline: "01 мар", status: "done" },
    { id: 9, category: "Воспитательная работа", title: "Мероприятие ко Дню защитника Отечества", deadline: "22 фев", status: "done" },
    { id: 10, category: "Аттестация", title: "Подготовить документы для аттестации", deadline: "31 мар", status: "progress" },
  ],
  "IV четверть": [
    { id: 11, category: "Учебная работа", title: "Подготовить к итоговым контрольным работам", deadline: "15 мая", status: "planned" },
    { id: 12, category: "Воспитательная работа", title: "Последний звонок — организационная работа", deadline: "25 мая", status: "planned" },
    { id: 13, category: "Работа с родителями", title: "Итоговое родительское собрание", deadline: "20 мая", status: "planned" },
    { id: 14, category: "Самообразование", title: "Написать отчёт по самообразованию", deadline: "31 мая", status: "progress" },
    { id: 15, category: "Документация", title: "Сдать журналы и отчёты", deadline: "10 июн", status: "planned" },
  ],
};

const statusConfig = {
  done: { label: "Выполнено", icon: CheckCircle2, color: "text-green-500" },
  progress: { label: "В процессе", icon: Clock, color: "text-blue-500" },
  planned: { label: "Запланировано", icon: Circle, color: "text-gray-400" },
};

const categoryColors: Record<string, string> = {
  "Учебная работа": "bg-blue-100 text-blue-700",
  "Воспитательная работа": "bg-purple-100 text-purple-700",
  "Работа с родителями": "bg-green-100 text-green-700",
  "Самообразование": "bg-amber-100 text-amber-700",
  "Аттестация": "bg-red-100 text-red-600",
  "Документация": "bg-gray-100 text-gray-600",
};

export default function ActivityPlan() {
  const [activeQuarter, setActiveQuarter] = useState("IV четверть");

  const items = planItems[activeQuarter] || [];
  const doneCount = items.filter((i) => i.status === "done").length;
  const total = items.length;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl font-bold text-gray-800">План деятельности</h1>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                <Plus size={15} />
                Добавить пункт
              </button>
            </div>

            {/* Quarter selector */}
            <div className="flex gap-2 mb-4">
              {quarters.map((q) => (
                <button
                  key={q}
                  onClick={() => setActiveQuarter(q)}
                  className={cn(
                    "flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors border",
                    activeQuarter === q
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50"
                  )}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star size={15} className="text-amber-500" />
                  <span className="text-sm font-semibold text-gray-700">Выполнение плана</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{doneCount} / {total}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: total > 0 ? `${(doneCount / total) * 100}%` : "0%" }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1.5">
                {total > 0 ? Math.round((doneCount / total) * 100) : 0}% выполнено
              </div>
            </div>

            {/* Items list */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-50">
                {items.length === 0 ? (
                  <div className="py-16 text-center text-gray-400 text-sm">Нет пунктов плана</div>
                ) : (
                  items.map((item) => {
                    const st = statusConfig[item.status];
                    const StatusIcon = st.icon;
                    return (
                      <div key={item.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                        <StatusIcon size={18} className={cn("flex-shrink-0", st.color)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded font-medium",
                              categoryColors[item.category] || "bg-gray-100 text-gray-600"
                            )}>
                              {item.category}
                            </span>
                          </div>
                          <span className={cn(
                            "text-sm",
                            item.status === "done" ? "text-gray-400 line-through" : "text-gray-800 font-medium"
                          )}>
                            {item.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400">до {item.deadline}</span>
                          <ChevronRight size={13} className="text-gray-300" />
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
