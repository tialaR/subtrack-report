import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';

export const useDeleAllteGeneralMapScreenshotMarkers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const deleteAllGeneralMapScreenshotMarkers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/general_map_screenshot_markers');
      const screenshots = response.data;

      for (const screenshot of screenshots) {
        await api.delete(`/general_map_screenshot_markers/${screenshot.id}`);
      }
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao deletar marcador';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao deletar marcador.',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteAllGeneralMapScreenshotMarkers, loading, error };
};
