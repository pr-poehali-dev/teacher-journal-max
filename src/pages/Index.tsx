import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  BookOpen,
  Users,
  AlertCircle,
  Clock,
  Megaphone,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const classes = ["2А", "2Б", "3А", "3Р", "3С", "4А", "4Б", "4В", "4Р"];

const journalItems: Record<string, { subject: string; lastLesson: string; hasUnchecked?: boolean }[]> = {
  "2А": [
    { subject: "Математика", lastLesson: "07 апр", hasUnchecked: false },
    { subject: "Алгебра", lastLesson: "08 апр", hasUnchecked: true },
    { subject: "Русский язык", lastLesson: "06 апр", hasUnchecked: false },
  ],
  "2Б": [
    { subject: "Алгебра", lastLesson: "09 апр", hasUnchecked: true },
    { subject: "Окружающий мир", lastLesson: "07 апр", hasUnchecked: false },
  ],
  "3А": [
    { subject: "Математика", lastLesson: "07 апр", hasUnchecked: false },
    { subject: "Русский язык", lastLesson: "08 апр", hasUnchecked: false },
    { subject: "Литература", lastLesson: "05 апр", hasUnchecked: true },
  ],
  "3Р": [{ subject: "Математика", lastLesson: "08 апр", hasUnchecked: true }],
  "3С": [
    { subject: "Математика", lastLesson: "08 апр", hasUnchecked: false },
    { subject: "Физкультура", lastLesson: "06 апр", hasUnchecked: false },
  ],
  "4А": [
    { subject: "Математика", lastLesson: "07 апр", hasUnchecked: false },
    { subject: "Алгебра", lastLesson: "09 апр", hasUnchecked: true },
    { subject: "Физика", lastLesson: "08 апр", hasUnchecked: false },
    { subject: "Химия", lastLesson: "05 апр", hasUnchecked: false },
  ],
  "4Б": [
    { subject: "Математика", lastLesson: "07 апр", hasUnchecked: false },
    { subject: "История", lastLesson: "08 апр", hasUnchecked: true },
  ],
  "4В": [
    { subject: "Математика", lastLesson: "08 апр", hasUnchecked: true },
    { subject: "Технология", lastLesson: "04 апр", hasUnchecked: false },
  ],
  "4Р": [{ subject: "Алгебра", lastLesson: "09 апр", hasUnchecked: false }],
};

// Upcoming homework to check
const upcomingHW = [
  { subject: "Математика", class: "3А", task: "Задачник стр. 84, №4–7", dueDate: "09 апр", submitted: 18, total: 24 },
  { subject: "Алгебра", class: "2А", task: "Учебник стр. 56, №1–5", dueDate: "10 апр", submitted: 12, total: 22 },
  { subject: "Алгебра", class: "2Б", task: "Числовые выражения, вариант 2", dueDate: "09 апр", submitted: 7, total: 20 },
];

// Recent absence data
const absences = [
  { student: "Орлов М.", class: "4А", date: "09 апр", reason: "Болезнь", justified: true },
  { student: "Козлов Д.", class: "2Б", date: "08 апр", reason: "Без причины", justified: false },
  { student: "Лебедев И.", class: "4В", date: "08 апр", reason: "Семейные обстоятельства", justified: true },
];

// News items
const newsItems = [
  {
    title: "Обновление МЭШ 8.1: новые функции",
    date: "01 апр 2026",
    isNew: true,
  },
  {
    title: "Городской конкурс «Учитель года — 2026»",
    date: "28 мар 2026",
    isNew: true,
  },
  {
    title: "Методические рекомендации: работа с учениками с ОВЗ",
    date: "25 мар 2026",
    isNew: false,
  },
];

