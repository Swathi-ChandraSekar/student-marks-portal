interface ComparisonBarChartItem {
  label: string;
  value: number;
  detail?: string;
  accent?: string;
}

interface ComparisonBarChartProps {
  items: ComparisonBarChartItem[];
  /** Value that represents a full-width (100%) bar. Defaults to 100. */
  maxValue?: number;
}

/**
 * Reusable horizontal comparison bar chart built with plain CSS — used for
 * Hosteller vs Day Scholar and Boys vs Girls pass-percentage comparisons.
 */
export function ComparisonBarChart({ items, maxValue = 100 }: ComparisonBarChartProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const width = maxValue === 0 ? 0 : Math.min(100, (item.value / maxValue) * 100);

        return (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="font-semibold text-slate-900">
                {item.value}
                {maxValue === 100 ? "%" : ""}
                {item.detail ? <span className="ml-2 font-normal text-slate-400">{item.detail}</span> : null}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.accent ?? "from-indigo-500 to-purple-500"}`}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
