import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { SubMap } from './types';

export const usePostSubMap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const postSubMap = async (payload: SubMap) => {
    setLoading(true);
    try {
      const response = await api.post<SubMap>('/sub_maps', payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao criar sub-mapa';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao criar sub-mapa.',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { postSubMap, loading, error };
};
