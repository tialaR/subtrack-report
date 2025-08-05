import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { SubMap } from './types';

export const usePutSubMapById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const putSubMapById = async (id: string, payload: SubMap) => {
    setLoading(true);
    try {
      const response = await api.put<SubMap>(`/submaps/${id}`, payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao atualizar submapa';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao atualizar submapa.',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { putSubMapById, loading, error };
};
