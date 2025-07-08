import { useMemo, useState, useEffect, useRef } from "react";
import { useTodayHourlyWeather } from "@hooks/useTodayHourlyWeather";
import { useWeatherLocation } from "@hooks/useWeatherLocation";
import { getWeatherCode } from "@utils/tabulationHelper";
import { AccordionWeatherLegend } from "@components/AccordionWeatherLegend";
import { MainDescription } from "@components/MainDescription";
import { Tooltip } from "@components/Tooltip";
import { LoadingScreen } from "@components/LoadingScreen";
import { ErrorScreen } from "@components/ErrorScreen";
import { ActionToolbar } from "@components/ActionToolbar";
import * as S from "./styles";
import type { PartialLocationValues, WeatherWithLegend } from "./types";

const LOCAL_STORAGE_KEY = "@maptrackt-report:tabulation-timezone-location";

export const TabulationDay: React.FC = () => {
  
  const [location, setLocation] = useState<PartialLocationValues | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    latitude,
    longitude,
    timezone,
    loading: locationLoading,
    error: locationError,
    getLocation,
  } = useWeatherLocation();

  const {
    hourlyWeather,
    todayDate,
    loading: hourlyWeatherLoading,
    error: hourlyWeatherError,
    getHourlyWeather,
  } = useTodayHourlyWeather();

  const loading = locationLoading || hourlyWeatherLoading || isSwitching;

  useEffect(() => {
    const loadInitialLocation = async () => {
      setIsSwitching(true);
      const storedLocation = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (storedLocation) {
        const saved = JSON.parse(storedLocation);
        setLocation(saved);
        await getHourlyWeather(saved);
      } else {
        await getLocation();
      }
      setIsSwitching(false);
    };

    loadInitialLocation();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const hasLocation = latitude && longitude && timezone && !locationLoading;
    if (hasLocation) {
      getHourlyWeather({ latitude, longitude, timezone });
    }
  }, [latitude, longitude, timezone, locationLoading]);

  useEffect(() => {
    const hasLocation = latitude && longitude && timezone && !locationLoading;
    if (hasLocation) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ latitude, longitude, timezone })
      );
    }
  }, [latitude, longitude, timezone, locationLoading]);

  useEffect(() => {
    const shouldSync =
      !location && latitude && longitude && timezone && !locationLoading;

    if (shouldSync) {
      setLocation({ latitude, longitude, timezone });
    }
  }, [latitude, longitude, timezone, location, locationLoading]);

  const memoizedHourlyWeathers: WeatherWithLegend[] = useMemo(() => {
    return (
      hourlyWeather?.map((weather) => ({
        ...weather,
        legend: getWeatherCode(weather.weatherCode),
      })) ?? []
    );
  }, [hourlyWeather]);

  const handleUseCurrentLocation = async (): Promise<void> => {
    setIsSwitching(true);
    setLocation(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    await getLocation();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsSwitching(false), 600);
  };

  const handleFormSubmit = async (values: PartialLocationValues) => {
    setIsSwitching(true);
    setLocation(values);
    await getLocation(values);
    await getHourlyWeather(values);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsSwitching(false), 600);
  };

  const renderHeader = () => {
    return (
      <>
        {!loading ? (
          <MainDescription>
            {todayDate?.toUpperCase()} - {location?.timezone?.toUpperCase()}
          </MainDescription>
        ) : (
          <MainDescription>DATA DE HOJE - TIMEZONE</MainDescription>
        )}

        <ActionToolbar
          value={location?.timezone ?? ''}
          orientation="horizontal"
          actionButtonType="button-icon"
          onSubmit={handleFormSubmit}
          onUseCurrentLocation={handleUseCurrentLocation}
        />
      </>
    );
  };

  if (loading) {
    let title = "Carregando previsão...";
    let description = "Obtendo dados climáticos para hoje.";

    if (isSwitching) {
      title = "Atualizando localização...";
      description = "Estamos voltando para sua localização atual.";
    } else if (locationLoading) {
      title = "Detectando localização...";
      description = "Buscando sua posição geográfica...";
    }

    return (
      <>
        {renderHeader()}
        <LoadingScreen title={title} description={description} />
      </>
    );
  }

  if (locationError) {
    return (
      <>
        {renderHeader()}
        <ErrorScreen
          title="Erro ao obter localização"
          description="Não conseguimos acessar sua localização. Verifique as permissões do navegador ou tente inserir manualmente."
          onRetry={handleUseCurrentLocation}
        />
      </>
    );
  }

  if (hourlyWeatherError) {
    return (
      <>
        {renderHeader()}
        <ErrorScreen
          title="Erro ao obter previsão"
          description="Houve uma falha ao carregar a previsão do tempo para hoje. Tente novamente."
          onRetry={() => {
            const hasLocation = latitude && longitude && timezone;
            if (hasLocation) {
              getHourlyWeather({ latitude, longitude, timezone });
            }
          }}
        />
      </>
    );
  }

  return (
    <>
      {renderHeader()}

      <S.WeatherGrid>
        {memoizedHourlyWeathers?.map((weather, index) => (
          <S.WeatherCard key={index}>
            <S.Time>🕒 {weather?.hour}</S.Time>
            <Tooltip content={weather?.legend?.label} delay={300}>
              <S.Icon>{weather?.legend?.emoji}</S.Icon>
            </Tooltip>
            <S.Temp>🌡️ {weather?.temperature?.toFixed(1)}°C</S.Temp>
            <S.Precip>💧 {weather?.precipitation}% de chuva</S.Precip>
            <S.Pressure>📈 {weather?.pressure?.toFixed(0)} hPa</S.Pressure>
          </S.WeatherCard>
        ))}
      </S.WeatherGrid>

      <AccordionWeatherLegend />
    </>
  );
};
