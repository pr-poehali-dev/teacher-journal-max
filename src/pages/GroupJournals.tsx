import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { Users, ChevronRight, ArrowRight, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const groups = [
  { id: "math", name: "Математический кружок", classGroup: "4А, 4Б", count: 12, lastLesson: "07 апр" },
  { id: "chess", name: "Шахматный клуб", classGroup: "3А, 3С", count: 8, lastLesson: "05 апр" },
];

const attendanceData: Record<string, {
  lessons: string[];
  students: { name: string; attendance: (boolean | null)[] }[];
}> = {
  math: {
    lessons: ["01 апр", "03 апр", "07 апр"],
    students: [
      { name: "Зайцева К.", attendance: [true, true, true] },
      { name: "Орлов М.", attendance: [true, false, true] },
      { name: "Горбунова А.", attendance: [true, true, null] },
      { name: "Тихонов Р.", attendance: [false, true, true] },
      { name: "Волков П.", attendance: [true, true, true] },
      { name: "Алексеева Т.", attendance: [true, null, true] },
    ],
  },
  chess: {
    lessons: ["02 апр", "06 апр"],
    students: [
      { name: "Сидорова М.", attendance: [true, true] },
      { name: "Белов А.", attendance: [true, false] },
      { name: "Козлов Д.", attendance: [false, true] },
      { name: "Новикова В.", attendance: [true, true] },
    ],
  },
};

export default function GroupJournals() {
  const [selectedGroup, setSelectedGroup] = useState("math");

  const group = groups.find((g) => g.id === selectedGroup)!;
  const data = attendanceData[selectedGroup];

  const getAttendanceStats = (attendance: (boolean | null)[]) => {
    const present = attendance.filter((a) => a === true).length;
    const total = attendance.filter((a) => a !== null).length;
    return { present, total };
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <h1 className="text-xl font-bold text-gray-800 mb-5">Журналы моих групп</h1>

            {/* Group selector */}
            <div className="flex gap-3 mb-4">
              {groups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGroup(g.id)}
                  className={cn(
                    "flex-1 bg-white rounded-xl border shadow-sm p-4 text-left transition-all hover:shadow-md",
                    selectedGroup === g.id ? "border-blue-400 ring-1 ring-blue-400" : "border-gray-100"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-800 mb-1">{g.name}</div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Users size={11} />
                          {g.count} уч.
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={11} />
                          {g.lastLesson}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{g.classGroup}</div>
                    </div>
                    <ArrowRight size={14} className={cn(
                      "transition-colors mt-1",
                      selectedGroup === g.id ? "text-blue-500" : "text-gray-300"
                    )} />
                  </div>
                </button>
              ))}
            </div>

            {/* Journal table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">{group.name} — Посещаемость</h2>
                <span className="text-xs text-gray-400">{data.lessons.length} занятий</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 min-w-[150px]">
                        Ученик
                      </th>
                      {data.lessons.map((lesson) => (
                        <th key={lesson} className="text-center px-4 py-3 text-xs font-semibold text-gray-500">
                          {lesson}
                        </th>
                      ))}
                      <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500">
                        Итого
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.students.map((student, i) => {
                      const { present, total } = getAttendanceStats(student.attendance);
                      return (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-3.5 text-sm font-medium text-gray-800">
                            {student.name}
                          </td>
                          {student.attendance.map((a, j) => (
                            <td key={j} className="px-4 py-3.5 text-center">
                              {a === null ? (
                                <Clock size={14} className="inline text-gray-300" />
                              ) : a ? (
                                <CheckCircle2 size={14} className="inline text-green-500" />
                              ) : (
                                <XCircle size={14} className="inline text-red-400" />
                              )}
                            </td>
                          ))}
                          <td className="px-5 py-3.5 text-center">
                            <span className={cn(
                              "text-xs font-semibold px-2 py-0.5 rounded-full",
                              present === total ? "bg-green-100 text-green-700" :
                              present / total >= 0.7 ? "bg-blue-100 text-blue-700" :
                              "bg-red-100 text-red-600"
                            )}>
                              {present}/{total}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="px-5 py-3 border-t border-gray-50 flex items-center gap-5">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CheckCircle2 size={13} className="text-green-500" />
                  Присутствовал
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <XCircle size={13} className="text-red-400" />
                  Отсутствовал
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={13} className="text-gray-300" />
                  Нет данных
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
