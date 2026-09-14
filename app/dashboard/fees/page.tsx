import { FeeSummaryCard } from "@/components/fees/FeeSummaryCard";
import { PaymentHistoryTable } from "@/components/fees/PaymentHistoryTable";
import { Topbar } from "@/components/dashboard/Topbar";
import { studentProfile } from "@/data/student";

export default function FeesPage() {
  const { feeSummary } = studentProfile;

  return (
    <div>
      <Topbar title="Fee Payments" subtitle={`${feeSummary.academicYear} • ${studentProfile.currentSemester}`} />

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <FeeSummaryCard
          label="Total fees"
          value={`₹${feeSummary.totalFees.toLocaleString("en-IN")}`}
          accent="text-slate-900"
        />
        <FeeSummaryCard
          label="Amount paid"
          value={`₹${feeSummary.amountPaid.toLocaleString("en-IN")}`}
          accent="text-emerald-700"
        />
        <FeeSummaryCard
          label="Pending amount"
          value={`₹${feeSummary.pendingAmount.toLocaleString("en-IN")}`}
          accent="text-amber-700"
        />
        <FeeSummaryCard
          label="Payment status"
          value={feeSummary.paymentStatus}
          accent="text-sky-700"
        />
      </section>

      <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Fee breakdown</h2>
          <div className="mt-5 space-y-4">
            {feeSummary.breakdown.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-800">{item.category}</p>
                  <p className="text-sm text-slate-500">{item.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">₹{item.amount.toLocaleString("en-IN")}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Academic year</p>
          <p className="mt-3 text-2xl font-bold text-slate-900">{feeSummary.academicYear}</p>
          <div className="mt-5 rounded-2xl bg-sky-50 p-4">
            <p className="text-sm text-sky-700">Status</p>
            <p className="mt-2 text-lg font-semibold text-sky-900">{feeSummary.paymentStatus}</p>
          </div>
        </div>
      </section>

      <PaymentHistoryTable payments={feeSummary.paymentHistory} />
    </div>
  );
}
