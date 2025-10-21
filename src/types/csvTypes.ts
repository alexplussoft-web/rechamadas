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
  dataConclusao?: Date | null;
}

export interface AnaliseCSV {
  totalTickets: number;
  totalRechamadas: number;
  operadores: Record<string, OperadorResumo>;
  tickets: TicketInfo[];
}

export interface TicketCategoria {
  id: string; // Número do ticket
  assunto: string; // Coluna "Assunto"
  categoria: string; // Ex: "Atendimento técnico", "Estrutura do cliente"
  classificacao: string; // Ex: "Certificado Digital", "Instalação do Sistema"
}
