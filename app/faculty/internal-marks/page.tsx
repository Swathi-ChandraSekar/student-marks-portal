"use client";

import { useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { AssessmentSelector } from "@/components/marks/AssessmentSelector";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { facultyProfile, internalMarks as initialMarks } from "@/data/faculty";
import type { InternalMarkRow } from "@/types/faculty";

type EntryColumn = "at1" | "at2" | "at3" | "modelExam";

const entryOptions = ["AT-I", "AT-II", "AT-III", "Model Exam"] as const;
const columnByAssessment: Record<(typeof entryOptions)[number], EntryColumn> = {
  "AT-I": "at1",
  "AT-II": "at2",
  "AT-III": "at3",
  "Model Exam": "modelExam",
};

export default function FacultyInternalMarksPage() {
  const [marks, setMarks] = useState<InternalMarkRow[]>(initialMarks);
  const [selectedAssessment, setSelectedAssessment] = useState<(typeof entryOptions)[number]>("AT-I");
  const activeColumn = columnByAssessment[selectedAssessment];

  function updateMark(id: string, value: string) {
    const numeric = value === "" ? null : Number(value);

    setMarks((current) =>
      current.map((row) => (row.id === id ? { ...row, [activeColumn]: numeric } : row)),
    );
  }

  const columns: DataTableColumn<InternalMarkRow>[] = [
    { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
    { key: "studentName", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.studentName}</span> },
    {
      key: "entry",
      header: `${selectedAssessment} Marks (/50)`,
      align: "right",
      render: (row) => (
        <input
          type="number"
          min={0}
          max={50}
          value={row[activeColumn] ?? ""}
          onChange={(event) => updateMark(row.id, event.target.value)}
          className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-right outline-none focus:border-sky-500"
          placeholder="—"
        />
      ),
    },
  ];

  return (
    <>
      <Topbar
        eyebrow="Faculty portal"
        title="Internal Marks"
        subtitle={facultyProfile.subjects[0] ? `${facultyProfile.subjects[0].subjectCode} — ${facultyProfile.subjects[0].subjectName}` : ""}
      />

      <SectionCard
        title="Mark entry"
        subtitle="Select an assessment and enter marks out of 50 for each student"
        actions={
          <AssessmentSelector
            value={selectedAssessment}
            options={[...entryOptions]}
            onChange={(value) => setSelectedAssessment(value as (typeof entryOptions)[number])}
          />
        }
      >
        <DataTable columns={columns} rows={marks} getRowKey={(row) => row.id} />
        <p className="mt-4 text-xs text-slate-400">
          Marks entered here are held in memory for this session only. Saving to a database will be added once
          MongoDB is connected in a later session.
        </p>
      </SectionCard>
    </>
  );
}
