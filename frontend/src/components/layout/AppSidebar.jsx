import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiColumns,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FiFolder,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: FiCheckSquare,
  },
  {
    name: "Kanban",
    path: "/kanban",
    icon: FiColumns,
  },
  {
    name: "Users",
    path: "/users",
    icon: FiUsers,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
];

export default function AppSidebar() {

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {

    function resize() {

      setCollapsed(window.innerWidth < 1200);

    }

    resize();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);

  }, []);

  return (

    <aside
      className={`sticky top-0 h-screen shrink-0 border-r border-slate-800 bg-slate-950 transition-all duration-300

      ${collapsed ? "w-24" : "w-72"}`}
    >

      {/* Header */}

      <div className="border-b border-slate-800 px-7 py-8">

        <h1 className="text-3xl font-black text-white">

          {collapsed ? (
            "TF"
          ) : (
            <>
              Task
              <span className="text-blue-500">

                Flow

              </span>
            </>
          )}

        </h1>

        {!collapsed && (

          <p className="mt-2 text-sm text-slate-400">

            Project Management System

          </p>

        )}

      </div>

      {/* Menu */}

      <nav className="space-y-3 px-4 py-6">

        {menu.map((item) => {

          const Icon = item.icon;

          const active =

            location.pathname === item.path;

          return (

            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center rounded-2xl transition-all duration-300

              ${
                collapsed
                  ? "justify-center p-4"
                  : "gap-4 px-5 py-4"
              }

              ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >

              <Icon
                size={21}
              />

              {!collapsed && (

                <span className="font-medium">

                  {item.name}

                </span>

              )}

            </Link>

          );

        })}

      </nav>

      {/* Footer */}

      {!collapsed && (

        <div className="absolute bottom-6 left-4 right-4 rounded-2xl bg-slate-900 p-5">

          <h3 className="font-semibold text-white">

            Workspace

          </h3>

          <p className="mt-2 text-sm text-slate-400">

            Professional Project Manager

          </p>

          <div className="mt-4 h-2 rounded-full bg-slate-700">

            <div className="h-2 w-3/4 rounded-full bg-blue-500"></div>

          </div>

        </div>

      )}

    </aside>

  );

}