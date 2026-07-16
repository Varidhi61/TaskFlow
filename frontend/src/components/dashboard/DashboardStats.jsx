import WelcomeBanner from "./WelcomeBanner";
import AnalyticsCards from "./AnalyticsCards";
import RecentActivity from "./RecentActivity";
export default function DashboardStats() {
  return (
    <div className="space-y-8">

      <WelcomeBanner />

      <AnalyticsCards />
       <RecentActivity />
    </div>
  );
}