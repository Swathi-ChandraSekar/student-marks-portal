import type { ObjectId } from "mongodb";

export type AssessmentType = "AT-I" | "AT-II" | "AT-III" | "Model Exam";

export interface Assessment {
  id: string;
  assessmentType: AssessmentType;
  examDate: string;
  partA: number;
  partB: number;
  total: number;
}

export interface Subject {
  id: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  academicYear: string;
  department: string;
  yearSemester: string;
  assessments: Assessment[];
}

export interface AttendanceRecord {
  id: string;
  subjectCode: string;
  subjectName: string;
  classesAttended: number;
  classesConducted: number;
  attendancePercentage: number;
}

export interface AttendanceSummary {
  overallPercentage: number;
  totalClassesConducted: number;
  totalClassesAttended: number;
  totalClassesAbsent: number;
  subjectBreakdown: AttendanceRecord[];
}

export interface FeeBreakdownItem {
  id: string;
  category: string;
  amount: number;
  status: string;
}

export interface FeePayment {
  id: string;
  date: string;
  referenceId: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
}

export interface FeeSummary {
  totalFees: number;
  amountPaid: number;
  pendingAmount: number;
  paymentStatus: string;
  academicYear: string;
  breakdown: FeeBreakdownItem[];
  paymentHistory: FeePayment[];
}

export interface StudentProfile {
  id: string;
  studentName: string;
  registerNumber: string;
  department: string;
  currentSemester: string;
  academicYear: string;
  overallCgpa: string;
  attendanceRate: number;
  feeStatus: string;
  attendanceSummary: AttendanceSummary;
  feeSummary: FeeSummary;
  subjects: Subject[];
}

export interface StudentAccount {
  _id?: ObjectId | string;
  id?: string;
  registerNumber: string;
  name: string;
  email: string;
  passwordHash: string;
  department: string;
  year: string;
  semester: string;
  createdAt: string;
}

export interface StudentSession {
  _id?: ObjectId | string;
  id?: string;
  studentId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
}
