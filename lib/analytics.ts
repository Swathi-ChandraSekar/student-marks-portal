import { subjectMarksSummary } from "@/data/admin";
import type { FacultyProfile } from "@/types/faculty";
import type {
  AssessmentEvaluation,
  GroupPerformanceStats,
  OverallSheetEntry,
  RosterStudent,
  StudentCumulativeTotals,
  StudentPerformanceResult,
  SubjectAssessmentResult,
  SubjectCumulativeRow,
  SubjectStudentDetailRow,
  SubjectSummary,
} from "@/types/roster";

// ==================================================
// Academic rules (Session 2)
// ==================================================
// Each assessment (AT-1, AT-2) is out of 50.
// PASS: 25/50 or above.
// SLOW LEARNER: below 30/50.
// Overall student performance is based on AT-2 only:
//   - every subject >= 25  -> Overall PASS
//   - one or more subjects < 25 -> Overall FAIL
// "Slow Learner" does NOT automatically mean "Fail" — a student can be
// PASS + Slow Learner, PASS + Not Slow Learner, or FAIL + Slow Learner.

export const ASSESSMENT_MAX_MARKS = 50;
export const PASS_MARK = 25;
export const SLOW_LEARNER_THRESHOLD = 30;

/** Evaluates a single subject's AT-2 mark against the pass and slow-learner rules. */
export function evaluateSubjectAt2(
  subjectCode: string,
  subjectName: string,
  at2: number,
): SubjectAssessmentResult {
  return {
    subjectCode,
    subjectName,
    at2,
    pass: at2 >= PASS_MARK,
    slowLearner: at2 < SLOW_LEARNER_THRESHOLD,
  };
}

/**
 * Computes a student's overall AT-2 based performance:
 * PASS only if every subject is >= 25, and flagged as a slow learner if any
 * subject is below 30 (regardless of overall pass/fail).
 */
export function getStudentPerformance(student: RosterStudent): StudentPerformanceResult {
  const subjectResults = student.subjects.map((subject) =>
    evaluateSubjectAt2(subject.subjectCode, subject.subjectName, subject.at2),
  );

  const overallPass = subjectResults.length > 0 && subjectResults.every((result) => result.pass);
  const isSlowLearner = subjectResults.some((result) => result.slowLearner);

  return {
    registerNumber: student.registerNumber,
    overallPass,
    isSlowLearner,
    subjectResults,
  };
}

export function isStudentPass(student: RosterStudent): boolean {
  return getStudentPerformance(student).overallPass;
}

export function isStudentSlowLearner(student: RosterStudent): boolean {
  return getStudentPerformance(student).isSlowLearner;
}

/** Aggregate pass/fail statistics for any group of students, derived from the roster. */
export function calculateGroupStats(students: RosterStudent[]): GroupPerformanceStats {
  const total = students.length;
  const passCount = students.filter((student) => isStudentPass(student)).length;
  const failCount = total - passCount;
  const passPercentage = total === 0 ? 0 : Number(((passCount / total) * 100).toFixed(1));

  return { total, passCount, failCount, passPercentage };
}

// ==================================================
// Demographic groupings
// ==================================================

export function getHostellerStudents(students: RosterStudent[]): RosterStudent[] {
  return students.filter((student) => student.hostelStatus === "Hosteller");
}

export function getDayScholarStudents(students: RosterStudent[]): RosterStudent[] {
  return students.filter((student) => student.hostelStatus === "Day Scholar");
}

export function getBoysStudents(students: RosterStudent[]): RosterStudent[] {
  return students.filter((student) => student.gender === "Male");
}

export function getGirlsStudents(students: RosterStudent[]): RosterStudent[] {
  return students.filter((student) => student.gender === "Female");
}

export function getHostellerStats(students: RosterStudent[]): GroupPerformanceStats {
  return calculateGroupStats(getHostellerStudents(students));
}

export function getDayScholarStats(students: RosterStudent[]): GroupPerformanceStats {
  return calculateGroupStats(getDayScholarStudents(students));
}

export function getBoysStats(students: RosterStudent[]): GroupPerformanceStats {
  return calculateGroupStats(getBoysStudents(students));
}

export function getGirlsStats(students: RosterStudent[]): GroupPerformanceStats {
  return calculateGroupStats(getGirlsStudents(students));
}

