import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { Search, CheckCircle2, Circle, Clock, Users, Plus, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const homeworks = [
  {
    id: 1,
    subject: "Математика",
    class: "3А",
    task: "Задачник стр. 84, №4–7 (умножение трёхзначных чисел)",
    assignedDate: "07 апр",
    dueDate: "09 апр",
    submittedCount: 18,
    totalCount: 24,
    status: "pending",
  },
  {
    id: 2,
    subject: "Алгебра",
    class: "2А",
    task: "Учебник стр. 56, №1–5 (порядок действий в выражениях)",
    assignedDate: "08 апр",
    dueDate: "10 апр",
    submittedCount: 12,
    totalCount: 22,
    status: "pending",
  },
  {
    id: 3,
    subject: "Математика",
    class: "4А",
    task: "Рабочая тетрадь стр. 31 (деление с остатком)",
    assignedDate: "07 апр",
    dueDate: "08 апр",
    submittedCount: 20,
    totalCount: 20,
    status: "checked",
  },
  {
    id: 4,
    subject: "Математика",
    class: "3С",
    task: "Задачник стр. 91, №1–4 (задачи на движение)",
    assignedDate: "08 апр",
    dueDate: "11 апр",
    submittedCount: 9,
    totalCount: 21,
    status: "pending",
  },
  {
    id: 5,
    subject: "Математика",
    class: "4Б",
    task: "Решение задач на повторение (стр. 78–79)",
    assignedDate: "05 апр",
    dueDate: "07 апр",
    submittedCount: 19,
    totalCount: 23,
    status: "checked",
  },
  {
    id: 6,
    subject: "Алгебра",
    class: "2Б",
    task: "Примеры по теме «Числовые выражения», вариант 2",
    assignedDate: "06 апр",
    dueDate: "09 апр",
    submittedCount: 7,
    totalCount: 20,
    status: "overdue",
  },
];

const statusConfig = {
  pending: { label: "На проверке", color: "text-amber-600 bg-amber-50 border-amber-200" },
  checked: { label: "Проверено", color: "text-green-600 bg-green-50 border-green-200" },
  overdue: { label: "Просрочено", color: "text-red-600 bg-red-50 border-red-200" },
};

export default function Homework() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Все");

  const filters = ["Все", "На проверке", "Проверено", "Просрочено"];
  const statusMap: Record<string, string> = {
    "На проверке": "pending",
    "Проверено": "checked",
    "Просрочено": "overdue",
  };

  const filtered = homeworks.filter((h) => {
    const matchFilter = filter === "Все" || h.status === statusMap[filter];
    const matchSearch = h.task.toLowerCase().includes(search.toLowerCase()) ||
      h.subject.toLowerCase().includes(search.toLowerCase()) ||
      h.class.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const pendingCount = homeworks.filter((h) => h.status === "pending").length;
  const overdueCount = homeworks.filter((h) => h.status === "overdue").length;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-800">Домашние задания</h1>
                {overdueCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold border border-red-200">
                    {overdueCount} просрочено
                  </span>
                )}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                <Plus size={15} />
                Задать ДЗ
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <BookOpen size={18} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{homeworks.length}</div>
                  <div className="text-xs text-gray-400">Всего заданий</div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Clock size={18} className="text-amber-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{pendingCount}</div>
                  <div className="text-xs text-gray-400">На проверке</div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-green-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">
                    {homeworks.filter((h) => h.status === "checked").length}
                  </div>
                  <div className="text-xs text-gray-400">Проверено</div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-3 flex items-center gap-3">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Поиск по заданию, предмету или классу..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-4">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    filter === f
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Homework list */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <div className="py-16 text-center text-gray-400 text-sm">Заданий не найдено</div>
                ) : (
                  filtered.map((hw) => {
                    const st = statusConfig[hw.status as keyof typeof statusConfig];
                    const submitPercent = Math.round((hw.submittedCount / hw.totalCount) * 100);
                    return (
                      <div key={hw.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                {hw.class}
                              </span>
                              <span className="text-xs text-gray-400">{hw.subject}</span>
                              <span className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded border font-medium",
                                st.color
                              )}>
                                {st.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800 font-medium mb-2">{hw.task}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Clock size={11} />
                                Задано: {hw.assignedDate}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Circle size={11} />
                                Сдать до: {hw.dueDate}
                              </div>
                            </div>
                            {/* Progress */}
                            <div className="mt-2.5">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Users size={11} />
                                  Сдали: {hw.submittedCount} из {hw.totalCount}
                                </div>
                                <span className="text-xs font-medium text-gray-600">{submitPercent}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    submitPercent === 100 ? "bg-green-500" : submitPercent >= 50 ? "bg-blue-500" : "bg-amber-400"
                                  )}
                                  style={{ width: `${submitPercent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <button className="flex-shrink-0 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                            Проверить
                          </button>
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
