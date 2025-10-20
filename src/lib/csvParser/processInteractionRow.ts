import { parseData } from "@/lib/utils";
import type { TicketInfo, OperadorResumo } from "@/types/csvTypes";

export const processInteractionRow = (
  colunas: string[],
  ticket: TicketInfo,
  operadores: Record<string, OperadorResumo>,
  ultimoConcludenteRef: { value: string | null },
  ultimaConclusaoDataRef: { value: Date | null },
  statusRechamada: string[]
) => {
  const dataStr = colunas[0];
  const responsavel = colunas[1]?.trim() || "Desconhecido";
  const interacao = colunas[2]?.trim() || "";

  const matchStatus = interacao.match(/Status:\s*(.*?)\s*->\s*(.*?)(<br>|$)/);
  if (!matchStatus) return;

  const de = matchStatus[1].trim();
  const para = matchStatus[2].trim();

  if (para === "Concluído") {
    ultimoConcludenteRef.value = responsavel;
    ultimaConclusaoDataRef.value = parseData(dataStr);

    operadores[responsavel] = operadores[responsavel] || {
      concluidos: 0,
      rechamadas: 0,
      ticketsConcluidos: new Set<{ id: string; dataConclusao: Date }>(),
    };

    const jaContado = Array.from(
      operadores[responsavel].ticketsConcluidos
    ).some((t) => t.id === ticket.id);

    if (!jaContado) {
      operadores[responsavel].ticketsConcluidos.add({
        id: ticket.id,
        dataConclusao: parseData(dataStr),
      });
      operadores[responsavel].concluidos++;
    }

    ticket.operadorFinal = responsavel;
    ticket.dataConclusao = parseData(dataStr);
  }

  if (
    de === "Concluído" &&
    statusRechamada.includes(para) &&
    ultimoConcludenteRef.value &&
    ultimaConclusaoDataRef.value
  ) {
    const dataAtual = parseData(dataStr);
    const diffHoras =
      (dataAtual.getTime() - ultimaConclusaoDataRef.value.getTime()) /
      (1000 * 60 * 60);

    if (diffHoras <= 24) {
      const operador = ultimoConcludenteRef.value;
      operadores[operador] = operadores[operador] || {
        concluidos: 0,
        rechamadas: 0,
      };
      operadores[operador].rechamadas++;

      ticket.rechamadasPorOperador[operador] =
        (ticket.rechamadasPorOperador[operador] || 0) + 1;
      ticket.totalRechamadas++;
    }
  }
};
