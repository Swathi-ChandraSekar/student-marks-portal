import Link from "next/link";

import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/portal/Badge";
import { SectionCard } from "@/components/portal/SectionCard";
import { reportItems } from "@/data/admin";

export default function AdminReportsPage() {
  return (
    <>
      <Topbar eyebrow="Admin portal" title="Reports" subtitle={`${reportItems.length} report types available`} />

      <SectionCard title="Batch, department and academic reports" subtitle="Generate summaries drawn from current mock data">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {reportItems.map((report) => (
            <div key={report.id} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div>
                <Badge label={report.scope} variant="info" />
                <h3 className="mt-3 text-base font-bold text-slate-900">{report.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{report.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="text-xs text-slate-400">Last generated {report.lastGenerated}</span>
                {report.href ? (
                  <Link
                    href={report.href}
                    className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    View Report
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    Generate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-400">
          Report generation is not wired to a backend yet — the button is a UI placeholder for this session.
        </p>
      </SectionCard>
    </>
  );
}
