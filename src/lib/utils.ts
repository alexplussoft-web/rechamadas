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
