import {
  FiFolder,
  FiCheckCircle,
  FiUsers,
  FiClipboard,
} from "react-icons/fi";

import useDashboard from "../../hooks/useDashboard";

export default function AnalyticsCards() {

  const { stats, loading } = useDashboard();

  if (loading) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-40 animate-pulse bg-slate-200"
        />
      ))}
    </div>
  );
}

  const dashboardCards = [
    {
      title: "Projects",
      value: stats?.total_projects ?? 0,
      icon: FiFolder,
      color: "bg-blue-500",
    },
    {
      title: "Tasks",
      value: stats?.total_tasks ?? 0,
      icon: FiClipboard,
      color: "bg-orange-500",
    },
    {
      title: "Completed",
      value: stats?.completed_tasks ?? 0,
      icon: FiCheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Users",
      value: stats?.total_users ?? 0,
      icon: FiUsers,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">

      {dashboardCards.map((item) => {

        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className=" border border-slate-200 bg-white px-8 py-7 min-h-[170px] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-3 text-5xl font-bold text-slate-800">
                  {item.value}
                </h2>

              </div>

              <div
                className={`${item.color} rounded-2xl p-5 text-white shadow-lg`}
              >
                <Icon size={28} />
              </div>

            </div>

          </div>
        );

      })}

    </div>
  );
}