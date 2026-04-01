import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, BookOpen, Loader2 } from "lucide-react";

type Mode = "login" | "register";

export default function LoginPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    login: "",
    password: "",
    full_name: "",
    role: "teacher",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "login") {
        await login(form.login, form.password);
      } else {
        if (!form.full_name.trim()) {
          setError("Введите ФИО");
          return;
        }
        await register(form.login, form.password, form.full_name, form.role);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  }

  function switchMode(newMode: Mode) {
    setMode(newMode);
    setError("");
    setForm({ login: "", password: "", full_name: "", role: "teacher" });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #1a2e5a 0%, #263352 60%, #1e3a8a 100%)" }}
    >
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500 mb-4 shadow-lg">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">МЭШ</h1>
          <p className="text-blue-200 text-sm mt-1">Московская электронная школа</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => switchMode("login")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                mode === "login"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => switchMode("register")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                mode === "register"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Регистрация
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ФИО
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Иванова Мария Петровна"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Логин
              </label>
              <input
                type="text"
                name="login"
                value={form.login}
                onChange={handleChange}
                placeholder="Введите логин"
                autoComplete="username"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={mode === "register" ? "Минимум 6 символов" : "Введите пароль"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Роль
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="teacher">Учитель</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
            )}

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {mode === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>
        </div>

        <p className="text-center text-blue-300/60 text-xs mt-6">
          © 2025 Московская электронная школа
        </p>
      </div>
    </div>
  );
}
