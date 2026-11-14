"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/lib/types";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (identifier: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password?: string;
    consumerNumber?: string;
    role?: "consumer" | "admin";
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUserDirectly: (u: IUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem("auragas_user");
    if (saved === "guest") {
      setUser(null);
      setLoading(false);
      return;
    }

    if (saved) {
      try {
        setUser(JSON.parse(saved));
        setLoading(false);
        return;
      } catch (e) {
        console.error(e);
      }
    }

    // Default seed user on first ever visit
    fetch("/api/user")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setUser(data);
          localStorage.setItem("auragas_user", JSON.stringify(data));
        }
      })
      .catch((err) => console.error("Auth init error:", err))
      .finally(() => setLoading(false));
  }, []);

  const login = async (identifier: string, password?: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data.user);
      localStorage.setItem("auragas_user", JSON.stringify(data.user));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    phone: string;
    password?: string;
    consumerNumber?: string;
    role?: "consumer" | "admin";
  }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) {
        return { success: false, error: resData.error || "Registration failed" };
      }
      setUser(resData.user);
      localStorage.setItem("auragas_user", JSON.stringify(resData.user));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("auragas_user", "guest");
  };

  const setUserDirectly = (u: IUser | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("auragas_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("auragas_user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        setUserDirectly,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