// ==================================================
// Session 3 — Overall Sheet / Cumulative Sheet / Subject Analysis
// ==================================================
// All calculations below are derived from `roster` (data/roster.ts) at
// render time — nothing here is hardcoded. AT-1 and AT-2 use the same
// pass (>=25) and slow-learner (<30) rules; only AT-2 feeds the overall
// student PASS/FAIL result (see getStudentPerformance above).

/** Evaluates a single assessment mark (AT-1 or AT-2) against the pass and slow-learner rules. */
export function evaluateAssessmentMark(mark: number): AssessmentEvaluation {
  return {
    mark,
    pass: mark >= PASS_MARK,
    slowLearner: mark < SLOW_LEARNER_THRESHOLD,
  };
}

/** Number of subjects a student has failed, based on the AT-2 pass rule. */
export function getFailedSubjectCount(student: RosterStudent): number {
  return student.subjects.filter((subject) => subject.at2 < PASS_MARK).length;
}

/** Builds a complete Overall Sheet entry (subjects, failed count, overall result) for one student. */
export function getOverallSheetEntry(student: RosterStudent): OverallSheetEntry {
  const performance = getStudentPerformance(student);

  return {
    student,
    failedSubjectCount: getFailedSubjectCount(student),
    overallPass: performance.overallPass,
    isSlowLearner: performance.isSlowLearner,
  };
}

export function getOverallSheet(students: RosterStudent[]): OverallSheetEntry[] {
  return students.map((student) => getOverallSheetEntry(student));
}

/** Every distinct subject present in the roster, in first-seen order. Does not invent subjects. */
export function getAllSubjects(students: RosterStudent[]): { subjectCode: string; subjectName: string }[] {
  const seen = new Map<string, string>();

  students.forEach((student) => {
    student.subjects.forEach((subject) => {
      if (!seen.has(subject.subjectCode)) {
        seen.set(subject.subjectCode, subject.subjectName);
      }
    });
  });

  return Array.from(seen.entries()).map(([subjectCode, subjectName]) => ({ subjectCode, subjectName }));
}

/** Students from the roster who are enrolled in a given subject code. */
export function getStudentsForSubject(students: RosterStudent[], subjectCode: string): RosterStudent[] {
  return students.filter((student) => student.subjects.some((subject) => subject.subjectCode === subjectCode));
}

/**
 * Faculty name teaching a subject, looked up from the Session 1/2 subject
 * marks summary (data/admin.ts). Falls back to "Not assigned" for subjects
 * that don't yet have a faculty mapping in the mock data (e.g. subjects only
 * introduced in the Session 2 roster).
 */
export function getFacultyNameForSubject(subjectCode: string): string {
  const match = subjectMarksSummary.find((row) => row.subjectCode === subjectCode);
  return match?.facultyName ?? "Not assigned";
}

/** Flattened student x subject rows — the basis of the Cumulative Sheet and Subject-wise Cumulative Analysis. */
export function getSubjectCumulativeRows(students: RosterStudent[], subjectCode?: string): SubjectCumulativeRow[] {
  const rows: SubjectCumulativeRow[] = [];

  students.forEach((student) => {
    student.subjects
      .filter((subject) => !subjectCode || subject.subjectCode === subjectCode)
      .forEach((subject) => {
        const at1Eval = evaluateAssessmentMark(subject.at1);
        const at2Eval = evaluateAssessmentMark(subject.at2);
        const difference = subject.at2 - subject.at1;

        rows.push({
          subjectCode: subject.subjectCode,
          subjectName: subject.subjectName,
          registerNumber: student.registerNumber,
          studentName: student.name,
          batchCode: student.batchCode,
          at1: subject.at1,
          at1Pass: at1Eval.pass,
          at1SlowLearner: at1Eval.slowLearner,
          at2: subject.at2,
          at2Pass: at2Eval.pass,
          at2SlowLearner: at2Eval.slowLearner,
          difference,
          trend: difference > 0 ? "Improved" : difference < 0 ? "Declined" : "Same",
        });
      });
  });

  return rows;
}

