import { useState } from "react";
import { MeshSidebar } from "@/components/layout/MeshSidebar";
import { MeshTopBar } from "@/components/layout/MeshTopBar";
import { MeshRightPanel } from "@/components/layout/MeshRightPanel";
import { Search, Tag, ChevronRight, Megaphone, BookOpen, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["Все", "Школьные", "Городские", "Методика", "Объявления"];

const news = [
  {
    id: 1,
    title: "Обновление электронного журнала: новые функции в МЭШ 8.1",
    date: "01 апр 2026",
    category: "Школьные",
    tag: "НОВО",
    tagColor: "bg-blue-500",
    icon: <Zap size={16} className="text-blue-500" />,
    preview: "В новой версии системы МЭШ появились улучшенные инструменты для ведения журналов, автоматическая проверка домашних заданий и обновлённый интерфейс расписания.",
    read: false,
  },
  {
    id: 2,
    title: "Городской конкурс «Учитель года — 2026»: прием заявок открыт",
    date: "28 мар 2026",
    category: "Городские",
    tag: "ВАЖНО",
    tagColor: "bg-amber-500",
    icon: <Megaphone size={16} className="text-amber-500" />,
    preview: "Департамент образования Москвы объявляет о начале приема заявок на участие в ежегодном конкурсе профессионального мастерства педагогов.",
    read: false,
  },
  {
    id: 3,
    title: "Методические рекомендации: работа с учениками с ОВЗ",
    date: "25 мар 2026",
    category: "Методика",
    tag: null,
    tagColor: "",
    icon: <BookOpen size={16} className="text-green-500" />,
    preview: "Новый методический сборник содержит практические рекомендации по организации образовательного процесса для обучающихся с ограниченными возможностями здоровья.",
    read: true,
  },
  {
    id: 4,
    title: "Родительское собрание 3А класса — 5 апреля",
    date: "23 мар 2026",
    category: "Объявления",
    tag: null,
    tagColor: "",
    icon: <Megaphone size={16} className="text-purple-500" />,
    preview: "Напоминаем о проведении родительского собрания 3А класса. Тема: итоги третьей четверти и подготовка к итоговым контрольным работам.",
    read: true,
  },
  {
    id: 5,
    title: "Расписание государственной итоговой аттестации 2026",
    date: "20 мар 2026",
    category: "Городские",
    tag: "ВАЖНО",
    tagColor: "bg-red-500",
    icon: <BookOpen size={16} className="text-red-500" />,
    preview: "Утверждено расписание проведения ОГЭ и ЕГЭ в 2026 году. Ознакомьтесь с ключевыми датами и требованиями к организации экзаменационного процесса.",
    read: true,
  },
  {
    id: 6,
    title: "Вебинар: цифровые инструменты в образовании",
    date: "18 мар 2026",
    category: "Методика",
    tag: null,
    tagColor: "",
    icon: <Zap size={16} className="text-indigo-500" />,
    preview: "18 апреля состоится онлайн-вебинар для учителей по теме «Использование искусственного интеллекта и цифровых платформ в современном уроке».",
    read: true,
  },
];

export default function News() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = news.filter((n) => {
    const matchCat = activeCategory === "Все" || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const unreadCount = news.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f3f8" }}>
      <MeshSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MeshTopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto content-scrollbar p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-800">Новости</h1>
                {unreadCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white font-semibold">
                    {unreadCount} новых
                  </span>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-4 flex items-center gap-3">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Поиск по новостям..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* News list */}
            <div className="flex flex-col gap-3">
              {filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 text-center text-gray-400 text-sm">
                  Новостей не найдено
                </div>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer transition-shadow hover:shadow-md",
                      !item.read && "border-l-4 border-l-blue-400"
                    )}
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  >
                    <div className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400">{item.date}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                              {item.category}
                            </span>
                            {item.tag && (
                              <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full text-white font-bold", item.tagColor)}>
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <h3 className={cn(
                            "text-sm font-semibold",
                            item.read ? "text-gray-700" : "text-gray-900"
                          )}>
                            {item.title}
                          </h3>
                          {expandedId === item.id && (
                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.preview}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {!item.read && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                          )}
                          <ChevronRight
                            size={14}
                            className={cn(
                              "text-gray-300 transition-transform",
                              expandedId === item.id && "rotate-90"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
          <MeshRightPanel />
        </div>
      </div>
    </div>
  );
}
