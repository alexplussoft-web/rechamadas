import { Users } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="max-w-5xl w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="text-slate-600" size={24} />
          Relatório de Rechamadas
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Visualize rapidamente o desempenho dos operadores.
        </p>
      </div>
    </header>
  );
}
