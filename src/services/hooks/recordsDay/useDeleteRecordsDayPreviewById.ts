import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';

export const useDeleteRecordsDayPreview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const deleteRecordsDayPreview = async () => {
    setLoading(true);
    try {
      const response = await api.get('/records_day_capture');
      const recordsDayPreview = response.data;

      for (const recordDayPreview of recordsDayPreview) {
        await api.delete(`/records_day_capture/${recordDayPreview.id}`);
      }
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

  return { deleteRecordsDayPreview, loading, error };
};
