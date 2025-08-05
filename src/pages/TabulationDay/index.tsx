import { useEffect, useMemo, useRef } from "react";
import { AccordionWeatherLegend } from "@components/AccordionWeatherLegend";
import { MainDescription } from "@components/MainDescription";
import { Tooltip } from "@components/Tooltip";
import { LoadingScreen } from "@components/LoadingScreen";
import { ErrorScreen } from "@components/ErrorScreen";
import { Button } from "@components/Button";
import { TogglePanel } from "@components/TogglePanel";
import { useModal } from "@hooks/useModal";
import { FormLocationMemorized } from "./FormLocationMemorized";
import { TabulationPreview } from "./TabulationPreview";
import { useTabulationLocationLogic } from "@services/hooks/tabulationDay/useTabulationLocationLogic";
import { getWeatherCode } from "@utils/tabulationHelper";
import { StyleButtonsWrapper, StyleHeaderPageWrapper } from "@styles/StyleComponets";
import * as S from "./styles";

export const TabulationDay = () => {
  const { createModal, openModal } = useModal();

  const tabulationRef = useRef<HTMLDivElement>(null);

  const {
    coordsWithTimezone,
    hourlyWeather,
    isGeneralLoading,
    locationError,
    weatherError,
    useCurrentLocation,
    submitManualLocation,
    retryGetHourlyWeather,
    captureAndPersistTabulationImage,
    tabulationDay,
    isLoadingTabulationDay,
  } = useTabulationLocationLogic();

  const memoizedHourlyWeathers = useMemo(() => {
    console.log(hourlyWeather);
    return hourlyWeather.map((weather) => ({
      ...weather,
      legend: getWeatherCode(weather.weatherCode),
    }));
  }, [hourlyWeather]);

  const hasImage = tabulationDay?.image && !isLoadingTabulationDay;

  useEffect(() => {
    if (hasImage) {
      createModal({
        size: "large",
        children: (
          <TabulationPreview
            title={tabulationDay.title ?? ""}
            date={tabulationDay.current_date_full ?? ""}
            timezone={tabulationDay.timezone ?? ""}
            image={tabulationDay.image ?? ""}
          />
        ),
      });
    }
  }, [hasImage]);

  const renderHeader = () => (
    <StyleHeaderPageWrapper>
      {!isGeneralLoading ? (
        <MainDescription>
          {tabulationDay?.current_date_full?.toUpperCase()} - TIMEZONE:{" "}
          {tabulationDay.timezone?.toUpperCase()}
        </MainDescription>
      ) : (
        <MainDescription>DATA DE HOJE - TIMEZONE</MainDescription>
      )}
      <TogglePanel>
        <FormLocationMemorized
          location={{
            timezone: tabulationDay?.timezone ?? "",
            latitude: tabulationDay?.latitude,
            longitude: tabulationDay?.longitude,
          }}
          onSubmit={submitManualLocation}
          onUseCurrentLocation={useCurrentLocation}
        />
        <StyleButtonsWrapper>
          <Button
            title="Capturar Tabulação"
            variant="primary"
            iconType="camera"
            showIcon
            onClick={() => captureAndPersistTabulationImage(tabulationRef)}
          >
            Capturar tabulação
          </Button>
          <Button
            title="Visualizar Captura"
            variant="secondary"
            iconType="show"
            showIcon
            disabled={!hasImage}
            onClick={openModal}
          >
            Visualizar captura
          </Button>
        </StyleButtonsWrapper>
      </TogglePanel>
    </StyleHeaderPageWrapper>
  );

  if (isGeneralLoading) {
    let title = "Carregando previsão...";
    let description = "Obtendo dados climáticos para hoje.";

    if (!coordsWithTimezone.latitude || !coordsWithTimezone.longitude) {
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
          onRetry={useCurrentLocation}
        />
      </>
    );
  }

  if (weatherError) {
    return (
      <>
        {renderHeader()}
        <ErrorScreen
          title="Erro ao obter previsão"
          description="Houve uma falha ao carregar a previsão do tempo para hoje. Tente novamente."
          onRetry={retryGetHourlyWeather}
        />
      </>
    );
  }

  return (
    <>
      {renderHeader()}
      <S.WeatherGrid ref={tabulationRef}>
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
