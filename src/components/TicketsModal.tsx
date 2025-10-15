import type { TicketInfo } from "@/types/csvTypes";
import { Modal } from "./Modal";
import { useState } from "react";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  tickets: TicketInfo[];
  operador: string | null;
}

export function TicketsModal({ open, onClose, tickets, operador }: Props) {
  const [copiado, setCopiado] = useState<string | null>(null);

  const copiarTicket = async (ticket: string) => {
    await navigator.clipboard.writeText(ticket);
    setCopiado(ticket);
    setTimeout(() => setCopiado(null), 1500);
  };

  if (!tickets.length) {
    return (
      <Modal open={open} onClose={onClose} title="Tickets em Rechamada">
        <p className="text-slate-500 dark:text-slate-400 text-center py-6">
          Nenhum ticket com rechamada para este operador.
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title={`Rechamadas - ${operador}`}>
      <div className="space-y-4">
        {/* Resumo do Operador */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800 p-4 rounded-xl"
        >
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold">{operador}</span> participou de{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {tickets.length}
            </span>{" "}
            ticket(s) com rechamada.
          </p>
        </motion.div>

        {/* Lista de Tickets */}
        <motion.div layout className="grid sm:grid-cols-2 gap-3">
          {tickets.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  Ticket
                </div>
                <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  #{t.id}
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Rechamadas:{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {t.totalRechamadas}
                  </span>
                </div>
                <button
                  onClick={() => copiarTicket(t.id)}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-800 text-xs"
                >
                  {copiado === t.id ? (
                    <span className="text-green-600 font-medium">Copiado!</span>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Modal>
  );
}
