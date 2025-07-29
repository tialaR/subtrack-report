/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas from "html2canvas";

type PersistImageOptions = {
  ref: React.RefObject<HTMLDivElement | null>;
  payload: any;
  persistFn: (data: any) => Promise<void>;
  onSuccess?: () => void;
  onError?: (err: any) => void;
}

export async function persistImageWithCanvas({
  ref,
  payload,
  persistFn,
  onSuccess,
  onError,
}: PersistImageOptions) {
  if (!ref.current) return;

  try {
    const canvas = await html2canvas(ref.current, {
      useCORS: true,
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const image = canvas.toDataURL("image/png");
    const newPayload = { ...payload, image };

    await persistFn(newPayload);
    onSuccess?.();
  } catch (err) {
    console.error("Erro ao gerar ou persistir imagem: ", err);
    onError?.(err);
  }
}
