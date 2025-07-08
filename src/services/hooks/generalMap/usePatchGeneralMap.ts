import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { GeneralMap } from './types';

export const usePatchGeneralMap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>("");
  const { showToast } = useToastInfo();

  const patch = async (id: string, payload: Partial<GeneralMap>) => {
    setLoading(true);
    try {
      const response = await api.patch<GeneralMap>(`/general_map/${id}`, payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao aplicar mudanças parciais.';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao aplicar mudanças parciais.',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { patch, loading, error };
};
