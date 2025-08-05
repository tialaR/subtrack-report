import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { SubMap } from './types';

export const useGetSubMaps = () => {
  const [data, setData] = useState<SubMap[]>([] as SubMap[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const getSubMaps = async () => {
    setLoading(true);
    try {
      const response = await api.get<SubMap[]>('/submaps');
      setData(response.data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao carregar submapas';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao carregar submapas.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { subMaps: data, loading, error, getSubMaps };
};
