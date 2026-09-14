import type {
  AdminFacultyRecord,
  AdminStudentRecord,
  Batch,
  CumulativeSheetSummaryRow,
  NilArrearBatchOverview,
  OverallSheetSummaryRow,
  ReportItem,
  SubjectAnalysisSummaryRow,
  SubjectMarksSummary,
} from "@/types/admin";

export const batches: Batch[] = [
  {
    id: "batch-001",
    batchCode: "AIML-IV-A",
    department: "Artificial Intelligence & Machine Learning",
    year: "IV",
    semester: "VII",
    section: "A",
    academicYear: "2026-2027",
    coordinator: "Dr. R. Meenakshi",
    totalStudents: 58,
  },
  {
    id: "batch-002",
    batchCode: "AIML-IV-B",
    department: "Artificial Intelligence & Machine Learning",
    year: "IV",
    semester: "VII",
    section: "B",
    academicYear: "2026-2027",
    coordinator: "Mr. K. Arivazhagan",
    totalStudents: 55,
  },
  {
    id: "batch-003",
    batchCode: "CSE-III-A",
    department: "Computer Science & Engineering",
    year: "III",
    semester: "V",
    section: "A",
    academicYear: "2026-2027",
    coordinator: "Dr. S. Priyadarshini",
    totalStudents: 60,
  },
  {
    id: "batch-004",
    batchCode: "ECE-II-A",
    department: "Electronics & Communication Engineering",
    year: "II",
    semester: "III",
    section: "A",
    academicYear: "2026-2027",
    coordinator: "Mrs. T. Kavitha",
    totalStudents: 52,
  },
];

export const adminStudents: AdminStudentRecord[] = [
  { id: "std-01", registerNumber: "2303310914001", name: "Aarav Krishnan", department: "AI & ML", batchCode: "AIML-IV-A", section: "A", year: "IV", semester: "VII", attendancePercentage: 92, cgpa: 8.6, status: "Active" },
  { id: "std-02", registerNumber: "2303310914002", name: "Divya Shankar", department: "AI & ML", batchCode: "AIML-IV-A", section: "A", year: "IV", semester: "VII", attendancePercentage: 88, cgpa: 8.9, status: "Active" },
  { id: "std-03", registerNumber: "2303310914003", name: "Karthik Suresh", department: "AI & ML", batchCode: "AIML-IV-A", section: "A", year: "IV", semester: "VII", attendancePercentage: 74, cgpa: 7.4, status: "Active" },
  { id: "std-04", registerNumber: "2303310914004", name: "Meera Balaji", department: "AI & ML", batchCode: "AIML-IV-A", section: "A", year: "IV", semester: "VII", attendancePercentage: 95, cgpa: 9.1, status: "Active" },
  { id: "std-05", registerNumber: "2303310914005", name: "Nithya Raghavan", department: "AI & ML", batchCode: "AIML-IV-B", section: "B", year: "IV", semester: "VII", attendancePercentage: 81, cgpa: 8.0, status: "Active" },
  { id: "std-06", registerNumber: "2303310914006", name: "Pranav Iyer", department: "AI & ML", batchCode: "AIML-IV-B", section: "B", year: "IV", semester: "VII", attendancePercentage: 69, cgpa: 6.8, status: "Active" },
  { id: "std-07", registerNumber: "2303310914007", name: "Ritika Sundaram", department: "AI & ML", batchCode: "AIML-IV-B", section: "B", year: "IV", semester: "VII", attendancePercentage: 90, cgpa: 8.7, status: "Active" },
  { id: "std-08", registerNumber: "2303310914008", name: "Sanjay Kumar", department: "AI & ML", batchCode: "AIML-IV-B", section: "B", year: "IV", semester: "VII", attendancePercentage: 77, cgpa: 7.6, status: "Inactive" },
  { id: "std-09", registerNumber: "2303320914009", name: "Anitha Venkatesh", department: "CSE", batchCode: "CSE-III-A", section: "A", year: "III", semester: "V", attendancePercentage: 86, cgpa: 8.3, status: "Active" },
  { id: "std-10", registerNumber: "2303320914010", name: "Bharath Chandran", department: "CSE", batchCode: "CSE-III-A", section: "A", year: "III", semester: "V", attendancePercentage: 91, cgpa: 8.8, status: "Active" },
  { id: "std-11", registerNumber: "2303320914011", name: "Deepika Narayan", department: "CSE", batchCode: "CSE-III-A", section: "A", year: "III", semester: "V", attendancePercentage: 65, cgpa: 6.5, status: "Active" },
  { id: "std-12", registerNumber: "2303330914012", name: "Gokul Anand", department: "ECE", batchCode: "ECE-II-A", section: "A", year: "II", semester: "III", attendancePercentage: 83, cgpa: 7.9, status: "Active" },
  { id: "std-13", registerNumber: "2303330914013", name: "Harini Murali", department: "ECE", batchCode: "ECE-II-A", section: "A", year: "II", semester: "III", attendancePercentage: 94, cgpa: 9.0, status: "Active" },
  { id: "std-14", registerNumber: "2303330914014", name: "Iniyan Selvam", department: "ECE", batchCode: "ECE-II-A", section: "A", year: "II", semester: "III", attendancePercentage: 71, cgpa: 7.1, status: "Active" },
];

