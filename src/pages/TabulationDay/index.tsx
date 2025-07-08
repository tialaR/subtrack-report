import { useMemo } from "react";
import { useUserLocation } from "@hooks/useUserLocation";
import { useOpenMeteo } from "@hooks/useOpenMeteo";
import { getWeatherCode } from "@utils/tabulationHelper";
import { AccordionWeatherLegend } from "@components/AccordionWeatherLegend";
import { MainDescription } from "@components/MainDescription";
import { Tooltip } from "@components/Tooltip";
import * as S from "./styles";

const TabulationDay: React.FC = () => {
  const {
    latitude,
    longitude,
    timezone,
    loading: loadingLocation,
    error,
  } = useUserLocation();

  const shouldFetchWeather = latitude !== null && longitude !== null;
  const { weather, loading: loadingWeather, todayDate } = useOpenMeteo(
    latitude ?? 0,
    longitude ?? 0,
    timezone
  );

  const memoizedWeather = useMemo(() => {
    return weather.map((w) => ({
      ...w,
      legend: getWeatherCode(w.weatherCode),
    }));
  }, [weather]);

  if (loadingLocation || loadingWeather)
    return <S.Message>Carregando dados da previsão...</S.Message>;
  if (error) return <S.Message>Erro ao obter localização: {error}</S.Message>;
  if (!shouldFetchWeather || weather.length === 0)
    return <S.Message>Nenhum dado disponível.</S.Message>;

  return (
    <>
      <MainDescription>
        {todayDate?.toUpperCase()}
      </MainDescription>

      <S.WeatherGrid>
        {memoizedWeather?.map((w, index) => (
          <S.WeatherCard key={index}>
            <S.Time>🕒 {w?.hour}</S.Time>

            <Tooltip
              content={`${w?.legend?.label}`}
              delay={300}
            >
              <S.Icon>{w?.legend?.emoji}</S.Icon>
            </Tooltip>

            <S.Temp>🌡️ {w?.temperature?.toFixed(1)}°C</S.Temp>
            <S.Precip>💧 {w?.precipitation}% de chuva</S.Precip>
            <S.Pressure>📈 {w?.pressure?.toFixed(0)} hPa</S.Pressure>
          </S.WeatherCard>
        ))}
      </S.WeatherGrid>

      <AccordionWeatherLegend />
    </>
  );
};

export { TabulationDay };
