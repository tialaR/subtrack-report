import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { TabulationDay } from './types';

export const usePatchTabulationDay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const patch = async (id: string, payload: Partial<TabulationDay>) => {
    setLoading(true);
    try {
      const response = await api.patch<TabulationDay>(`/tabulation_day/${id}`, payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao atualizar parcialmente';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao atualizar parcialmente.',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { patch, loading, error };
};