function WorkdeskCard({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
  actionLabel,
  onAction,
}: {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  actionLabel?: string;
  onAction?: () => void;
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
        <div className="flex items-center gap-3">
          {actionLabel && onAction && (
            <button
              onClick={(e) => { e.stopPropagation(); onAction(); }}
              className="text-sm font-medium hover:underline"
              style={{ color: "#4b7bf5" }}
            >
              {actionLabel}
            </button>
          )}
          {collapsible && (
            <span className="text-gray-400">
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          )}
        </div>
      </div>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

export default function Index() {
  const [selectedClass, setSelectedClass] = useState("4А");
  const navigate = useNavigate();
  const journals = journalItems[selectedClass] || [];

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
                <button
                  onClick={() => navigate("/my-classes")}
                  className="text-sm font-medium hover:underline flex items-center gap-1"
                  style={{ color: "#4b7bf5" }}
                >
                  <BookOpen size={14} />
                  Журналы классов
                </button>
                <button
                  onClick={() => navigate("/my-classes")}
                  className="text-sm font-medium hover:underline flex items-center gap-1"
                  style={{ color: "#4b7bf5" }}
                >
                  <Users size={14} />
                  Список учеников
                </button>
                <button
                  onClick={() => navigate("/my-classes")}
                  className="text-sm font-medium hover:underline flex items-center gap-1"
                  style={{ color: "#4b7bf5" }}
                >
                  <AlertCircle size={14} />
                  Журнал пропусков
                </button>
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
                    {journals.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => navigate("/my-classes")}
                        className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen size={15} className="text-gray-300 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item.subject}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{item.lastLesson}</span>
                          {item.hasUnchecked && (
                            <span className="text-[9px] px-1 py-0.5 rounded bg-amber-100 text-amber-600 font-medium">
                              нет оценок
                            </span>
                          )}
                          <ArrowRight
                            size={14}
                            className="text-gray-300 group-hover:text-blue-500 transition-colors"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("/my-classes")}
                    className="mt-3 text-xs font-medium hover:underline"
                    style={{ color: "#4b7bf5" }}
                  >
                    Все классы →
                  </button>
                </div>
              </div>
            </div>

            {/* Ближайшие домашние задания */}
            <WorkdeskCard
              title="Ближайшие домашние задания на проверку"
              collapsible
              defaultOpen={true}
              actionLabel="К реестру ДЗ"
              onAction={() => navigate("/homework")}
            >
              <div className="flex flex-col gap-2 mt-1">
                {upcomingHW.map((hw, i) => {
                  const pct = Math.round((hw.submitted / hw.total) * 100);
                  return (
                    <button
                      key={i}
                      onClick={() => navigate("/homework")}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors text-left group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            {hw.class}
                          </span>
                          <span className="text-xs text-gray-500">{hw.subject}</span>
                          <span className="text-xs text-gray-400">· до {hw.dueDate}</span>
                        </div>
                        <p className="text-sm text-gray-700 truncate">{hw.task}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={cn("h-full rounded-full", pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-blue-500" : "bg-amber-400")}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap">
                            {hw.submitted}/{hw.total} сдали
                          </span>
                        </div>
                      </div>
                      <Clock size={14} className="text-gray-300 group-hover:text-blue-400 flex-shrink-0 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </WorkdeskCard>

            {/* Пропуски */}
            <WorkdeskCard
              title="Журнал пропусков"
              collapsible
              defaultOpen={false}
              actionLabel="Все пропуски"
              onAction={() => navigate("/my-classes")}
            >
              <div className="flex flex-col gap-1.5 mt-1">
                {absences.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                      a.justified ? "bg-green-100" : "bg-red-100"
                    )}>
                      {a.justified
                        ? <CheckCircle2 size={14} className="text-green-600" />
                        : <XCircle size={14} className="text-red-500" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">{a.student}</span>
                        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded">{a.class}</span>
                        <span className="text-xs text-gray-400">{a.date}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{a.reason}</div>
                    </div>
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded border font-medium flex-shrink-0",
                      a.justified
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-red-50 text-red-500 border-red-200"
                    )}>
                      {a.justified ? "Уважит." : "Неуважит."}
                    </span>
                  </div>
                ))}
              </div>
            </WorkdeskCard>

            {/* Новости */}
            <WorkdeskCard
              title="Новости"
              actionLabel="Ко всем новостям"
              onAction={() => navigate("/news")}
            >
              <div className="flex flex-col gap-2 mt-1">
                {newsItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => navigate("/news")}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors text-left group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Megaphone size={14} className="text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs text-gray-400">{item.date}</span>
                        {item.isNew && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-bold">
                            НОВО
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 font-medium truncate">{item.title}</p>
                    </div>
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </WorkdeskCard>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => navigate("/reports")}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <TrendingUp size={18} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">4.4</div>
                  <div className="text-xs text-gray-400">Средний балл</div>
                </div>
              </button>
              <button
                onClick={() => navigate("/projects")}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                  <BookOpen size={18} className="text-purple-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">4</div>
                  <div className="text-xs text-gray-400">Проекта</div>
                </div>
              </button>
              <button
                onClick={() => navigate("/events")}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                  <AlertCircle size={18} className="text-amber-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">4</div>
                  <div className="text-xs text-gray-400">Мероприятия</div>
                </div>
              </button>
            </div>
          </main>

          {/* Right panel */}
          <MeshRightPanel />
        </div>
      </div>
    </div>
  );
}
