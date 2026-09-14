import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { ArrearBadge, PerformanceBadges } from "@/components/portal/PerformanceBadges";
import { ComparisonBarChart } from "@/components/portal/ComparisonBarChart";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import {
  getBoysStats,
  getBoysStudents,
  getGirlsStats,
  getGirlsStudents,
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

export default function BoysGirlsPage() {
  const boys = getBoysStudents(roster);
  const girls = getGirlsStudents(roster);
  const boysStats = getBoysStats(roster);
  const girlsStats = getGirlsStats(roster);

  return (
    <>
      <Topbar eyebrow="Admin portal" title="Boys / Girls Analytics" subtitle={`${roster.length} students in the mock roster`} />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Boys" value={String(boysStats.total)} detail="Currently in mock roster" accent="from-sky-500 to-indigo-500" />
        <StatCard title="Total Girls" value={String(girlsStats.total)} detail="Currently in mock roster" accent="from-rose-500 to-pink-500" />
        <StatCard title="Boys Pass %" value={`${boysStats.passPercentage}%`} detail={`${boysStats.passCount} pass / ${boysStats.failCount} fail`} accent="from-emerald-500 to-teal-500" />
        <StatCard title="Girls Pass %" value={`${girlsStats.passPercentage}%`} detail={`${girlsStats.passCount} pass / ${girlsStats.failCount} fail`} accent="from-amber-500 to-orange-500" />
      </section>

      <SectionCard title="Pass percentage comparison" subtitle="Overall AT-2 based pass rate, boys vs girls" className="mb-6">
        <ComparisonBarChart
          items={[
            { label: "Boys", value: boysStats.passPercentage, detail: `${boysStats.passCount}/${boysStats.total} pass`, accent: "from-sky-500 to-indigo-500" },
            { label: "Girls", value: girlsStats.passPercentage, detail: `${girlsStats.passCount}/${girlsStats.total} pass`, accent: "from-rose-500 to-pink-500" },
          ]}
        />
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Boys" subtitle={`${boys.length} students`}>
          <DataTable columns={columns} rows={boys} getRowKey={(row) => row.id} />
        </SectionCard>

        <SectionCard title="Girls" subtitle={`${girls.length} students`}>
          <DataTable columns={columns} rows={girls} getRowKey={(row) => row.id} />
        </SectionCard>
      </div>
    </>
  );
}
