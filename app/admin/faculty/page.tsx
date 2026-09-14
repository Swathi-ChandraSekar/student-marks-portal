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
  const [search, setSearch] = useState("");

  const filteredFaculty = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return adminFaculty;
    }

    return adminFaculty.filter(
      (faculty) =>
        faculty.name.toLowerCase().includes(query) ||
        faculty.department.toLowerCase().includes(query) ||
        faculty.subjectsHandled.some((subject) => subject.toLowerCase().includes(query)),
    );
  }, [search]);

  const columns: DataTableColumn<AdminFacultyRecord>[] = [
    { key: "employeeId", header: "Employee ID", render: (row) => row.employeeId },
    { key: "name", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
    { key: "designation", header: "Designation", render: (row) => row.designation },
    { key: "department", header: "Department", render: (row) => row.department },
    { key: "subjects", header: "Subjects Handled", render: (row) => row.subjectsHandled.join(", ") },
    { key: "status", header: "Status", render: (row) => <Badge label={row.status} variant={statusVariant[row.status]} /> },
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
        <DataTable columns={columns} rows={filteredFaculty} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
