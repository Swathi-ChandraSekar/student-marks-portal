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
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState(ALL);
  const [hostelStatus, setHostelStatus] = useState(ALL);

  const filteredRoster = useMemo(() => {
    const query = search.trim().toLowerCase();

    return classRoster.filter((student) => {
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
  }, [search, gender, hostelStatus]);

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
  ];

  return (
    <>
      <Topbar eyebrow="Faculty portal" title="Student List" subtitle={`${assignedBatch} roster`} />

      <SectionCard
        title="Class roster"
        subtitle={`${filteredRoster.length} of ${classRoster.length} students in your assigned class`}
      >
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

        <DataTable columns={columns} rows={filteredRoster} getRowKey={(row) => row.id} />
      </SectionCard>
    </>
  );
}
