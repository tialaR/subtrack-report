import { useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@services/api';
import { useToastInfo } from '@hooks/useToastInfo';

export const useDeleteAllGeneralMapCaptures = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string>('');
  const { showToast } = useToastInfo();

  const deleteAllGeneralMapCaptures = async () => {
    setLoading(true);
    try {
      const response = await api.get('/general_map_capture');
      const mapsCapture = response.data;

      for (const mapCapture of mapsCapture) {
        await api.delete(`/general_map_capture/${mapCapture.id}`);
      }
    } catch (err: unknown | AxiosError) {
      const message = err instanceof AxiosError ? err : 'Erro ao mapas gerais!';
      setError(message);
      showToast({
        type: 'error',
        message: 'Erro ao deletar mapas gerais!',
        description: 'Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteAllGeneralMapCaptures, loading, error };
};
