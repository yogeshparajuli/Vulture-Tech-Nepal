import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
