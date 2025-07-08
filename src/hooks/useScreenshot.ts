import { useState } from 'react';
import html2canvas from 'html2canvas';
import { useToastInfo } from '@hooks/useToastInfo';

export const useScreenshot = () => {
  const { showToast } =  useToastInfo();

  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const captureSnapshot = async (ref: React.RefObject<HTMLElement>) => {
    setLoading(true);

    try {
      const canvas = await html2canvas(ref.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2
      });
      const canvasDataUrl = canvas.toDataURL('image/png');
      setData(canvasDataUrl);
      showToast({
        type: "success",
        message: "Screenshot capturado com sucesso!",
      })
    } catch (err) {
      showToast({
        type: "error",
        message: "Erro ao capturar screenshot!",
        description: "Tente novamente."
      })
      console.error('Erro ao capturar screenshot:', err);
    } finally {
      setLoading(false);
    }
  };

  return { captureSnapshot, screenshot: data, screenshotLoading: loading };
}

