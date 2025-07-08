import { useEffect, useState } from 'react';
import { formatISO, startOfToday } from 'date-fns';

type WeatherData = {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weathercode: number[];
  pressure_msl: number[];
};

type HourlyWeather = {
  time: string;
  hour: string;
  temperature: number;
  precipitation: number;
  pressure: number;
  weatherCode: number;
};

export const useOpenMeteo = () => {
  const [weather, setWeather] = useState<HourlyWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const today = startOfToday();
        const start = formatISO(today).slice(0, 10);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=-12.7449&longitude=-38.6155&hourly=temperature_2m,precipitation_probability,weathercode,pressure_msl&timezone=America%2FBahia`;

        const res = await fetch(url);
        const data = await res.json();

        const hourly = data.hourly as WeatherData;
        const todayData: HourlyWeather[] = hourly.time
          .map((time, i) => {
            if (!time.startsWith(start)) return null;

            const hour = new Date(time).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return {
              time,
              hour,
              temperature: hourly.temperature_2m[i],
              precipitation: hourly.precipitation_probability[i],
              pressure: hourly.pressure_msl[i],
              weatherCode: hourly.weathercode[i],
            };
          })
          .filter(Boolean) as HourlyWeather[];

        setWeather(todayData);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar dados do Open-Meteo:', err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weather, loading };
};

//Return:
// {
//   weather: [
//     {
//       time: '2025-07-09T00:00',
//       hour: '00:00',
//       temperature: 24.1,
//       precipitation: 12,
//       pressure: 1012.3,
//       weatherCode: 3
//     },
//     ...
//   ],
//   loading: false
// }
