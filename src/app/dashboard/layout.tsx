import Aside from "@/components/dashboard/Aside";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-base-100">
      <Aside />
      <div className="flex-1 flex flex-col overflow-auto min-w-0">
        <DashboardTopbar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
