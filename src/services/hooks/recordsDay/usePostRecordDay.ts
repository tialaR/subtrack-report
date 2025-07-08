import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { RecordDay } from './types';

export const usePostRecordDay = () => {
  const { showToast } = useToastInfo();
  
  const [data, setData] = useState<RecordDay>({} as RecordDay);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');

  const postRecordDay = async (payload: RecordDay) => {
    setLoading(true);
    try {
      const response = await api.post<RecordDay>('/records_day', payload);
      setData(response?.data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao criar registro';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao criar registro.',
        description: 'Verifique os dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { postRecordDay, updatedRecordDay: data, postRecordDayLoading: loading, postErrorRecordDay: error };
};
