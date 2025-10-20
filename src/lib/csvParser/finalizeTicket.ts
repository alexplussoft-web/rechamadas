import type { TicketInfo, OperadorResumo } from "@/types/csvTypes";

export const finalizeTicket = (
  ticket: TicketInfo,
  operadores: Record<string, OperadorResumo>
) => {
  if (!ticket.dataConclusao) return;

  const operador = ticket.operadorFinal || ticket.operadorInicial;
  operadores[operador] = operadores[operador] || {
    concluidos: 0,
    rechamadas: 0,
    ticketsConcluidos: new Set<{ id: string; dataConclusao: Date }>(),
  };

  const jaContado = Array.from(operadores[operador].ticketsConcluidos).some(
    (t) => t.id === ticket.id
  );
  if (!jaContado) {
    operadores[operador].ticketsConcluidos.add({
      id: ticket.id,
      dataConclusao: ticket.dataConclusao,
    });
    operadores[operador].concluidos++;
  }
};
