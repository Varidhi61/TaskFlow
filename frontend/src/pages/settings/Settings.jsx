import DashboardLayout from "../../components/layout/DashboardLayout";
import SettingsCard from "../../components/settings/SettingsCard";
import ChangePasswordCard from "../../components/settings/ChangePasswordCard";
export default function Settings() {

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your account settings
          </p>

        </div>

        <SettingsCard />
        <ChangePasswordCard />
      </div>

    </DashboardLayout>

  );

}