import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { compare, hash } from "bcryptjs";
import { ObjectId } from "mongodb";

import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";
import type { StudentAccount } from "@/types/student";

const SESSION_COOKIE = "student_portal_session";

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashString: string) {
  return compare(password, hashString);
}

export async function createSession(studentId: string) {
  if (!isMongoConfigured()) {
    return null;
  }

  const cookieStore = await cookies();
  const sessionToken = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();

  const db = await getMongoDb();
  await db.collection("student_sessions").insertOne({
    studentId,
    tokenHash: await hash(sessionToken, 12),
    expiresAt,
    createdAt: new Date().toISOString(),
  });

  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return sessionToken;
}

export async function getAuthenticatedStudent() {
  if (!isMongoConfigured()) {
    return null;
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return null;
  }

  const db = await getMongoDb();
  const sessions = await db.collection("student_sessions").find({}).toArray();

  let matchingSession: (typeof sessions)[number] | null = null;

  for (const session of sessions) {
    const isExpired = new Date(session.expiresAt).getTime() <= Date.now();
    if (isExpired) {
      continue;
    }

    const matches = await compare(sessionToken, session.tokenHash).catch(() => false);

    if (matches) {
      matchingSession = session;
      break;
    }
  }

  if (!matchingSession) {
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  const student = await db.collection<StudentAccount>("student_accounts").findOne({
    _id: new ObjectId(String(matchingSession.studentId)),
  });

  if (!student) {
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  return {
    id: student._id?.toString() ?? student.id,
    registerNumber: student.registerNumber,
    name: student.name,
    email: student.email,
    department: student.department,
    year: student.year,
    semester: student.semester,
  };
}

export async function requireStudentAuth() {
  const student = await getAuthenticatedStudent();

  if (!student) {
    redirect("/");
  }

  return student;
}

export async function logoutStudent() {
  if (!isMongoConfigured()) {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    return;
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionToken) {
    const db = await getMongoDb();
    const sessions = await db.collection("student_sessions").find({}).toArray();

    for (const session of sessions) {
      const matches = await compare(sessionToken, session.tokenHash).catch(() => false);
      if (matches) {
        await db.collection("student_sessions").deleteOne({ _id: session._id });
      }
    }
  }

  cookieStore.delete(SESSION_COOKIE);
}
