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
  "Arquivos fiscais": 1,
  "Exportar XML + SPED SYSCONV": 2,
  "Exportação de XML": 1,
  "Sped Contribuições": 3,
  "Sped Fiscal": 3,
  "Sped Fiscal - Retorno": 3,
  Cadastro: 1,
  "Cadastro de Produtos/Serviços": 1,
  "Cadastros de Cliente/Fornecedor": 1,
  "Configuração Fiscal": 3,
  Filial: 1,
  Outros: 1,
  Parâmetros: 2,
  Preços: 2,
  "Referente ao Financeiro": 3,
  Relatórios: 3,
  Impressão: 2,
  Licenças: 2,
  "Operações de Entrada": 1,
  "Operaçõs de Saída": 2,
  Ticket: 2,
  Configurações: 2,
  "Devolução ao fornecedor": 2,
  Entradas: 1,
  "Rejeição NF-e": 2,
  Saídas: 2,
  Balança: 3,
  "Certificado Digital": 1,
  Impressoras: 2,
  Internet: 1,
  Banco: 2,
  Caixa: 2,
  Documentos: 1,
  Financeiro: 3,
  Pagar: 2,
  Recibo: 1,
  "Relatorios Gerais": 2,
  "Relatórios Pagar": 2,
  "Relatórios Recebíveis": 2,
  Gfood: 3,
  "NF-e Avulsa": 3,
  "CT-e": 3,
  "Carta de Correção": 2,
  Consignação: 2,
  "Contagem de Estoque": 2,
  "Devolução ao Fornecedor": 2,
  "Devolução de Vendas": 2,
  "MDF-e": 3,
  "NFC-e": 2,
  "O.S Ordens de Serviços": 2,
  "Rejeição NFC-e": 2,
  "Transf. Entre Filiais": 2,
  Treinamento: 1,
  "Trocas de mercadoria": 2,
  "Vendas Balcão": 1,
  "Atualização de Módulos": 1,
  "Atualização do sistema": 1,
  "Base corrompida": 3,
  "Comando no Banco": 3,
  "Dúvidas Administrativas": 2,
  "Dúvidas Fiscais": 3,
  "Erros não encontrados": 3,
  "Instalação do Sistema": 1,
  "Sistema lento": 2,
  "Sistema não abre": 3,
  TEF: 3,
  "Troca de servidor": 3,
  Backup: 1,
  Bridge: 2,
  CNAB: 2,
  "Exportador de notas": 2,
  Fidelidade: 2,
  "Mobile Sync": 2,
  "Mobile View": 1,
  Módulos: 1,
  "Relatório - Super Gerador": 3,
  Sync: 2,
  "Ver telas": 1,
  "WhatsApp Meta": 1,
  Atualização: 1,
  Etiqueta: 2,
  "Gestão de Preço": 3,
  Instalação: 1,
  PlusColetor: 3,
  SwitchMobile: 3,
  Finaneiro: 3, // (provável erro de digitação de "Financeiro")
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
