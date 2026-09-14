"use client";

import { useMemo, useState } from "react";

import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/portal/Badge";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { FilterSelect } from "@/components/portal/FilterSelect";
import { SectionCard } from "@/components/portal/SectionCard";
import {
  getAllSubjects,
  getStudentCumulativeTotals,
  getSubjectCumulativeRows,
  getSubjectSummaries,
} from "@/lib/analytics";
import { batches } from "@/data/admin";
import { roster } from "@/data/roster";
import type { SubjectCumulativeRow, SubjectSummary } from "@/types/roster";

const trendVariant: Record<SubjectCumulativeRow["trend"], "success" | "danger" | "neutral"> = {
  Improved: "success",
  Declined: "danger",
  Same: "neutral",
};

const cumulativeColumns: DataTableColumn<SubjectCumulativeRow>[] = [
  { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
  {
    key: "studentName",
    header: "Name",
    render: (row) => <span className="font-semibold text-slate-900">{row.studentName}</span>,
  },
  { key: "subject", header: "Subject", render: (row) => `${row.subjectCode} — ${row.subjectName}` },
  { key: "at1", header: "AT-1", align: "right", render: (row) => row.at1 },
  {
    key: "at1Status",
    header: "AT-1 Status",
    render: (row) => <Badge label={row.at1Pass ? "Pass" : "Fail"} variant={row.at1Pass ? "success" : "danger"} />,
  },
  { key: "at2", header: "AT-2", align: "right", render: (row) => row.at2 },
  {
    key: "at2Status",
    header: "AT-2 Status",
    render: (row) => <Badge label={row.at2Pass ? "Pass" : "Fail"} variant={row.at2Pass ? "success" : "danger"} />,
  },
  {
    key: "slowLearner",
    header: "Slow Learner",
    render: (row) => (row.at2SlowLearner ? <Badge label="Slow Learner" variant="warning" /> : <span className="text-slate-400">—</span>),
  },
  {
    key: "trend",
    header: "AT-1 → AT-2",
    render: (row) => (
      <Badge
        label={row.trend === "Same" ? "No change" : `${row.trend} (${row.difference > 0 ? "+" : ""}${row.difference})`}
        variant={trendVariant[row.trend]}
      />
    ),
  },
];

function subjectSummaryColumns(): DataTableColumn<SubjectSummary>[] {
  return [
    { key: "subjectCode", header: "Subject Code", render: (row) => row.subjectCode },
    {
      key: "subjectName",
      header: "Subject",
      render: (row) => <span className="font-semibold text-slate-900">{row.subjectName}</span>,
    },
    { key: "facultyName", header: "Faculty", render: (row) => row.facultyName },
    { key: "totalAppearances", header: "Appearances", align: "right", render: (row) => row.totalAppearances },
    { key: "at1Pass", header: "AT-1 Pass", align: "right", render: (row) => row.at1PassCount },
    { key: "at1Fail", header: "AT-1 Fail", align: "right", render: (row) => row.at1FailCount },
    { key: "at1PassPct", header: "AT-1 Pass %", align: "right", render: (row) => `${row.at1PassPercentage}%` },
    { key: "at2Pass", header: "AT-2 Pass", align: "right", render: (row) => row.at2PassCount },
    { key: "at2Fail", header: "AT-2 Fail", align: "right", render: (row) => row.at2FailCount },
    { key: "at2PassPct", header: "AT-2 Pass %", align: "right", render: (row) => `${row.at2PassPercentage}%` },
  ];
}

/**
 * Admin — Cumulative Sheet (/admin/cumulative-sheet)
 *
 * Shows raw AT-1 and AT-2 marks side by side for every student/subject
 * pairing (nothing is replaced by calculated values), plus a per-student
 * AT-1/AT-2 total & average roll-up and a Subject-wise Cumulative Analysis
 * section. Every figure is computed from `roster` via `lib/analytics.ts`.
 */
export default function AdminCumulativeSheetPage() {
  const [batchFilter, setBatchFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const filteredStudents = useMemo(
    () => (batchFilter === "All" ? roster : roster.filter((student) => student.batchCode === batchFilter)),
    [batchFilter],
  );

  const subjectOptions = useMemo(() => getAllSubjects(filteredStudents), [filteredStudents]);

  const cumulativeRows = useMemo(
    () => getSubjectCumulativeRows(filteredStudents, subjectFilter === "All" ? undefined : subjectFilter),
    [filteredStudents, subjectFilter],
  );

  const subjectSummaries = useMemo(() => getSubjectSummaries(filteredStudents), [filteredStudents]);

  const studentTotals = useMemo(
    () => filteredStudents.map((student) => getStudentCumulativeTotals(student)),
    [filteredStudents],
  );

  const cohortAt1Average = useMemo(() => {
    if (studentTotals.length === 0) return 0;
    return Number((studentTotals.reduce((sum, row) => sum + row.at1Average, 0) / studentTotals.length).toFixed(1));
  }, [studentTotals]);

  const cohortAt2Average = useMemo(() => {
    if (studentTotals.length === 0) return 0;
    return Number((studentTotals.reduce((sum, row) => sum + row.at2Average, 0) / studentTotals.length).toFixed(1));
  }, [studentTotals]);

  const improvedCount = studentTotals.filter((row) => row.improvement > 0).length;
  const declinedCount = studentTotals.filter((row) => row.improvement < 0).length;

  return (
    <>
      <Topbar
        eyebrow="Admin portal"
        title="Cumulative Sheet"
        subtitle="AT-1 vs AT-2 performance across every subject"
      />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Cohort AT-1 Average" value={String(cohortAt1Average)} detail="Per-student subject average" accent="from-sky-500 to-indigo-500" />
        <StatCard title="Cohort AT-2 Average" value={String(cohortAt2Average)} detail="Per-student subject average" accent="from-violet-500 to-purple-500" />
        <StatCard title="Students Improved" value={String(improvedCount)} detail="AT-2 average higher than AT-1" accent="from-emerald-500 to-teal-500" />
        <StatCard title="Students Declined" value={String(declinedCount)} detail="AT-2 average lower than AT-1" accent="from-rose-500 to-red-500" />
      </section>

      <SectionCard
        title="AT-1 vs AT-2 — raw marks"
        subtitle="One row per student per subject. Raw marks always remain visible."
        className="mb-6"
        actions={
          <div className="flex flex-wrap items-end gap-3">
            <FilterSelect
              label="Batch"
              value={batchFilter}
              onChange={(value) => {
                setBatchFilter(value);
                setSubjectFilter("All");
              }}
              options={["All", ...batches.map((batch) => batch.batchCode)]}
            />
            <FilterSelect
              label="Subject"
              value={subjectFilter}
              onChange={setSubjectFilter}
              options={["All", ...subjectOptions.map((subject) => subject.subjectCode)]}
            />
          </div>
        }
      >
        <DataTable columns={cumulativeColumns} rows={cumulativeRows} getRowKey={(row, index) => `${row.registerNumber}-${row.subjectCode}-${index}`} />
      </SectionCard>

      <SectionCard
        title="Student AT-1 / AT-2 totals"
        subtitle="Sum and average across each student's own subjects, plus AT-1 → AT-2 improvement"
        className="mb-6"
      >
        <DataTable
          columns={[
            { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
            { key: "studentName", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.studentName}</span> },
            { key: "at1Total", header: "AT-1 Total", align: "right", render: (row) => row.at1Total },
            { key: "at1Average", header: "AT-1 Average", align: "right", render: (row) => row.at1Average },
            { key: "at2Total", header: "AT-2 Total", align: "right", render: (row) => row.at2Total },
            { key: "at2Average", header: "AT-2 Average", align: "right", render: (row) => row.at2Average },
            {
              key: "improvement",
              header: "Improvement",
              align: "right",
              render: (row) => (
                <span className={row.improvement > 0 ? "font-semibold text-emerald-600" : row.improvement < 0 ? "font-semibold text-rose-600" : "text-slate-500"}>
                  {row.improvement > 0 ? "+" : ""}
                  {row.improvement}
                </span>
              ),
            },
          ]}
          rows={studentTotals}
          getRowKey={(row) => row.registerNumber}
        />
      </SectionCard>

      <SectionCard
        title="Subject-wise cumulative analysis"
        subtitle="AT-1 and AT-2 pass/fail counts and percentages, per subject"
      >
        <DataTable columns={subjectSummaryColumns()} rows={subjectSummaries} getRowKey={(row) => row.subjectCode} />
      </SectionCard>
    </>
  );
}
