import type { Assessment, Subject } from "@/types/student";

interface MarksCardProps {
  subject: Subject;
  selectedAssessment: Assessment | undefined;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function MarksCard({ subject, selectedAssessment }: MarksCardProps) {
  const average =
    subject.assessments.reduce((sum, assessment) => sum + assessment.total, 0) /
    subject.assessments.length;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{subject.subjectCode}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{subject.subjectName}</h3>
        </div>
        <div className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
          Avg. {average.toFixed(1)}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Faculty</p>
          <p className="mt-2 font-semibold text-slate-800">{subject.facultyName}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Exam Date</p>
          <p className="mt-2 font-semibold text-slate-800">
            {selectedAssessment ? formatDate(selectedAssessment.examDate) : "—"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Assessment</p>
          <p className="mt-2 font-semibold text-slate-800">
            {selectedAssessment?.assessmentType ?? "Select"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Subject total</p>
          <p className="mt-2 font-semibold text-slate-800">
            {selectedAssessment?.total ?? "—"}/50
          </p>
        </div>
      </div>

      {selectedAssessment && (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-700">Part A</p>
            <p className="mt-2 text-2xl font-bold text-emerald-900">{selectedAssessment.partA}</p>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-sky-700">Part B</p>
            <p className="mt-2 text-2xl font-bold text-sky-900">{selectedAssessment.partB}</p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-violet-700">Total</p>
            <p className="mt-2 text-2xl font-bold text-violet-900">{selectedAssessment.total}</p>
          </div>
        </div>
      )}
    </div>
  );
}
