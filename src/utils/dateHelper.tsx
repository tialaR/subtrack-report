export function getCurrentDateInTimezone(timezone: string): Date {
  if (!timezone) return new Date();

  const localDateString = new Date().toLocaleString('en-US', { timeZone: timezone });
  return new Date(localDateString);
}
