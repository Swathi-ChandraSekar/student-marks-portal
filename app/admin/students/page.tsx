"use client";

import { useMemo, useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/portal/Badge";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { adminStudents, batches } from "@/data/admin";
import type { AdminStudentRecord } from "@/types/admin";

export default function StudentManagementPage() {
  const [students, setStudents] = useState<AdminStudentRecord[]>(adminStudents);
  const [batchFilter, setBatchFilter] = useState("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{
    name: string;
    department: string;
    batchCode: string;
    attendancePercentage: string;
    cgpa: string;
    status: AdminStudentRecord["status"];
  } | null>(null);

  const filteredStudents = useMemo(() => {
    if (batchFilter === "All") {
      return students;
    }

    return students.filter((student) => student.batchCode === batchFilter);
  }, [students, batchFilter]);

  function toggleStatus(id: string) {
    setStudents((current) =>
      current.map((student) =>
        student.id === id
          ? { ...student, status: student.status === "Active" ? "Inactive" : "Active" }
          : student,
      ),
    );
  }

  function startEditStudent(student: AdminStudentRecord) {
    setEditingId(student.id);
    setEditDraft({
      name: student.name,
      department: student.department,
      batchCode: student.batchCode,
      attendancePercentage: String(student.attendancePercentage),
      cgpa: String(student.cgpa),
      status: student.status,
    });
  }

  function handleEditStudent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingId || !editDraft) {
      return;
    }

    setStudents((current) =>
      current.map((student) =>
        student.id === editingId
          ? {
              ...student,
              name: editDraft.name,
              department: editDraft.department,
              batchCode: editDraft.batchCode,
              attendancePercentage: Number(editDraft.attendancePercentage) || student.attendancePercentage,
              cgpa: Number(editDraft.cgpa) || student.cgpa,
              status: editDraft.status,
            }
          : student,
      ),
    );

    setEditingId(null);
    setEditDraft(null);
  }

  const columns: DataTableColumn<AdminStudentRecord>[] = [
    { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
    { key: "name", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
    { key: "batch", header: "Batch", render: (row) => `${row.batchCode}` },
    { key: "cgpa", header: "CGPA", align: "right", render: (row) => row.cgpa.toFixed(1) },
    { key: "attendance", header: "Attendance", align: "right", render: (row) => `${row.attendancePercentage}%` },
    {
      key: "status",
      header: "Status",
      render: (row) => <Badge label={row.status} variant={row.status === "Active" ? "success" : "neutral"} />,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => startEditStudent(row)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-400 hover:text-sky-700"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => toggleStatus(row.id)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
          >
            {row.status === "Active" ? "Mark inactive" : "Mark active"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Topbar eyebrow="Admin portal" title="Student Management" subtitle={`${filteredStudents.length} students shown`} />

      <SectionCard
        title="Manage students"
        subtitle="Filter by batch and update enrollment status"
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
        {editDraft && editingId ? (
          <form onSubmit={handleEditStudent} className="mb-6 grid gap-4 rounded-2xl bg-sky-50 p-4 sm:grid-cols-2 lg:grid-cols-6">
            <label className="text-sm text-slate-600">
              Name
              <input
                value={editDraft.name}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, name: event.target.value } : value))}
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
              Batch
              <input
                value={editDraft.batchCode}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, batchCode: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                required
              />
            </label>
            <label className="text-sm text-slate-600">
              Attendance
              <input
                value={editDraft.attendancePercentage}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, attendancePercentage: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                inputMode="numeric"
              />
            </label>
            <label className="text-sm text-slate-600">
              CGPA
              <input
                value={editDraft.cgpa}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, cgpa: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                inputMode="decimal"
              />
            </label>
            <label className="text-sm text-slate-600">
              Status
              <select
                value={editDraft.status}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, status: event.target.value as AdminStudentRecord["status"] } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-6">
              <button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">
                Save changes
              </button>
              <button type="button" onClick={() => { setEditingId(null); setEditDraft(null); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-300">
                Cancel
              </button>
            </div>
          </form>
        ) : null}
        <DataTable columns={columns} rows={filteredStudents} getRowKey={(row) => row.id} />
        <p className="mt-4 text-xs text-slate-400">
          Status changes are held in memory for this session only. Full add/edit/delete workflows and MongoDB
          persistence will be added in a later session.
        </p>
      </SectionCard>
    </>
  );
}
