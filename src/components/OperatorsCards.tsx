import { motion } from "framer-motion";
import type { OperadorResumo } from "@/types/csvTypes";

interface Props {
  operadores: Record<string, OperadorResumo>;
  onRowClick: (operador: string) => void;
}

export function OperatorsCards({ operadores, onRowClick }: Props) {
  const lista = Object.entries(operadores).sort();

  return (
    <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lista.map(([operador, dados], index) => (
        <motion.div
          key={operador}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRowClick(operador)}
          className="cursor-pointer p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {operador}
          </h3>
          <div className="mt-3 flex justify-between">
            <div>
              <p className="text-xs text-slate-500">Concluídos</p>
              <p className="text-xl font-bold text-blue-400 dark:text-emerald-400">
                {dados.concluidos}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Rechamadas</p>
              <p className="text-xl font-bold text-red-400 dark:text-rose-400">
                {dados.rechamadas}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
