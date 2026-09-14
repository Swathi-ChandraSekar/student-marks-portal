import type { PortalNavItem } from "@/components/portal/PortalSidebar";
import { PortalSidebar } from "@/components/portal/PortalSidebar";

const adminNavItems: PortalNavItem[] = [
  { label: "Overview", href: "/admin" },
  { label: "Batch Management", href: "/admin/batches" },
  { label: "Student Management", href: "/admin/students" },
  { label: "Faculty Management", href: "/admin/faculty" },
  { label: "Student List", href: "/admin/student-list" },
  { label: "Internal Marks", href: "/admin/internal-marks" },
  { label: "Overall Sheet", href: "/admin/overall-sheet" },
  { label: "Cumulative Sheet", href: "/admin/cumulative-sheet" },
  { label: "Subject Analysis", href: "/admin/subject-analysis" },
  { label: "Hosteller / Day Scholar", href: "/admin/hosteller-dayscholar" },
  { label: "Boys / Girls", href: "/admin/boys-girls" },
  { label: "Nil Arrear", href: "/admin/nil-arrear" },
  { label: "Reports", href: "/admin/reports" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <PortalSidebar
            brandInitials="AD"
            portalLabel="Portal"
            portalName="Admin Console"
            navItems={adminNavItems}
            statusValue="Mock data mode"
            statusDetail="Database import and live sync arrive in a later session."
            accentFrom="from-violet-500"
            accentTo="to-purple-600"
          />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
