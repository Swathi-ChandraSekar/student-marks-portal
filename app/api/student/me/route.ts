import { NextResponse } from "next/server";

import { getAuthenticatedStudent } from "@/lib/auth";

export async function GET() {
  const student = await getAuthenticatedStudent();

  if (!student) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ student });
}
