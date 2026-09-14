"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const { name, email, department, role, password } = form;

    if (!name.trim() || !email.trim() || !department.trim() || !role.trim() || !password.trim()) {
      setError("Please complete all admin registration fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 250));
      router.push("/admin");
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Admin registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">Admin portal</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Admin Registration</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="admin-name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input
              id="admin-name"
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="admin-email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-role" className="mb-2 block text-sm font-medium text-slate-700">Role</label>
            <input
              id="admin-role"
              type="text"
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white"
              placeholder="e.g. Academic Admin"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="admin-department" className="mb-2 block text-sm font-medium text-slate-700">Department</label>
            <input
              id="admin-department"
              type="text"
              value={form.department}
              onChange={(event) => setForm({ ...form, department: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="admin-password"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white"
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
            className="md:col-span-2 w-full rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/admin-login" className="font-semibold text-violet-700 hover:text-violet-800">
            Admin login
          </Link>
        </div>
      </div>
    </div>
  );
}
