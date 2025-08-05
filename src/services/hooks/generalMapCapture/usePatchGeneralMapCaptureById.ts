import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { ScreenshoGeneralMap } from './types';

export const usePatchGeneralMapCaptureById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const patchGeneralMapCaptureById = async (id: string, payload: Partial<ScreenshoGeneralMap>) => {
    setLoading(true);
    try {
      const response = await api.patch<ScreenshoGeneralMap>(`/general_map_capture/${id}`, payload);
      return response.data;
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao atualizar parcialmente';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao atualizar parcialmente.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { patchGeneralMapCaptureById, loading, error };
};
