import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { TabulationDay } from './types';

export const usePostTabulationDay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const postTabulationDay = async (payload: TabulationDay) => {
    setLoading(true);
    try {
      const response = await api.post<TabulationDay>('/tabulation_day', payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao criar tabulação';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao criar tabulação.',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { postTabulationDay, loading, error };
};
