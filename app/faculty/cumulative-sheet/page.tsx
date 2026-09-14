"use client";

import { useMemo, useState } from "react";

import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/portal/Badge";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { FilterSelect } from "@/components/portal/FilterSelect";
import { SectionCard } from "@/components/portal/SectionCard";
import {
  getFacultyAssignedSubjectCodes,
  getFacultyStudents,
  getStudentCumulativeTotals,
  getSubjectCumulativeRows,
  getSubjectSummaries,
} from "@/lib/analytics";
import { facultyProfile } from "@/data/faculty";
import { roster } from "@/data/roster";
import type { SubjectCumulativeRow } from "@/types/roster";

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

/**
 * Faculty — Cumulative Sheet (/faculty/cumulative-sheet)
 *
 * Same AT-1 vs AT-2 cumulative view as the Admin page, but scoped only to
 * subjects assigned to this faculty member (`facultyProfile.subjects`) that
 * exist in the mock roster — faculty never see the full institution dataset.
 */
export default function FacultyCumulativeSheetPage() {
  const assignedSubjectCodes = useMemo(() => getFacultyAssignedSubjectCodes(facultyProfile, roster), []);
  const [subjectFilter, setSubjectFilter] = useState("All");

  const facultyStudents = useMemo(() => getFacultyStudents(facultyProfile, roster), []);

  // Restrict every student's subject list to this faculty's assigned subjects only.
  const scopedStudents = useMemo(
    () =>
      facultyStudents.map((student) => ({
        ...student,
        subjects: student.subjects.filter((subject) => assignedSubjectCodes.includes(subject.subjectCode)),
      })),
    [facultyStudents, assignedSubjectCodes],
  );

  const cumulativeRows = useMemo(
    () => getSubjectCumulativeRows(scopedStudents, subjectFilter === "All" ? undefined : subjectFilter),
    [scopedStudents, subjectFilter],
  );

  const subjectSummaries = useMemo(() => getSubjectSummaries(scopedStudents), [scopedStudents]);

  const studentTotals = useMemo(
    () => scopedStudents.map((student) => getStudentCumulativeTotals(student)),
    [scopedStudents],
  );

  const cohortAt1Average = useMemo(() => {
    if (studentTotals.length === 0) return 0;
    return Number((studentTotals.reduce((sum, row) => sum + row.at1Average, 0) / studentTotals.length).toFixed(1));
  }, [studentTotals]);

  const cohortAt2Average = useMemo(() => {
    if (studentTotals.length === 0) return 0;
    return Number((studentTotals.reduce((sum, row) => sum + row.at2Average, 0) / studentTotals.length).toFixed(1));
  }, [studentTotals]);

  if (assignedSubjectCodes.length === 0) {
    return (
      <>
        <Topbar eyebrow="Faculty portal" title="Cumulative Sheet" subtitle={facultyProfile.name} />
        <SectionCard title="No assigned subjects in the mock roster" subtitle="This faculty member's subjects have no matching AT-1/AT-2 data yet.">
          <p className="text-sm text-slate-500">Nothing to show — check back once roster marks are added for this faculty&apos;s subjects.</p>
        </SectionCard>
      </>
    );
  }

  return (
    <>
      <Topbar
        eyebrow="Faculty portal"
        title="Cumulative Sheet"
        subtitle={`${facultyProfile.name} — ${assignedSubjectCodes.join(", ")}`}
      />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Your Students" value={String(scopedStudents.length)} detail="Enrolled in your subjects" accent="from-emerald-500 to-teal-500" />
        <StatCard title="AT-1 Average" value={String(cohortAt1Average)} detail="Across your subjects" accent="from-sky-500 to-indigo-500" />
        <StatCard title="AT-2 Average" value={String(cohortAt2Average)} detail="Across your subjects" accent="from-violet-500 to-purple-500" />
        <StatCard title="Subjects" value={String(assignedSubjectCodes.length)} detail="Assigned to you in the mock roster" accent="from-amber-500 to-orange-500" />
      </section>

      <SectionCard
        title="AT-1 vs AT-2 — raw marks"
        subtitle="One row per student per subject you teach. Raw marks always remain visible."
        className="mb-6"
        actions={
          <FilterSelect
            label="Subject"
            value={subjectFilter}
            onChange={setSubjectFilter}
            options={["All", ...assignedSubjectCodes]}
          />
        }
      >
        <DataTable columns={cumulativeColumns} rows={cumulativeRows} getRowKey={(row, index) => `${row.registerNumber}-${row.subjectCode}-${index}`} />
      </SectionCard>

      <SectionCard
        title="Student AT-1 / AT-2 totals"
        subtitle="Sum and average across your subjects for each student, plus AT-1 → AT-2 improvement"
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
        subtitle="AT-1 and AT-2 pass/fail counts and percentages, per subject you teach"
      >
        <DataTable
          columns={[
            { key: "subjectCode", header: "Subject Code", render: (row) => row.subjectCode },
            { key: "subjectName", header: "Subject", render: (row) => <span className="font-semibold text-slate-900">{row.subjectName}</span> },
            { key: "totalAppearances", header: "Appearances", align: "right", render: (row) => row.totalAppearances },
            { key: "at1Pass", header: "AT-1 Pass", align: "right", render: (row) => row.at1PassCount },
            { key: "at1Fail", header: "AT-1 Fail", align: "right", render: (row) => row.at1FailCount },
            { key: "at1PassPct", header: "AT-1 Pass %", align: "right", render: (row) => `${row.at1PassPercentage}%` },
            { key: "at2Pass", header: "AT-2 Pass", align: "right", render: (row) => row.at2PassCount },
            { key: "at2Fail", header: "AT-2 Fail", align: "right", render: (row) => row.at2FailCount },
            { key: "at2PassPct", header: "AT-2 Pass %", align: "right", render: (row) => `${row.at2PassPercentage}%` },
          ]}
          rows={subjectSummaries}
          getRowKey={(row) => row.subjectCode}
        />
      </SectionCard>
    </>
  );
}
