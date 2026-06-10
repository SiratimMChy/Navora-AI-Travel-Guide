import Aside from "@/components/dashboard/Aside";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-base-100">
      <Aside />
      <div className="flex-1 flex flex-col min-w-0 md:overflow-auto">
        <DashboardTopbar />
        <div className="flex-1 pt-14 md:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
