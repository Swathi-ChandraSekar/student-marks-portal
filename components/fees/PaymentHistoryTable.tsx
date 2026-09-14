import type { FeePayment } from "@/types/student";

interface PaymentHistoryTableProps {
  payments: FeePayment[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-xl font-bold text-slate-900">Payment history</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 font-medium">Reference</th>
              <th className="px-5 py-4 font-medium">Amount</th>
              <th className="px-5 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t border-slate-200">
                <td className="px-5 py-4">{formatDate(payment.date)}</td>
                <td className="px-5 py-4 font-medium text-slate-800">{payment.referenceId}</td>
                <td className="px-5 py-4 font-semibold text-slate-900">₹{payment.amount.toLocaleString("en-IN")}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      payment.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : payment.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
