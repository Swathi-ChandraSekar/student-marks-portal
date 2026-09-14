export interface Batch {
  id: string;
  batchCode: string;
  department: string;
  year: string;
  semester: string;
  section: string;
  academicYear: string;
  coordinator: string;
  totalStudents: number;
}

export interface AdminStudentRecord {
  id: string;
  registerNumber: string;
  name: string;
  department: string;
  batchCode: string;
  section: string;
  year: string;
  semester: string;
  attendancePercentage: number;
  cgpa: number;
  status: "Active" | "Inactive";
}

export interface AdminFacultyRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  subjectsHandled: string[];
  email: string;
  status: "Active" | "On Leave" | "Inactive";
}

export interface SubjectMarksSummary {
  id: string;
  subjectCode: string;
  subjectName: string;
  batchCode: string;
  facultyName: string;
  at1Average: number | null;
  at2Average: number | null;
  at3Average: number | null;
  modelAverage: number | null;
}

export interface OverallSheetSummaryRow {
  id: string;
  registerNumber: string;
  studentName: string;
  batchCode: string;
  subjectsCount: number;
  overallAverage: number;
}

export interface CumulativeSheetSummaryRow {
  id: string;
  registerNumber: string;
  studentName: string;
  batchCode: string;
  cgpa: number;
}

export interface SubjectAnalysisSummaryRow {
  id: string;
  subjectCode: string;
  subjectName: string;
  batchCode: string;
  classAverage: number;
  passPercentage: number;
}

export interface NilArrearBatchOverview {
  id: string;
  batchCode: string;
  totalStudents: number;
  underReview: number;
  arrearFree: number;
}

export interface ReportItem {
  id: string;
  title: string;
  scope: string;
  description: string;
  lastGenerated: string;
  /** Optional route for reports that open a dedicated page instead of the "Generate" placeholder. */
  href?: string;
}
