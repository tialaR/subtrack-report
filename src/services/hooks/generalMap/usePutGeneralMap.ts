import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { GeneralMap } from './types';

export const usePutGeneralMap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>("");
  const { showToast } = useToastInfo();

  const update = async (id: string, payload: GeneralMap) => {
    setLoading(true);
    try {
      const response = await api.put<GeneralMap>(`/general_map/${id}`, payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao atualizar mapa.';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao atualizar mapa.',
        description: 'Verifique os dados enviados.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};
