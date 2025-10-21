import { parseData } from "@/lib/utils";
import type { TicketInfo } from "@/types/csvTypes";

export const processTicketRow = (colunas: string[]): TicketInfo => {
  const fechamento = colunas[5];
  return {
    id: colunas[0],
    operadorInicial: colunas[1]?.trim() || "Desconhecido",
    operadorFinal: colunas[1]?.trim() || "Desconhecido",
    totalRechamadas: 0,
    rechamadasPorOperador: {},
    dataConclusao: fechamento ? parseData(fechamento) : null,
  };
};
