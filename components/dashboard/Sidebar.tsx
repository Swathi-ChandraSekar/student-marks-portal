"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Marks", href: "/dashboard/marks" },
  { label: "Attendance", href: "/dashboard/attendance" },
  { label: "Fees", href: "/dashboard/fees" },
];

export function Sidebar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/student/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-full shrink-0 rounded-3xl bg-slate-950 p-5 text-slate-100 shadow-xl md:w-72">
      <div className="mb-8 flex items-center gap-3 border-b border-slate-800 pb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-lg font-bold text-white">
          SP
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Portal</p>
          <h2 className="text-lg font-semibold text-white">Student Hub</h2>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              item.href === "/dashboard"
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-xs text-slate-400">›</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Status</p>
        <p className="mt-2 text-lg font-semibold text-emerald-400">On track</p>
        <p className="mt-1 text-sm text-slate-300">Academic performance is stable this term.</p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
      >
        Log out
      </button>
    </aside>
  );
}
