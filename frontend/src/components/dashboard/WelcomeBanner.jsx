import {
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

export default function WelcomeBanner() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <section className="relative overflow-hidden  bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-xl p-8 lg:p-12">

      {/* Background Effects */}

      <div className="absolute -right-16 -top-16 h-72 w-72  bg-blue-400/10 blur-3xl" />

      <div className="absolute -bottom-20 left-0 h-72 w-72  bg-white/5 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="max-w-xl lg:max-w-2xl">

          

          <h1 className="text-4xl font-black leading-tight text-white lg:text-5xl">

            Welcome Back 👋

          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-200 lg:text-lg">

            Organize projects, assign tasks, track progress and collaborate
            with your team from one modern workspace.

          </p>

          <div className="mt-8 flex items-center gap-3 text-blue-100">

            <div className="rounded-xl bg-white/10 p-2">

              <FiCalendar size={18} />

            </div>

            <span className="font-medium">

              {today}

            </span>

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-start lg:mr-6 lg:justify-end">

          <button className="flex items-center gap-3 rounded-xl bg-white   p-6 font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

            New Project

            <FiArrowRight />

          </button>

        </div>

      </div>

    </section>

  );

}