import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { BarChart2, TrendingUp, TrendingDown, Users, BookOpen, Award, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const classStats = [
  { class: "2А", avg: 4.3, attendance: 94, excellent: 5, good: 12, satisf: 4, poor: 1 },
  { class: "2Б", avg: 4.1, attendance: 91, excellent: 4, good: 10, satisf: 5, poor: 1 },
  { class: "3А", avg: 4.5, attendance: 97, excellent: 8, good: 13, satisf: 3, poor: 0 },
  { class: "3Р", avg: 4.0, attendance: 89, excellent: 3, good: 10, satisf: 7, poor: 1 },
  { class: "3С", avg: 4.2, attendance: 93, excellent: 5, good: 11, satisf: 4, poor: 1 },
  { class: "4А", avg: 4.6, attendance: 96, excellent: 10, good: 8, satisf: 2, poor: 0 },
  { class: "4Б", avg: 4.4, attendance: 95, excellent: 7, good: 12, satisf: 4, poor: 0 },
  { class: "4В", avg: 4.0, attendance: 88, excellent: 3, good: 9, satisf: 6, poor: 1 },
  { class: "4Р", avg: 4.2, attendance: 90, excellent: 4, good: 9, satisf: 4, poor: 1 },
];

const quarterGrades = [
  { quarter: "I четверть", avg: 4.2 },
  { quarter: "II четверть", avg: 4.3 },
  { quarter: "III четверть", avg: 4.4 },
  { quarter: "IV четверть (тек.)", avg: 4.5 },
];

const maxGrade = Math.max(...quarterGrades.map((q) => q.avg));

export default function Reports() {
  const totalStudents = classStats.reduce((s, c) => s + c.excellent + c.good + c.satisf + c.poor, 0);
  const totalExcellent = classStats.reduce((s, c) => s + c.excellent, 0);
  const avgAttendance = Math.round(classStats.reduce((s, c) => s + c.attendance, 0) / classStats.length);
  const overallAvg = (classStats.reduce((s, c) => s + c.avg, 0) / classStats.length).toFixed(1);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl font-bold text-gray-800">Отчёты учителя</h1>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Экспорт
              </button>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users size={18} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{totalStudents}</div>
                  <div className="text-xs text-gray-400">Учеников</div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Award size={18} className="text-amber-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{totalExcellent}</div>
                  <div className="text-xs text-gray-400">Отличников</div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                  <TrendingUp size={18} className="text-green-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{overallAvg}</div>
                  <div className="text-xs text-gray-400">Средний балл</div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                  <BookOpen size={18} className="text-purple-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{avgAttendance}%</div>
                  <div className="text-xs text-gray-400">Посещаемость</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Grade dynamics */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 size={16} className="text-blue-500" />
                  <h2 className="text-sm font-semibold text-gray-700">Динамика успеваемости</h2>
                </div>
                <div className="flex items-end gap-3 h-28">
                  {quarterGrades.map((q) => (
                    <div key={q.quarter} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-gray-700">{q.avg}</span>
                      <div
                        className="w-full rounded-t-md bg-blue-500 transition-all"
                        style={{ height: `${(q.avg / maxGrade) * 80}px` }}
                      />
                      <span className="text-[9px] text-gray-400 text-center leading-tight">{q.quarter}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance distribution */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} className="text-green-500" />
                  <h2 className="text-sm font-semibold text-gray-700">Распределение оценок</h2>
                </div>
                {[
                  { label: "Отличники (5)", count: totalExcellent, total: totalStudents, color: "bg-green-500" },
                  { label: "Хорошисты (4)", count: classStats.reduce((s,c)=>s+c.good,0), total: totalStudents, color: "bg-blue-500" },
                  { label: "Успевающие (3)", count: classStats.reduce((s,c)=>s+c.satisf,0), total: totalStudents, color: "bg-amber-400" },
                  { label: "Неуспевающие (2)", count: classStats.reduce((s,c)=>s+c.poor,0), total: totalStudents, color: "bg-red-400" },
                ].map((item) => (
                  <div key={item.label} className="mb-2.5">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{item.label}</span>
                      <span className="font-medium text-gray-700">{item.count} чел. ({Math.round(item.count/item.total*100)}%)</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", item.color)}
                        style={{ width: `${(item.count / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="text-sm font-semibold text-gray-700">Успеваемость по классам</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Класс</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Средний балл</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Посещ.</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-green-600">5</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-blue-600">4</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-amber-600">3</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-red-500">2</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Тренд</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {classStats.map((row) => (
                      <tr key={row.class} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="text-sm font-bold text-blue-600">{row.class}</span>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={cn(
                            "text-sm font-semibold",
                            row.avg >= 4.5 ? "text-green-600" : row.avg >= 4 ? "text-blue-600" : "text-amber-600"
                          )}>
                            {row.avg}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={cn(
                            "text-sm",
                            row.attendance >= 95 ? "text-green-600" : row.attendance >= 90 ? "text-blue-600" : "text-amber-600"
                          )}>
                            {row.attendance}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-sm text-gray-700">{row.excellent}</td>
                        <td className="px-4 py-3.5 text-center text-sm text-gray-700">{row.good}</td>
                        <td className="px-4 py-3.5 text-center text-sm text-gray-700">{row.satisf}</td>
                        <td className="px-4 py-3.5 text-center text-sm text-gray-700">{row.poor}</td>
                        <td className="px-4 py-3.5 text-center">
                          {row.avg >= 4.4 ? (
                            <TrendingUp size={14} className="inline text-green-500" />
                          ) : (
                            <TrendingDown size={14} className="inline text-amber-400" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
          <MeshRightPanel />
        </div>
      </div>
    </div>
  );
}
