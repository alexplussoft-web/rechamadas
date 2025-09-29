import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

type Props = {
  data: Record<
    string,
    { rechamadas: number; concluidos: number; ticketsRechamada: string[] }
  >;
  onOpenRechamadas: (op: string, tickets: string[]) => void;
};

export function DataTable({ data, onOpenRechamadas }: Props) {
  const [sortKey, setSortKey] = useState<"rechamadas" | "concluidos" | null>(
    null
  );
  const [sortAsc, setSortAsc] = useState(true);

  const operadores = Object.entries(data).sort((a, b) => {
    if (!sortKey) return a[0].localeCompare(b[0]);
    const valA = a[1][sortKey];
    const valB = b[1][sortKey];
    return sortAsc ? valA - valB : valB - valA;
  });

  const toggleSort = (key: "rechamadas" | "concluidos") => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl w-full max-w-[720px] overflow-hidden border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-slate-700">Operador</th>
            <th
              className="p-3 cursor-pointer select-none text-slate-600"
              onClick={() => toggleSort("rechamadas")}
              title="Ordenar por rechamadas"
            >
              Rechamadas
              <ArrowUpDown size={14} className="inline ml-2 text-slate-400" />
            </th>
            <th
              className="p-3 cursor-pointer select-none text-slate-600"
              onClick={() => toggleSort("concluidos")}
              title="Ordenar por concluídos"
            >
              Concluídos
              <ArrowUpDown size={14} className="inline ml-2 text-slate-400" />
            </th>
          </tr>
        </thead>

        <tbody>
          {operadores.map(([op, val]) => (
            <tr
              key={op}
              className="hover:bg-gray-50 transition border-t last:border-b"
            >
              <td className="p-3 font-medium text-slate-800">{op}</td>

              <td
                className={`p-3 text-center text-slate-700 ${
                  val.rechamadas > 0 ? "cursor-pointer hover:bg-slate-100" : ""
                }`}
                onClick={() =>
                  val.rechamadas > 0 &&
                  onOpenRechamadas(op, val.ticketsRechamada)
                }
                aria-label={`Ver tickets de rechamada de ${op}`}
                title={
                  val.rechamadas > 0 ? "Clique para ver tickets" : undefined
                }
              >
                <span
                  className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-sm ${
                    val.rechamadas > 0
                      ? "bg-slate-100 text-slate-800"
                      : "text-slate-500"
                  }`}
                >
                  {val.rechamadas}
                </span>
              </td>

              <td className="p-3 text-center text-slate-700">
                <span className="inline-block px-2 py-1 rounded-full text-sm text-slate-700 bg-gray-50">
                  {val.concluidos}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
