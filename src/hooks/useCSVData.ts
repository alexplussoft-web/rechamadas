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
      const text = await file.text();
      const linhas = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);

      const tickets: TicketInfo[] = [];
      const operadores: Record<string, OperadorResumo> = {};

      let ticketAtual: TicketInfo | null = null;
      let ultimoConcludente: string | null = null;

      for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i];
        const colunas = linha.split(",");

        // Identifica início de um novo ticket
        if (colunas[0] && colunas[0].match(/^\d+$/)) {
          // Exemplo: 233851,Karol Gomes,,08/10/25 15:49:42,...
          if (ticketAtual) tickets.push(ticketAtual);

          ticketAtual = {
            id: colunas[0],
            operadorInicial: colunas[1]?.trim() || "Desconhecido",
            operadorFinal: colunas[1]?.trim() || "Desconhecido",
            totalRechamadas: 0,
            rechamadasPorOperador: {},
          };

          ultimoConcludente = null;
          continue;
        }

        // Linhas de interação (tem estrutura tipo: Data,Responsável,Interação)
        if (ticketAtual && /^\d{2}\/\d{2}\/\d{2}/.test(colunas[0])) {
          const responsavel = colunas[1]?.trim() || "Desconhecido";
          const interacao = colunas[2]?.trim() || "";

          // Detecta mudança de status
          const matchStatus = interacao.match(
            /Status:\s*(.*?)\s*->\s*(.*?)(<br>|$)/
          );
          if (matchStatus) {
            const de = matchStatus[1].trim();
            const para = matchStatus[2].trim();

            // Conclusão
            if (para === "Concluído") {
              ultimoConcludente = responsavel;
              operadores[responsavel] = operadores[responsavel] || {
                concluidos: 0,
                rechamadas: 0,
              };
              operadores[responsavel].concluidos++;
              ticketAtual.operadorFinal = responsavel;
            }

            // Rechamada (volta para atendimento)
            if (
              de === "Concluído" &&
              statusRechamada.includes(para) &&
              ultimoConcludente
            ) {
              operadores[ultimoConcludente] = operadores[ultimoConcludente] || {
                concluidos: 0,
                rechamadas: 0,
              };
              operadores[ultimoConcludente].rechamadas++;
              ticketAtual.rechamadasPorOperador[ultimoConcludente] =
                (ticketAtual.rechamadasPorOperador[ultimoConcludente] || 0) + 1;
              ticketAtual.totalRechamadas++;
            }
          }
        }
      }

      // Adiciona o último ticket se houver
      if (ticketAtual) tickets.push(ticketAtual);

      // Calcula totais
      const totalTickets = tickets.length;
      const totalRechamadas = tickets.reduce(
        (acc, t) => acc + t.totalRechamadas,
        0
      );

      const resultado: AnaliseCSV = {
        totalTickets,
        totalRechamadas,
        operadores,
        tickets,
      };

      setAnalise(resultado);
    } catch (err) {
      console.error(err);
      setErro("Erro ao processar o arquivo CSV.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { analise, loading, erro, parseCSV };
}
