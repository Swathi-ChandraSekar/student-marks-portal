import type { AttendanceRecord } from "@/types/student";

interface AttendanceCardProps {
  record: AttendanceRecord;
}

export function AttendanceCard({ record }: AttendanceCardProps) {
  const isLowAttendance = record.attendancePercentage < 75;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{record.subjectCode}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{record.subjectName}</h3>
        </div>
        <div
          className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
            isLowAttendance
              ? "bg-rose-100 text-rose-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {record.attendancePercentage}%
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Attended</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{record.classesAttended}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Conducted</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{record.classesConducted}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Status</p>
          <p
            className={`mt-2 text-lg font-semibold ${
              isLowAttendance ? "text-rose-700" : "text-emerald-700"
            }`}
          >
            {isLowAttendance ? "Needs attention" : "Healthy"}
          </p>
        </div>
      </div>
    </div>
  );
}
