import {
  FiBell,
  FiSearch,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AppNavbar({ setSidebarOpen }) {

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/");

  }

  return (

    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="flex h-20 items-center justify-between px-8">

        {/* Left */}

        <div className="flex items-center gap-5">

          <button
            onClick={() => setSidebarOpen?.(true)}
            className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100 lg:hidden"
          >

            <FiMenu size={20} />

          </button>

          <div>

            <div className="mb-8">

  <h1 className="text-4xl font-bold tracking-tight text-slate-900">

    Dashboard

  </h1>

  <p className="mt-2 text-base text-slate-500">

    Welcome back! Manage your workspace.

  </p>

</div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="hidden w-80 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:flex">

            <FiSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none"
            />

          </div>

          {/* Notification */}

          <button className="relative rounded-2xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100">

            <FiBell size={20} />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

          {/* User */}

          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 md:flex">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

              V

            </div>

            <div>

              <p className="font-semibold text-slate-800">

                Vidhi

              </p>

              <p className="text-xs text-slate-500">

                Project Manager

              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >

            <FiLogOut />

            Logout

          </button>

        </div>

      </div>

    </header>

  );

}