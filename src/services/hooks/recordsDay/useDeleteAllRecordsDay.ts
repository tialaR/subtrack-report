import { useState } from "react";
import { AxiosError } from 'axios';
import { useToastInfo } from "@hooks/useToastInfo";
import { api } from "@services/api";

export const useDeleteAllRecordsDay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const deleteAllRecordsDay = async () => {
    setLoading(true);
    try {
      const response = await api.get('/records_day');
      const records = response.data;

      for (const record of records) {
        await api.delete(`/records_day/${record.id}`);
      }
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao deletar todas as imagens';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao excluir todas as imagens.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteAllRecordsDay, loading, error };
};
