import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Importa o locale

type WeatherData = {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weathercode: number[];
  pressure_msl: number[];
};

export type HourlyWeather = {
  time: string;
  hour: string;
  temperature: number;
  precipitation: number;
  pressure: number;
  weatherCode: number;
};

export const useOpenMeteo = (
  latitude: number,
  longitude: number,
  timezone: string = 'America/Bahia'
) => {
  const [weather, setWeather] = useState<HourlyWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayDate, setTodayDate] = useState<string>(''); // Data formatada

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode,pressure_msl&timezone=${encodeURIComponent(timezone)}`;

        const response = await fetch(url);
        const data = await response.json();

        const hourly = data.hourly as WeatherData;

        const firstTime = hourly.time[0]; // ex: "2025-07-18T00:00"
        const dateOnly = firstTime.slice(0, 10); // "2025-07-18"

        // Formata para ex: "sexta-feira, 18 de julho de 2025"
        const formattedDate = format(new Date(dateOnly), "EEEE',' dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        });
        setTodayDate(formattedDate);

        const todayData = hourly.time
          .map((time, index) => {
            if (!time.startsWith(dateOnly)) return null;

            const hour = new Date(time).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return {
              time,
              hour,
              temperature: hourly.temperature_2m[index],
              precipitation: hourly.precipitation_probability[index],
              pressure: hourly.pressure_msl[index],
              weatherCode: hourly.weathercode[index],
            };
          })
          .filter(Boolean) as HourlyWeather[];

        setWeather(todayData);
      } catch (error) {
        console.error('Erro ao buscar dados da Open-Meteo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude, timezone]);

  return { weather, loading, todayDate };
};
