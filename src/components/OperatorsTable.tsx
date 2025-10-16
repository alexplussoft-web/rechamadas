import { motion } from "framer-motion";
import type { OperadorResumo } from "@/types/csvTypes";

interface Props {
  operadores: Record<string, OperadorResumo>;
  onRowClick: (operador: string) => void;
}

export function OperatorsTable({ operadores, onRowClick }: Props) {
  const lista = Object.entries(operadores).sort();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
              Operador
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">
              Tickets Concluídos
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">
              Rechamadas
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {lista.map(([operador, dados], index) => (
            <motion.tr
              key={operador}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ backgroundColor: "rgba(148,163,184,0.1)" }}
              onClick={() => onRowClick(operador)}
              className="cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 text-sm text-slate-800 dark:text-slate-200 font-medium">
                {operador}
              </td>
              <td className="px-6 py-4 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                {dados.concluidos}
              </td>
              <td className="px-6 py-4 text-right text-rose-600 dark:text-rose-400 font-semibold">
                {dados.rechamadas}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
