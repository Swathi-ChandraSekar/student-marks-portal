import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { ArrearBadge, PerformanceBadges } from "@/components/portal/PerformanceBadges";
import { ComparisonBarChart } from "@/components/portal/ComparisonBarChart";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import {
  getDayScholarStats,
  getDayScholarStudents,
  getHostellerStats,
  getHostellerStudents,
  getStudentPerformance,
} from "@/lib/analytics";
import { roster } from "@/data/roster";
import type { RosterStudent } from "@/types/roster";

const columns: DataTableColumn<RosterStudent>[] = [
  { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
  { key: "name", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
  { key: "batch", header: "Batch", render: (row) => row.batchCode },
  { key: "department", header: "Department", render: (row) => row.department },
  { key: "attendance", header: "Attendance", align: "right", render: (row) => `${row.attendancePercentage}%` },
  {
    key: "performance",
    header: "Performance",
    render: (row) => <PerformanceBadges performance={getStudentPerformance(row)} />,
  },
  { key: "arrear", header: "Arrear Status", render: (row) => <ArrearBadge status={row.arrearStatus} /> },
];

export default function HostellerDayScholarPage() {
  const hostellers = getHostellerStudents(roster);
  const dayScholars = getDayScholarStudents(roster);
  const hostellerStats = getHostellerStats(roster);
  const dayScholarStats = getDayScholarStats(roster);

  return (
    <>
      <Topbar
        eyebrow="Admin portal"
        title="Hosteller / Day Scholar Analytics"
        subtitle={`${roster.length} students in the mock roster`}
      />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Hostellers" value={String(hostellerStats.total)} detail="Currently in mock roster" accent="from-violet-500 to-purple-500" />
        <StatCard title="Total Day Scholars" value={String(dayScholarStats.total)} detail="Currently in mock roster" accent="from-sky-500 to-indigo-500" />
        <StatCard title="Hosteller Pass %" value={`${hostellerStats.passPercentage}%`} detail={`${hostellerStats.passCount} pass / ${hostellerStats.failCount} fail`} accent="from-emerald-500 to-teal-500" />
        <StatCard title="Day Scholar Pass %" value={`${dayScholarStats.passPercentage}%`} detail={`${dayScholarStats.passCount} pass / ${dayScholarStats.failCount} fail`} accent="from-amber-500 to-orange-500" />
      </section>

      <SectionCard title="Pass percentage comparison" subtitle="Overall AT-2 based pass rate, hostellers vs day scholars" className="mb-6">
        <ComparisonBarChart
          items={[
            { label: "Hostellers", value: hostellerStats.passPercentage, detail: `${hostellerStats.passCount}/${hostellerStats.total} pass`, accent: "from-violet-500 to-purple-500" },
            { label: "Day Scholars", value: dayScholarStats.passPercentage, detail: `${dayScholarStats.passCount}/${dayScholarStats.total} pass`, accent: "from-sky-500 to-indigo-500" },
          ]}
        />
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Hosteller students" subtitle={`${hostellers.length} students`}>
          <DataTable columns={columns} rows={hostellers} getRowKey={(row) => row.id} />
        </SectionCard>

        <SectionCard title="Day Scholar students" subtitle={`${dayScholars.length} students`}>
          <DataTable columns={columns} rows={dayScholars} getRowKey={(row) => row.id} />
        </SectionCard>
      </div>
    </>
  );
}
