import { motion } from "framer-motion";

export function ResumoOperador({
  operador,
  totalTickets,
}: {
  operador: string | null;
  totalTickets: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800 p-4 rounded-xl"
    >
      <p className="text-sm text-slate-700 dark:text-slate-300">
        <span className="font-semibold">{operador}</span> participou de{" "}
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {totalTickets}
        </span>{" "}
        ticket(s) com rechamada.
      </p>
    </motion.div>
  );
}
