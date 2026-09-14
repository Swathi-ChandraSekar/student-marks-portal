import Link from "next/link";

import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { studentProfile } from "@/data/student";

export default function DashboardPage() {
  const totalMarks = studentProfile.subjects.reduce(
    (sum, subject) => sum + subject.assessments[subject.assessments.length - 1].total,
    0,
  );

  const averageScore = (totalMarks / studentProfile.subjects.length).toFixed(1);

  return (
    <>
      <Topbar title="Student Dashboard" subtitle={`${studentProfile.currentSemester} • ${studentProfile.academicYear}`} />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Student"
          value={studentProfile.studentName}
          detail={`${studentProfile.registerNumber} • ${studentProfile.department}`}
          accent="from-sky-500 to-indigo-500"
        />
        <StatCard
          title="Attendance"
          value={`${studentProfile.attendanceRate}%`}
          detail="Course attendance this semester"
          accent="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="CGPA"
          value={studentProfile.overallCgpa}
          detail="Overall academic performance"
          accent="from-violet-500 to-purple-500"
        />
        <StatCard
          title="Fees"
          value="Paid"
          detail={studentProfile.feeStatus}
          accent="from-amber-500 to-orange-500"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Academic summary</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Semester overview</h2>
            </div>
            <div className="rounded-full bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-700">
              {averageScore}/50 avg
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Department</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{studentProfile.department}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Current semester</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{studentProfile.currentSemester}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Academic year</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{studentProfile.academicYear}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Quick links</p>
          <div className="mt-4 space-y-3">
            <Link
              href="/dashboard/marks"
              className="flex items-center justify-between rounded-2xl bg-sky-50 px-4 py-3 text-sky-800 transition hover:bg-sky-100"
            >
              <span className="font-semibold">Marks</span>
              <span>→</span>
            </Link>
            <Link
              href="/dashboard/attendance"
              className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-800 transition hover:bg-emerald-100"
            >
              <span className="font-semibold">Attendance</span>
              <span>→</span>
            </Link>
            <Link
              href="/dashboard/fees"
              className="flex items-center justify-between rounded-2xl bg-amber-50 px-4 py-3 text-amber-800 transition hover:bg-amber-100"
            >
              <span className="font-semibold">Fees</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
