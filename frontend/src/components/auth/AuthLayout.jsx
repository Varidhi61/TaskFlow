import { motion } from "framer-motion";

function AuthLayout({ children, banner }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">

      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .7 }}
        className="hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-16"
      >
        {banner}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .7 }}
        className="flex items-center justify-center p-10"
      >
        {children}
      </motion.div>

    </div>
  );
}

export default AuthLayout;