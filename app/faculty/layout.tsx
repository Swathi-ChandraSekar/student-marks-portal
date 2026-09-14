import type { PortalNavItem } from "@/components/portal/PortalSidebar";
import { PortalSidebar } from "@/components/portal/PortalSidebar";

const facultyNavItems: PortalNavItem[] = [
  { label: "Overview", href: "/faculty" },
  { label: "Student List", href: "/faculty/student-list" },
  { label: "Internal Marks", href: "/faculty/internal-marks" },
  { label: "Overall Sheet", href: "/faculty/overall-sheet" },
  { label: "Cumulative Sheet", href: "/faculty/cumulative-sheet" },
  { label: "Subject Analysis", href: "/faculty/subject-analysis" },
  { label: "Nil Arrear", href: "/faculty/nil-arrear" },
  { label: "Attendance", href: "/faculty/attendance" },
];

export default function FacultyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <PortalSidebar
            brandInitials="FA"
            portalLabel="Portal"
            portalName="Faculty Hub"
            navItems={facultyNavItems}
            statusValue="Mock data mode"
            statusDetail="Database import and live sync arrive in a later session."
            accentFrom="from-emerald-500"
            accentTo="to-teal-600"
          />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
