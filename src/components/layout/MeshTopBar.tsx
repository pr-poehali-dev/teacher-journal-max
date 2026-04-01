import { Bell, MessageSquare, AlertTriangle, ChevronDown, Building2 } from "lucide-react";

export function MeshTopBar() {
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

        {/* User avatar + name */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm">
            У
          </div>
          <div className="text-left hidden lg:block">
            <div className="text-sm font-semibold text-gray-800 leading-tight">Иванова Мария</div>
            <div className="text-xs text-gray-400 leading-tight">Учитель</div>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
