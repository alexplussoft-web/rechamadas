import { motion, AnimatePresence } from "framer-motion";
import { X, Copy } from "lucide-react";
import { useState } from "react";

type Props = {
  operador: string | null;
  data?: { rechamadas: number; concluidos: number; ticketsRechamada: string[] };
  onClose: () => void;
};

export function RechamadaModal({ operador, data, onClose }: Props) {
  const [copiado, setCopiado] = useState<string | null>(null);

  if (!operador || !data) return null;

  const copiarTicket = async (ticket: string) => {
    await navigator.clipboard.writeText(ticket);
    setCopiado(ticket);
    setTimeout(() => setCopiado(null), 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-6 w-[420px] relative border border-gray-100"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
          >
            <X size={18} />
          </button>

          <h3 className="text-lg font-semibold mb-2 text-slate-800">
            Tickets de Rechamada — {operador}
          </h3>

          <p className="text-sm text-slate-500 mb-4">
            {data.rechamadas} rechamadas registradas.
          </p>

          {data.ticketsRechamada.length === 0 ? (
            <p className="text-sm text-slate-400">
              Nenhum ticket de rechamada encontrado.
            </p>
          ) : (
            <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {data.ticketsRechamada.map((t) => (
                <li
                  key={t}
                  className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
                >
                  <span className="font-mono text-xs">{t}</span>
                  <button
                    onClick={() => copiarTicket(t)}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-800 text-xs"
                  >
                    {copiado === t ? (
                      <span className="text-green-600 font-medium">
                        Copiado!
                      </span>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copiar
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
