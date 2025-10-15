import { useState } from "react";
import { MetricCard } from "./MetricCard";
import { FileDrop } from "./FileDrop";
import { OperatorsCards } from "./OperatorsCards";
import { TicketsModal } from "./TicketsModal";
import { useCSVParser } from "@/hooks/useCSVData";
import { Header } from "./Header";
import { ChartColumn, List, Loader2, LucideLayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { OperatorsTable } from "./OperatorsTable";
import type { TicketInfo } from "@/types/csvTypes";
import { OperatorsCharts } from "./OperatorsCharts";

export function Dashboard() {
  const { analise, parseCSV, loading, erro } = useCSVParser();
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<TicketInfo[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table" | "charts">(
    "cards"
  );

  const handleRowClick = (operador: string) => {
    if (!analise) return;
    const ticketsDoOperador = analise.tickets.filter(
      (t) => t.rechamadasPorOperador?.[operador]
    );
    setSelectedOperator(operador);
    setSelectedTickets(ticketsDoOperador);
    setOpenModal(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <Header />

      {/* Upload CSV */}
      <FileDrop onFile={(file) => parseCSV(file)} />

      {loading && (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="animate-spin" />
          <p className="text-center text-blue-600">Processando CSV...</p>
        </div>
      )}
      {erro && <p className="text-center text-red-600">{erro}</p>}

      {analise && (
        <>
          {/* Cards de Métricas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                label="Total de Tickets"
                value={analise.totalTickets}
              />
              <MetricCard
                label="Total de Rechamadas"
                value={analise.totalRechamadas}
              />
              <MetricCard
                label="Total de Operadores"
                value={Object.keys(analise.operadores).length}
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              {["cards", "table", "charts"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`cursor-pointer px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    viewMode === mode
                      ? "bg-slate-800 text-white"
                      : "bg-slate-200 dark:bg-slate-700 dark:text-slate-200 text-slate-700"
                  }`}
                >
                  {mode === "cards" ? (
                    <LucideLayoutGrid />
                  ) : mode === "table" ? (
                    <List />
                  ) : (
                    <ChartColumn />
                  )}
                </button>
              ))}
            </div>

            {viewMode === "cards" && (
              <OperatorsCards
                operadores={analise.operadores}
                onRowClick={handleRowClick}
              />
            )}
            {viewMode === "table" && (
              <OperatorsTable
                operadores={analise.operadores}
                onRowClick={handleRowClick}
              />
            )}
            {viewMode === "charts" && (
              <OperatorsCharts operadores={analise.operadores} />
            )}
          </motion.div>

          {/* Modal de Rechamadas do Operador */}
          <TicketsModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            tickets={selectedTickets}
            operador={selectedOperator}
          />
        </>
      )}
    </div>
  );
}
