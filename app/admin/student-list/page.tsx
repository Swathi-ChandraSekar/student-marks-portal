"use client";

import { useMemo, useState } from "react";

import { Topbar } from "@/components/dashboard/Topbar";
import { ArrearBadge, PerformanceBadges } from "@/components/portal/PerformanceBadges";
import { DataTable, type DataTableColumn } from "@/components/portal/DataTable";
import { FilterSelect } from "@/components/portal/FilterSelect";
import { Pagination } from "@/components/portal/Pagination";
import { SectionCard } from "@/components/portal/SectionCard";
import { getStudentPerformance } from "@/lib/analytics";
import { roster } from "@/data/roster";
import type { RosterStudent } from "@/types/roster";

const PAGE_SIZE = 8;

const ALL = "All";

function uniqueSorted(values: string[]): string[] {
  return [ALL, ...Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))];
}

const batchOptions = uniqueSorted(roster.map((student) => student.batchCode));
const departmentOptions = uniqueSorted(roster.map((student) => student.department));
const yearOptions = uniqueSorted(roster.map((student) => student.year));
const sectionOptions = uniqueSorted(roster.map((student) => student.section));
const genderOptions = [ALL, "Male", "Female"];
const hostelOptions = [ALL, "Hosteller", "Day Scholar"];

export default function AdminStudentListPage() {
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState(ALL);
  const [department, setDepartment] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const [section, setSection] = useState(ALL);
  const [gender, setGender] = useState(ALL);
  const [hostelStatus, setHostelStatus] = useState(ALL);
  const [page, setPage] = useState(1);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return roster.filter((student) => {
      const matchesQuery =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.registerNumber.toLowerCase().includes(query);

      return (
        matchesQuery &&
        (batch === ALL || student.batchCode === batch) &&
        (department === ALL || student.department === department) &&
        (year === ALL || student.year === year) &&
        (section === ALL || student.section === section) &&
        (gender === ALL || student.gender === gender) &&
        (hostelStatus === ALL || student.hostelStatus === hostelStatus)
      );
    });
  }, [search, batch, department, year, section, gender, hostelStatus]);

  const pageCount = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pagedStudents = filteredStudents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function updateFilter(setter: (value: string) => void, value: string) {
    setter(value);
    setPage(1);
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
  ];

  return (
    <>
      <Topbar
        eyebrow="Admin portal"
        title="Student List"
        subtitle={`${filteredStudents.length} of ${roster.length} students`}
      />

      <SectionCard
        title="Institution-wide student list"
        subtitle="Search and filter the full roster across every department and batch"
      >
        <div className="mb-5 flex flex-col gap-4">
          <input
            value={search}
            onChange={(event) => updateFilter(setSearch, event.target.value)}
            placeholder="Search name or register no..."
            className="w-full max-w-sm rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500"
          />
          <div className="flex flex-wrap gap-3">
            <FilterSelect label="Batch" value={batch} options={batchOptions} onChange={(value) => updateFilter(setBatch, value)} />
            <FilterSelect
              label="Department"
              value={department}
              options={departmentOptions}
              onChange={(value) => updateFilter(setDepartment, value)}
            />
            <FilterSelect label="Year" value={year} options={yearOptions} onChange={(value) => updateFilter(setYear, value)} />
            <FilterSelect label="Section" value={section} options={sectionOptions} onChange={(value) => updateFilter(setSection, value)} />
            <FilterSelect label="Gender" value={gender} options={genderOptions} onChange={(value) => updateFilter(setGender, value)} />
            <FilterSelect
              label="Hosteller / Day Scholar"
              value={hostelStatus}
              options={hostelOptions}
              onChange={(value) => updateFilter(setHostelStatus, value)}
            />
          </div>
        </div>

        <DataTable columns={columns} rows={pagedStudents} getRowKey={(row) => row.id} />
        <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
      </SectionCard>
    </>
  );
}
