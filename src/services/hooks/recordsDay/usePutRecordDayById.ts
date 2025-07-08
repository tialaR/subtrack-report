import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { RecordDay } from './types';

export const usePutRecordDayById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const putRecordDayById = async ({ id, payload }: { id: string, payload: RecordDay }) => {
    setLoading(true);
    try {
      const response = await api.put<RecordDay>(`/records_day/${id}`, payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao atualizar registro';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao atualizar registro.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { putRecordDayById, putRecordDayLoading: loading, putRecordDayError: error };
};
