import { finalizeTicket } from "@/lib/csv/finalizeTicket";
import { parseCSVFile } from "@/lib/csv/parseCSVFile";
import { processInteractionRow } from "@/lib/csv/processInteractionRow";
import { processTicketRow } from "@/lib/csv/processTicketRow";
import type { AnaliseCSV, OperadorResumo, TicketInfo } from "@/types/csvTypes";
import { useCallback, useState } from "react";

export function useCSVParser() {
  const [analise, setAnalise] = useState<AnaliseCSV | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const statusRechamada = [
    "Em atendimento",
    "Pendente Empresa",
    "Pendente Cliente",
  ];

  const parseCSV = useCallback(async (file: File) => {
    setLoading(true);
    setErro(null);

    try {
      const linhas = await parseCSVFile(file);

      const tickets: TicketInfo[] = [];
      const operadores: Record<string, OperadorResumo> = {};

      let ticketAtual: TicketInfo | null = null;
      const ultimoConcludenteRef = { value: null as string | null };
      const ultimaConclusaoDataRef = { value: null as Date | null };

      for (const colunas of linhas) {
        if (!colunas || colunas.length === 0) continue;

        // Novo ticket
        if (colunas[0] && /^\d+$/.test(colunas[0])) {
          if (ticketAtual) {
            finalizeTicket(ticketAtual, operadores);
            tickets.push(ticketAtual);
          }
          ticketAtual = processTicketRow(colunas);
          ultimoConcludenteRef.value = null;
          ultimaConclusaoDataRef.value = null;
          continue;
        }

        // Interação
        if (ticketAtual && /^\d{2}\/\d{2}\/\d{2}/.test(colunas[0])) {
          processInteractionRow(
            colunas,
            ticketAtual,
            operadores,
            ultimoConcludenteRef,
            ultimaConclusaoDataRef,
            statusRechamada
          );
        }
      }

      // Último ticket
      if (ticketAtual) {
        finalizeTicket(ticketAtual, operadores);
        tickets.push(ticketAtual);
      }

      const resultado: AnaliseCSV = {
        totalTickets: tickets.length,
        totalRechamadas: tickets.reduce((acc, t) => acc + t.totalRechamadas, 0),
        operadores,
        tickets,
      };

      setAnalise(resultado);
    } catch (err) {
      console.error("❌ Erro ao processar CSV:", err);
      setErro("Erro ao processar o arquivo CSV.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { analise, loading, erro, parseCSV };
}
