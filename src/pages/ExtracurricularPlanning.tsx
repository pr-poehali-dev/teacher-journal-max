import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { Plus, ChevronRight, Clock, Users, CalendarDays, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: 1,
    title: "Математический кружок — апрель",
    group: "Математический кружок 4А",
    month: "Апрель 2026",
    lessonsPlanned: 8,
    lessonsDone: 3,
    nextLesson: "10 апр, 15:00",
    topics: [
      { title: "Олимпиадные задачи: арифметика", done: true },
      { title: "Логические задачи", done: true },
      { title: "Геометрия: нестандартные задачи", done: true },
      { title: "Задачи на составление уравнений", done: false },
      { title: "Работа с диаграммами и графиками", done: false },
      { title: "Пробная олимпиада", done: false },
      { title: "Разбор ошибок", done: false },
      { title: "Итоговое занятие", done: false },
    ],
  },
  {
    id: 2,
    title: "Шахматная секция — апрель",
    group: "Шахматный клуб",
    month: "Апрель 2026",
    lessonsPlanned: 6,
    lessonsDone: 2,
    nextLesson: "12 апр, 14:00",
    topics: [
      { title: "Эндшпиль: ладья против короля", done: true },
      { title: "Комбинации на связывание", done: true },
      { title: "Открытые линии и столбцы", done: false },
      { title: "Атака на короля", done: false },
      { title: "Партии великих шахматистов", done: false },
      { title: "Турнир", done: false },
    ],
  },
];

export default function ExtracurricularPlanning() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl font-bold text-gray-800">Планирование внеурочной деятельности</h1>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                <Plus size={15} />
                Новый план
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {plans.map((plan) => {
                const isExpanded = expandedId === plan.id;
                const doneCount = plan.topics.filter((t) => t.done).length;
                const progress = Math.round((doneCount / plan.topics.length) * 100);
                return (
                  <div key={plan.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Header */}
                    <div
                      className="px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : plan.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CalendarDays size={14} className="text-purple-500" />
                            <span className="text-xs text-gray-400">{plan.month}</span>
                          </div>
                          <h3 className="text-sm font-semibold text-gray-800 mb-1">{plan.title}</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Users size={11} />
                              {plan.group}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock size={11} />
                              Следующее: {plan.nextLesson}
                            </div>
                          </div>
                          {/* Progress */}
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>Проведено занятий: {plan.lessonsDone} из {plan.lessonsPlanned}</span>
                              <span>{progress}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-500 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <ChevronRight
                          size={14}
                          className={cn("text-gray-300 flex-shrink-0 transition-transform mt-1", isExpanded && "rotate-90")}
                        />
                      </div>
                    </div>

                    {/* Topics */}
                    {isExpanded && (
                      <div className="border-t border-gray-50">
                        <div className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Темы занятий
                        </div>
                        <div className="divide-y divide-gray-50">
                          {plan.topics.map((topic, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/50 transition-colors"
                            >
                              <span className="text-xs text-gray-400 w-5 text-right flex-shrink-0">{i + 1}</span>
                              {topic.done ? (
                                <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                              ) : (
                                <Circle size={16} className="text-gray-300 flex-shrink-0" />
                              )}
                              <span className={cn(
                                "text-sm",
                                topic.done ? "text-gray-400 line-through" : "text-gray-700"
                              )}>
                                {topic.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </main>
          <MeshRightPanel />
        </div>
      </div>
    </div>
  );
}
