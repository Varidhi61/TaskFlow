import { useState } from "react";

import AppSidebar from "./AppSidebar";
import AppNavbar from "./AppNavbar";

export default function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}

      <AppSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}

      <div className="flex min-w-0 flex-1 flex-col">

        <AppNavbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto">

          <div className="mx-auto w-full max-w-[1700px] px-8 py-8 lg:px-10 xl:px-12">

            {children}

          </div>

        </main>

      </div>

    </div>

  );

}