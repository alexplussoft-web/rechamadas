import type { TicketInfo } from "@/types/csvTypes";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { useState } from "react";

export function TicketCard({
  ticket,
  copiarTicket,
  index,
}: {
  ticket: TicketInfo;
  copiarTicket: (id: string) => void;
  index: number;
}) {
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = async () => {
    await copiarTicket(ticket.id);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  return (
    <motion.div
      key={ticket.id}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between shadow-sm"
    >
      <div>
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
          Ticket
        </div>
        <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          #{ticket.id}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Rechamadas:{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {ticket.totalRechamadas}
          </span>
        </div>
        <button
          onClick={handleCopiar}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-800 text-xs"
        >
          {copiado ? (
            <span className="text-green-600 font-medium">Copiado!</span>
          ) : (
            <>
              <Copy size={14} /> Copiar
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
