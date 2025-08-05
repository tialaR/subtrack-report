import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';

export const useDeleteSubMapById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const deleteSubMapById = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/submaps/${id}`);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao deletar submapa';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao deletar submapa.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteSubMapById, loading, error };
};
