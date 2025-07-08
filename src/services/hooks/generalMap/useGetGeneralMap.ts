import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { GeneralMap } from './types';

export const useGetGeneralMap = () => {
  const [data, setData] = useState<GeneralMap>({} as GeneralMap);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get<GeneralMap>('/general_map');
      setData(response.data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao buscar dados do mapa geral.';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao buscar dados do mapa geral.',
        description: 'Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
