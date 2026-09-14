"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface PortalNavItem {
  label: string;
  href: string;
}

interface PortalSidebarProps {
  brandInitials: string;
  portalLabel: string;
  portalName: string;
  navItems: PortalNavItem[];
  statusLabel?: string;
  statusValue?: string;
  statusDetail?: string;
  accentFrom?: string;
  accentTo?: string;
}

export function PortalSidebar({
  brandInitials,
  portalLabel,
  portalName,
  navItems,
  statusLabel = "Status",
  statusValue = "All systems normal",
  statusDetail = "Mock data mode — no live database connected yet.",
  accentFrom = "from-sky-400",
  accentTo = "to-indigo-500",
}: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 rounded-3xl bg-slate-950 p-5 text-slate-100 shadow-xl md:w-72">
      <div className="mb-8 flex items-center gap-3 border-b border-slate-800 pb-5">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accentFrom} ${accentTo} text-lg font-bold text-white`}
        >
          {brandInitials}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{portalLabel}</p>
          <h2 className="text-lg font-semibold text-white">{portalName}</h2>
        </div>
      </div>

      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const isActive = item.href === "/admin" || item.href === "/faculty"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs text-slate-400">&rsaquo;</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{statusLabel}</p>
        <p className="mt-2 text-lg font-semibold text-emerald-400">{statusValue}</p>
        <p className="mt-1 text-sm text-slate-300">{statusDetail}</p>
      </div>

      <Link
        href="/"
        className="mt-6 flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
      >
        Exit to home
      </Link>
    </aside>
  );
}
