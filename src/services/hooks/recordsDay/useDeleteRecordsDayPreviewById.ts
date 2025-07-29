import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';

export const useDeleteRecordsDayPreviewById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const deleteRecordsDayPreviewById = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/records_day_capture/${id}`);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao deletar o preview dos registros do dia';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao deletar o preview dos registros do dia.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteRecordsDayPreviewById, loading, error };
};
