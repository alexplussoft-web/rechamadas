import { useState } from "react";
import { MetricCard } from "./MetricCard";
import { FileDrop } from "../layout/FileDrop";
import { OperatorsCards } from "../operators/OperatorsCards";
import { TicketsModal } from "./TicketsModal";
import { useCSVParser } from "@/hooks/useCSVData";
import { Header } from "../layout/Header";
import { ChartColumn, List, Loader2, LucideLayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { OperatorsTable } from "../operators/OperatorsTable";
import type { TicketInfo } from "@/types/csvTypes";
import { OperatorsCharts } from "../charts/OperatorsCharts";
import { PerformanceCharts } from "../charts/PerformanceCharts";

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

  {
    loading && (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-xl"
        >
          <Loader2 className="animate-spin text-4xl text-blue-500" />
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-lg font-medium text-slate-800 dark:text-slate-100"
          >
            Processando CSV...
          </motion.p>
        </motion.div>
      </div>
    );
  }

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
              <div className="space-y-8">
                <OperatorsCharts operadores={analise.operadores} />
                <PerformanceCharts operadores={analise?.operadores || {}} />
              </div>
            )}
          </motion.div>

          {/* Modal de Rechamadas do Operador */}
          <TicketsModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            tickets={selectedTickets}
            operador={selectedOperator}
            operadorResumo={
              selectedOperator
                ? analise.operadores[selectedOperator]
                : undefined
            }
          />
        </>
      )}
    </div>
  );
}
