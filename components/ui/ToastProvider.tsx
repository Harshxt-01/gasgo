"use client";

import React, { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (options: { type?: "success" | "error" | "info"; title: string; message?: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({
    type = "success",
    title,
    message,
  }: {
    type?: "success" | "error" | "info";
    title: string;
    message?: string;
  }) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Floating container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const isSuccess = t.type === "success";
          const isError = t.type === "error";

          return (
            <div
              key={t.id}
              className={`pointer-events-auto p-4 rounded-2xl border shadow-xl backdrop-blur-md flex items-start gap-3 transition-all animate-bounce-subtle ${
                isSuccess
                  ? "bg-white/95 dark:bg-zinc-900/95 border-emerald-500/30 text-slate-900 dark:text-white"
                  : isError
                  ? "bg-white/95 dark:bg-zinc-900/95 border-rose-500/30 text-slate-900 dark:text-white"
                  : "bg-white/95 dark:bg-zinc-900/95 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {isError && <AlertCircle className="w-5 h-5 text-rose-500" />}
                {!isSuccess && !isError && <Info className="w-5 h-5 text-cyan-500" />}
              </div>

              <div className="flex-1 space-y-0.5 text-xs">
                <p className="font-bold">{t.title}</p>
                {t.message && <p className="text-slate-500 dark:text-zinc-400 text-[11px]">{t.message}</p>}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

