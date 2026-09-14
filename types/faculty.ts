export interface FacultySubjectAssignment {
  id: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  yearSemester: string;
  batchSection: string;
  studentsEnrolled: number;
}

export interface FacultyProfile {
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  subjects: FacultySubjectAssignment[];
}

export interface InternalMarkRow {
  id: string;
  registerNumber: string;
  studentName: string;
  at1: number | null;
  at2: number | null;
  at3: number | null;
  modelExam: number | null;
}

export interface OverallSheetRow {
  id: string;
  registerNumber: string;
  studentName: string;
  subjectTotals: { subjectCode: string; total: number }[];
  overallAverage: number;
}

export interface CumulativeSheetRow {
  id: string;
  registerNumber: string;
  studentName: string;
  semesterGpa: { semester: string; gpa: number }[];
  cgpa: number;
}

export interface SubjectAnalysisRow {
  subjectCode: string;
  subjectName: string;
  classAverage: number;
  highest: number;
  lowest: number;
  passPercentage: number;
  gradeDistribution: { grade: string; count: number }[];
}

export interface NilArrearCandidate {
  id: string;
  registerNumber: string;
  studentName: string;
  arrearSubjects: number;
}

export interface AttendanceRow {
  id: string;
  registerNumber: string;
  studentName: string;
  classesConducted: number;
  classesAttended: number;
  attendancePercentage: number;
}
