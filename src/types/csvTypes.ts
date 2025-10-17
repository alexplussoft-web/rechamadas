// Tipagem de métricas gerais
export interface Metrics {
  totalTickets: number;
  totalRechamadas: number;
  totalOperadores: number;
  mediaRechamadas: number;
}

// Dados por operador
export interface OperatorStats {
  nome: string;
  tickets: number;
  rechamadas: number;
}

export interface OperadorResumo {
  concluidos: number;
  rechamadas: number;
  ticketsConcluidos: Set<string>;
}

// Dados por ticket individual
export interface TicketInfo {
  id: string;
  operadorInicial: string;
  operadorFinal: string;
  totalRechamadas: number;
  rechamadasPorOperador: Record<string, number>;
}

export interface AnaliseCSV {
  totalTickets: number;
  totalRechamadas: number;
  operadores: Record<string, { concluidos: number; rechamadas: number }>;
  tickets: TicketInfo[];
}
