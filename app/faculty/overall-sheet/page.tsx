import { Topbar } from "@/components/dashboard/Topbar";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { facultyProfile, overallSheet } from "@/data/faculty";
import type { OverallSheetRow } from "@/types/faculty";

const columns: DataTableColumn<OverallSheetRow>[] = [
  { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
  { key: "studentName", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.studentName}</span> },
  ...facultyProfile.subjects.map((subject, index) => ({
    key: subject.subjectCode,
    header: subject.subjectCode,
    align: "right" as const,
    render: (row: OverallSheetRow) => row.subjectTotals[index]?.total ?? "—",
  })),
  { key: "overallAverage", header: "Average", align: "right", render: (row) => row.overallAverage.toFixed(1) },
];

export default function FacultyOverallSheetPage() {
  return (
    <>
      <Topbar eyebrow="Faculty portal" title="Overall Sheet" subtitle="Consolidated totals across your subjects" />

      <SectionCard title="Overall marks sheet" subtitle="Totals for each subject you teach, per student">
        <DataTable columns={columns} rows={overallSheet} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
