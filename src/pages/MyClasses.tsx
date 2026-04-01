import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { BookOpen, ArrowRight, Users, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const classes = ["2А", "2Б", "3А", "3Р", "3С", "4А", "4Б", "4В", "4Р"];

const classData: Record<string, {
  students: number;
  avgGrade: number;
  journals: { subject: string; lastLesson: string; graded: boolean }[];
  topStudents: string[];
}> = {
  "2А": {
    students: 22, avgGrade: 4.3,
    journals: [
      { subject: "Математика", lastLesson: "07 апр", graded: true },
      { subject: "Алгебра", lastLesson: "08 апр", graded: false },
      { subject: "Русский язык", lastLesson: "06 апр", graded: true },
    ],
    topStudents: ["Иванова А.", "Петров К.", "Смирнова О."],
  },
  "2Б": {
    students: 20, avgGrade: 4.1,
    journals: [
      { subject: "Алгебра", lastLesson: "09 апр", graded: false },
      { subject: "Окружающий мир", lastLesson: "07 апр", graded: true },
    ],
    topStudents: ["Козлов Д.", "Новикова В."],
  },
  "3А": {
    students: 24, avgGrade: 4.5,
    journals: [
      { subject: "Математика", lastLesson: "07 апр", graded: true },
      { subject: "Русский язык", lastLesson: "08 апр", graded: true },
      { subject: "Литература", lastLesson: "05 апр", graded: false },
    ],
    topStudents: ["Сидорова М.", "Белов А.", "Федорова Н."],
  },
  "3Р": {
    students: 21, avgGrade: 4.0,
    journals: [
      { subject: "Математика", lastLesson: "08 апр", graded: false },
    ],
    topStudents: ["Морозов В.", "Алексеева Т."],
  },
  "3С": {
    students: 21, avgGrade: 4.2,
    journals: [
      { subject: "Математика", lastLesson: "08 апр", graded: true },
      { subject: "Физкультура", lastLesson: "06 апр", graded: true },
    ],
    topStudents: ["Волков П.", "Соколова Е."],
  },
  "4А": {
    students: 20, avgGrade: 4.6,
    journals: [
      { subject: "Математика", lastLesson: "07 апр", graded: true },
      { subject: "Алгебра", lastLesson: "09 апр", graded: false },
      { subject: "Физика", lastLesson: "08 апр", graded: true },
      { subject: "Химия", lastLesson: "05 апр", graded: true },
    ],
    topStudents: ["Зайцева К.", "Орлов М.", "Горбунова А."],
  },
  "4Б": {
    students: 23, avgGrade: 4.4,
    journals: [
      { subject: "Математика", lastLesson: "07 апр", graded: true },
      { subject: "История", lastLesson: "08 апр", graded: false },
    ],
    topStudents: ["Тихонов Р.", "Кузнецова Д."],
  },
  "4В": {
    students: 19, avgGrade: 4.0,
    journals: [
      { subject: "Математика", lastLesson: "08 апр", graded: false },
      { subject: "Технология", lastLesson: "04 апр", graded: true },
    ],
    topStudents: ["Лебедев И.", "Попова С."],
  },
  "4Р": {
    students: 18, avgGrade: 4.2,
    journals: [
      { subject: "Алгебра", lastLesson: "09 апр", graded: true },
    ],
    topStudents: ["Власов А.", "Громова Н."],
  },
};

export default function MyClasses() {
  const [selectedClass, setSelectedClass] = useState("4А");
  const data = classData[selectedClass];

  const ungradedCount = data.journals.filter((j) => !j.graded).length;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <h1 className="text-xl font-bold text-gray-800 mb-5">Мои классы</h1>

            <div className="flex gap-4">
              {/* Left: class picker */}
              <div className="w-[200px] flex-shrink-0">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Классы</div>
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
              </div>

              {/* Right: class details */}
              <div className="flex-1 min-w-0 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Users size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800">{data.students}</div>
                      <div className="text-xs text-gray-400">Учеников</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                      <TrendingUp size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800">{data.avgGrade}</div>
                      <div className="text-xs text-gray-400">Средний балл</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      ungradedCount > 0 ? "bg-red-50" : "bg-green-50"
                    )}>
                      <BookOpen size={18} className={ungradedCount > 0 ? "text-red-500" : "text-green-500"} />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800">{ungradedCount}</div>
                      <div className="text-xs text-gray-400">Не выставлено оценок</div>
                    </div>
                  </div>
                </div>

                {/* Journals */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-50">
                    <h2 className="text-sm font-semibold text-gray-700">Журналы {selectedClass} класса</h2>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {data.journals.map((j, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen size={15} className="text-gray-300" />
                          <div>
                            <span className="text-sm font-medium text-gray-800">{j.subject}</span>
                            <div className="text-xs text-gray-400">Последний урок: {j.lastLesson}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {!j.graded && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-600 font-medium border border-amber-200">
                              Нет оценок
                            </span>
                          )}
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top students */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
                    <Award size={16} className="text-amber-500" />
                    <h2 className="text-sm font-semibold text-gray-700">Отличники</h2>
                  </div>
                  <div className="px-5 py-4 flex gap-2 flex-wrap">
                    {data.topStudents.map((s, i) => (
                      <span
                        key={i}
                        className="text-sm px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <MeshRightPanel />
        </div>
      </div>
    </div>
  );
}
