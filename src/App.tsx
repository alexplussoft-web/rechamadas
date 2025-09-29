import { useState, type ChangeEvent } from "react";
import { parseInteracao } from "./lib/utils";
import { DataTable } from "./components/DataTable";
import { RechamadaModal } from "./components/RechamadaModal";
import { FileDrop } from "./components/FileDrop";
import type { TicketResumo } from "./types/ticket";

export default function App() {
  const [resumos, setResumos] = useState<TicketResumo[]>([]);
  const [selectedOp, setSelectedOp] = useState<string | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

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

        // 🔹 Nova linha de ticket
        if (cols[0] && !isNaN(Number(cols[0]))) {
          const operador = cols[2]?.trim();
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

        // 🔹 Linhas de interação
        if (!cols[0] || cols[0] === "Data" || !ticketAtual) continue;

        const interacaoTexto = cols[3] || "";
        const info = parseInteracao(interacaoTexto);
        if (!info) continue;

        // 🔹 Rechamada
        if (
          info.statusAntigo === "Concluído" &&
          info.statusAtual !== "Concluído"
        ) {
          ticketAtual.rechamadas[info.operadorAntigo] =
            (ticketAtual.rechamadas[info.operadorAntigo] || 0) + 1;
        }
      }

      setResumos(tickets);
    };

    reader.readAsText(file);
  };

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

  return (
    <main className="min-h-screen bg-slate-50 p-8 flex flex-col items-center gap-8 w-full">
      <header className="max-w-4xl w-full flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Relatório Inteligente — Rechamadas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Arraste seu CSV ou clique para analisar. Resultado instantâneo no
            navegador.
          </p>
        </div>
      </header>

      <section className="w-full max-w-4xl">
        <FileDrop onFileChange={handleFile} />
      </section>

      <section className="w-full max-w-4xl">
        {resumos.length > 0 && (
          <DataTable
            data={resumoOperadores}
            onOpenRechamadas={(op, tickets) => {
              setSelectedOp(op);
              setSelectedTickets(tickets);
            }}
          />
        )}
      </section>

      <footer className="text-xs text-slate-400">
        Feito com ❤️ — processamento local (nenhum dado é enviado)
      </footer>

      <RechamadaModal
        operador={selectedOp}
        tickets={selectedTickets}
        onClose={() => setSelectedOp(null)}
      />
    </main>
  );
}
