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

  // 📌 Log inicial de cada interação
  console.log("📌 Interação:", {
    ticket: ticket.id,
    responsavel,
    de,
    para,
    dataStr,
  });

  // -------------------------------
  // ✅ Quando o ticket muda para "Concluído"
  // -------------------------------
  if (para === "Concluído") {
    console.log(`✅ Ticket ${ticket.id} concluído por ${responsavel}`);

    ultimoConcludenteRef.value = responsavel;
    ultimaConclusaoDataRef.value = parseData(dataStr);

    const operadorCorreto = ticket.operadorFinal;

    operadores[operadorCorreto] = operadores[operadorCorreto] || {
      concluidos: 0,
      rechamadas: 0,
      ticketsConcluidos: new Set<{ id: string; dataConclusao: Date }>(),
    };

    const jaContado = Array.from(
      operadores[operadorCorreto].ticketsConcluidos
    ).some((t) => t.id === ticket.id);
    console.log(
      `🔍 Ticket ${ticket.id} já contado para ${operadorCorreto}?`,
      jaContado
    );

    if (!jaContado) {
      operadores[operadorCorreto].ticketsConcluidos.add({
        id: ticket.id,
        dataConclusao: parseData(dataStr),
      });
      operadores[operadorCorreto].concluidos++;
      console.log(
        `➕ Contagem adicionada! ${operadorCorreto} agora tem ${operadores[operadorCorreto].concluidos} concluídos.`
      );
    }

    // ticket.operadorFinal = responsavel;
    ticket.dataConclusao = parseData(dataStr);
  }

  // -------------------------------
  // 🚨 Quando ocorre Rechamada após Conclusão
  // -------------------------------
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

    console.log(
      `⏳ Rechamada detectada no ticket ${ticket.id}. Horas desde conclusão:`,
      diffHoras.toFixed(2)
    );

    if (diffHoras <= 24) {
      const operador = ultimoConcludenteRef.value;
      operadores[operador] = operadores[operador] || {
        concluidos: 0,
        rechamadas: 0,
        ticketsConcluidos: new Set(),
      };

      operadores[operador].rechamadas++;
      ticket.rechamadasPorOperador[operador] =
        (ticket.rechamadasPorOperador[operador] || 0) + 1;
      ticket.totalRechamadas++;

      console.log(
        `🔄 Rechamada registrada para ${operador} no ticket ${ticket.id}`
      );
    }
  }
};
