import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { RecordDayPreview } from './types';

export const usePostRecordsDayPreview = () => {
  const { showToast } = useToastInfo();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');

  const postRecordDayPreview = async (payload: RecordDayPreview) => {
    setLoading(true);
    try {
      await api.post('/records_day_capture', payload);
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

  return { postRecordDayPreview, loading, error };
};
