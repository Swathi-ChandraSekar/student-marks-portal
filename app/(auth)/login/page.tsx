"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentLoginPage() {
  const router = useRouter();
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registerNumber, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message ?? "Login failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">College student portal</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Student Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="registerNumber" className="mb-2 block text-sm font-medium text-slate-700">
              Register number
            </label>
            <input
              id="registerNumber"
              type="text"
              value={registerNumber}
              onChange={(event) => setRegisterNumber(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
              placeholder="Enter register number"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
              placeholder="Enter password"
              required
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Need an account?{" "}
          <a href="/register" className="font-semibold text-sky-700 hover:text-sky-800">
            Create student registration
          </a>
        </div>
      </div>
    </div>
  );
}
