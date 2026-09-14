export type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  danger: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  info: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  neutral: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

export function Badge({ label, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
