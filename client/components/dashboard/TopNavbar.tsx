"use client";

import {
  Bell,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";

interface TopNavbarProps {
  setMobileOpen: (open: boolean) => void;
}

export default function TopNavbar({
  setMobileOpen,
}: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Menu size={22} />
          </button>

          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 md:flex dark:border-slate-800 dark:bg-slate-900">
            <Search size={17} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search vendors, invoices..."
              className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400 lg:w-64"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

          <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
              S
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Sameeksha
              </p>

              <p className="text-[11px] text-slate-400">
                Vendor Admin
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-slate-400 sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}