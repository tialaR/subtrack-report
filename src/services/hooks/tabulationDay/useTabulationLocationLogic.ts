import { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTodayHourlyWeather } from "./useTodayHourlyWeather";
import { useWeatherLocation } from "./useWeatherLocation";
import { usePostTabulationDay } from "@services/hooks/tabulationDay/usePostTabulationDay";
import { useGetTabulationDay } from "@services/hooks/tabulationDay/useGetTabulationDay";
import type { TabulationDay } from "@services/hooks/tabulationDay/types";
import type { PartialLocationValues } from "@pages/TabulationDay/types";
import { formatDateToPortuguese, getCurrentDateInTimezone } from "@utils/dateHelper";
import { persistImageWithCanvas } from "@utils/persistImageHelper";
import { useToastInfo } from "@hooks/useToastInfo";

export const useTabulationLocationLogic = () => {
  const { showToast } = useToastInfo();

  const hasFetchedTabulation = useRef(false);
  const lastTimezoneRef = useRef<string | null>(null);

  // Hook de localização (coordenadas + timezone)
  const {
    coordsWithTimezone,
    loading: isCoordsWithTimezoneLoading,
    error: locationError,
    getCoordsWithTimezone,
  } = useWeatherLocation();

  // Hook de clima por hora
  const {
    hourlyWeather,
    todayDate,
    loading: isHourlyWeatherLoading,
    error: weatherError,
    getHourlyWeather,
  } = useTodayHourlyWeather();

  // Hook de consulta da tabulação no servidor
  const {
    tabulationDay,
    loading: isLoadingTabulationDay,
    getTabulationDay,
  } = useGetTabulationDay();

  // Hook de persistência da tabulação
  const {
    postTabulationDay,
  } = usePostTabulationDay();

  // Loading geral consolidado
  const isGeneralLoading = isCoordsWithTimezoneLoading || isHourlyWeatherLoading;

  // Carrega dados da tabulação do servidor ao carregar a tela
  useEffect(() => {
    if (!hasFetchedTabulation.current) {
      const fetchInitialData = () => {
        getTabulationDay();
        hasFetchedTabulation.current = true;
      };
      fetchInitialData();
    }
  }, []);

  // Busca coordenadas caso não existam dados persistidos
  useEffect(() => {
    if (hasFetchedTabulation.current && tabulationDay.timezone && !isLoadingTabulationDay) {
      getCoordsWithTimezone({ timezone: tabulationDay.timezone });
      return;
    }

    if (hasFetchedTabulation.current && !!tabulationDay.timezone && !isLoadingTabulationDay) {
      getCoordsWithTimezone();
      return;
    }
  }, [hasFetchedTabulation.current, tabulationDay.timezone, isLoadingTabulationDay]);

  // Dispara ao obter coordenadas para buscar clima e persistir tabulação
  useEffect(() => {
    const timezoneHasChanged =
      coordsWithTimezone.timezone &&
      coordsWithTimezone.timezone !== lastTimezoneRef.current &&
      !isCoordsWithTimezoneLoading;

    if (!timezoneHasChanged) return;

    const { latitude, longitude, timezone } = coordsWithTimezone;

    lastTimezoneRef.current = timezone;

    getHourlyWeather({ latitude, longitude, timezone });

    if (!isHourlyWeatherLoading) {
      const currentDate = getCurrentDateInTimezone(timezone);
      const formattedDate = formatDateToPortuguese(currentDate);

      const isSameTimezone = timezone === tabulationDay?.timezone;
      const image = isSameTimezone ? tabulationDay?.image ?? "" : ""; // reseta imagem se timezone mudou

      // Cria payload completo
      const payload: TabulationDay = {
        id: uuidv4(),
        title: "Tabulação do Dia",
        content: "Previsão meteorológica por hora com base na localização.",
        current_date_full: formattedDate.full,
        current_date_short: formattedDate.short,
        latitude,
        longitude,
        timezone,
        image,
      };

      persistTabulation(payload); // persiste e sincroniza com o servidor
    }
  }, [coordsWithTimezone, isHourlyWeatherLoading, tabulationDay, isCoordsWithTimezoneLoading]);

  // Define localização para coordenadas atuais
  const useCurrentLocation = (): void => {
    getCoordsWithTimezone();
  };

  // Define localização manual (formulário)
  const submitManualLocation = (values: PartialLocationValues): void => {
    getCoordsWithTimezone(values);
  };

  // Tenta obter previsão novamente
  const retryGetHourlyWeather = (): void => {
    const { latitude, longitude, timezone } = coordsWithTimezone;
    const isValid = !!latitude && !!longitude && !!timezone;
    if (isValid) {
      getHourlyWeather({ latitude, longitude, timezone });
    }
  };

  // Persiste a tabulação e sincroniza com o servidor
  const persistTabulation = async (payload: TabulationDay) => {
    try {
      await postTabulationDay(payload);
      await getTabulationDay(); // Atualiza tela com dado mais recente
    } catch (error) {
      console.error("Erro ao persistir tabulação e sincronizar:", error);
    }
  };

  // Captura a imagem da tabulação e persiste no servidor
  const captureAndPersistTabulationImage = async (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!tabulationDay) return;

    await persistImageWithCanvas({
      ref,
      payload: tabulationDay,
      persistFn: persistTabulation,
      onSuccess: () =>
        showToast({ type: "success", message: "Tabulação capturada com sucesso!" }),
      onError: () =>
        showToast({
          type: "error",
          message: "Erro ao capturar tabulação!",
          description: "Tente novamente.",
        }),
    });
  };

  // Retorna todas as variáveis e funções úteis para o componente
  return {
    coordsWithTimezone,
    hourlyWeather,
    todayDate,
    isGeneralLoading,
    locationError,
    weatherError,
    useCurrentLocation,
    submitManualLocation,
    retryGetHourlyWeather,
    persistTabulation,
    captureAndPersistTabulationImage,
    tabulationDay,
    isLoadingTabulationDay,
  };
};
