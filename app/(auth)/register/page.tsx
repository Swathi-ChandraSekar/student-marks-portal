"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    registerNumber: "",
    email: "",
    password: "",
    department: "",
    year: "",
    semester: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message ?? "Registration failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">College student portal</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Student Registration</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="registerNumber" className="mb-2 block text-sm font-medium text-slate-700">Register number</label>
            <input
              id="registerNumber"
              type="text"
              value={form.registerNumber}
              onChange={(event) => setForm({ ...form, registerNumber: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="department" className="mb-2 block text-sm font-medium text-slate-700">Department</label>
            <input
              id="department"
              type="text"
              value={form.department}
              onChange={(event) => setForm({ ...form, department: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="year" className="mb-2 block text-sm font-medium text-slate-700">Year</label>
            <input
              id="year"
              type="text"
              value={form.year}
              onChange={(event) => setForm({ ...form, year: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
              placeholder="e.g. 2nd Year"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="semester" className="mb-2 block text-sm font-medium text-slate-700">Semester</label>
            <input
              id="semester"
              type="text"
              value={form.semester}
              onChange={(event) => setForm({ ...form, semester: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
              placeholder="e.g. Semester 6"
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
            className="md:col-span-2 w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
