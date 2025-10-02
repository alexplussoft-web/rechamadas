export type TicketResumo = {
  ticketNumber: string;
  rechamadas: Record<string, number>;
  concluidos: Record<string, number>;
};

export type StatusInfo = {
  operadorAntigo: string;
  operadorAtual: string;
  usuarioAtual: string;
  statusAntigo: string;
  statusAtual: string;
};

export type InfoInteracao = {
  statusAntigo: string;
  statusAtual: string;
  operadorDaAcao: string;
};
