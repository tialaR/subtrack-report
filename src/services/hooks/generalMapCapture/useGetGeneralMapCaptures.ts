import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { ScreenshoGeneralMap } from './types';

export const useGetGeneralMapCaptures = () => {
  const [data, setData] = useState<ScreenshoGeneralMap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const getGeneralMapCaptures = async () => {
    setLoading(true);
    try {
      const response = await api.get<ScreenshoGeneralMap[]>('/general_map_capture');
      setData(response.data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao carregar mapa geral!';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao carregar mapa geral!',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getGeneralMapCaptures };
};
