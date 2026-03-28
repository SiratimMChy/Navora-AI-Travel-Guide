import Aside from "@/components/dashboard/Aside";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-base-100">
      <Aside />
      <div className="flex-1 overflow-auto min-w-0 pt-14 md:pt-0">
        {children}
      </div>
    </div>
  );
}
