"use client";

import { useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/portal/Badge";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { SectionCard } from "@/components/portal/SectionCard";
import { attendanceRows as initialRows, facultyProfile } from "@/data/faculty";
import type { AttendanceRow } from "@/types/faculty";

export default function FacultyAttendancePage() {
  const [rows, setRows] = useState<AttendanceRow[]>(initialRows);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  function updateAttended(id: string, value: string) {
    const numeric = Number(value);

    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) {
          return row;
        }

        const classesAttended = Number.isFinite(numeric) ? Math.max(0, Math.min(numeric, row.classesConducted)) : row.classesAttended;

        return {
          ...row,
          classesAttended,
          attendancePercentage: Number(((classesAttended / row.classesConducted) * 100).toFixed(1)),
        };
      }),
    );
  }

  function startEdit(row: AttendanceRow) {
    setEditingId(row.id);
    setEditValue(String(row.classesAttended));
  }

  function saveEdit(id: string) {
    updateAttended(id, editValue);
    setEditingId(null);
    setEditValue("");
  }

  const columns: DataTableColumn<AttendanceRow>[] = [
    { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
    { key: "studentName", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.studentName}</span> },
    { key: "classesConducted", header: "Conducted", align: "right", render: (row) => row.classesConducted },
    {
      key: "classesAttended",
      header: "Attended",
      align: "right",
      render: (row) =>
        editingId === row.id ? (
          <input
            type="number"
            min={0}
            max={row.classesConducted}
            value={editValue}
            onChange={(event) => setEditValue(event.target.value)}
            className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-right outline-none focus:border-sky-500"
          />
        ) : (
          row.classesAttended
        ),
    },
    {
      key: "attendancePercentage",
      header: "Percentage",
      align: "right",
      render: (row) => (
        <Badge
          label={`${row.attendancePercentage}%`}
          variant={row.attendancePercentage >= 75 ? "success" : "danger"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) =>
        editingId === row.id ? (
          <div className="flex gap-2">
            <button type="button" onClick={() => saveEdit(row.id)} className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] font-semibold text-sky-700 hover:bg-sky-100">
              Save
            </button>
            <button type="button" onClick={() => { setEditingId(null); setEditValue(""); }} className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:border-slate-300">
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => startEdit(row)} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-400 hover:text-sky-700">
            Edit
          </button>
        ),
    },
  ];

  return (
    <>
      <Topbar
        eyebrow="Faculty portal"
        title="Attendance"
        subtitle={facultyProfile.subjects[0] ? `${facultyProfile.subjects[0].subjectCode} — ${facultyProfile.subjects[0].batchSection}` : ""}
      />

      <SectionCard title="Attendance register" subtitle="Update classes attended per student for the current subject">
        <DataTable columns={columns} rows={rows} getRowKey={(row) => row.id} />
        <p className="mt-4 text-xs text-slate-400">
          Attendance entered here is held in memory for this session only and is not persisted yet.
        </p>
      </SectionCard>
    </>
  );
}
