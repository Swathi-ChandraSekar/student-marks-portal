interface StatCardProps {
  title: string;
  value: string;
  detail: string;
  accent: string;
}

export function StatCard({ title, value, detail, accent }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-4 inline-flex rounded-full bg-gradient-to-r ${accent} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white`}>
        {title}
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <p className="mt-2 text-sm text-slate-600">{detail}</p>
    </div>
  );
}
