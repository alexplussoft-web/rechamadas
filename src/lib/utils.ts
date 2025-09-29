import type { StatusInfo } from "../types/ticket";

export function parseInteracao(interacao: string): StatusInfo | null {
  console.log("Texto: ", interacao);

  const operadorMatch = interacao.match(
    /\[?(?:Operador|Usuário Logado):\s*(.*?)\]?\s*(?:->\s*(.*?))?(<br>|$)/
  );
  console.log(operadorMatch);

  const statusMatch = interacao.match(/Status:\s*(.*?)\s*->\s*(.*?)(<br>|$)/);

  if (!operadorMatch || !statusMatch) return null;

  const operadorAntigo = operadorMatch[1]?.trim() || "";
  const operadorAtual = (operadorMatch[2] || operadorMatch[1])?.trim() || "";

  const statusAntigo = statusMatch[1]?.trim() || "";
  const statusAtual = statusMatch[2]?.trim() || "";

  return {
    operadorAntigo,
    operadorAtual,
    statusAntigo,
    statusAtual,
  };
}
