import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { Plus, Users, Clock, ChevronRight, Box } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "Математика вокруг нас",
    class: "4А",
    description: "Исследовательский проект о применении математики в повседневной жизни.",
    participants: 6,
    deadline: "20 апр 2026",
    status: "active",
    progress: 65,
    members: ["Зайцева К.", "Орлов М.", "Горбунова А.", "Тихонов Р.", "Волков П.", "Алексеева Т."],
  },
  {
    id: 2,
    title: "Геометрия в архитектуре",
    class: "3А",
    description: "Творческий проект с изучением геометрических форм в зданиях Москвы.",
    participants: 4,
    deadline: "15 апр 2026",
    status: "active",
    progress: 80,
    members: ["Сидорова М.", "Белов А.", "Иванова А.", "Петров К."],
  },
  {
    id: 3,
    title: "Числа Фибоначчи в природе",
    class: "4Б",
    description: "Исследование последовательности Фибоначчи и её проявлений в природных объектах.",
    participants: 5,
    deadline: "30 апр 2026",
    status: "planned",
    progress: 20,
    members: ["Козлов Д.", "Новикова В.", "Лебедев И.", "Попова С.", "Морозов В."],
  },
  {
    id: 4,
    title: "История математики",
    class: "2А",
    description: "Мини-исследование об истории возникновения чисел и математических открытий.",
    participants: 3,
    deadline: "10 апр 2026",
    status: "completed",
    progress: 100,
    members: ["Иванова А.", "Смирнова О.", "Федорова Н."],
  },
];

const statusConfig = {
  active: { label: "В работе", color: "text-blue-600 bg-blue-50 border-blue-200" },
  planned: { label: "Планируется", color: "text-amber-600 bg-amber-50 border-amber-200" },
  completed: { label: "Завершён", color: "text-green-600 bg-green-50 border-green-200" },
};

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const activeCount = projects.filter((p) => p.status === "active").length;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-800">Проектная деятельность</h1>
                {activeCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold border border-blue-200">
                    {activeCount} активных
                  </span>
                )}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                <Plus size={15} />
                Новый проект
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {projects.map((project) => {
                const st = statusConfig[project.status as keyof typeof statusConfig];
                const isExpanded = expandedId === project.id;
                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {project.class}
                          </span>
                          <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded border font-medium",
                            st.color
                          )}>
                            {st.label}
                          </span>
                        </div>
                        <ChevronRight
                          size={14}
                          className={cn("text-gray-300 flex-shrink-0 transition-transform mt-0.5", isExpanded && "rotate-90")}
                        />
                      </div>

                      <h3 className="text-sm font-semibold text-gray-800 mb-1">{project.title}</h3>
                      <p className="text-xs text-gray-500 mb-3 leading-relaxed">{project.description}</p>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Прогресс</span>
                          <span className="font-medium text-gray-700">{project.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              project.progress === 100 ? "bg-green-500" : "bg-blue-500"
                            )}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Users size={11} />
                          {project.participants} участников
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={11} />
                          {project.deadline}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-50">
                          <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                            Участники
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.members.map((m, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
