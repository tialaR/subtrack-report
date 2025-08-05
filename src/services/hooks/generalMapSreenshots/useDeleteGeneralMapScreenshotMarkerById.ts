import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';

export const useDeleteGeneralMapScreenshotMarkerById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const deleteGeneralMapScreenshotMarkerById = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/general_map_screenshot_markers/${id}`);
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

  return { deleteGeneralMapScreenshotMarkerById, loading, error };
};
