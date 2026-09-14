import Link from "next/link";

import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { SectionCard } from "@/components/portal/SectionCard";
import { attendanceRows, facultyProfile, internalMarks } from "@/data/faculty";

const quickLinks = [
  { label: "Student List", href: "/faculty/student-list", accent: "bg-sky-50 text-sky-800 hover:bg-sky-100" },
  { label: "Internal Marks", href: "/faculty/internal-marks", accent: "bg-violet-50 text-violet-800 hover:bg-violet-100" },
  { label: "Attendance", href: "/faculty/attendance", accent: "bg-emerald-50 text-emerald-800 hover:bg-emerald-100" },
  { label: "Subject Analysis", href: "/faculty/subject-analysis", accent: "bg-amber-50 text-amber-800 hover:bg-amber-100" },
] as const;

export default function FacultyDashboardPage() {
  const totalStudents = internalMarks.length;
  const averageAttendance = Math.round(
    attendanceRows.reduce((sum, row) => sum + row.attendancePercentage, 0) / attendanceRows.length,
  );

  return (
    <>
      <Topbar eyebrow="Faculty portal" title={`Welcome, ${facultyProfile.name}`} subtitle={facultyProfile.department} />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Subjects" value={String(facultyProfile.subjects.length)} detail="Assigned this semester" accent="from-sky-500 to-indigo-500" />
        <StatCard title="Students" value={String(totalStudents)} detail="Enrolled across subjects" accent="from-emerald-500 to-teal-500" />
        <StatCard title="Avg. Attendance" value={`${averageAttendance}%`} detail="Across your classes" accent="from-violet-500 to-purple-500" />
        <StatCard title="Designation" value={facultyProfile.designation} detail={facultyProfile.employeeId} accent="from-amber-500 to-orange-500" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <SectionCard title="Your subjects" subtitle="Assigned subjects and batch sections for this semester">
          <div className="space-y-3">
            {facultyProfile.subjects.map((subject) => (
              <div key={subject.id} className="flex flex-col gap-2 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    {subject.subjectCode} — {subject.subjectName}
                  </p>
                  <p className="text-sm text-slate-500">
                    {subject.department} • {subject.yearSemester}
                  </p>
                </div>
                <div className="text-sm text-slate-600">
                  {subject.batchSection} • {subject.studentsEnrolled} students
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

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
      </section>
    </>
  );
}
