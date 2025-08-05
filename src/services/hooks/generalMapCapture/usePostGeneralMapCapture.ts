import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { ScreenshoGeneralMap } from './types';

export const usePostGeneralMapCapture = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const postGeneralMapCapture = async (payload: ScreenshoGeneralMap) => {
    setLoading(true);
    try {
      const response = await api.post('/general_map_capture', payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao criar mapa geral!';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao criar mapa gera!',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { postGeneralMapCapture, loading, error };
};
