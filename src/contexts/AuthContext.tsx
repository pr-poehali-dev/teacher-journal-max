import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const AUTH_API = "https://functions.poehali.dev/fca3aa5e-7ea5-45ff-8604-cb2eca0f6593";
const TOKEN_KEY = "mesh_auth_token";

export interface User {
  id: number;
  login: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (login: string, password: string) => Promise<void>;
  register: (login: string, password: string, full_name: string, role?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount — try to restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      verifyAndSetToken(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  async function verifyAndSetToken(savedToken: string) {
    try {
      const res = await fetch(`${AUTH_API}/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(savedToken);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch {
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(loginVal: string, password: string) {
    const res = await fetch(`${AUTH_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: loginVal, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Ошибка входа");
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
  }

  async function register(loginVal: string, password: string, full_name: string, role = "teacher") {
    const res = await fetch(`${AUTH_API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: loginVal, password, full_name, role }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Ошибка регистрации");
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
