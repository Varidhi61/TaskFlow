import { motion } from "framer-motion";

function AuthBanner() {
  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      className="max-w-lg text-white"
    >

      <h1 className="text-6xl font-black">
        TaskFlow
      </h1>

      <p className="mt-8 text-xl leading-9 text-slate-300">
        Organize projects, manage teams and complete work faster with one beautiful workspace.
      </p>

      <div className="mt-14 rounded-3xl bg-white/10 backdrop-blur-xl p-8 border border-white/10">

        <h3 className="text-2xl font-bold">
          Productivity Dashboard
        </h3>

        <p className="mt-4 text-slate-300">
          Track projects, visualize progress, collaborate and stay productive.
        </p>

      </div>

    </motion.div>
  );
}

export default AuthBanner;