import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-5xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <section className="rounded-3xl bg-slate-950 p-7 text-white shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">College student portal</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Student access to your academic journey.
            </h1>
            <p className="mt-4 max-w-md text-base text-slate-300">
              Track your marks, attendance, and fee status from one secure student portal.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Student Login
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Student Registration
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Portal access</p>
            <div className="mt-5 space-y-3">
              <Link
                href="/login"
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <span>
                  <span className="block text-sm text-slate-500">Student</span>
                  <span className="mt-1 block text-lg font-bold text-slate-900">Login</span>
                </span>
                <span className="text-xl text-slate-500">→</span>
              </Link>

              <Link
                href="/register"
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <span>
                  <span className="block text-sm text-slate-500">Student</span>
                  <span className="mt-1 block text-lg font-bold text-slate-900">Registration</span>
                </span>
                <span className="text-xl text-slate-500">→</span>
              </Link>

              <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-100 px-4 py-4 text-left opacity-80">
                <span>
                  <span className="block text-sm text-slate-500">Faculty</span>
                  <span className="mt-1 block text-lg font-bold text-slate-900">Login</span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Coming soon
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
