interface FeeSummaryCardProps {
  label: string;
  value: string;
  accent: string;
}

export function FeeSummaryCard({ label, value, accent }: FeeSummaryCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className={`mt-3 text-3xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}
