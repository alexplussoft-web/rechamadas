import { parseData } from "@/lib/utils";
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
      let ultimaConclusaoData: Date | null = null;

      console.log("🧩 Iniciando parsing do CSV...");

      for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i];
        const colunas = linha.split(",");

        // Detecta início de novo ticket
        if (colunas[0] && colunas[0].match(/^\d+$/)) {
          if (ticketAtual) {
            // 🔹 Contabiliza ticket concluído se tiver dataConclusao
            if (ticketAtual.dataConclusao) {
              const operador =
                ticketAtual.operadorFinal || ticketAtual.operadorInicial;

              operadores[operador] = operadores[operador] || {
                concluidos: 0,
                rechamadas: 0,
                ticketsConcluidos: new Set<{
                  id: string;
                  dataConclusao: Date;
                }>(),
              };

              const jaContado = Array.from(
                operadores[operador].ticketsConcluidos
              ).some((t) => t.id === ticketAtual?.id);

              if (!jaContado) {
                operadores[operador].ticketsConcluidos.add({
                  id: ticketAtual.id,
                  dataConclusao: ticketAtual.dataConclusao,
                });
                operadores[operador].concluidos++;
              }
            }

            console.log("✅ Ticket finalizado:", ticketAtual.id, ticketAtual);
            tickets.push(ticketAtual);
          }

          const possivelFechamento = colunas[5] as string;
          ticketAtual = {
            id: colunas[0],
            operadorInicial: colunas[1]?.trim() || "Desconhecido",
            operadorFinal: colunas[1]?.trim() || "Desconhecido",
            totalRechamadas: 0,
            rechamadasPorOperador: {},
            dataConclusao: possivelFechamento
              ? parseData(possivelFechamento)
              : null,
          };

          ultimoConcludente = null;
          ultimaConclusaoData = null;
          continue;
        }

        // Linhas de interação
        if (ticketAtual && /^\d{2}\/\d{2}\/\d{2}/.test(colunas[0])) {
          const dataStr = colunas[0];
          const responsavel = colunas[1]?.trim() || "Desconhecido";
          const interacao = colunas[2]?.trim() || "";

          const matchStatus = interacao.match(
            /Status:\s*(.*?)\s*->\s*(.*?)(<br>|$)/
          );
          if (matchStatus) {
            const de = matchStatus[1].trim();
            const para = matchStatus[2].trim();

            console.log(
              `🔄 Transição detectada [${ticketAtual.id}] -> ${responsavel}: ${de} → ${para}`
            );

            // Quando muda para concluído
            if (para === "Concluído") {
              ultimoConcludente = responsavel;
              ultimaConclusaoData = parseData(dataStr);

              operadores[responsavel] = operadores[responsavel] || {
                concluidos: 0,
                rechamadas: 0,
                ticketsConcluidos: new Set<{
                  id: string;
                  dataConclusao: Date;
                }>(),
              };

              const jaContado = Array.from(
                operadores[responsavel].ticketsConcluidos
              ).some((t) => t.id === ticketAtual?.id);

              if (!jaContado) {
                operadores[responsavel].ticketsConcluidos.add({
                  id: ticketAtual.id,
                  dataConclusao: parseData(dataStr),
                });
                operadores[responsavel].concluidos++;
              }

              ticketAtual.operadorFinal = responsavel;
              ticketAtual.dataConclusao = parseData(dataStr);
            }

            // Quando volta para atendimento ou pendente
            if (
              de === "Concluído" &&
              statusRechamada.includes(para) &&
              ultimoConcludente &&
              ultimaConclusaoData
            ) {
              const dataAtual = parseData(dataStr);
              const diffHoras =
                (dataAtual.getTime() - ultimaConclusaoData.getTime()) /
                (1000 * 60 * 60);

              if (diffHoras <= 24) {
                operadores[ultimoConcludente] = operadores[
                  ultimoConcludente
                ] || { concluidos: 0, rechamadas: 0 };
                operadores[ultimoConcludente].rechamadas++;

                ticketAtual.rechamadasPorOperador[ultimoConcludente] =
                  (ticketAtual.rechamadasPorOperador[ultimoConcludente] || 0) +
                  1;
                ticketAtual.totalRechamadas++;
              }
            }
          }
        }
      }

      // Último ticket
      if (ticketAtual) {
        if (ticketAtual.dataConclusao) {
          const operador =
            ticketAtual.operadorFinal || ticketAtual.operadorInicial;

          operadores[operador] = operadores[operador] || {
            concluidos: 0,
            rechamadas: 0,
            ticketsConcluidos: new Set<{ id: string; dataConclusao: Date }>(),
          };

          const jaContado = Array.from(
            operadores[operador].ticketsConcluidos
          ).some((t) => t.id === ticketAtual?.id);

          if (!jaContado) {
            operadores[operador].ticketsConcluidos.add({
              id: ticketAtual.id,
              dataConclusao: ticketAtual.dataConclusao,
            });
            operadores[operador].concluidos++;
          }
        }

        tickets.push(ticketAtual);
      }

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

      console.log("📊 Resultado final:", resultado);
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
