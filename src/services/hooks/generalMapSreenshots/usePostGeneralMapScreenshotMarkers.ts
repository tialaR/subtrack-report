import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { GeneralMapScreenshotMarker } from './types';

export const usePostGeneralMapScreenshotMarkers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const create = async (payload: Omit<GeneralMapScreenshotMarker, 'id'>) => {
    setLoading(true);
    try {
      const response = await api.post<GeneralMapScreenshotMarker>('/general_map_screenshot_markers', payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao criar marcador';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao criar marcador.',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};
