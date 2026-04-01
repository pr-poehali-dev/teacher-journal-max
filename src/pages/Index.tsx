import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { ChevronDown, ChevronUp, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const classes = ["2А", "2Б", "3А", "3Р", "3С", "4А", "4Б", "4В", "4Р"];

const journalItems = [
  { subject: "Английский язык", note: "дата урока неизвестна" },
  { subject: "Английский язык", note: "дата урока неизвестна" },
  { subject: "Изобразительное искусство", note: "дата урока неизвестна" },
  { subject: "Окружающий мир", note: "дата урока неизвестна" },
  { subject: "Технология", note: "дата урока неизвестна" },
];

function WorkdeskCard({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
      <div
        className={cn(
          "flex items-center justify-between px-5 py-4",
          collapsible && "cursor-pointer select-none hover:bg-gray-50 transition-colors"
        )}
        onClick={() => collapsible && setOpen(!open)}
      >
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        {collapsible && (
          <span className="text-gray-400">
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        )}
      </div>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

export default function Index() {
  const [selectedClass, setSelectedClass] = useState("2А");

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      {/* Left Sidebar */}
      <MeshSidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <MeshTopBar />

        {/* Content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Center scrollable content */}
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <h1 className="text-xl font-bold text-gray-800 mb-5">Рабочий стол</h1>

            {/* Классное руководство */}
            <WorkdeskCard title="Классное руководство">
              <div className="flex items-center gap-4 flex-wrap">
                <a href="#" className="text-sm font-medium" style={{ color: "#4b7bf5" }}>
                  Журналы классов
                </a>
                <a href="#" className="text-sm font-medium" style={{ color: "#4b7bf5" }}>
                  Список учеников
                </a>
                <a href="#" className="text-sm font-medium" style={{ color: "#4b7bf5" }}>
                  Журнал пропусков
                </a>
              </div>
            </WorkdeskCard>

            {/* Мои классы + Журналы */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
              <div className="flex items-stretch divide-x divide-gray-100">
                {/* Classes picker */}
                <div className="p-5 w-[200px] flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Мои классы</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {classes.map((cls) => (
                      <button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className={cn(
                          "h-9 rounded-lg text-sm font-semibold transition-colors",
                          selectedClass === cls
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Journal list */}
                <div className="flex-1 p-5">
                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    Журналы {selectedClass} класса
                  </div>
                  <div className="flex flex-col gap-0">
                    {journalItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen size={15} className="text-gray-300 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item.subject}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{item.note}</span>
                          <ArrowRight
                            size={14}
                            className="text-gray-300 group-hover:text-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ближайшие домашние задания */}
            <WorkdeskCard title="Ближайшие домашние задания на проверку" collapsible defaultOpen={false}>
              <a href="#" className="text-sm font-medium" style={{ color: "#4b7bf5" }}>
                К реестру ДЗ
              </a>
            </WorkdeskCard>

            {/* Новости */}
            <WorkdeskCard title="Новости">
              <a href="#" className="text-sm font-medium" style={{ color: "#4b7bf5" }}>
                Ко всем новостям
              </a>
            </WorkdeskCard>
          </main>

          {/* Right panel */}
          <MeshRightPanel />
        </div>
      </div>

      {/* Bottom footer — fixed at bottom of full layout */}
    </div>
  );
}
