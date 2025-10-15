import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
  onClick?: () => void;
}

export function MetricCard({ label, value, onClick }: MetricCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 cursor-pointer border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center"
    >
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-2">
        {value}
      </div>
    </motion.div>
  );
}
