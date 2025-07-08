import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { GeneralMapScreenshotMarker } from './types';

export const useGetGeneralMapScreenshotMarkers = () => {
  const [data, setData] = useState<GeneralMapScreenshotMarker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get<GeneralMapScreenshotMarker[]>('/general_map_screenshot_markers');
      setData(response.data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao carregar marcadores';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao carregar marcadores.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
