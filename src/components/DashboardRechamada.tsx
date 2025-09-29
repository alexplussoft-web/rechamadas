import { useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { ResumoGeral } from "../components/ResumoGeral";
import { OperadorGrid } from "../components/OperadorGrid";
import { RechamadaModal } from "../components/RechamadaModal";

type DataResumo = Record<
  string,
  { rechamadas: number; concluidos: number; ticketsRechamada: string[] }
>;

const mockData: DataResumo = {
  "Alex Silva": {
    rechamadas: 4,
    concluidos: 12,
    ticketsRechamada: ["TCK-1021", "TCK-1022", "TCK-1088", "TCK-1103"],
  },
  "Maria Souza": {
    rechamadas: 2,
    concluidos: 8,
    ticketsRechamada: ["TCK-201", "TCK-209"],
  },
  "João Costa": {
    rechamadas: 0,
    concluidos: 10,
    ticketsRechamada: [],
  },
};

export default function DashboardRechamadas() {
  const [selectedOp, setSelectedOp] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center p-8">
      <DashboardHeader />

      <ResumoGeral data={mockData} />

      <OperadorGrid data={mockData} onSelect={(op) => setSelectedOp(op)} />

      <footer className="mt-10 text-xs text-slate-400">
        Feito com ❤️ — processamento local, 100% seguro.
      </footer>

      <RechamadaModal
        operador={selectedOp}
        data={selectedOp ? mockData[selectedOp] : undefined}
        onClose={() => setSelectedOp(null)}
      />
    </main>
  );
}
