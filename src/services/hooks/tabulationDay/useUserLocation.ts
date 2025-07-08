import { useState } from "react";

type UserCoords = {
  latitude: number;
  longitude: number;
  timezone: string;
};

export const useUserLocation = () => {
  const [coords, setCoords] = useState<UserCoords | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      await new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timezone,
            });
            resolve();
          },
          (err) => {
            reject(new Error(err.message));
          }
        );
      });
    } catch (err: unknown) {
      let message = "Erro ao obter localização do navegador.";
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
    latitude: coords?.latitude ?? null,
    longitude: coords?.longitude ?? null,
    timezone: coords?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    loading,
    error,
    getLocation,
  };
};
