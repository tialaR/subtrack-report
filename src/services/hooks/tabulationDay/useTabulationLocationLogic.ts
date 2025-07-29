import { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTodayHourlyWeather } from "./useTodayHourlyWeather";
import { useWeatherLocation } from "./useWeatherLocation";
import { usePostTabulationDay } from "@services/hooks/tabulationDay/usePostTabulationDay";
import { useGetTabulationDay } from "@services/hooks/tabulationDay/useGetTabulationDay";
import type { TabulationDay } from "@services/hooks/tabulationDay/types";
import type { PartialLocationValues } from "@pages/TabulationDay/types";
import { formatDateToPortuguese, getCurrentDateInTimezone } from "@utils/dateHelper";

export const useTabulationLocationLogic = () => {
  const [location, setLocation] = useState<PartialLocationValues | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasFetchedTabulation = useRef(false);
  const lastTimezoneRef = useRef<string | null>(null);

  const {
    coordsWithTimezone,
    loading: isCoordsWithTimezoneLoading,
    error: locationError,
    getCoordsWithTimezone,
  } = useWeatherLocation();

  const {
    hourlyWeather,
    todayDate,
    loading: isHourlyWeatherLoading,
    error: weatherError,
    getHourlyWeather,
  } = useTodayHourlyWeather();

  const {
    tabulationDay,
    loading: isLoadingTabulationDay,
    getTabulationDay,
  } = useGetTabulationDay();

  const {
    loading: isPostTabulationDayLoading,
    postTabulationDay,
  } = usePostTabulationDay();

  const isGeneralLoading = isCoordsWithTimezoneLoading || isHourlyWeatherLoading || isSwitching;

  /* Tenta buscar dados do json server no primeiro render */ 
  useEffect(() => {
    if (!hasFetchedTabulation.current) {
      const fetchInitialData = () => {
            getTabulationDay();
            hasFetchedTabulation.current = true;
      };
      fetchInitialData();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  /* Busca dados da api de coordenadas caso não dados no json server */ 
  useEffect(() => {
    //alert(JSON.stringify(tabulationDay))
    if (hasFetchedTabulation.current && tabulationDay.timezone && !isLoadingTabulationDay) {
        getCoordsWithTimezone({ timezone: tabulationDay.timezone });
        return;
    } 

    if (hasFetchedTabulation.current && !!tabulationDay.timezone && !isLoadingTabulationDay) {
        getCoordsWithTimezone();
        return;
    } 

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasFetchedTabulation.current, tabulationDay.timezone, isLoadingTabulationDay]);

   useEffect(() => {
    alert(JSON.stringify(coordsWithTimezone))

    const timezoneHasChanged = 
        coordsWithTimezone.timezone 
        && coordsWithTimezone.timezone !== lastTimezoneRef.current 
        && !isCoordsWithTimezoneLoading;

    if (!timezoneHasChanged) return;

    const { latitude, longitude, timezone } = coordsWithTimezone;

    lastTimezoneRef.current = timezone;

    setLocation({ latitude, longitude, timezone });
    getHourlyWeather({ latitude, longitude, timezone });

    if (!isHourlyWeatherLoading) {
        const currentDate = getCurrentDateInTimezone(timezone);
        const formattedDate = formatDateToPortuguese(currentDate);
        const payload: TabulationDay = {
            id: uuidv4(),
            title: "Tabulação do Dia",
            content: "Previsão meteorológica por hora com base na localização.",
            current_date: formattedDate,
            latitude,
            longitude,
            timezone,
            image: "",
        };
        if (tabulationDay?.image && coordsWithTimezone.timezone !== tabulationDay.timezone) {
            persistTabulation(payload);
        } else if (!tabulationDay?.image && coordsWithTimezone.timezone !== tabulationDay.timezone) {
            persistTabulation(payload);
        } else if (!tabulationDay?.image && coordsWithTimezone.timezone === tabulationDay.timezone) {
          persistTabulation(payload);
        } else if (tabulationDay?.image && coordsWithTimezone.timezone === tabulationDay.timezone) {
          persistTabulation({...payload, image: tabulationDay?.image});
        }
    } 
  }, [coordsWithTimezone, isHourlyWeatherLoading, tabulationDay, isPostTabulationDayLoading]);

  // useEffect(() => {
  //   if (!isPostTabulationDayLoading) getTabulationDay();
  // }, [isPostTabulationDayLoading]);

  const useCurrentLocation = (): void => {
    setIsSwitching(true);
    setLocation(null);
    getCoordsWithTimezone();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsSwitching(false), 600);
  };

  const submitManualLocation = (values: PartialLocationValues): void => {
    setIsSwitching(true);
    setLocation(values);
    getCoordsWithTimezone(values);
    //getHourlyWeather(values);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsSwitching(false), 600);
  };

  const retryGetHourlyWeather = (): void => {
    const { latitude, longitude, timezone } = coordsWithTimezone;
    const isValid = !!latitude && !!longitude && !!timezone;
    if (isValid) {
      getHourlyWeather({ latitude, longitude, timezone });
    }
  };

  const persistTabulation = async ({
    id,
    title,
    content,
    latitude,
    longitude,
    timezone,
    image,
    current_date,
  }: TabulationDay) => {
    try {
      await postTabulationDay({
        id,
        title,
        content,
        latitude,
        longitude,
        timezone,
        image,
        current_date,
      });

      await getTabulationDay();
    } catch (error) {
      console.error("Erro ao persistir tabulação e sincronizar:", error);
    }
  };

  return {
    coordsWithTimezone,
    hourlyWeather,
    todayDate,
    isGeneralLoading,
    isSwitching,
    locationError,
    weatherError,
    useCurrentLocation,
    submitManualLocation,
    retryGetHourlyWeather,
    persistTabulation,
    timeoutRef,
    tabulationDay,
    isLoadingTabulationDay,
  };
};
