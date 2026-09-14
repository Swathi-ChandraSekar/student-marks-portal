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
        <button
          type="button"
          onClick={() => toggleStatus(row.id)}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
        >
          {row.status === "Active" ? "Mark inactive" : "Mark active"}
        </button>
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
        <DataTable columns={columns} rows={filteredStudents} getRowKey={(row) => row.id} />
        <p className="mt-4 text-xs text-slate-400">
          Status changes are held in memory for this session only. Full add/edit/delete workflows and MongoDB
          persistence will be added in a later session.
        </p>
      </SectionCard>
    </>
  );
}
