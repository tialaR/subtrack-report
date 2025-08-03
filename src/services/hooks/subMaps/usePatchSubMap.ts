import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { SubMap } from './types';

export const usePatchSubMapById = () => {
  const [data, setData] = useState<SubMap>({} as SubMap);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const patchSubMapById = async (id: string, payload: Partial<SubMap>) => {
    setLoading(true);
    try {
      const response = await api.patch<SubMap>(`/sub_maps/${id}`, payload);
      return response.data;
      setData(data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao atualizar parcialmente';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao atualizar parcialmente.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { patchSubMapById, data, loading, error };
};
