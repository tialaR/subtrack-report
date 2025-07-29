import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { RecordDayPreview } from './types';

export const useGetRecordsDayPreview = () => {
  const [data, setData] = useState<RecordDayPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const getRecordsDayPreview = async () => {
    setLoading(true);
    try {
      const response = await api.get<RecordDayPreview[]>('/records_day_capture');
      setData(response.data);
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao carregar o preview dos registros do dia';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao carregar o preview dos registros do dia.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { getRecordsDayPreview, data, loading, error };
};
