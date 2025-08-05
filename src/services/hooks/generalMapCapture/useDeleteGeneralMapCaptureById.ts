import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';

export const useDeleteGeneralMapCaptureById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const deleteGeneralMapCaptureById = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/general_map_capture/${id}`);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao deletar mapa geral!';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao deletar mapa geral!',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteGeneralMapCaptureById, loading, error };
};
