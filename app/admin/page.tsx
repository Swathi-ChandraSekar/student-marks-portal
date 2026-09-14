import Link from "next/link";

import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { SectionCard } from "@/components/portal/SectionCard";
import { adminFaculty, adminOverviewStats, batches, reportItems } from "@/data/admin";

const quickLinks = [
  { label: "Batch Management", href: "/admin/batches", accent: "bg-violet-50 text-violet-800 hover:bg-violet-100" },
  { label: "Student Management", href: "/admin/students", accent: "bg-sky-50 text-sky-800 hover:bg-sky-100" },
  { label: "Faculty Management", href: "/admin/faculty", accent: "bg-emerald-50 text-emerald-800 hover:bg-emerald-100" },
  { label: "Reports", href: "/admin/reports", accent: "bg-amber-50 text-amber-800 hover:bg-amber-100" },
] as const;

export default function AdminDashboardPage() {
  return (
    <>
      <Topbar eyebrow="Admin portal" title="Admin Dashboard" subtitle="Academic Year 2026-2027" />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Students"
          value={String(adminOverviewStats.totalStudents)}
          detail="Across all active batches"
          accent="from-sky-500 to-indigo-500"
        />
        <StatCard
          title="Faculty"
          value={String(adminOverviewStats.totalFaculty)}
          detail="Across all departments"
          accent="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Batches"
          value={String(adminOverviewStats.totalBatches)}
          detail="Currently configured"
          accent="from-violet-500 to-purple-500"
        />
        <StatCard
          title="Avg. Attendance"
          value={`${adminOverviewStats.averageAttendance}%`}
          detail="Across all students"
          accent="from-amber-500 to-orange-500"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <SectionCard title="Batches at a glance" subtitle="Department, section and coordinator overview">
          <div className="space-y-3">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="flex flex-col gap-2 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">{batch.batchCode}</p>
                  <p className="text-sm text-slate-500">
                    {batch.department} • {batch.year} Year / Sem {batch.semester}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>{batch.totalStudents} students</span>
                  <span className="hidden text-slate-300 sm:inline">|</span>
                  <span>Coordinator: {batch.coordinator}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Quick links">
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 font-semibold transition ${link.accent}`}
                >
                  <span>{link.label}</span>
                  <span>&rarr;</span>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Faculty on leave" subtitle="Needs coordinator attention">
            <div className="space-y-2">
              {adminFaculty.filter((faculty) => faculty.status === "On Leave").length === 0 ? (
                <p className="text-sm text-slate-500">No faculty currently on leave.</p>
              ) : (
                adminFaculty
                  .filter((faculty) => faculty.status === "On Leave")
                  .map((faculty) => (
                    <div key={faculty.id} className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">
                      {faculty.name} — {faculty.department}
                    </div>
                  ))
              )}
            </div>
          </SectionCard>
        </div>
      </section>

      <section className="mt-6">
        <SectionCard
          title="Recent reports"
          subtitle="Latest generated summaries"
          actions={
            <Link href="/admin/reports" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
              View all reports &rarr;
            </Link>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {reportItems.slice(0, 3).map((report) => (
              <div key={report.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{report.scope}</p>
                <p className="mt-2 font-semibold text-slate-900">{report.title}</p>
                <p className="mt-1 text-sm text-slate-500">Last generated {report.lastGenerated}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
