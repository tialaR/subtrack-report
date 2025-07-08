type WeatherLegendItem = {
  emoji: string;
  label: string;
};

export const weatherLegendItems = [
  { code: 0, emoji: '☀️', label: 'Céu limpo' },
  { code: 1, emoji: '🌤️', label: 'Poucas nuvens' },
  { code: 2, emoji: '⛅', label: 'Parcialmente nublado' },
  { code: 3, emoji: '☁️', label: 'Nublado' },
  { code: 45, emoji: '🌫️', label: 'Névoa' },
  { code: 48, emoji: '🌫️', label: 'Névoa com deposição' },
  { code: 51, emoji: '🌦️', label: 'Chuvisco leve' },
  { code: 53, emoji: '🌧️', label: 'Chuvisco moderado' },
  { code: 55, emoji: '🌧️', label: 'Chuvisco denso' },
  { code: 56, emoji: '🌧️❄️', label: 'Chuvisco congelante leve' },
  { code: 57, emoji: '🌧️❄️', label: 'Chuvisco congelante forte' },
  { code: 61, emoji: '🌧️', label: 'Chuva fraca' },
  { code: 63, emoji: '🌧️', label: 'Chuva moderada' },
  { code: 65, emoji: '🌧️', label: 'Chuva forte' },
  { code: 66, emoji: '🌧️❄️', label: 'Chuva congelante fraca' },
  { code: 67, emoji: '🌧️❄️', label: 'Chuva congelante forte' },
  { code: 71, emoji: '🌨️', label: 'Neve fraca' },
  { code: 73, emoji: '🌨️', label: 'Neve moderada' },
  { code: 75, emoji: '❄️', label: 'Neve forte' },
  { code: 77, emoji: '🌨️', label: 'Grãos de neve' },
  { code: 80, emoji: '🌦️', label: 'Pancadas de chuva fraca' },
  { code: 81, emoji: '🌧️', label: 'Pancadas de chuva moderada' },
  { code: 82, emoji: '🌧️', label: 'Pancadas de chuva violenta' },
  { code: 85, emoji: '🌨️', label: 'Pancadas de neve fraca' },
  { code: 86, emoji: '❄️', label: 'Pancadas de neve forte' },
  { code: 95, emoji: '⛈️', label: 'Trovoada leve/moderada' },
  { code: 96, emoji: '⛈️⚡', label: 'Trovoada com granizo fraco' },
  { code: 99, emoji: '⛈️⚡', label: 'Trovoada com granizo forte' },
  { code: -1, emoji: '🌀', label: 'Condição indefinida' }
];

export function getWeatherCode(code: number): WeatherLegendItem {
  switch (code) {
    case 0: return { emoji: '☀️', label: 'Céu limpo' };
    case 1: return { emoji: '🌤️', label: 'Poucas nuvens' };
    case 2: return { emoji: '⛅', label: 'Parcialmente nublado' };
    case 3: return { emoji: '☁️', label: 'Nublado' };
    case 45: return { emoji: '🌫️', label: 'Névoa' };
    case 48: return { emoji: '🌫️', label: 'Névoa com deposição' };
    case 51: return { emoji: '🌦️', label: 'Chuvisco leve' };
    case 53: return { emoji: '🌧️', label: 'Chuvisco moderado' };
    case 55: return { emoji: '🌧️', label: 'Chuvisco denso' };
    case 56: return { emoji: '🌧️❄️', label: 'Chuvisco congelante leve' };
    case 57: return { emoji: '🌧️❄️', label: 'Chuvisco congelante forte' };
    case 61: return { emoji: '🌧️', label: 'Chuva fraca' };
    case 63: return { emoji: '🌧️', label: 'Chuva moderada' };
    case 65: return { emoji: '🌧️', label: 'Chuva forte' };
    case 66: return { emoji: '🌧️❄️', label: 'Chuva congelante fraca' };
    case 67: return { emoji: '🌧️❄️', label: 'Chuva congelante forte' };
    case 71: return { emoji: '🌨️', label: 'Neve fraca' };
    case 73: return { emoji: '🌨️', label: 'Neve moderada' };
    case 75: return { emoji: '❄️', label: 'Neve forte' };
    case 77: return { emoji: '🌨️', label: 'Grãos de neve' };
    case 80: return { emoji: '🌦️', label: 'Pancadas de chuva fraca' };
    case 81: return { emoji: '🌧️', label: 'Pancadas de chuva moderada' };
    case 82: return { emoji: '🌧️', label: 'Pancadas de chuva violenta' };
    case 85: return { emoji: '🌨️', label: 'Pancadas de neve fraca' };
    case 86: return { emoji: '❄️', label: 'Pancadas de neve forte' };
    case 95: return { emoji: '⛈️', label: 'Trovoada leve/moderada' };
    case 96: return { emoji: '⛈️⚡', label: 'Trovoada com granizo fraco' };
    case 99: return { emoji: '⛈️⚡', label: 'Trovoada com granizo forte' };
    default: return { emoji: '🌀', label: 'Condição indefinida' };
  }
}

export const timezoneCoordinates = [
  { timezone: "America/Rio_Branco", latitude: -9.97499, longitude: -67.8243 },
  { timezone: "America/Manaus", latitude: -3.119, longitude: -60.0217 },
  { timezone: "America/Boa_Vista", latitude: 2.8238, longitude: -60.6753 },
  { timezone: "America/Porto_Velho", latitude: -8.7612, longitude: -63.9004 },
  { timezone: "America/Cuiaba", latitude: -15.6014, longitude: -56.0979 },
  { timezone: "America/Campo_Grande", latitude: -20.4486, longitude: -54.6295 },
  { timezone: "America/Sao_Paulo", latitude: -23.5505, longitude: -46.6333 },
  { timezone: "America/Bahia", latitude: -12.9718, longitude: -38.5011 },
  { timezone: "America/Fortaleza", latitude: -3.7172, longitude: -38.5433 },
  { timezone: "America/Belem", latitude: -1.455, longitude: -48.5034 },
  { timezone: "America/Recife", latitude: -8.0476, longitude: -34.877 },
  { timezone: "America/Araguaina", latitude: -7.1928, longitude: -48.2075 },
  { timezone: "America/Maceio", latitude: -9.6498, longitude: -35.7089 },
  { timezone: "America/Noronha", latitude: -3.8549, longitude: -32.4232 },
  { timezone: "America/Santarem", latitude: -2.4385, longitude: -54.6996 },
  { timezone: "America/Teresina", latitude: -5.0892, longitude: -42.8016 },
  { timezone: "America/Vilhena", latitude: -12.7502, longitude: -60.1488 },
  { timezone: "America/Goiania", latitude: -16.6869, longitude: -49.2648 },
  { timezone: "America/Brasilia", latitude: -15.7939, longitude: -47.8828 }
];

export type TimezoneCoordinatePros = typeof timezoneCoordinates[number];

export function getCoordsByTimezone(timezone: string): TimezoneCoordinatePros {
  const found = timezoneCoordinates?.find((item) => item?.timezone === timezone);
  if (!found) {
    throw new Error(`Timezone '${timezone}' não encontrado no helper.`);
  }
  return found;
}

