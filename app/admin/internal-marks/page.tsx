"use client";

import { useMemo, useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { batches, subjectMarksSummary } from "@/data/admin";
import type { SubjectMarksSummary } from "@/types/admin";

function formatAverage(value: number | null) {
  return value === null ? "—" : value.toFixed(1);
}

export default function AdminInternalMarksPage() {
  const [batchFilter, setBatchFilter] = useState("All");

  const filteredRows = useMemo(() => {
    if (batchFilter === "All") {
      return subjectMarksSummary;
    }

    return subjectMarksSummary.filter((row) => row.batchCode === batchFilter);
  }, [batchFilter]);

  const columns: DataTableColumn<SubjectMarksSummary>[] = [
    { key: "subjectCode", header: "Subject Code", render: (row) => row.subjectCode },
    { key: "subjectName", header: "Subject", render: (row) => <span className="font-semibold text-slate-900">{row.subjectName}</span> },
    { key: "batchCode", header: "Batch", render: (row) => row.batchCode },
    { key: "facultyName", header: "Faculty", render: (row) => row.facultyName },
    { key: "at1", header: "AT-I Avg", align: "right", render: (row) => formatAverage(row.at1Average) },
    { key: "at2", header: "AT-II Avg", align: "right", render: (row) => formatAverage(row.at2Average) },
    { key: "at3", header: "AT-III Avg", align: "right", render: (row) => formatAverage(row.at3Average) },
    { key: "model", header: "Model Avg", align: "right", render: (row) => formatAverage(row.modelAverage) },
  ];

  return (
    <>
      <Topbar eyebrow="Admin portal" title="Internal Marks" subtitle="Consolidated assessment averages by subject" />

      <SectionCard
        title="Subject-wise internal assessment averages"
        subtitle="Aggregated across faculty mark entries. Figures update once faculty submit AT-III and Model exam marks."
        actions={
          <select
            value={batchFilter}
            onChange={(event) => setBatchFilter(event.target.value)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:border-sky-500"
          >
            <option value="All">All batches</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.batchCode}>
                {batch.batchCode}
              </option>
            ))}
          </select>
        }
      >
        <DataTable columns={columns} rows={filteredRows} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
