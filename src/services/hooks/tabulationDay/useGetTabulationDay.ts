import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { TabulationDay } from './types';

export const useGetTabulationDay = () => {
  const [data, setData] = useState<TabulationDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get<TabulationDay[]>('/tabulation_day');
      setData(response.data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao carregar tabulação do dia';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao carregar tabulação do dia.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
