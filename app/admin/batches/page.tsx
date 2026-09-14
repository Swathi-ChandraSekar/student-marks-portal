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

  const columns: DataTableColumn<Batch>[] = [
    { key: "batchCode", header: "Batch Code", render: (row) => <span className="font-semibold text-slate-900">{row.batchCode}</span> },
    { key: "department", header: "Department", render: (row) => row.department },
    { key: "yearSem", header: "Year / Sem", render: (row) => `${row.year} / ${row.semester}` },
    { key: "section", header: "Section", render: (row) => row.section },
    { key: "academicYear", header: "Academic Year", render: (row) => row.academicYear },
    { key: "coordinator", header: "Coordinator", render: (row) => row.coordinator },
    { key: "totalStudents", header: "Students", align: "right", render: (row) => row.totalStudents },
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

        <DataTable columns={columns} rows={batches} getRowKey={(row) => row.id} />
        <p className="mt-4 text-xs text-slate-400">
          This session uses in-memory mock data only. New batches are not persisted and will reset on page reload.
        </p>
      </SectionCard>
    </>
  );
}
