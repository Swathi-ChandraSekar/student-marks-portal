"use client";

import { useMemo, useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { ArrearBadge, PerformanceBadges } from "@/components/portal/PerformanceBadges";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { FilterSelect } from "@/components/portal/FilterSelect";
import { SectionCard } from "@/components/portal/SectionCard";
import { getStudentPerformance } from "@/lib/analytics";
import { facultyProfile } from "@/data/faculty";
import { roster } from "@/data/roster";
import type { RosterStudent } from "@/types/roster";

const ALL = "All";

// Faculty only see the class/batch section they are assigned to teach —
// mirrors facultyProfile.subjects[0].batchSection from data/faculty.ts.
const assignedBatch = facultyProfile.subjects[0]?.batchSection ?? "";
const classRoster = roster.filter((student) => student.batchCode === assignedBatch);

const genderOptions = [ALL, "Male", "Female"];
const hostelOptions = [ALL, "Hosteller", "Day Scholar"];

export default function FacultyStudentListPage() {
  const [students, setStudents] = useState<RosterStudent[]>(classRoster);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState(ALL);
  const [hostelStatus, setHostelStatus] = useState(ALL);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    registerNumber: "",
    name: "",
    gender: "Male" as RosterStudent["gender"],
    batchCode: assignedBatch,
    department: facultyProfile.department,
    year: facultyProfile.subjects[0]?.yearSemester.split("/")[0].trim() ?? "",
    semester: facultyProfile.subjects[0]?.yearSemester.split("/")[1].trim() ?? "",
    section: assignedBatch.split("-").at(-1) ?? "A",
    hostelStatus: "Day Scholar" as RosterStudent["hostelStatus"],
    attendancePercentage: "",
  });

  const filteredRoster = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesQuery =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.registerNumber.toLowerCase().includes(query);

      return (
        matchesQuery &&
        (gender === ALL || student.gender === gender) &&
        (hostelStatus === ALL || student.hostelStatus === hostelStatus)
      );
    });
  }, [students, search, gender, hostelStatus]);

  function resetDraft() {
    setDraft({
      registerNumber: "",
      name: "",
      gender: "Male",
      batchCode: assignedBatch,
      department: facultyProfile.department,
      year: facultyProfile.subjects[0]?.yearSemester.split("/")[0].trim() ?? "",
      semester: facultyProfile.subjects[0]?.yearSemester.split("/")[1].trim() ?? "",
      section: assignedBatch.split("-").at(-1) ?? "A",
      hostelStatus: "Day Scholar",
      attendancePercentage: "",
    });
  }

  function handleAddStudent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextStudent: RosterStudent = {
      id: `faculty-student-${Date.now()}`,
      registerNumber: draft.registerNumber,
      name: draft.name,
      gender: draft.gender,
      batchCode: draft.batchCode,
      department: draft.department,
      year: draft.year,
      semester: draft.semester,
      section: draft.section,
      hostelStatus: draft.hostelStatus,
      attendancePercentage: Number(draft.attendancePercentage) || 0,
      subjects: [],
      arrearStatus: "Pending",
    };

    setStudents((current) => [nextStudent, ...current]);
    resetDraft();
    setShowForm(false);
  }

  function startEditStudent(student: RosterStudent) {
    setEditingId(student.id);
    setDraft({
      registerNumber: student.registerNumber,
      name: student.name,
      gender: student.gender,
      batchCode: student.batchCode,
      department: student.department,
      year: student.year,
      semester: student.semester,
      section: student.section,
      hostelStatus: student.hostelStatus,
      attendancePercentage: String(student.attendancePercentage),
    });
  }

  function handleEditStudent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;

    setStudents((current) =>
      current.map((student) =>
        student.id === editingId
          ? {
              ...student,
              registerNumber: draft.registerNumber,
              name: draft.name,
              gender: draft.gender,
              batchCode: draft.batchCode,
              department: draft.department,
              year: draft.year,
              semester: draft.semester,
              section: draft.section,
              hostelStatus: draft.hostelStatus,
              attendancePercentage: Number(draft.attendancePercentage) || student.attendancePercentage,
            }
          : student,
      ),
    );

    setEditingId(null);
    resetDraft();
  }

  const columns: DataTableColumn<RosterStudent>[] = [
    { key: "registerNumber", header: "Register No.", render: (row) => row.registerNumber },
    { key: "name", header: "Name", render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
    { key: "gender", header: "Gender", render: (row) => row.gender },
    { key: "batch", header: "Batch", render: (row) => row.batchCode },
    { key: "department", header: "Department", render: (row) => row.department },
    { key: "section", header: "Section", render: (row) => row.section },
    { key: "hostelStatus", header: "Hosteller / Day Scholar", render: (row) => row.hostelStatus },
    { key: "attendance", header: "Attendance", align: "right", render: (row) => `${row.attendancePercentage}%` },
    {
      key: "performance",
      header: "Performance",
      render: (row) => <PerformanceBadges performance={getStudentPerformance(row)} />,
    },
    { key: "arrear", header: "Arrear Status", render: (row) => <ArrearBadge status={row.arrearStatus} /> },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <button
          type="button"
          onClick={() => startEditStudent(row)}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-400 hover:text-sky-700"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <>
      <Topbar eyebrow="Faculty portal" title="Student List" subtitle={`${assignedBatch} roster`} />

      <SectionCard
        title="Class roster"
        subtitle={`${filteredRoster.length} of ${students.length} students in your assigned class`}
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
            {showForm ? "Cancel" : "+ New Student"}
          </button>
        }
      >
        {showForm ? (
          <form onSubmit={handleAddStudent} className="mb-6 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-5">
            <label className="text-sm text-slate-600">Register Number<input value={draft.registerNumber} onChange={(event) => setDraft((value) => ({ ...value, registerNumber: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Name<input value={draft.name} onChange={(event) => setDraft((value) => ({ ...value, name: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Gender<select value={draft.gender} onChange={(event) => setDraft((value) => ({ ...value, gender: event.target.value as RosterStudent["gender"] }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"><option value="Male">Male</option><option value="Female">Female</option></select></label>
            <label className="text-sm text-slate-600">Batch<input value={draft.batchCode} onChange={(event) => setDraft((value) => ({ ...value, batchCode: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Department<input value={draft.department} onChange={(event) => setDraft((value) => ({ ...value, department: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Year<input value={draft.year} onChange={(event) => setDraft((value) => ({ ...value, year: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" /></label>
            <label className="text-sm text-slate-600">Semester<input value={draft.semester} onChange={(event) => setDraft((value) => ({ ...value, semester: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" /></label>
            <label className="text-sm text-slate-600">Section<input value={draft.section} onChange={(event) => setDraft((value) => ({ ...value, section: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" /></label>
            <label className="text-sm text-slate-600">Hosteller / Day Scholar<select value={draft.hostelStatus} onChange={(event) => setDraft((value) => ({ ...value, hostelStatus: event.target.value as RosterStudent["hostelStatus"] }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"><option value="Hosteller">Hosteller</option><option value="Day Scholar">Day Scholar</option></select></label>
            <label className="text-sm text-slate-600">Attendance %<input value={draft.attendancePercentage} onChange={(event) => setDraft((value) => ({ ...value, attendancePercentage: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <div className="flex items-end sm:col-span-2 lg:col-span-5"><button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">Save student</button></div>
          </form>
        ) : null}
        <div className="mb-5 flex flex-col gap-4">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or register no..."
            className="w-full max-w-sm rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500"
          />
          <div className="flex flex-wrap gap-3">
            <FilterSelect label="Gender" value={gender} options={genderOptions} onChange={setGender} />
            <FilterSelect label="Hosteller / Day Scholar" value={hostelStatus} options={hostelOptions} onChange={setHostelStatus} />
          </div>
        </div>

        {editingId ? (
          <form onSubmit={handleEditStudent} className="mb-6 grid gap-4 rounded-2xl bg-sky-50 p-4 sm:grid-cols-2 lg:grid-cols-5">
            <label className="text-sm text-slate-600">Register Number<input value={draft.registerNumber} onChange={(event) => setDraft((value) => ({ ...value, registerNumber: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Name<input value={draft.name} onChange={(event) => setDraft((value) => ({ ...value, name: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Gender<select value={draft.gender} onChange={(event) => setDraft((value) => ({ ...value, gender: event.target.value as RosterStudent["gender"] }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"><option value="Male">Male</option><option value="Female">Female</option></select></label>
            <label className="text-sm text-slate-600">Batch<input value={draft.batchCode} onChange={(event) => setDraft((value) => ({ ...value, batchCode: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Department<input value={draft.department} onChange={(event) => setDraft((value) => ({ ...value, department: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" required /></label>
            <label className="text-sm text-slate-600">Year<input value={draft.year} onChange={(event) => setDraft((value) => ({ ...value, year: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" /></label>
            <label className="text-sm text-slate-600">Semester<input value={draft.semester} onChange={(event) => setDraft((value) => ({ ...value, semester: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" /></label>
            <label className="text-sm text-slate-600">Section<input value={draft.section} onChange={(event) => setDraft((value) => ({ ...value, section: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" /></label>
            <label className="text-sm text-slate-600">Hosteller / Day Scholar<select value={draft.hostelStatus} onChange={(event) => setDraft((value) => ({ ...value, hostelStatus: event.target.value as RosterStudent["hostelStatus"] }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500"><option value="Hosteller">Hosteller</option><option value="Day Scholar">Day Scholar</option></select></label>
            <label className="text-sm text-slate-600">Attendance %<input value={draft.attendancePercentage} onChange={(event) => setDraft((value) => ({ ...value, attendancePercentage: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-500" inputMode="numeric" /></label>
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-5"><button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">Save changes</button><button type="button" onClick={() => { setEditingId(null); resetDraft(); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-300">Cancel</button></div>
          </form>
        ) : null}
        <DataTable columns={columns} rows={filteredRoster} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
