"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Flame,
  ShieldCheck,
  Sparkles,
  LogOut,
  User as UserIcon,
  ShieldAlert,
  ChevronDown,
  Activity,
  Info,
} from "lucide-react";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { IUser } from "@/lib/types";
import { useAuth } from "../auth/AuthContext";
import { useToast } from "../ui/ToastProvider";
import { sound } from "@/lib/sound";

interface NavbarProps {
  user: IUser | null;
  activeOrderCount: number;
  onOpenBooking: () => void;
  onSearchOrder: (ref: string) => void;
}

export function Navbar({
  user,
  activeOrderCount,
  onOpenBooking,
  onSearchOrder,
}: NavbarProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-cyan-400 p-[1.5px] shadow-glow-orange">
              <div className="w-full h-full bg-slate-900 dark:bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                  Aura<span className="text-orange-500">Gas</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  <ShieldCheck className="w-3 h-3" /> PESO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 hidden sm:block">
                Smart LPG Infrastructure
              </p>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/"
              className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-700 dark:text-zinc-300 hover:text-orange-500 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              About Platform
            </Link>
            <Link
              href="/admin"
              className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              <span>Admin Portal</span>
            </Link>
          </nav>
        </div>

        {/* Consumer ID & Live Order pill */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium text-slate-500 dark:text-zinc-400">SV Number:</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-zinc-100">
              {user?.consumerNumber || "SV-8492018"}
            </span>
          </div>

          {activeOrderCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>{activeOrderCount} In-Transit</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Cylinder</span>
          </button>

          <ThemeToggle />

          {/* User Account Dropdown */}
          <div className="relative">
            {user ? (
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-zinc-800 cursor-pointer select-none group"
              >
                <img
                  src={
                    user.avatarUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/30"
                />
                <div className="text-left text-xs hidden sm:block">
                  <p className="font-medium text-slate-900 dark:text-zinc-100 leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                    {user.role === "admin" ? "Fleet Admin" : "Prime Consumer"}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Dropdown Menu */}
            {menuOpen && user && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl z-50 text-xs space-y-1">
                <div className="p-2 border-b border-slate-100 dark:border-zinc-800">
                  <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-[11px] font-mono text-slate-500">{user.consumerNumber}</p>
                  <p className="text-[10px] text-slate-400">{user.email}</p>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"
                >
                  Consumer Dashboard
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"
                >
                  Admin & Dispatch Console
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMenuOpen(false)}
                  className="block p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"
                >
                  Platform & PESO Info
                </Link>

                <div className="pt-1 border-t border-slate-100 dark:border-zinc-800">
                  <button
                    onClick={() => {
                      sound.tick();
                      logout();
                      setMenuOpen(false);
                      toast({
                        type: "info",
                        title: "Signed Out",
                        message: "You have been logged out. Redirecting to home...",
                      });
                      router.push("/");
                    }}
                    className="w-full text-left p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1.5 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
