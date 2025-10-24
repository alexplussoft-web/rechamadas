import type { TicketCategoria, TicketInfo } from "@/types/csvTypes";
import { Badge } from "../ui/badge";
import { Calendar } from "lucide-react";
import { classificacoesNiveis, nivelParaCor } from "@/lib/utils";
import { Tooltip } from "../layout/Tooltip";

export function TicketDetalhes({
  tickets,
  categoriasPorTicket,
  filtroCategoria,
  filtroClassificacao,
  filtroAssunto,
  filtroNivel,
}: any) {
  const IndicadorNivel = ({ nivel }: { nivel: number }) => (
    <Tooltip content={`Nível ${nivel}`}>
      <span
        className={`inline-block w-4 h-4 rounded-full ${nivelParaCor(
          nivel
        )} animate-pulse`}
      ></span>
    </Tooltip>
  );
  if (!tickets.length) {
    return (
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
        Nenhum ticket corresponde aos filtros aplicados.
      </div>
    );
  }

  return (
    <>
      {tickets.map((t: TicketInfo) => {
        const infos =
          categoriasPorTicket?.[t.id]?.filter((c: TicketCategoria) => {
            return (
              (!filtroCategoria ||
                filtroCategoria === "all" ||
                c.categoria === filtroCategoria) &&
              (!filtroNivel ||
                filtroNivel === "all" ||
                classificacoesNiveis[c.classificacao] ===
                  Number(filtroNivel)) &&
              (!filtroClassificacao ||
                filtroClassificacao === "all" ||
                c.classificacao === filtroClassificacao) &&
              (!filtroAssunto ||
                c.assunto.toLowerCase().includes(filtroAssunto.toLowerCase()))
            );
          }) || [];

        if (!infos.length) return null;

        return (
          <div key={t.id} className="mb-3">
            <div className="text-xs text-muted-foreground mb-1">
              Ticket #{t.id}
            </div>
            <div className="space-y-1">
              {infos.map((c: TicketCategoria) => (
                <div
                  key={c.categoria + c.classificacao}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="border rounded-3xl p-2 flex flex-col w-full sm:flex-row sm:items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <Badge className="bg-red-400 text-white dark:bg-red-500">
                      {c.categoria || "Sem Categoria"}
                    </Badge>
                    <Badge className="bg-blue-400 text-white dark:bg-blue-500">
                      {c.classificacao || "Sem Classificação"}
                    </Badge>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-muted-foreground">{c.assunto}</span>
                      <IndicadorNivel
                        nivel={classificacoesNiveis[c.classificacao] || 0}
                      />
                    </div>
                  </div>
                  {t.dataConclusao && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span className="text-muted-foreground text-sm">
                        {t.dataConclusao.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
