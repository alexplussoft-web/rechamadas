import { Modal } from "../layout/Modal";
import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { ResumoOperador } from "../operators/ResumoOperador";
import { TicketCard } from "../operators/TicketCard";
import { FiltrosTickets } from "../operators/FiltrosTickets";
import { TicketDetalhes } from "../operators/TicketDetalhes";
import type { TicketCategoria, TicketInfo } from "@/types/csvTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  tickets: TicketInfo[];
  operador: string | null;
  categorias?: TicketCategoria[];
}

export function TicketsModal({
  open,
  onClose,
  tickets,
  operador,
  categorias,
}: Props) {
  const [copiado, setCopiado] = useState<string | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroClassificacao, setFiltroClassificacao] = useState("");
  const [filtroAssunto, setFiltroAssunto] = useState("");

  const categoriasPorTicket = categorias?.reduce<
    Record<string, TicketCategoria[]>
  >((acc, c) => {
    if (!acc[c.ticketId]) acc[c.ticketId] = [];
    acc[c.ticketId].push(c);
    return acc;
  }, {});

  const ticketsRechamadas = tickets.filter(
    (t) => t.rechamadasPorOperador?.[operador!]
  );

  const ticketsFiltrados = useMemo(() => {
    return tickets.filter((t) => {
      const infos = categoriasPorTicket?.[t.id]?.filter((c) => {
        return (
          (!filtroCategoria ||
            c.categoria
              .toLowerCase()
              .includes(filtroCategoria.toLowerCase())) &&
          (!filtroClassificacao ||
            c.classificacao
              .toLowerCase()
              .includes(filtroClassificacao.toLowerCase())) &&
          (!filtroAssunto ||
            c.assunto.toLowerCase().includes(filtroAssunto.toLowerCase()))
        );
      });
      return infos && infos.length > 0;
    });
  }, [
    tickets,
    categoriasPorTicket,
    filtroCategoria,
    filtroClassificacao,
    filtroAssunto,
  ]);

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

  const categoriasUnicas = Array.from(
    new Set(categorias?.map((c) => c.categoria) || [])
  );
  const classificacoesUnicas = Array.from(
    new Set(categorias?.map((c) => c.classificacao) || [])
  );

  return (
    <Modal open={open} onClose={onClose} title={`Rechamadas - ${operador}`}>
      <div className="space-y-4">
        <ResumoOperador
          operador={operador}
          totalTickets={ticketsRechamadas.length}
        />
        <motion.div layout className="grid sm:grid-cols-2 gap-3">
          {ticketsRechamadas.map((t, i) => (
            <TicketCard
              key={t.id}
              ticket={t}
              copiarTicket={copiarTicket}
              index={i}
            />
          ))}
        </motion.div>
        <FiltrosTickets
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          filtroClassificacao={filtroClassificacao}
          setFiltroClassificacao={setFiltroClassificacao}
          filtroAssunto={filtroAssunto}
          setFiltroAssunto={setFiltroAssunto}
          categoriasUnicas={categoriasUnicas}
          classificacoesUnicas={classificacoesUnicas}
        />
        {categorias && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-800 p-4 rounded-xl"
          >
            <h3 className="border-b pb-2 flex items-center justify-center gap-2 text-md font-semibold text-zinc-800 dark:text-green-300 mb-2">
              <Info className="text-blue-500 animate-pulse" /> Detalhes
            </h3>
            <TicketDetalhes
              tickets={ticketsFiltrados}
              categoriasPorTicket={categoriasPorTicket}
              filtroCategoria={filtroCategoria}
              filtroClassificacao={filtroClassificacao}
              filtroAssunto={filtroAssunto}
            />
          </motion.div>
        )}
      </div>
    </Modal>
  );
}
