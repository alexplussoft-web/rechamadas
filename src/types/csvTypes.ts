export interface Metrics {
  totalTickets: number;
  totalRechamadas: number;
  totalOperadores: number;
  mediaRechamadas: number;
}

export interface OperatorStats {
  nome: string;
  tickets: number;
  rechamadas: number;
}

export interface OperadorResumo {
  concluidos: number;
  rechamadas: number;
  ticketsConcluidos: Set<{ id: string; dataConclusao: Date }>;
}

export interface TicketInfo {
  id: string;
  operadorInicial: string;
  operadorFinal: string;
  totalRechamadas: number;
  rechamadasPorOperador: Record<string, number>;
  dataConclusao?: Date;
}

export interface AnaliseCSV {
  totalTickets: number;
  totalRechamadas: number;
  operadores: Record<string, OperadorResumo>;
  tickets: TicketInfo[];
}
