interface TopbarProps {
  title: string;
  subtitle: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-600">Student portal</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">{title}</h1>
      </div>
      <div className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">{subtitle}</div>
    </header>
  );
}
