// Session 2 — richer student roster used for the Student List pages and the
// Hosteller/Day Scholar and Boys/Girls analytics pages.
//
// This is intentionally a separate, additive data model from
// `AdminStudentRecord` (types/admin.ts) so existing Session 1 Admin/Faculty
// functionality (Student Management, Internal Marks, Overall Sheet, etc.)
// is left untouched.

export type Gender = "Male" | "Female";

export type HostelStatus = "Hosteller" | "Day Scholar";

/**
 * A single subject's AT-1 / AT-2 marks for a roster student.
 * Only AT-1 and AT-2 exist for this session — each is out of 50.
 */
export interface RosterSubjectScore {
  subjectCode: string;
  subjectName: string;
  at1: number;
  at2: number;
}

export interface RosterStudent {
  id: string;
  registerNumber: string;
  name: string;
  gender: Gender;
  batchCode: string;
  department: string;
  year: string;
  semester: string;
  section: string;
  hostelStatus: HostelStatus;
  attendancePercentage: number;
  subjects: RosterSubjectScore[];
  /**
   * The final end-semester / Nil Arrear rule has not been confirmed yet, so
   * this always stays "Pending" for every student this session.
   */
  arrearStatus: "Pending";
}

/** Pass/slow-learner evaluation of a single subject's AT-2 mark. */
export interface SubjectAssessmentResult {
  subjectCode: string;
  subjectName: string;
  at2: number;
  pass: boolean;
  slowLearner: boolean;
}

/** Overall AT-2 based performance for one student. */
export interface StudentPerformanceResult {
  registerNumber: string;
  overallPass: boolean;
  isSlowLearner: boolean;
  subjectResults: SubjectAssessmentResult[];
}

/** Aggregate pass/fail statistics for a group of students. */
export interface GroupPerformanceStats {
  total: number;
  passCount: number;
  failCount: number;
  passPercentage: number;
}

// ==================================================
// Session 3 — Overall Sheet / Cumulative Sheet / Subject Analysis
// ==================================================

/** Pass + slow-learner evaluation of a single assessment mark (AT-1 or AT-2). */
export interface AssessmentEvaluation {
  mark: number;
  pass: boolean;
  slowLearner: boolean;
}

/** One student's Overall Sheet row — AT-1/AT-2 per subject plus overall AT-2 result. */
export interface OverallSheetEntry {
  student: RosterStudent;
  failedSubjectCount: number;
  overallPass: boolean;
  isSlowLearner: boolean;
}

/** One student+subject row for the Cumulative Sheet / Subject-wise Cumulative Analysis. */
export interface SubjectCumulativeRow {
  subjectCode: string;
  subjectName: string;
  registerNumber: string;
  studentName: string;
  batchCode: string;
  at1: number;
  at1Pass: boolean;
  at1SlowLearner: boolean;
  at2: number;
  at2Pass: boolean;
  at2SlowLearner: boolean;
  difference: number;
  trend: "Improved" | "Declined" | "Same";
}

/** Per-student AT-1 vs AT-2 totals/averages across all of that student's subjects. */
export interface StudentCumulativeTotals {
  registerNumber: string;
  studentName: string;
  at1Total: number;
  at1Average: number;
  at2Total: number;
  at2Average: number;
  improvement: number;
}

/** One student's detail row within the Subject Analysis student list for a selected subject. */
export interface SubjectStudentDetailRow {
  registerNumber: string;
  studentName: string;
  gender: Gender;
  batchCode: string;
  section: string;
  hostelStatus: HostelStatus;
  at1: number;
  at1Pass: boolean;
  at2: number;
  at2Pass: boolean;
  isSlowLearner: boolean;
}

/** Subject-level aggregate statistics used by Subject Analysis and Subject-wise Cumulative Analysis. */
export interface SubjectSummary {
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  batchCodes: string[];
  totalAppearances: number;
  at1PassCount: number;
  at1FailCount: number;
  at1PassPercentage: number;
  at2PassCount: number;
  at2FailCount: number;
  at2PassPercentage: number;
}
