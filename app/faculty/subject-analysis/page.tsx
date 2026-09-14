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
  getSubjectStudentDetails,
  getSubjectSummary,
} from "@/lib/analytics";
import { facultyProfile } from "@/data/faculty";
import { roster } from "@/data/roster";
import type { SubjectStudentDetailRow } from "@/types/roster";

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
 * Faculty — Subject Analysis (/faculty/subject-analysis)
 *
 * Mirrors the Admin Subject Analysis page but is restricted to this
 * faculty member's own subject(s) in the mock roster — the faculty portal
 * never exposes the full Admin dataset.
 */
export default function FacultySubjectAnalysisPage() {
  const assignedSubjectCodes = useMemo(() => getFacultyAssignedSubjectCodes(facultyProfile, roster), []);
  const [selectedSubject, setSelectedSubject] = useState(assignedSubjectCodes[0] ?? "");

  const selectedSummary = selectedSubject ? getSubjectSummary(roster, selectedSubject) : null;
  const detailRows = useMemo(
    () => (selectedSubject ? getSubjectStudentDetails(roster, selectedSubject) : []),
    [selectedSubject],
  );

  if (assignedSubjectCodes.length === 0) {
    return (
      <>
        <Topbar eyebrow="Faculty portal" title="Subject Analysis" subtitle={facultyProfile.name} />
        <SectionCard title="No assigned subjects in the mock roster" subtitle="This faculty member's subjects have no matching AT-1/AT-2 data yet.">
          <p className="text-sm text-slate-500">Nothing to show — check back once roster marks are added for this faculty&apos;s subjects.</p>
        </SectionCard>
      </>
    );
  }

  return (
    <>
      <Topbar eyebrow="Faculty portal" title="Subject Analysis" subtitle={`${facultyProfile.name} — your subjects only`} />

      <SectionCard
        title="Student list for selected subject"
        subtitle={selectedSummary ? `${selectedSummary.subjectCode} — ${selectedSummary.subjectName}` : "Select a subject"}
        actions={
          assignedSubjectCodes.length > 1 ? (
            <FilterSelect label="Subject" value={selectedSubject} onChange={setSelectedSubject} options={assignedSubjectCodes} />
          ) : undefined
        }
      >
        {selectedSummary ? (
          <>
            <div className="mb-5 grid gap-4 sm:grid-cols-3">
              <StatCard title="Appearances" value={String(selectedSummary.totalAppearances)} detail={`${selectedSummary.batchCodes.join(", ")}`} accent="from-sky-500 to-indigo-500" />
              <StatCard title="AT-2 Pass %" value={`${selectedSummary.at2PassPercentage}%`} detail={`${selectedSummary.at2PassCount} pass / ${selectedSummary.at2FailCount} fail`} accent="from-emerald-500 to-teal-500" />
              <StatCard title="AT-1 Pass %" value={`${selectedSummary.at1PassPercentage}%`} detail={`${selectedSummary.at1PassCount} pass / ${selectedSummary.at1FailCount} fail`} accent="from-violet-500 to-purple-500" />
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
