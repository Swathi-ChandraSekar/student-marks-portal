"use client";

import { useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { nilArrearOverview as initialRows } from "@/data/admin";
import type { NilArrearBatchOverview } from "@/types/admin";

export default function AdminNilArrearPage() {
  const [rows, setRows] = useState<NilArrearBatchOverview[]>(initialRows);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    batchCode: "",
    totalStudents: "",
    underReview: "",
    arrearFree: "",
  });

  function resetDraft() {
    setDraft({ batchCode: "", totalStudents: "", underReview: "", arrearFree: "" });
  }

  function handleAddRow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setRows((current) => [
      {
        id: `nil-arrear-${Date.now()}`,
        batchCode: draft.batchCode,
        totalStudents: Number(draft.totalStudents) || 0,
        underReview: Number(draft.underReview) || 0,
        arrearFree: Number(draft.arrearFree) || 0,
      },
      ...current,
    ]);

    resetDraft();
    setShowForm(false);
  }

  function startEditRow(row: NilArrearBatchOverview) {
    setEditingId(row.id);
    setDraft({
      batchCode: row.batchCode,
      totalStudents: String(row.totalStudents),
      underReview: String(row.underReview),
      arrearFree: String(row.arrearFree),
    });
  }

  function handleEditRow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;

    setRows((current) =>
      current.map((row) =>
        row.id === editingId
          ? {
              ...row,
              batchCode: draft.batchCode,
              totalStudents: Number(draft.totalStudents) || 0,
              underReview: Number(draft.underReview) || 0,
              arrearFree: Number(draft.arrearFree) || 0,
            }
          : row,
      ),
    );

    setEditingId(null);
    resetDraft();
  }

  const columns: DataTableColumn<NilArrearBatchOverview>[] = [
    { key: "batchCode", header: "Batch", render: (row) => <span className="font-semibold text-slate-900">{row.batchCode}</span> },
    { key: "totalStudents", header: "Total Students", align: "right", render: (row) => row.totalStudents },
    { key: "underReview", header: "Under Review", align: "right", render: (row) => row.underReview },
    { key: "arrearFree", header: "Currently Arrear-Free", align: "right", render: (row) => row.arrearFree },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <button
          type="button"
          onClick={() => startEditRow(row)}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-400 hover:text-sky-700"
        >
          Edit
        </button>
      ),
    },
  ];

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

      <SectionCard
        title="Batch-wise Nil Arrear overview"
        subtitle="Placeholder counts using mock data — not a decision list"
        actions={
          <button
            type="button"
            onClick={() => {
              if (editingId) setEditingId(null);
              resetDraft();
              setShowForm((value) => !value);
            }}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {showForm ? "Cancel" : "+ New Entry"}
          </button>
        }
      >
        {showForm ? (
          <form onSubmit={handleAddRow} className="mb-6 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm text-slate-600">Batch<input value={draft.batchCode} onChange={(event) => setDraft((value) => ({ ...value, batchCode: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Total Students<input value={draft.totalStudents} onChange={(event) => setDraft((value) => ({ ...value, totalStudents: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <label className="text-sm text-slate-600">Under Review<input value={draft.underReview} onChange={(event) => setDraft((value) => ({ ...value, underReview: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <label className="text-sm text-slate-600">Arrear-Free<input value={draft.arrearFree} onChange={(event) => setDraft((value) => ({ ...value, arrearFree: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <div className="flex items-end sm:col-span-2 lg:col-span-4"><button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">Save entry</button></div>
          </form>
        ) : null}
        {editingId ? (
          <form onSubmit={handleEditRow} className="mb-6 grid gap-4 rounded-2xl bg-sky-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm text-slate-600">Batch<input value={draft.batchCode} onChange={(event) => setDraft((value) => ({ ...value, batchCode: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Total Students<input value={draft.totalStudents} onChange={(event) => setDraft((value) => ({ ...value, totalStudents: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <label className="text-sm text-slate-600">Under Review<input value={draft.underReview} onChange={(event) => setDraft((value) => ({ ...value, underReview: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <label className="text-sm text-slate-600">Arrear-Free<input value={draft.arrearFree} onChange={(event) => setDraft((value) => ({ ...value, arrearFree: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4"><button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">Save changes</button><button type="button" onClick={() => { setEditingId(null); resetDraft(); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-300">Cancel</button></div>
          </form>
        ) : null}
        <DataTable columns={columns} rows={rows} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
