import type { AssessmentType } from "@/types/student";

interface AssessmentSelectorProps {
  value: AssessmentType;
  options: AssessmentType[];
  onChange: (value: AssessmentType) => void;
}

export function AssessmentSelector({
  value,
  options,
  onChange,
}: AssessmentSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            value === option
              ? "border-sky-500 bg-sky-500 text-white shadow-sm"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
