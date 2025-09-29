type Props = {
  data: Record<
    string,
    { rechamadas: number; concluidos: number; ticketsRechamada: string[] }
  >;
};

export function ResumoGeral({ data }: Props) {
  const totalRechamadas = Object.values(data).reduce(
    (acc, d) => acc + d.rechamadas,
    0
  );
  const totalConcluidos = Object.values(data).reduce(
    (acc, d) => acc + d.concluidos,
    0
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8 w-full max-w-5xl">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 p-5">
        <p className="text-slate-500 text-sm">Total de Operadores</p>
        <h2 className="text-2xl font-bold text-slate-800 mt-1">
          {Object.keys(data).length}
        </h2>
      </div>

      <div className="bg-amber-50 rounded-2xl shadow-sm border border-amber-100 p-5">
        <p className="text-amber-700 text-sm">Total de Rechamadas</p>
        <h2 className="text-2xl font-bold text-amber-800 mt-1">
          {totalRechamadas}
        </h2>
      </div>

      <div className="bg-emerald-50 rounded-2xl shadow-sm border border-emerald-100 p-5">
        <p className="text-emerald-700 text-sm">Total de Concluídos</p>
        <h2 className="text-2xl font-bold text-emerald-800 mt-1">
          {totalConcluidos}
        </h2>
      </div>
    </div>
  );
}
