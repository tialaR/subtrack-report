import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';

export const useDeleteRecordDayById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const deleteRecordDayById = async (recordId: string) => {
    setLoading(true);
    try {
      await api.delete(`/records_day/${recordId}`);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao deletar imagem';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao deletar imagem.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteRecordDayById, loading, error };
};
