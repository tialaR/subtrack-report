import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Retorna a data atual ajustada ao fuso horário informado.
 * @param timezone string - ex: "America/Sao_Paulo"
 * @returns Date no fuso horário especificado
 */
export function getCurrentDateInTimezone(timezone: string): Date {
  if (!timezone) return new Date();
  const localDateString = new Date().toLocaleString("en-US", { timeZone: timezone });
  return new Date(localDateString);
}

export function formatDateToPortuguese(date: Date) {
  const full = format(date, "EEEE',' dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  const short = format(date, 'dd/MM/yyyy'); // sem locale necessário

  return {
    full,   // ex: "terça-feira, 05 de agosto de 2025"
    short,  // ex: "05/08/2025"
  };
}
