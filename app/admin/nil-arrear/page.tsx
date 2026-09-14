import { Topbar } from "@/components/dashboard/Topbar";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { nilArrearOverview } from "@/data/admin";
import type { NilArrearBatchOverview } from "@/types/admin";

const columns: DataTableColumn<NilArrearBatchOverview>[] = [
  { key: "batchCode", header: "Batch", render: (row) => <span className="font-semibold text-slate-900">{row.batchCode}</span> },
  { key: "totalStudents", header: "Total Students", align: "right", render: (row) => row.totalStudents },
  { key: "underReview", header: "Under Review", align: "right", render: (row) => row.underReview },
  { key: "arrearFree", header: "Currently Arrear-Free", align: "right", render: (row) => row.arrearFree },
];

export default function AdminNilArrearPage() {
  return (
    <>
      <Topbar eyebrow="Admin portal" title="Nil Arrear" subtitle="Batch-wise overview (UI placeholder)" />

      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-semibold">Eligibility rules not yet finalized.</p>
        <p className="mt-1">
          This page displays the Nil Arrear screen layout only. Final eligibility logic (arrear thresholds,
          attendance conditions, fee-clearance checks, etc.) has not been confirmed and is intentionally not
          implemented in this session.
        </p>
      </div>

      <SectionCard title="Batch-wise Nil Arrear overview" subtitle="Placeholder counts using mock data — not a decision list">
        <DataTable columns={columns} rows={nilArrearOverview} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
