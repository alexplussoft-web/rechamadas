/** Linha da seção principal — define o ticket e o operador responsável */
export interface TicketHeader {
  ticket: string;
  operador: string;
  abertura: string;
  alteracao: string;
  fechamento: string;
}

/** Linha da tabela de interações */
export interface Interacao {
  data: string;
  responsavel: string;
  texto: string;
}

/** Métricas extraídas de um ticket */
export interface TicketResumo {
  ticket: string;
  operadorConcluiu: string;
  concluiuEm: string;
  rechamadas: number;
  operadoresEnvolvidos: Set<string>;
  transicoes: {
    conclusoes: number;
    reaberturas: number;
  };
}

/** Resultado geral do hook */
export interface CSVStats {
  totalTickets: number;
  totalRechamadas: number;
  totalOperadores: number;
  totalConclusoes: number;
  resumoPorTicket: TicketResumo[];
  rankingOperadores: Record<string, { concluidos: number; rechamadas: number }>;
}
