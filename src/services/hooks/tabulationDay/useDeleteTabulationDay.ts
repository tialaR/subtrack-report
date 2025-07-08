import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';

export const useDeleteTabulationDay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const remove = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/tabulation_day/${id}`);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao deletar tabulação';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao deletar tabulação.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};
