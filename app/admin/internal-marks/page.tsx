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
  const [rows, setRows] = useState<SubjectMarksSummary[]>(subjectMarksSummary);
  const [batchFilter, setBatchFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    subjectCode: "",
    subjectName: "",
    batchCode: "",
    facultyName: "",
    at1Average: "",
    at2Average: "",
    at3Average: "",
    modelAverage: "",
  });

  const filteredRows = useMemo(() => {
    if (batchFilter === "All") {
      return rows;
    }

    return rows.filter((row) => row.batchCode === batchFilter);
  }, [batchFilter, rows]);

  function resetDraft() {
    setDraft({
      subjectCode: "",
      subjectName: "",
      batchCode: "",
      facultyName: "",
      at1Average: "",
      at2Average: "",
      at3Average: "",
      modelAverage: "",
    });
  }

  function handleAddRow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newRow: SubjectMarksSummary = {
      id: `summary-${Date.now()}`,
      subjectCode: draft.subjectCode,
      subjectName: draft.subjectName,
      batchCode: draft.batchCode,
      facultyName: draft.facultyName,
      at1Average: draft.at1Average === "" ? null : Number(draft.at1Average),
      at2Average: draft.at2Average === "" ? null : Number(draft.at2Average),
      at3Average: draft.at3Average === "" ? null : Number(draft.at3Average),
      modelAverage: draft.modelAverage === "" ? null : Number(draft.modelAverage),
    };

    setRows((current) => [newRow, ...current]);
    resetDraft();
    setShowForm(false);
  }

  function startEditRow(row: SubjectMarksSummary) {
    setEditingId(row.id);
    setDraft({
      subjectCode: row.subjectCode,
      subjectName: row.subjectName,
      batchCode: row.batchCode,
      facultyName: row.facultyName,
      at1Average: row.at1Average === null ? "" : String(row.at1Average),
      at2Average: row.at2Average === null ? "" : String(row.at2Average),
      at3Average: row.at3Average === null ? "" : String(row.at3Average),
      modelAverage: row.modelAverage === null ? "" : String(row.modelAverage),
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
              subjectCode: draft.subjectCode,
              subjectName: draft.subjectName,
              batchCode: draft.batchCode,
              facultyName: draft.facultyName,
              at1Average: draft.at1Average === "" ? null : Number(draft.at1Average),
              at2Average: draft.at2Average === "" ? null : Number(draft.at2Average),
              at3Average: draft.at3Average === "" ? null : Number(draft.at3Average),
              modelAverage: draft.modelAverage === "" ? null : Number(draft.modelAverage),
            }
          : row,
      ),
    );

    setEditingId(null);
    resetDraft();
  }

  const columns: DataTableColumn<SubjectMarksSummary>[] = [
    { key: "subjectCode", header: "Subject Code", render: (row) => row.subjectCode },
    { key: "subjectName", header: "Subject", render: (row) => <span className="font-semibold text-slate-900">{row.subjectName}</span> },
    { key: "batchCode", header: "Batch", render: (row) => row.batchCode },
    { key: "facultyName", header: "Faculty", render: (row) => row.facultyName },
    { key: "at1", header: "AT-I Avg", align: "right", render: (row) => formatAverage(row.at1Average) },
    { key: "at2", header: "AT-II Avg", align: "right", render: (row) => formatAverage(row.at2Average) },
    { key: "at3", header: "AT-III Avg", align: "right", render: (row) => formatAverage(row.at3Average) },
    { key: "model", header: "Model Avg", align: "right", render: (row) => formatAverage(row.modelAverage) },
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
      <Topbar eyebrow="Admin portal" title="Internal Marks" subtitle="Consolidated assessment averages by subject" />

      <SectionCard
        title="Subject-wise internal assessment averages"
        subtitle="Aggregated across faculty mark entries. Figures update once faculty submit AT-III and Model exam marks."
        actions={
          <div className="flex flex-wrap items-center gap-3">
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
          </div>
        }
      >
        {showForm ? (
          <form onSubmit={handleAddRow} className="mb-6 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm text-slate-600">Subject Code<input value={draft.subjectCode} onChange={(event) => setDraft((value) => ({ ...value, subjectCode: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Subject Name<input value={draft.subjectName} onChange={(event) => setDraft((value) => ({ ...value, subjectName: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Batch<input value={draft.batchCode} onChange={(event) => setDraft((value) => ({ ...value, batchCode: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Faculty<input value={draft.facultyName} onChange={(event) => setDraft((value) => ({ ...value, facultyName: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">AT-I Avg<input value={draft.at1Average} onChange={(event) => setDraft((value) => ({ ...value, at1Average: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="decimal" /></label>
            <label className="text-sm text-slate-600">AT-II Avg<input value={draft.at2Average} onChange={(event) => setDraft((value) => ({ ...value, at2Average: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="decimal" /></label>
            <label className="text-sm text-slate-600">AT-III Avg<input value={draft.at3Average} onChange={(event) => setDraft((value) => ({ ...value, at3Average: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="decimal" /></label>
            <label className="text-sm text-slate-600">Model Avg<input value={draft.modelAverage} onChange={(event) => setDraft((value) => ({ ...value, modelAverage: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="decimal" /></label>
            <div className="flex items-end sm:col-span-2 lg:col-span-4"><button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">Save entry</button></div>
          </form>
        ) : null}
        {editingId ? (
          <form onSubmit={handleEditRow} className="mb-6 grid gap-4 rounded-2xl bg-sky-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm text-slate-600">Subject Code<input value={draft.subjectCode} onChange={(event) => setDraft((value) => ({ ...value, subjectCode: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Subject Name<input value={draft.subjectName} onChange={(event) => setDraft((value) => ({ ...value, subjectName: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Batch<input value={draft.batchCode} onChange={(event) => setDraft((value) => ({ ...value, batchCode: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Faculty<input value={draft.facultyName} onChange={(event) => setDraft((value) => ({ ...value, facultyName: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">AT-I Avg<input value={draft.at1Average} onChange={(event) => setDraft((value) => ({ ...value, at1Average: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="decimal" /></label>
            <label className="text-sm text-slate-600">AT-II Avg<input value={draft.at2Average} onChange={(event) => setDraft((value) => ({ ...value, at2Average: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="decimal" /></label>
            <label className="text-sm text-slate-600">AT-III Avg<input value={draft.at3Average} onChange={(event) => setDraft((value) => ({ ...value, at3Average: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="decimal" /></label>
            <label className="text-sm text-slate-600">Model Avg<input value={draft.modelAverage} onChange={(event) => setDraft((value) => ({ ...value, modelAverage: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="decimal" /></label>
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4"><button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">Save changes</button><button type="button" onClick={() => { setEditingId(null); resetDraft(); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-300">Cancel</button></div>
          </form>
        ) : null}
        <DataTable columns={columns} rows={filteredRows} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