export const adminFaculty: AdminFacultyRecord[] = [
  { id: "fac-01", employeeId: "JCE-AIML-01", name: "Dr. R. Meenakshi", department: "AI & ML", designation: "Professor & Head", subjectsHandled: ["Big Data Analytics", "Research Methodology"], email: "meenakshi.r@college.edu", status: "Active" },
  { id: "fac-02", employeeId: "JCE-AIML-02", name: "Mr. K. Arivazhagan", department: "AI & ML", designation: "Assistant Professor", subjectsHandled: ["Social Media Analytics"], email: "arivazhagan.k@college.edu", status: "Active" },
  { id: "fac-03", employeeId: "JCE-AIML-03", name: "Ms. V. Shalini", department: "AI & ML", designation: "Assistant Professor", subjectsHandled: ["Deep Learning", "Neural Networks Lab"], email: "shalini.v@college.edu", status: "Active" },
  { id: "fac-04", employeeId: "JCE-CSE-01", name: "Dr. S. Priyadarshini", department: "CSE", designation: "Associate Professor", subjectsHandled: ["Operating Systems"], email: "priyadarshini.s@college.edu", status: "Active" },
  { id: "fac-05", employeeId: "JCE-CSE-02", name: "Mr. J. Vignesh", department: "CSE", designation: "Assistant Professor", subjectsHandled: ["Database Management Systems"], email: "vignesh.j@college.edu", status: "On Leave" },
  { id: "fac-06", employeeId: "JCE-ECE-01", name: "Mrs. T. Kavitha", department: "ECE", designation: "Assistant Professor", subjectsHandled: ["Digital Electronics"], email: "kavitha.t@college.edu", status: "Active" },
  { id: "fac-07", employeeId: "JCE-SH-01", name: "Dr. P. Bernadette", department: "Science & Humanities", designation: "Associate Professor", subjectsHandled: ["Business English and Soft Skills"], email: "bernadette.p@college.edu", status: "Active" },
];

