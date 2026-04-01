import { useState } from "react";
import {
  Calendar,
  Newspaper,
  Zap,
  Clock,
  BookOpen,
  ClipboardList,
  Box,
  BarChart2,
  CalendarDays,
  Users,
  Star,
  ChevronRight,
  Menu,
  AlignLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  children?: NavItem[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "МОИ ИНСТРУМЕНТЫ",
    items: [
      { icon: <Calendar size={16} />, label: "Мое расписание" },
      { icon: <Newspaper size={16} />, label: "Новости", badge: "new" },
      { icon: <Zap size={16} />, label: "Мероприятия" },
    ],
  },
  {
    title: "УЧЕБНЫЙ ПРОЦЕСС",
    items: [
      { icon: <Clock size={16} />, label: "Поурочное планирование" },
      { icon: <BookOpen size={16} />, label: "Мои классы", active: true },
      { icon: <ClipboardList size={16} />, label: "Домашние задания" },
      { icon: <Box size={16} />, label: "Проектная деятельность" },
    ],
  },
  {
    title: "АНАЛИЗ",
    items: [
      {
        icon: <BarChart2 size={16} />,
        label: "Отчеты учителя",
        children: [],
      },
    ],
  },
  {
    title: "ВНЕУРОЧНАЯ ДЕЯТЕЛЬНОСТЬ",
    items: [
      {
        icon: <CalendarDays size={16} />,
        label: "Планирование",
        children: [],
      },
      { icon: <Users size={16} />, label: "Журналы моих групп" },
      { icon: <Star size={16} />, label: "План деятельности" },
    ],
  },
];

export function MeshSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen transition-all duration-300 select-none",
        "flex-shrink-0",
        collapsed ? "w-[60px]" : "w-[260px]"
      )}
      style={{ backgroundColor: "#263352" }}
    >
      {/* Logo / Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        {!collapsed && (
          <span className="text-white font-bold text-lg tracking-wide">МЭШ</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/60 hover:text-white transition-colors ml-auto"
        >
          {collapsed ? <AlignLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-2">
            {!collapsed && (
              <div className="px-4 py-1.5 text-[10px] font-semibold tracking-widest text-white/35 uppercase">
                {group.title}
              </div>
            )}
            {group.items.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => item.children && toggleExpand(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left",
                    item.active
                      ? "text-white bg-white/10 border-l-2 border-blue-400"
                      : "text-white/65 hover:text-white hover:bg-white/8",
                    collapsed && "justify-center px-2"
                  )}
                  style={
                    item.active
                      ? {}
                      : undefined
                  }
                >
                  <span className="flex-shrink-0 opacity-80">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-semibold uppercase">
                          {item.badge}
                        </span>
                      )}
                      {item.children && (
                        <ChevronRight
                          size={14}
                          className={cn(
                            "opacity-50 transition-transform",
                            expandedItems.includes(item.label) && "rotate-90"
                          )}
                        />
                      )}
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Help block */}
      {!collapsed && (
        <div className="m-3 rounded-xl p-4 text-white" style={{ backgroundColor: "#1e2a45" }}>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="font-semibold text-sm">Нужна помощь?</div>
              <div className="text-white/60 text-xs mt-0.5">Мы на связи!</div>
              <button className="mt-3 w-full text-sm font-semibold py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors text-white">
                Написать нам
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Version */}
      {!collapsed && (
        <div className="px-4 py-2 text-[11px] text-white/25">Версия 8.0.2.1</div>
      )}
    </aside>
  );
}
