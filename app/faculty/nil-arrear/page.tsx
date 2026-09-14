import { Topbar } from "@/components/dashboard/Topbar";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { nilArrearCandidates } from "@/data/faculty";
import type { NilArrearCandidate } from "@/types/faculty";

const columns: DataTableColumn<NilArrearCandidate>[] = [
  { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
  { key: "studentName", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.studentName}</span> },
  { key: "arrearSubjects", header: "Arrear Subjects", align: "right", render: (row) => row.arrearSubjects },
  {
    key: "reviewStatus",
    header: "Status",
    render: () => <span className="text-sm font-medium text-amber-700">Pending review</span>,
  },
];

export default function FacultyNilArrearPage() {
  return (
    <>
      <Topbar eyebrow="Faculty portal" title="Nil Arrear" subtitle="Class-wise overview (UI placeholder)" />

      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-semibold">Eligibility rules not yet finalized.</p>
        <p className="mt-1">
          This page displays the Nil Arrear screen layout only. Final eligibility logic has not been confirmed and
          is intentionally not implemented in this session.
        </p>
      </div>

      <SectionCard title="Class arrear overview" subtitle="Placeholder data using current subject roster — not a decision list">
        <DataTable columns={columns} rows={nilArrearCandidates} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
