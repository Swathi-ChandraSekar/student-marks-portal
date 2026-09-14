import { AttendanceCard } from "@/components/attendance/AttendanceCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { studentProfile } from "@/data/student";

export default function AttendancePage() {
  const { attendanceSummary } = studentProfile;

  return (
    <div>
      <Topbar title="Attendance" subtitle={`${studentProfile.currentSemester} • ${studentProfile.academicYear}`} />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Overall"
          value={`${attendanceSummary.overallPercentage}%`}
          detail="Attendance percentage"
          accent="from-sky-500 to-indigo-500"
        />
        <StatCard
          title="Conducted"
          value={String(attendanceSummary.totalClassesConducted)}
          detail="Total classes conducted"
          accent="from-violet-500 to-purple-500"
        />
        <StatCard
          title="Attended"
          value={String(attendanceSummary.totalClassesAttended)}
          detail="Classes attended"
          accent="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Absent"
          value={String(attendanceSummary.totalClassesAbsent)}
          detail="Classes missed"
          accent="from-amber-500 to-orange-500"
        />
      </section>

      <div className="space-y-5">
        {attendanceSummary.subjectBreakdown.map((record) => (
          <AttendanceCard key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
}