export const reportItems: ReportItem[] = [
  { id: "rep-01", title: "Batch Performance Summary", scope: "Batch", description: "Average marks, attendance and CGPA rollup for every batch and section.", lastGenerated: "2026-09-10" },
  { id: "rep-02", title: "Department Performance Summary", scope: "Department", description: "Cross-batch comparison of academic performance by department.", lastGenerated: "2026-09-08" },
  { id: "rep-03", title: "Internal Assessment Consolidated Report", scope: "Subject", description: "AT-I, AT-II, AT-III and Model exam consolidation across all subjects.", lastGenerated: "2026-09-05" },
  { id: "rep-04", title: "Attendance Shortage Report", scope: "Batch", description: "Students below the minimum attendance threshold, grouped by batch.", lastGenerated: "2026-09-12" },
  { id: "rep-05", title: "Faculty Workload Report", scope: "Department", description: "Subjects and sections currently assigned to each faculty member.", lastGenerated: "2026-09-01" },
  { id: "rep-06", title: "Nil Arrear Candidate List", scope: "Batch", description: "Draft list of students under review for nil-arrear status. Eligibility rules pending confirmation.", lastGenerated: "2026-09-13" },
  { id: "rep-07", title: "Hosteller / Day Scholar Report", scope: "Institution", description: "Pass/fail counts and comparison for hostellers vs day scholars, drawn from the mock roster.", lastGenerated: "2026-09-14", href: "/admin/hosteller-dayscholar" },
  { id: "rep-08", title: "Boys / Girls Report", scope: "Institution", description: "Pass/fail counts and comparison for boys vs girls, drawn from the mock roster.", lastGenerated: "2026-09-14", href: "/admin/boys-girls" },
];

export const subjectMarksSummary: SubjectMarksSummary[] = [
  { id: "sms-01", subjectCode: "JCS2002", subjectName: "Big Data Analytics", batchCode: "AIML-IV-A", facultyName: "Dr. R. Meenakshi", at1Average: 33.4, at2Average: 36.1, at3Average: null, modelAverage: null },
  { id: "sms-02", subjectCode: "JCS2005", subjectName: "Social Media Analytics", batchCode: "AIML-IV-A", facultyName: "Mr. K. Arivazhagan", at1Average: 31.8, at2Average: 34.5, at3Average: null, modelAverage: null },
  { id: "sms-03", subjectCode: "JCS2010", subjectName: "Deep Learning", batchCode: "AIML-IV-A", facultyName: "Ms. V. Shalini", at1Average: 37.9, at2Average: 39.2, at3Average: null, modelAverage: null },
  { id: "sms-04", subjectCode: "JCS2010", subjectName: "Deep Learning", batchCode: "AIML-IV-B", facultyName: "Ms. V. Shalini", at1Average: 35.2, at2Average: 36.8, at3Average: null, modelAverage: null },
  { id: "sms-05", subjectCode: "JOS3001", subjectName: "Operating Systems", batchCode: "CSE-III-A", facultyName: "Dr. S. Priyadarshini", at1Average: 34.0, at2Average: null, at3Average: null, modelAverage: null },
  { id: "sms-06", subjectCode: "JDB3002", subjectName: "Database Management Systems", batchCode: "CSE-III-A", facultyName: "Mr. J. Vignesh", at1Average: 32.6, at2Average: null, at3Average: null, modelAverage: null },
  { id: "sms-07", subjectCode: "JDE2001", subjectName: "Digital Electronics", batchCode: "ECE-II-A", facultyName: "Mrs. T. Kavitha", at1Average: 30.1, at2Average: null, at3Average: null, modelAverage: null },
];

export const overallSheetSummary: OverallSheetSummaryRow[] = [
  { id: "oss-01", registerNumber: "2303310914001", studentName: "Aarav Krishnan", batchCode: "AIML-IV-A", subjectsCount: 6, overallAverage: 82.4 },
  { id: "oss-02", registerNumber: "2303310914002", studentName: "Divya Shankar", batchCode: "AIML-IV-A", subjectsCount: 6, overallAverage: 85.1 },
  { id: "oss-03", registerNumber: "2303310914003", studentName: "Karthik Suresh", batchCode: "AIML-IV-A", subjectsCount: 6, overallAverage: 68.7 },
  { id: "oss-04", registerNumber: "2303310914004", studentName: "Meera Balaji", batchCode: "AIML-IV-A", subjectsCount: 6, overallAverage: 90.3 },
  { id: "oss-05", registerNumber: "2303320914009", studentName: "Anitha Venkatesh", batchCode: "CSE-III-A", subjectsCount: 6, overallAverage: 79.8 },
  { id: "oss-06", registerNumber: "2303320914010", studentName: "Bharath Chandran", batchCode: "CSE-III-A", subjectsCount: 6, overallAverage: 84.6 },
  { id: "oss-07", registerNumber: "2303330914012", studentName: "Gokul Anand", batchCode: "ECE-II-A", subjectsCount: 5, overallAverage: 76.2 },
];

