import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { RecordDay } from './types';

export const useGetRecordsDay = () => {
  const [data, setData] = useState<RecordDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const getRecordsDay = async () => {
    setLoading(true);
    try {
      const response = await api.get<RecordDay[]>('/records_day');
      setData(response.data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao carregar registros do dia';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao carregar registros do dia.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { getRecordsDay, recordsDay: data, getRecordsDayLoading: loading, getRecordsDayError: error };
};
