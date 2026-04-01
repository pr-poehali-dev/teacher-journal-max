import { Bell, MessageSquare, AlertTriangle, ChevronDown, Building2, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";

export function MeshTopBar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Get user initials from full_name
  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "У";

  // Short name: "Фамилия Имя" (first two words)
  const shortName = user?.full_name
    ? user.full_name.split(" ").slice(0, 2).join(" ")
    : "Пользователь";

  const roleLabel: Record<string, string> = {
    teacher: "Учитель",
    admin: "Администратор",
  };

  return (
    <header
      className="h-14 flex items-center justify-between px-5 border-b bg-white"
      style={{ borderColor: "#e8edf5" }}
    >
      {/* Left nav links */}
      <nav className="flex items-center gap-6">
        <a href="#" className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors flex items-center gap-1.5">
          <Building2 size={15} className="text-blue-500" />
          Кабинет учителя
        </a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Библиотека</a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Моё портфолио</a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Аттестация педагогов</a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1">
          Новости
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-bold uppercase leading-none">
            НОВО
          </span>
        </a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Справка</a>
      </nav>

      {/* Right icons + user */}
      <div className="flex items-center gap-3">
        {/* Notification icons */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500">
          <MessageSquare size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500"></span>
        </button>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"></span>
        </button>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500">
          <AlertTriangle size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* User avatar + name with dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-sm font-semibold text-gray-800 leading-tight">{shortName}</div>
              <div className="text-xs text-gray-400 leading-tight">
                {roleLabel[user?.role ?? ""] ?? user?.role ?? "Учитель"}
              </div>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-800 truncate">{user?.full_name}</div>
                <div className="text-xs text-gray-400 mt-0.5">@{user?.login}</div>
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} />
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
