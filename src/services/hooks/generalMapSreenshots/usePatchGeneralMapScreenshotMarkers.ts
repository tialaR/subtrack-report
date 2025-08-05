import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';
import type { ScreenshotMarker } from './types';

export const usePatchGeneralMapScreenshotMarkers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const patch = async (id: string, payload: Partial<ScreenshotMarker>) => {
    setLoading(true);
    try {
      const response = await api.patch<ScreenshotMarker>(`/general_map_screenshot_markers/'${id}`, payload);
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

  return { patch, loading, error };
};
