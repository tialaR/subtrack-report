import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { TabulationDay } from './types';

export const usePutTabulationDay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const update = async (id: string, payload: TabulationDay) => {
    setLoading(true);
    try {
      const response = await api.put<TabulationDay>(`/tabulation_day/${id}`, payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao atualizar tabulação';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao atualizar tabulação.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};
