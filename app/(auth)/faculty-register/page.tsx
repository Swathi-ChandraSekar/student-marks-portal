"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FacultyRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const { name, email, employeeId, department, password } = form;

    if (!name.trim() || !email.trim() || !employeeId.trim() || !department.trim() || !password.trim()) {
      setError("Please fill in all fields to create the faculty account.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 250));
      router.push("/faculty");
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Faculty registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Faculty portal</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Faculty Registration</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="faculty-name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input
              id="faculty-name"
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="faculty-email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="faculty-email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="faculty-employee-id" className="mb-2 block text-sm font-medium text-slate-700">Employee ID</label>
            <input
              id="faculty-employee-id"
              type="text"
              value={form.employeeId}
              onChange={(event) => setForm({ ...form, employeeId: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="faculty-department" className="mb-2 block text-sm font-medium text-slate-700">Department</label>
            <input
              id="faculty-department"
              type="text"
              value={form.department}
              onChange={(event) => setForm({ ...form, department: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              placeholder="e.g. Computer Science"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="faculty-password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="faculty-password"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              required
            />
          </div>

          {error ? (
            <div className="md:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/faculty-login" className="font-semibold text-emerald-700 hover:text-emerald-800">
            Faculty login
          </Link>
        </div>
      </div>
    </div>
  );
}
