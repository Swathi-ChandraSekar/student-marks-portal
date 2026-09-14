"use client";

import { useMemo, useState } from "react";

import { StatCard } from "@/components/dashboard/StatCard";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/portal/Badge";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { FilterSelect } from "@/components/portal/FilterSelect";
import { SectionCard } from "@/components/portal/SectionCard";
import { getSubjectStudentDetails, getSubjectSummaries } from "@/lib/analytics";
import { roster } from "@/data/roster";
import type { SubjectStudentDetailRow, SubjectSummary } from "@/types/roster";

const summaryColumns: DataTableColumn<SubjectSummary>[] = [
  { key: "subjectCode", header: "Subject Code", render: (row) => row.subjectCode },
  { key: "subjectName", header: "Subject", render: (row) => <span className="font-semibold text-slate-900">{row.subjectName}</span> },
  { key: "facultyName", header: "Faculty", render: (row) => row.facultyName },
  { key: "totalAppearances", header: "Appearances", align: "right", render: (row) => row.totalAppearances },
  { key: "at2Pass", header: "Pass Count", align: "right", render: (row) => row.at2PassCount },
  { key: "at2Fail", header: "Fail Count", align: "right", render: (row) => row.at2FailCount },
  { key: "at2PassPct", header: "Pass %", align: "right", render: (row) => `${row.at2PassPercentage}%` },
  { key: "at2FailPct", header: "Fail %", align: "right", render: (row) => `${Number((100 - row.at2PassPercentage).toFixed(1))}%` },
];

const detailColumns: DataTableColumn<SubjectStudentDetailRow>[] = [
  { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
  { key: "studentName", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.studentName}</span> },
  { key: "gender", header: "Gender", render: (row) => row.gender },
  { key: "batchCode", header: "Batch", render: (row) => row.batchCode },
  { key: "section", header: "Section", render: (row) => row.section },
  { key: "hostelStatus", header: "Hosteller / Day Scholar", render: (row) => row.hostelStatus },
  { key: "at1", header: "AT-1", align: "right", render: (row) => row.at1 },
  { key: "at1Status", header: "AT-1 Status", render: (row) => <Badge label={row.at1Pass ? "Pass" : "Fail"} variant={row.at1Pass ? "success" : "danger"} /> },
  { key: "at2", header: "AT-2", align: "right", render: (row) => row.at2 },
  { key: "at2Status", header: "AT-2 Status", render: (row) => <Badge label={row.at2Pass ? "Pass" : "Fail"} variant={row.at2Pass ? "success" : "danger"} /> },
  {
    key: "slowLearner",
    header: "Slow Learner",
    render: (row) => (row.isSlowLearner ? <Badge label="Slow Learner" variant="warning" /> : <span className="text-slate-400">—</span>),
  },
];

/**
 * Admin — Subject Analysis (/admin/subject-analysis)
 *
 * Institution-wide subject performance summary (based on the AT-2 pass
 * rule), with a subject selector that drills into the full student list —
 * demographics plus AT-1/AT-2 marks, status and slow-learner flag — for
 * whichever subject is selected. All figures are computed from `roster`.
 */
export default function AdminSubjectAnalysisPage() {
  const subjectSummaries = useMemo(() => getSubjectSummaries(roster), []);
  const [selectedSubject, setSelectedSubject] = useState(subjectSummaries[0]?.subjectCode ?? "");

  const selectedSummary = subjectSummaries.find((subject) => subject.subjectCode === selectedSubject);
  const detailRows = useMemo(
    () => (selectedSubject ? getSubjectStudentDetails(roster, selectedSubject) : []),
    [selectedSubject],
  );

  return (
    <>
      <Topbar eyebrow="Admin portal" title="Subject Analysis" subtitle="AT-2 pass/fail performance across every subject" />

      <SectionCard
        title="Subject-wise performance summary"
        subtitle="Exam appearances, pass/fail counts and percentages, based on the AT-2 pass rule (>=25)"
        className="mb-6"
      >
        <DataTable columns={summaryColumns} rows={subjectSummaries} getRowKey={(row) => row.subjectCode} />
      </SectionCard>

      <SectionCard
        title="Student list for selected subject"
        subtitle={selectedSummary ? `${selectedSummary.subjectCode} — ${selectedSummary.subjectName}` : "Select a subject"}
        actions={
          <FilterSelect
            label="Subject"
            value={selectedSubject}
            onChange={setSelectedSubject}
            options={subjectSummaries.map((subject) => subject.subjectCode)}
          />
        }
      >
        {selectedSummary ? (
          <>
            <div className="mb-5 grid gap-4 sm:grid-cols-3">
              <StatCard title="Appearances" value={String(selectedSummary.totalAppearances)} detail={`${selectedSummary.batchCodes.join(", ")}`} accent="from-sky-500 to-indigo-500" />
              <StatCard title="AT-2 Pass %" value={`${selectedSummary.at2PassPercentage}%`} detail={`${selectedSummary.at2PassCount} pass / ${selectedSummary.at2FailCount} fail`} accent="from-emerald-500 to-teal-500" />
              <StatCard title="Faculty" value={selectedSummary.facultyName} detail="Assigned in mock data" accent="from-violet-500 to-purple-500" />
            </div>
            <DataTable columns={detailColumns} rows={detailRows} getRowKey={(row) => row.registerNumber} />
          </>
        ) : (
          <p className="text-sm text-slate-500">No subjects available.</p>
        )}
      </SectionCard>
    </>
  );
}