/** AT-1 vs AT-2 totals/averages across all of a student's subjects. */
export function getStudentCumulativeTotals(student: RosterStudent): StudentCumulativeTotals {
  const at1Total = student.subjects.reduce((sum, subject) => sum + subject.at1, 0);
  const at2Total = student.subjects.reduce((sum, subject) => sum + subject.at2, 0);
  const subjectCount = student.subjects.length || 1;

  return {
    registerNumber: student.registerNumber,
    studentName: student.name,
    at1Total,
    at1Average: Number((at1Total / subjectCount).toFixed(1)),
    at2Total,
    at2Average: Number((at2Total / subjectCount).toFixed(1)),
    improvement: Number(((at2Total - at1Total) / subjectCount).toFixed(1)),
  };
}

/** Aggregate AT-1/AT-2 pass-fail statistics for one subject, derived from the roster. */
export function getSubjectSummary(students: RosterStudent[], subjectCode: string): SubjectSummary | null {
  const rows = getSubjectCumulativeRows(students, subjectCode);

  if (rows.length === 0) {
    return null;
  }

  const totalAppearances = rows.length;
  const at1PassCount = rows.filter((row) => row.at1Pass).length;
  const at1FailCount = totalAppearances - at1PassCount;
  const at2PassCount = rows.filter((row) => row.at2Pass).length;
  const at2FailCount = totalAppearances - at2PassCount;
  const batchCodes = Array.from(new Set(rows.map((row) => row.batchCode)));

  return {
    subjectCode,
    subjectName: rows[0].subjectName,
    facultyName: getFacultyNameForSubject(subjectCode),
    batchCodes,
    totalAppearances,
    at1PassCount,
    at1FailCount,
    at1PassPercentage: Number(((at1PassCount / totalAppearances) * 100).toFixed(1)),
    at2PassCount,
    at2FailCount,
    at2PassPercentage: Number(((at2PassCount / totalAppearances) * 100).toFixed(1)),
  };
}

/** Subject Analysis / Subject-wise Cumulative Analysis summary for every subject in the roster. */
export function getSubjectSummaries(students: RosterStudent[]): SubjectSummary[] {
  return getAllSubjects(students)
    .map((subject) => getSubjectSummary(students, subject.subjectCode))
    .filter((summary): summary is SubjectSummary => summary !== null);
}

/**
 * Subject codes a faculty member is assigned to, restricted to subjects that
 * actually exist in the Session 2 mock roster. This keeps Faculty Overall
 * Sheet / Cumulative Sheet / Subject Analysis pages scoped to that faculty's
 * own classes and prevents them from ever seeing the full Admin dataset.
 */
export function getFacultyAssignedSubjectCodes(profile: FacultyProfile, students: RosterStudent[]): string[] {
  const rosterSubjectCodes = new Set(getAllSubjects(students).map((subject) => subject.subjectCode));
  return profile.subjects
    .map((subject) => subject.subjectCode)
    .filter((subjectCode) => rosterSubjectCodes.has(subjectCode));
}

/** Roster students who take at least one of the faculty's assigned (and roster-present) subjects. */
export function getFacultyStudents(profile: FacultyProfile, students: RosterStudent[]): RosterStudent[] {
  const assignedCodes = new Set(getFacultyAssignedSubjectCodes(profile, students));
  return students.filter((student) => student.subjects.some((subject) => assignedCodes.has(subject.subjectCode)));
}

/**
 * Full per-student detail list for a selected subject — used by the Subject
 * Analysis pages' "student list for the selected subject" table.
 */
export function getSubjectStudentDetails(students: RosterStudent[], subjectCode: string): SubjectStudentDetailRow[] {
  return getStudentsForSubject(students, subjectCode).map((student) => {
    const subject = student.subjects.find((item) => item.subjectCode === subjectCode)!;
    const at1Eval = evaluateAssessmentMark(subject.at1);
    const at2Eval = evaluateAssessmentMark(subject.at2);

    return {
      registerNumber: student.registerNumber,
      studentName: student.name,
      gender: student.gender,
      batchCode: student.batchCode,
      section: student.section,
      hostelStatus: student.hostelStatus,
      at1: subject.at1,
      at1Pass: at1Eval.pass,
      at2: subject.at2,
      at2Pass: at2Eval.pass,
      isSlowLearner: at2Eval.slowLearner,
    };
  });
}
