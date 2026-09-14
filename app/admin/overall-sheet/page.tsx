"use client";

import { useMemo, useState } from "react";

import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { ArrearBadge, PerformanceBadges } from "@/components/portal/PerformanceBadges";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { FilterSelect } from "@/components/portal/FilterSelect";
import { SectionCard } from "@/components/portal/SectionCard";
import {
  calculateGroupStats,
  getFailedSubjectCount,
  getStudentPerformance,
} from "@/lib/analytics";
import { batches } from "@/data/admin";
import { roster } from "@/data/roster";
import type { RosterStudent } from "@/types/roster";

/**
 * Admin — Overall Sheet (/admin/overall-sheet)
 *
 * Consolidated per-student academic sheet: register number, demographics,
 * subject-wise AT-1/AT-2 marks, failed subject count, overall AT-2 based
 * result and slow-learner status. When a single batch is selected the
 * subject columns become that batch's actual subjects (every student in a
 * batch shares the same subject list in the mock roster); the "All
 * batches" view instead lists each student's AT-1/AT-2 marks compactly
 * since batches carry different subject sets. Nothing here is hardcoded —
 * every value is derived from `roster` via `lib/analytics.ts`.
 */
export default function AdminOverallSheetPage() {
  const [batchFilter, setBatchFilter] = useState("All");
  const [hostelFilter, setHostelFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");

  const filteredRoster = useMemo(() => {
    return roster.filter((student) => {
      const batchMatch = batchFilter === "All" || student.batchCode === batchFilter;
      const hostelMatch = hostelFilter === "All" || student.hostelStatus === hostelFilter;
      const resultMatch =
        resultFilter === "All" ||
        (resultFilter === "Pass" && getStudentPerformance(student).overallPass) ||
        (resultFilter === "Fail" && !getStudentPerformance(student).overallPass);
      return batchMatch && hostelMatch && resultMatch;
    });
  }, [batchFilter, hostelFilter, resultFilter]);

  const groupStats = useMemo(() => calculateGroupStats(filteredRoster), [filteredRoster]);

  const slowLearnerCount = useMemo(
    () => filteredRoster.filter((student) => getStudentPerformance(student).isSlowLearner).length,
    [filteredRoster],
  );

  const singleBatchSubjects = useMemo(() => {
    if (batchFilter === "All" || filteredRoster.length === 0) {
      return [];
    }
    return filteredRoster[0].subjects.map((subject) => ({
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
    }));
  }, [batchFilter, filteredRoster]);

  const columns: DataTableColumn<RosterStudent>[] = useMemo(() => {
    const baseColumns: DataTableColumn<RosterStudent>[] = [
      { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
      {
        key: "name",
        header: "Name",
        render: (row) => <span className="font-semibold text-slate-900">{row.name}</span>,
      },
      { key: "gender", header: "Gender", render: (row) => row.gender },
      { key: "batchCode", header: "Batch", render: (row) => row.batchCode },
      { key: "department", header: "Department", render: (row) => row.department },
      { key: "section", header: "Section", render: (row) => row.section },
      { key: "hostelStatus", header: "Hosteller / Day Scholar", render: (row) => row.hostelStatus },
      { key: "attendance", header: "Attendance", align: "right", render: (row) => `${row.attendancePercentage}%` },
    ];

    const subjectColumns: DataTableColumn<RosterStudent>[] =
      singleBatchSubjects.length > 0
        ? singleBatchSubjects.flatMap((subject) => [
            {
              key: `${subject.subjectCode}-at1`,
              header: `${subject.subjectCode} AT-1`,
              align: "right" as const,
              render: (row: RosterStudent) =>
                row.subjects.find((s) => s.subjectCode === subject.subjectCode)?.at1 ?? "—",
            },
            {
              key: `${subject.subjectCode}-at2`,
              header: `${subject.subjectCode} AT-2`,
              align: "right" as const,
              render: (row: RosterStudent) =>
                row.subjects.find((s) => s.subjectCode === subject.subjectCode)?.at2 ?? "—",
            },
          ])
        : [
            {
              key: "at1Marks",
              header: "AT-1 Marks",
              render: (row: RosterStudent) => (
                <span className="text-xs text-slate-600">
                  {row.subjects.map((subject) => `${subject.subjectCode}: ${subject.at1}`).join(", ")}
                </span>
              ),
            },
            {
              key: "at2Marks",
              header: "AT-2 Marks",
              render: (row: RosterStudent) => (
                <span className="text-xs text-slate-600">
                  {row.subjects.map((subject) => `${subject.subjectCode}: ${subject.at2}`).join(", ")}
                </span>
              ),
            },
          ];

    const resultColumns: DataTableColumn<RosterStudent>[] = [
      {
        key: "failedSubjects",
        header: "Failed Subjects",
        align: "right",
        render: (row) => {
          const count = getFailedSubjectCount(row);
          return (
            <span className={count > 0 ? "font-semibold text-rose-600" : "text-slate-500"}>{count}</span>
          );
        },
      },
      {
        key: "overallPerformance",
        header: "Overall Performance",
        render: (row) => <PerformanceBadges performance={getStudentPerformance(row)} />,
      },
      { key: "arrear", header: "Arrear Status", render: (row) => <ArrearBadge status={row.arrearStatus} /> },
    ];

    return [...baseColumns, ...subjectColumns, ...resultColumns];
  }, [singleBatchSubjects]);

  return (
    <>
      <Topbar
        eyebrow="Admin portal"
        title="Overall Sheet"
        subtitle={`${filteredRoster.length} of ${roster.length} students`}
      />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Students Shown" value={String(groupStats.total)} detail="Matching current filters" accent="from-violet-500 to-purple-500" />
        <StatCard title="Overall Pass" value={String(groupStats.passCount)} detail={`${groupStats.passPercentage}% pass rate`} accent="from-emerald-500 to-teal-500" />
        <StatCard title="Overall Fail" value={String(groupStats.failCount)} detail="At least one subject <25 on AT-2" accent="from-rose-500 to-red-500" />
        <StatCard title="Slow Learners" value={String(slowLearnerCount)} detail="Any subject below 30 on AT-2" accent="from-amber-500 to-orange-500" />
      </section>

      <SectionCard
        title="Overall academic sheet"
        subtitle={
          batchFilter === "All"
            ? "Select a single batch to see subject-wise AT-1/AT-2 columns"
            : `Subject-wise AT-1 / AT-2 marks for ${batchFilter}`
        }
        actions={
          <div className="flex flex-wrap items-end gap-3">
            <FilterSelect
              label="Batch"
              value={batchFilter}
              onChange={setBatchFilter}
              options={["All", ...batches.map((batch) => batch.batchCode)]}
            />
            <FilterSelect
              label="Hosteller / Day Scholar"
              value={hostelFilter}
              onChange={setHostelFilter}
              options={["All", "Hosteller", "Day Scholar"]}
            />
            <FilterSelect
              label="Overall result"
              value={resultFilter}
              onChange={setResultFilter}
              options={["All", "Pass", "Fail"]}
            />
          </div>
        }
      >
        <DataTable columns={columns} rows={filteredRoster} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
