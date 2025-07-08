import { useState } from "react";
import { useUserLocation } from "@hooks/useUserLocation";
import { getCoordsByTimezone } from "@utils/tabulationHelper";

type UseWeatherLocationParams = {
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string | null;
};

type ResolvedLocation = {
  latitude: number;
  longitude: number;
  timezone: string;
};

export const useWeatherLocation = () => {
  const userLocation = useUserLocation();
  const [location, setLocation] = useState<ResolvedLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async (params?: UseWeatherLocationParams) => {
    setLoading(true);
    setError(null);

    try {
      // Caso tenha timezone manual
      if (params?.timezone && params?.timezone !== null && params?.latitude === null && params.longitude === null) {
        const coords = getCoordsByTimezone(params.timezone);
        if (coords) {
          setLocation({ ...coords, timezone: params.timezone });
          return;
        } else {
          throw new Error("Não foi possível obter coordenadas via timezone informado.");
        }
      }

      // Caso não tenha nenhum parâmetro, tenta localização automática
      await userLocation.getLocation();

      if (userLocation.latitude && userLocation.longitude) {
        setLocation({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          timezone: userLocation.timezone,
        });
        return;
      }

      // Se não conseguir pegar latitude, tenta pelo timezone automático
      if (userLocation.timezone) {
        const coords = getCoordsByTimezone(userLocation.timezone);
        if (coords) {
          setLocation({ ...coords, timezone: userLocation.timezone });
          return;
        }
      }

      throw new Error("Não foi possível resolver a localização.");
    } catch (err: unknown) {
      let message = "Erro ao resolver a localização.";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    latitude: location?.latitude ?? 0,
    longitude: location?.longitude ?? 0,
    timezone: location?.timezone ?? "",
    loading,
    error,
    getLocation,
  };
};
