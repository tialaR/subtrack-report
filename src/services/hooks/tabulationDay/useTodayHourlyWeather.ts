import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { formatDateToPortuguese, getCurrentDateInTimezone } from "@utils/dateHelper";

type WeatherData = {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weathercode: number[];
  pressure_msl: number[];
};

export type HourlyWeather = {
  id: string;
  time: string;
  hour: string;
  temperature: number;
  precipitation: number;
  pressure: number;
  weatherCode: number;
};

type Params = {
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string | null;
};

export const useTodayHourlyWeather = () => {
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);
  const [todayDate, setTodayDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getHourlyWeather = async ({ latitude, longitude, timezone }: Params) => {
    if (!latitude || !longitude || !timezone) return;

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode,pressure_msl&timezone=${encodeURIComponent(
        timezone
      )}`;

      const response = await fetch(url);
      const data = await response.json();
      const hourly = data.hourly as WeatherData;

      const currentDate = getCurrentDateInTimezone(timezone);
      const dateOnly = currentDate.toISOString().slice(0, 10);

      const formattedDate = formatDateToPortuguese(currentDate);
      setTodayDate(formattedDate);

      const todayData = hourly.time
        .map((time, index) => {
          if (!time.startsWith(dateOnly)) return null;

          const hour = new Date(time).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return {
            id: uuidv4(),
            time,
            hour,
            temperature: hourly.temperature_2m[index],
            precipitation: hourly.precipitation_probability[index],
            pressure: hourly.pressure_msl[index],
            weatherCode: hourly.weathercode[index],
          };
        })
        .filter(Boolean) as HourlyWeather[];

      setHourlyWeather(todayData);
    } catch (err: unknown) {
      let message = "Erro ao buscar dados da Open-Meteo";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { hourlyWeather, todayDate, loading, error, getHourlyWeather };
};
