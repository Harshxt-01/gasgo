"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface BookingSearchInputProps {
  onSearch: (ref: string) => void;
  isLoading?: boolean;
}

export function BookingSearchInput({ onSearch, isLoading = false }: BookingSearchInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-zinc-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Lookup Reference (e.g. AG-84920)..."
          className="w-full pl-10 pr-24 py-2.5 rounded-2xl text-xs font-medium bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all shadow-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center gap-1"
        >
          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Track"}
        </button>
      </div>
    </form>
  );
}

