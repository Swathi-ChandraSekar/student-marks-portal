import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/auth";
import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ message: "MongoDB is not configured yet. Add MONGODB_URI to your .env.local file." }, { status: 503 });
    }

    const body = await request.json();
    const { name, registerNumber, email, password, department, year, semester } = body;

    if (!name || !registerNumber || !email || !password || !department || !year || !semester) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const db = await getMongoDb();
    const accountCollection = db.collection("student_accounts");

    const existingAccount = await accountCollection.findOne({ registerNumber });

    if (existingAccount) {
      return NextResponse.json({ message: "A student with this register number already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const result = await accountCollection.insertOne({
      registerNumber,
      name,
      email,
      passwordHash,
      department,
      year,
      semester,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      message: "Student registration successful.",
      studentId: result.insertedId.toString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed.";

    return NextResponse.json(
      {
        message: `Registration failed: ${message}`,
      },
      { status: 500 },
    );
  }
}
