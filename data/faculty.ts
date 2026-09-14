import type {
  AttendanceRow,
  CumulativeSheetRow,
  FacultyProfile,
  InternalMarkRow,
  NilArrearCandidate,
  OverallSheetRow,
  SubjectAnalysisRow,
} from "@/types/faculty";

export const facultyProfile: FacultyProfile = {
  employeeId: "JCE-AIML-03",
  name: "Ms. V. Shalini",
  designation: "Assistant Professor",
  department: "Artificial Intelligence & Machine Learning",
  email: "shalini.v@college.edu",
  subjects: [
    {
      id: "sub-01",
      subjectCode: "JCS2010",
      subjectName: "Deep Learning",
      department: "AI & ML",
      yearSemester: "IV / VII",
      batchSection: "AIML-IV-A",
      studentsEnrolled: 58,
    },
    {
      id: "sub-02",
      subjectCode: "JCS2011",
      subjectName: "Neural Networks Lab",
      department: "AI & ML",
      yearSemester: "IV / VII",
      batchSection: "AIML-IV-A",
      studentsEnrolled: 58,
    },
  ],
};

const roster = [
  { registerNumber: "2303310914001", studentName: "Aarav Krishnan" },
  { registerNumber: "2303310914002", studentName: "Divya Shankar" },
  { registerNumber: "2303310914003", studentName: "Karthik Suresh" },
  { registerNumber: "2303310914004", studentName: "Meera Balaji" },
  { registerNumber: "2303310914015", studentName: "Naveen Prakash" },
  { registerNumber: "2303310914016", studentName: "Oviya Ramesh" },
  { registerNumber: "2303310914017", studentName: "Praveen Dinesh" },
  { registerNumber: "2303310914018", studentName: "Revathi Ganesan" },
  { registerNumber: "2303310914019", studentName: "Suriya Narayan" },
  { registerNumber: "2303310914020", studentName: "Vaishnavi Ramkumar" },
];

export const internalMarks: InternalMarkRow[] = roster.map((student, index) => ({
  id: `mark-${index + 1}`,
  registerNumber: student.registerNumber,
  studentName: student.studentName,
  at1: [42, 38, 29, 47, 33, 45, 25, 40, 36, 48][index] ?? null,
  at2: [44, 40, 31, 48, null, 43, 27, 41, 38, 49][index] ?? null,
  at3: null,
  modelExam: null,
}));

export const overallSheet: OverallSheetRow[] = roster.map((student, index) => {
  const subjectTotals = [
    { subjectCode: "JCS2010", total: [86, 78, 60, 93, 68, 88, 52, 80, 74, 95][index] ?? 0 },
    { subjectCode: "JCS2011", total: [88, 80, 58, 94, 70, 85, 55, 82, 76, 96][index] ?? 0 },
  ];
  const overallAverage = subjectTotals.reduce((sum, item) => sum + item.total, 0) / subjectTotals.length;

  return {
    id: `overall-${index + 1}`,
    registerNumber: student.registerNumber,
    studentName: student.studentName,
    subjectTotals,
    overallAverage: Number(overallAverage.toFixed(1)),
  };
});

export const cumulativeSheet: CumulativeSheetRow[] = roster.map((student, index) => {
  const semesterGpa = [
    { semester: "V", gpa: [8.2, 7.9, 6.4, 9.0, 7.1, 8.4, 6.0, 7.8, 7.3, 9.2][index] ?? 0 },
    { semester: "VI", gpa: [8.4, 8.0, 6.6, 9.1, 7.3, 8.5, 6.2, 7.9, 7.5, 9.3][index] ?? 0 },
    { semester: "VII", gpa: [8.6, 8.1, 6.7, 9.2, 7.4, 8.6, 6.3, 8.0, 7.6, 9.4][index] ?? 0 },
  ];
  const cgpa = Number((semesterGpa.reduce((sum, item) => sum + item.gpa, 0) / semesterGpa.length).toFixed(2));

  return {
    id: `cumulative-${index + 1}`,
    registerNumber: student.registerNumber,
    studentName: student.studentName,
    semesterGpa,
    cgpa,
  };
});

export const subjectAnalysis: SubjectAnalysisRow[] = [
  {
    subjectCode: "JCS2010",
    subjectName: "Deep Learning",
    classAverage: 78.4,
    highest: 95,
    lowest: 52,
    passPercentage: 90,
    gradeDistribution: [
      { grade: "O (91-100)", count: 2 },
      { grade: "A+ (81-90)", count: 3 },
      { grade: "A (71-80)", count: 3 },
      { grade: "B (61-70)", count: 1 },
      { grade: "Below 60", count: 1 },
    ],
  },
  {
    subjectCode: "JCS2011",
    subjectName: "Neural Networks Lab",
    classAverage: 80.4,
    highest: 96,
    lowest: 55,
    passPercentage: 100,
    gradeDistribution: [
      { grade: "O (91-100)", count: 2 },
      { grade: "A+ (81-90)", count: 4 },
      { grade: "A (71-80)", count: 2 },
      { grade: "B (61-70)", count: 1 },
      { grade: "Below 60", count: 1 },
    ],
  },
];

// Nil Arrear eligibility rules have not been confirmed yet. This list is a
// placeholder data source for the UI only — no pass/fail or eligibility
// logic is applied here.
export const nilArrearCandidates: NilArrearCandidate[] = roster.map((student, index) => ({
  id: `arrear-${index + 1}`,
  registerNumber: student.registerNumber,
  studentName: student.studentName,
  arrearSubjects: [0, 0, 2, 0, 1, 0, 3, 0, 1, 0][index] ?? 0,
}));

export const attendanceRows: AttendanceRow[] = roster.map((student, index) => {
  const classesConducted = 48;
  const classesAttended = [45, 42, 33, 47, 38, 44, 30, 41, 39, 48][index] ?? 0;

  return {
    id: `att-${index + 1}`,
    registerNumber: student.registerNumber,
    studentName: student.studentName,
    classesConducted,
    classesAttended,
    attendancePercentage: Number(((classesAttended / classesConducted) * 100).toFixed(1)),
  };
});
