"use client";

import { useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { batches as initialBatches } from "@/data/admin";
import type { Batch } from "@/types/admin";

const emptyDraft = {
  batchCode: "",
  department: "",
  year: "",
  semester: "",
  section: "",
  academicYear: "2026-2027",
  coordinator: "",
  totalStudents: "",
};

export default function BatchManagementPage() {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);
  const [draft, setDraft] = useState(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<typeof emptyDraft | null>(null);
  const [showForm, setShowForm] = useState(false);

  function handleAddBatch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.batchCode || !draft.department) {
      return;
    }

    const newBatch: Batch = {
      id: `batch-${Date.now()}`,
      batchCode: draft.batchCode,
      department: draft.department,
      year: draft.year,
      semester: draft.semester,
      section: draft.section,
      academicYear: draft.academicYear,
      coordinator: draft.coordinator,
      totalStudents: Number(draft.totalStudents) || 0,
    };

    setBatches((current) => [newBatch, ...current]);
    setDraft(emptyDraft);
    setShowForm(false);
  }

  function startEditBatch(batch: Batch) {
    setEditingId(batch.id);
    setEditDraft({
      batchCode: batch.batchCode,
      department: batch.department,
      year: batch.year,
      semester: batch.semester,
      section: batch.section,
      academicYear: batch.academicYear,
      coordinator: batch.coordinator,
      totalStudents: String(batch.totalStudents),
    });
  }

  function handleEditBatch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingId || !editDraft) {
      return;
    }

    setBatches((current) =>
      current.map((batch) =>
        batch.id === editingId
          ? {
              ...batch,
              batchCode: editDraft.batchCode,
              department: editDraft.department,
              year: editDraft.year,
              semester: editDraft.semester,
              section: editDraft.section,
              academicYear: editDraft.academicYear,
              coordinator: editDraft.coordinator,
              totalStudents: Number(editDraft.totalStudents) || 0,
            }
          : batch,
      ),
    );

    setEditingId(null);
    setEditDraft(null);
  }

  const columns: DataTableColumn<Batch>[] = [
    { key: "batchCode", header: "Batch Code", render: (row) => <span className="font-semibold text-slate-900">{row.batchCode}</span> },
    { key: "department", header: "Department", render: (row) => row.department },
    { key: "yearSem", header: "Year / Sem", render: (row) => `${row.year} / ${row.semester}` },
    { key: "section", header: "Section", render: (row) => row.section },
    { key: "academicYear", header: "Academic Year", render: (row) => row.academicYear },
    { key: "coordinator", header: "Coordinator", render: (row) => row.coordinator },
    { key: "totalStudents", header: "Students", align: "right", render: (row) => row.totalStudents },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <button
          type="button"
          onClick={() => startEditBatch(row)}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-400 hover:text-sky-700"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <>
      <Topbar eyebrow="Admin portal" title="Batch Management" subtitle={`${batches.length} batches configured`} />

      <SectionCard
        title="All batches"
        subtitle="Manage academic batches, sections and coordinators"
        actions={
          <button
            type="button"
            onClick={() => setShowForm((value) => !value)}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {showForm ? "Cancel" : "+ New Batch"}
          </button>
        }
      >
        {showForm ? (
          <form onSubmit={handleAddBatch} className="mb-6 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm text-slate-600">
              Batch code
              <input
                value={draft.batchCode}
                onChange={(event) => setDraft((value) => ({ ...value, batchCode: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                placeholder="e.g. AIML-III-A"
                required
              />
            </label>
            <label className="text-sm text-slate-600">
              Department
              <input
                value={draft.department}
                onChange={(event) => setDraft((value) => ({ ...value, department: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                placeholder="e.g. AI & ML"
                required
              />
            </label>
            <label className="text-sm text-slate-600">
              Year
              <input
                value={draft.year}
                onChange={(event) => setDraft((value) => ({ ...value, year: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                placeholder="e.g. III"
              />
            </label>
            <label className="text-sm text-slate-600">
              Semester
              <input
                value={draft.semester}
                onChange={(event) => setDraft((value) => ({ ...value, semester: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                placeholder="e.g. V"
              />
            </label>
            <label className="text-sm text-slate-600">
              Section
              <input
                value={draft.section}
                onChange={(event) => setDraft((value) => ({ ...value, section: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                placeholder="e.g. A"
              />
            </label>
            <label className="text-sm text-slate-600">
              Coordinator
              <input
                value={draft.coordinator}
                onChange={(event) => setDraft((value) => ({ ...value, coordinator: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                placeholder="Faculty name"
              />
            </label>
            <label className="text-sm text-slate-600">
              Total students
              <input
                value={draft.totalStudents}
                onChange={(event) => setDraft((value) => ({ ...value, totalStudents: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                placeholder="e.g. 58"
                inputMode="numeric"
              />
            </label>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500"
              >
                Save batch
              </button>
            </div>
          </form>
        ) : null}

        {editDraft && editingId ? (
          <form onSubmit={handleEditBatch} className="mb-6 grid gap-4 rounded-2xl bg-sky-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm text-slate-600">
              Batch code
              <input
                value={editDraft.batchCode}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, batchCode: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                required
              />
            </label>
            <label className="text-sm text-slate-600">
              Department
              <input
                value={editDraft.department}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, department: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                required
              />
            </label>
            <label className="text-sm text-slate-600">
              Year
              <input
                value={editDraft.year}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, year: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
              />
            </label>
            <label className="text-sm text-slate-600">
              Semester
              <input
                value={editDraft.semester}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, semester: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
              />
            </label>
            <label className="text-sm text-slate-600">
              Section
              <input
                value={editDraft.section}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, section: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
              />
            </label>
            <label className="text-sm text-slate-600">
              Coordinator
              <input
                value={editDraft.coordinator}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, coordinator: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
              />
            </label>
            <label className="text-sm text-slate-600">
              Total students
              <input
                value={editDraft.totalStudents}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, totalStudents: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                inputMode="numeric"
              />
            </label>
            <div className="flex items-end gap-2">
              <button type="submit" className="w-full rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">
                Save changes
              </button>
              <button type="button" onClick={() => { setEditingId(null); setEditDraft(null); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-300">
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        <DataTable columns={columns} rows={batches} getRowKey={(row) => row.id} />
        <p className="mt-4 text-xs text-slate-400">
          This session uses in-memory mock data only. New batches are not persisted and will reset on page reload.
        </p>
      </SectionCard>
    </>
  );
}
