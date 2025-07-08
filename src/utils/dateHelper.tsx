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

/**
 * Formata uma instância de Date para o padrão: `segunda-feira, 28 de julho de 2025`
 * @param date Date
 * @returns string formatada
 */
export function formatDateToPortuguese(date: Date): string {
  return format(date, "EEEE',' dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}
