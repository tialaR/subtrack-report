import type { getWeatherCode } from "@utils/tabulationHelper";

export type LocationValues = {
  latitude: number | null;
  longitude: number | null;
  timezone: string;
};

export type PartialLocationValues = Partial<LocationValues>;

export type WeatherWithLegend = {
  legend: ReturnType<typeof getWeatherCode>;
} & {
  id: string;
  time: string;
  hour: string;
  temperature: number;
  precipitation: number;
  pressure: number;
  weatherCode: number;
};
