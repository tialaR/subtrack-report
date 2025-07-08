import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { RecordDay } from './types';

export const usePatchRecordDay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const patchRecordDay = async ({ id, payload }: { id: string, payload: Partial<RecordDay> }) => {
    setLoading(true);
    try {
      const response = await api.patch<RecordDay>(`/records_day/${id}`, payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao atualizar parcialmente';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao atualizar parcialmente.',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { patchRecordDay, loading, error };
};
