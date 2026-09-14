import { getMongoDb } from "@/lib/mongodb";
import { studentProfile } from "@/data/student";
import type { StudentProfile } from "@/types/student";

export async function getStudentProfileByRegisterNumber(registerNumber: string): Promise<StudentProfile | null> {
  if (!registerNumber) {
    return null;
  }

  try {
    const db = await getMongoDb();
    const collection = db.collection("student_profiles");
    const existing = await collection.findOne({ registerNumber });

    if (existing) {
      return existing as unknown as StudentProfile;
    }
  } catch {
    // Fallback to existing mock data when MongoDB is not configured yet.
  }

  return studentProfile.registerNumber === registerNumber ? studentProfile : null;
}
