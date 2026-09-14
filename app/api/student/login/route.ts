import { NextResponse } from "next/server";

import { createSession, verifyPassword } from "@/lib/auth";
import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ message: "MongoDB is not configured yet. Add MONGODB_URI to your .env.local file." }, { status: 503 });
    }

    const body = await request.json();
    const { registerNumber, password } = body;

    if (!registerNumber || !password) {
      return NextResponse.json({ message: "Register number and password are required." }, { status: 400 });
    }

    const db = await getMongoDb();
    const account = await db.collection("student_accounts").findOne({ registerNumber });

    if (!account) {
      return NextResponse.json({ message: "Invalid register number or password." }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, account.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid register number or password." }, { status: 401 });
    }

    await createSession(account._id.toString());

    return NextResponse.json({
      message: "Login successful.",
      student: {
        id: account._id.toString(),
        registerNumber: account.registerNumber,
        name: account.name,
        department: account.department,
        year: account.year,
        semester: account.semester,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";

    return NextResponse.json(
      {
        message: `Login failed: ${message}`,
      },
      { status: 500 },
    );
  }
}
