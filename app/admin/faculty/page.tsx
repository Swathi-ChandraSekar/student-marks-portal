"use client";

import { useMemo, useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/portal/Badge";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { adminFaculty } from "@/data/admin";
import type { AdminFacultyRecord } from "@/types/admin";

const statusVariant: Record<AdminFacultyRecord["status"], "success" | "warning" | "neutral"> = {
  Active: "success",
  "On Leave": "warning",
  Inactive: "neutral",
};

export default function FacultyManagementPage() {
  const [facultyMembers, setFacultyMembers] = useState(adminFaculty);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{
    name: string;
    designation: string;
    department: string;
    status: AdminFacultyRecord["status"];
    subjectsHandled: string;
  } | null>(null);

  const filteredFaculty = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return facultyMembers;
    }

    return facultyMembers.filter(
      (faculty) =>
        faculty.name.toLowerCase().includes(query) ||
        faculty.department.toLowerCase().includes(query) ||
        faculty.subjectsHandled.some((subject) => subject.toLowerCase().includes(query)),
    );
  }, [facultyMembers, search]);

  function startEditFaculty(faculty: AdminFacultyRecord) {
    setEditingId(faculty.id);
    setEditDraft({
      name: faculty.name,
      designation: faculty.designation,
      department: faculty.department,
      status: faculty.status,
      subjectsHandled: faculty.subjectsHandled.join(", "),
    });
  }

  function handleEditFaculty(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingId || !editDraft) {
      return;
    }

    setFacultyMembers((current) =>
      current.map((faculty) =>
        faculty.id === editingId
          ? {
              ...faculty,
              name: editDraft.name,
              designation: editDraft.designation,
              department: editDraft.department,
              status: editDraft.status,
              subjectsHandled: editDraft.subjectsHandled
                .split(",")
                .map((subject) => subject.trim())
                .filter(Boolean),
            }
          : faculty,
      ),
    );

    setEditingId(null);
    setEditDraft(null);
  }

  const columns: DataTableColumn<AdminFacultyRecord>[] = [
    { key: "employeeId", header: "Employee ID", render: (row) => row.employeeId },
    { key: "name", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
    { key: "designation", header: "Designation", render: (row) => row.designation },
    { key: "department", header: "Department", render: (row) => row.department },
    { key: "subjects", header: "Subjects Handled", render: (row) => row.subjectsHandled.join(", ") },
    { key: "status", header: "Status", render: (row) => <Badge label={row.status} variant={statusVariant[row.status]} /> },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <button
          type="button"
          onClick={() => startEditFaculty(row)}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-400 hover:text-sky-700"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <>
      <Topbar eyebrow="Admin portal" title="Faculty Management" subtitle={`${filteredFaculty.length} faculty members`} />

      <SectionCard
        title="All faculty"
        subtitle="Search by name, department or subject"
        actions={
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search faculty..."
            className="w-56 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-sky-500"
          />
        }
      >
        {editDraft && editingId ? (
          <form onSubmit={handleEditFaculty} className="mb-6 grid gap-4 rounded-2xl bg-emerald-50 p-4 sm:grid-cols-2 lg:grid-cols-5">
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
              Designation
              <input
                value={editDraft.designation}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, designation: event.target.value } : value))}
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
              Status
              <select
                value={editDraft.status}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, status: event.target.value as AdminFacultyRecord["status"] } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <label className="text-sm text-slate-600">
              Subjects
              <input
                value={editDraft.subjectsHandled}
                onChange={(event) => setEditDraft((value) => (value ? { ...value, subjectsHandled: event.target.value } : value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"
                placeholder="Comma separated"
              />
            </label>
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-5">
              <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500">
                Save changes
              </button>
              <button type="button" onClick={() => { setEditingId(null); setEditDraft(null); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-300">
                Cancel
              </button>
            </div>
          </form>
        ) : null}
        <DataTable columns={columns} rows={filteredFaculty} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
