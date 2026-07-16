import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardStats from "@/components/dashboard/DashboardStats";

export default function Dashboard() {
  return (
    <DashboardLayout>

  <div className="space-y-10">

    <DashboardStats />

  </div>

</DashboardLayout>
  );
}