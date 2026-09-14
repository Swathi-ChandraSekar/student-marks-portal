import { Badge } from "@/components/portal/Badge";
import type { StudentPerformanceResult } from "@/types/roster";

interface PerformanceBadgesProps {
  performance: StudentPerformanceResult;
}

/**
 * Reusable Pass/Fail + Slow Learner badge pair, driven by a student's
 * computed AT-2 performance result. Used by the Admin and Faculty student
 * list pages so the two portals render performance identically.
 */
export function PerformanceBadges({ performance }: PerformanceBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Badge label={performance.overallPass ? "Pass" : "Fail"} variant={performance.overallPass ? "success" : "danger"} />
      {performance.isSlowLearner ? <Badge label="Slow Learner" variant="warning" /> : null}
    </div>
  );
}

interface ArrearBadgeProps {
  status: "Pending";
}

/** Arrear status is always "Pending" until the final Nil Arrear rule is confirmed. */
export function ArrearBadge({ status }: ArrearBadgeProps) {
  return <Badge label={status} variant="info" />;
}
