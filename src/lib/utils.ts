import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converte "dd/MM/yy HH:mm:ss" para objeto Date
 */
export function parseData(str: string): Date {
  const [data, hora] = str.split(" ");
  const [dia, mes, ano] = data.split("/").map(Number);
  const [h, m, s] = (hora || "00:00:00").split(":").map(Number);
  return new Date(2000 + ano, mes - 1, dia, h, m, s);
}

export const classificacoesNiveis: Record<string, number> = {
  "Arquivos Fiscais": 1,
  "Sistema não abre": 3,
  "Solicitação de Informação": 1,
  Cadastro: 1,
  "Configuração Fiscal": 3,
  Configurações: 2,
  Entradas: 1,
  Financeiro: 3,
  Outros: 1,
  Relatórios: 3,
  Saídas: 2,
  Balança: 3,
  "Certificado Digital": 1,
  Impressoras: 2,
  Internet: 1,
  Gfood: 3,
  "NF-e Avulsa": 3,
  "Atualização de Módulos": 1,
  "Atualização do Sistema": 1,
  "Base corrompida": 3,
  "Comando no Banco": 3,
  "Conversão de banco de dados": 3,
  "Desenvolvimento de relatórios": 3,
  "Erros não encontrados": 3,
  "Instalação do Sistema": 1,
  Módulos: 1,
  Ticket: 2,
  Backup: 1,
  Etiqueta: 2,
  Dúvidas: 3,
  FotoPlus: 3,
  "Gestão de Preços": 3,
  "Módulo Busca Valor": 3,
  PlusColetor: 3,
  Parâmetros: 2,
  SwitchMobile: 3,
};

export const nivelParaCor = (nivel: number) => {
  switch (nivel) {
    case 1:
      return "bg-green-400";
    case 2:
      return "bg-yellow-400";
    case 3:
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};
