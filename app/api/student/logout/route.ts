import { NextResponse } from "next/server";

import { logoutStudent } from "@/lib/auth";

export async function POST() {
  await logoutStudent();
  return NextResponse.json({ message: "Logged out successfully." });
}
