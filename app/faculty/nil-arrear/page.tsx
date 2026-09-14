"use client";

import { useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { nilArrearCandidates as initialRows } from "@/data/faculty";
import type { NilArrearCandidate } from "@/types/faculty";

export default function FacultyNilArrearPage() {
  const [rows, setRows] = useState<NilArrearCandidate[]>(initialRows);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ registerNumber: "", studentName: "", arrearSubjects: "" });

  function resetDraft() {
    setDraft({ registerNumber: "", studentName: "", arrearSubjects: "" });
  }

  function handleAddRow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setRows((current) => [
      {
        id: `arrear-${Date.now()}`,
        registerNumber: draft.registerNumber,
        studentName: draft.studentName,
        arrearSubjects: Number(draft.arrearSubjects) || 0,
      },
      ...current,
    ]);

    resetDraft();
    setShowForm(false);
  }

  function startEditRow(row: NilArrearCandidate) {
    setEditingId(row.id);
    setDraft({
      registerNumber: row.registerNumber,
      studentName: row.studentName,
      arrearSubjects: String(row.arrearSubjects),
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
              registerNumber: draft.registerNumber,
              studentName: draft.studentName,
              arrearSubjects: Number(draft.arrearSubjects) || 0,
            }
          : row,
      ),
    );

    setEditingId(null);
    resetDraft();
  }

  const columns: DataTableColumn<NilArrearCandidate>[] = [
    { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
    { key: "studentName", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.studentName}</span> },
    { key: "arrearSubjects", header: "Arrear Subjects", align: "right", render: (row) => row.arrearSubjects },
    {
      key: "reviewStatus",
      header: "Status",
      render: () => <span className="text-sm font-medium text-amber-700">Pending review</span>,
    },
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
      <Topbar eyebrow="Faculty portal" title="Nil Arrear" subtitle="Class-wise overview (UI placeholder)" />

      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-semibold">Eligibility rules not yet finalized.</p>
        <p className="mt-1">
          This page displays the Nil Arrear screen layout only. Final eligibility logic has not been confirmed and
          is intentionally not implemented in this session.
        </p>
      </div>

      <SectionCard
        title="Class arrear overview"
        subtitle="Placeholder data using current subject roster — not a decision list"
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
          <form onSubmit={handleAddRow} className="mb-6 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-3">
            <label className="text-sm text-slate-600">Register Number<input value={draft.registerNumber} onChange={(event) => setDraft((value) => ({ ...value, registerNumber: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Student Name<input value={draft.studentName} onChange={(event) => setDraft((value) => ({ ...value, studentName: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Arrear Subjects<input value={draft.arrearSubjects} onChange={(event) => setDraft((value) => ({ ...value, arrearSubjects: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <div className="flex items-end sm:col-span-3"><button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">Save entry</button></div>
          </form>
        ) : null}
        {editingId ? (
          <form onSubmit={handleEditRow} className="mb-6 grid gap-4 rounded-2xl bg-sky-50 p-4 sm:grid-cols-3">
            <label className="text-sm text-slate-600">Register Number<input value={draft.registerNumber} onChange={(event) => setDraft((value) => ({ ...value, registerNumber: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Student Name<input value={draft.studentName} onChange={(event) => setDraft((value) => ({ ...value, studentName: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Arrear Subjects<input value={draft.arrearSubjects} onChange={(event) => setDraft((value) => ({ ...value, arrearSubjects: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <div className="flex items-end gap-2 sm:col-span-3"><button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">Save changes</button><button type="button" onClick={() => { setEditingId(null); resetDraft(); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-300">Cancel</button></div>
          </form>
        ) : null}
        <DataTable columns={columns} rows={rows} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
