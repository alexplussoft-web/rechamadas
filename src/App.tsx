import { useState, type ChangeEvent } from "react";
import {
  parseInteracao,
  STATUS_CONCLUIDO,
  STATUS_REABERTOS,
} from "./lib/utils";
import { FileDrop } from "./components/FileDrop";
import { DashboardHeader } from "./components/DashboardHeader";
import { ResumoGeral } from "./components/ResumoGeral";
import { OperadorGrid } from "./components/OperadorGrid";
import { RechamadaModal } from "./components/RechamadaModal";
import type { TicketResumo } from "./types/ticket";

export default function App() {
  const [resumos, setResumos] = useState<TicketResumo[]>([]);
  const [selectedOp, setSelectedOp] = useState<string | null>(null);

  // 🔹 Função de leitura do CSV (igual à sua)
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/\r?\n/);
      const tickets: TicketResumo[] = [];
      let ticketAtual: TicketResumo | null = null;

      for (let i = 0; i < lines.length; i++) {
        const cols = lines[i].split(",");

        // Nova linha de ticket
        if (cols[0] && !isNaN(Number(cols[0]))) {
          const operador = cols[1]?.trim();
          ticketAtual = {
            ticketNumber: cols[0],
            rechamadas: {},
            concluidos: {},
          };

          if (operador) {
            ticketAtual.concluidos[operador] =
              (ticketAtual.concluidos[operador] || 0) + 1;
          }

          tickets.push(ticketAtual);
          continue;
        }

        // Linhas de interação
        if (!cols[0] || cols[0] === "Data" || !ticketAtual) continue;

        const interacaoTexto = cols[2] || "";

        const info = parseInteracao(interacaoTexto);

        if (!info) continue;
        const statusAntigo = info.statusAntigo.trim().toLowerCase();
        const statusAtual = info.statusAtual.trim().toLowerCase();

        // Rechamada
        if (
          statusAntigo === STATUS_CONCLUIDO &&
          STATUS_REABERTOS.includes(statusAtual)
        ) {
          if (info.operadorAntigo || info.operadorAtual) {
            ticketAtual.rechamadas[info.operadorAntigo] =
              (ticketAtual.rechamadas[info.operadorAntigo] || 0) + 1;
          } else {
            ticketAtual.rechamadas[info.usuarioAtual] =
              (ticketAtual.rechamadas[info.usuarioAtual] || 0) + 1;
          }
        }
      }

      setResumos(tickets);
    };

    reader.readAsText(file);
  };

  // 🔹 Monta o resumo dos operadores
  const resumoOperadores: Record<
    string,
    { rechamadas: number; concluidos: number; ticketsRechamada: string[] }
  > = {};

  resumos.forEach((ticket) => {
    Object.entries(ticket.rechamadas).forEach(([op, qtd]) => {
      resumoOperadores[op] = resumoOperadores[op] || {
        rechamadas: 0,
        concluidos: 0,
        ticketsRechamada: [],
      };
      resumoOperadores[op].rechamadas += qtd;
      resumoOperadores[op].ticketsRechamada.push(ticket.ticketNumber);
    });

    Object.entries(ticket.concluidos).forEach(([op, qtd]) => {
      resumoOperadores[op] = resumoOperadores[op] || {
        rechamadas: 0,
        concluidos: 0,
        ticketsRechamada: [],
      };
      resumoOperadores[op].concluidos += qtd;
    });
  });

  // Dados do operador selecionado
  const operadorSelecionado = selectedOp
    ? resumoOperadores[selectedOp]
    : undefined;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center p-8">
      <DashboardHeader />

      <section className="w-full max-w-4xl mb-8">
        <FileDrop onFileChange={handleFile} />
      </section>

      {resumos.length > 0 && (
        <>
          <ResumoGeral data={resumoOperadores} />
          <OperadorGrid
            data={resumoOperadores}
            onSelect={(op) => setSelectedOp(op)}
          />
        </>
      )}

      <footer className="mt-10 text-xs text-slate-400">
        Feito com ❤️ — processamento local, 100% seguro.
      </footer>

      <RechamadaModal
        operador={selectedOp}
        data={operadorSelecionado}
        onClose={() => setSelectedOp(null)}
      />
    </main>
  );
}
