import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { SubMap } from './types';

export const useGetSubMaps = () => {
  const [data, setData] = useState<SubMap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const getSubMaps = async () => {
    setLoading(true);
    try {
      const response = await api.get<SubMap[]>('/sub_maps');
      setData(response.data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao carregar sub-mapas';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao carregar sub-mapas.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { subMaps: data, loading, error, getSubMaps };
};
