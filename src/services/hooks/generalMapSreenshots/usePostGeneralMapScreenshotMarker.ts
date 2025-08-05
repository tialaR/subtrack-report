import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { ScreenshotMarker } from './types';

export const usePostGeneralMapScreenshotMarker = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const postGeneralMapScreenshotMarker = async (payload: ScreenshotMarker) => {
    setLoading(true);
    try {
      const response = await api.post<ScreenshotMarker>('/general_map_screenshot_markers', payload);
      showToast({
        type: 'success',
        message: 'Snapshot criado com sucesso!',
        description: 'Veja os detalhes na página de Mapa Geral.'
      });
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

  return { postGeneralMapScreenshotMarker, loading, error };
};
