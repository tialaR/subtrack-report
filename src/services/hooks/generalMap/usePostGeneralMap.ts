import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '../../api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { GeneralMap } from './types';

export const usePostGeneralMap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>("");
  const { showToast } = useToastInfo();

  const create = async (payload: Omit<GeneralMap, 'id'>) => {
    setLoading(true);
    try {
      const response = await api.post<GeneralMap>('/general_map', payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao criar mapa.';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao criar mapa.',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};
