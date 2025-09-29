import type { StatusInfo } from "../types/ticket";

export function parseInteracao(interacao: string): StatusInfo | null {
  const operadorMatch = interacao.match(
    /Operador:\s*(.*?)\s*->\s*(.*?)(<br>|$)/
  );
  const statusMatch = interacao.match(/Status:\s*(.*?)\s*->\s*(.*?)(<br>|$)/);

  if (!operadorMatch || !statusMatch) return null;

  return {
    operadorAntigo: operadorMatch[1].trim(),
    operadorAtual: operadorMatch[2].trim(),
    statusAntigo: statusMatch[1].trim(),
    statusAtual: statusMatch[2].trim(),
  };
}