export const cumulativeSheetSummary: CumulativeSheetSummaryRow[] = [
  { id: "css-01", registerNumber: "2303310914001", studentName: "Aarav Krishnan", batchCode: "AIML-IV-A", cgpa: 8.6 },
  { id: "css-02", registerNumber: "2303310914002", studentName: "Divya Shankar", batchCode: "AIML-IV-A", cgpa: 8.9 },
  { id: "css-03", registerNumber: "2303310914003", studentName: "Karthik Suresh", batchCode: "AIML-IV-A", cgpa: 7.4 },
  { id: "css-04", registerNumber: "2303310914004", studentName: "Meera Balaji", batchCode: "AIML-IV-A", cgpa: 9.1 },
  { id: "css-05", registerNumber: "2303320914009", studentName: "Anitha Venkatesh", batchCode: "CSE-III-A", cgpa: 8.3 },
  { id: "css-06", registerNumber: "2303320914010", studentName: "Bharath Chandran", batchCode: "CSE-III-A", cgpa: 8.8 },
  { id: "css-07", registerNumber: "2303330914012", studentName: "Gokul Anand", batchCode: "ECE-II-A", cgpa: 7.9 },
];

export const subjectAnalysisSummary: SubjectAnalysisSummaryRow[] = [
  { id: "sas-01", subjectCode: "JCS2002", subjectName: "Big Data Analytics", batchCode: "AIML-IV-A", classAverage: 74.2, passPercentage: 91 },
  { id: "sas-02", subjectCode: "JCS2005", subjectName: "Social Media Analytics", batchCode: "AIML-IV-A", classAverage: 71.5, passPercentage: 88 },
  { id: "sas-03", subjectCode: "JCS2010", subjectName: "Deep Learning", batchCode: "AIML-IV-A", classAverage: 78.4, passPercentage: 90 },
  { id: "sas-04", subjectCode: "JOS3001", subjectName: "Operating Systems", batchCode: "CSE-III-A", classAverage: 69.8, passPercentage: 82 },
  { id: "sas-05", subjectCode: "JDE2001", subjectName: "Digital Electronics", batchCode: "ECE-II-A", classAverage: 66.3, passPercentage: 79 },
];

// Nil Arrear eligibility rules have not been confirmed yet. These counts are
// placeholder data for the UI only — no eligibility logic is applied here.
export const nilArrearOverview: NilArrearBatchOverview[] = [
  { id: "nao-01", batchCode: "AIML-IV-A", totalStudents: 58, underReview: 12, arrearFree: 46 },
  { id: "nao-02", batchCode: "AIML-IV-B", totalStudents: 55, underReview: 15, arrearFree: 40 },
  { id: "nao-03", batchCode: "CSE-III-A", totalStudents: 60, underReview: 9, arrearFree: 51 },
  { id: "nao-04", batchCode: "ECE-II-A", totalStudents: 52, underReview: 11, arrearFree: 41 },
];

export const adminOverviewStats = {
  totalStudents: adminStudents.length,
  totalFaculty: adminFaculty.length,
  totalBatches: batches.length,
  averageAttendance: Math.round(
    adminStudents.reduce((sum, student) => sum + student.attendancePercentage, 0) / adminStudents.length,
  ),
};
