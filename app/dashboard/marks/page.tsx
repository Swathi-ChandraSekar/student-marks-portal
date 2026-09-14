"use client";

import { useMemo, useState } from "react";

import { AssessmentSelector } from "@/components/marks/AssessmentSelector";
import { MarksCard } from "@/components/marks/MarksCard";
import { assessmentTypeOptions, studentProfile } from "@/data/student";
import type { AssessmentType } from "@/types/student";

export default function MarksPage() {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType>("AT-I");

  const selectedAssessmentSummary = useMemo(() => {
    const assessmentTotals = studentProfile.subjects.map((subject) => {
      const assessment = subject.assessments.find(
        (item) => item.assessmentType === selectedAssessment,
      );

      return {
        subjectCode: subject.subjectCode,
        subjectName: subject.subjectName,
        total: assessment?.total ?? 0,
      };
    });

    const total = assessmentTotals.reduce((sum, item) => sum + item.total, 0);
    const average = assessmentTotals.length ? total / assessmentTotals.length : 0;

    return {
      total,
      average,
      subjectsCount: assessmentTotals.length,
    };
  }, [selectedAssessment]);

  return (
    <div>
      <header className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-600">Academic records</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Marks</h1>
          </div>
          <AssessmentSelector
            value={selectedAssessment}
            options={assessmentTypeOptions}
            onChange={setSelectedAssessment}
          />
        </div>
      </header>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Assessment</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{selectedAssessment}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Total marks</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{selectedAssessmentSummary.total}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Average</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{selectedAssessmentSummary.average.toFixed(1)}</p>
        </div>
      </section>

      <div className="space-y-6">
        {studentProfile.subjects.map((subject) => {
          const selectedAssessmentData = subject.assessments.find(
            (assessment) => assessment.assessmentType === selectedAssessment,
          );

          return (
            <MarksCard
              key={subject.id}
              subject={subject}
              selectedAssessment={selectedAssessmentData}
            />
          );
        })}
      </div>
    </div>
  );
}
