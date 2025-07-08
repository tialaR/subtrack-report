import { useEffect, useState } from 'react';

type UserLocation = {
  latitude: number | null;
  longitude: number | null;
  timezone: string;
  loading: boolean;
  error: string | null;
};

export const useUserLocation = (): UserLocation => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoading(false);
      },
      err => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  return { latitude, longitude, timezone, loading, error };
};
