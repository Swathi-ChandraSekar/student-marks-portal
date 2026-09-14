import { Sidebar } from "@/components/dashboard/Sidebar";
import { requireStudentAuth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireStudentAuth();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
