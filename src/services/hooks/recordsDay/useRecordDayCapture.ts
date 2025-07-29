import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { persistImageWithCanvas } from "@utils/persistImageHelper";
import { useToastInfo } from "@hooks/useToastInfo";
import { usePostRecordsDayPreview } from "@services/hooks/recordsDay/usePostRecordsDayPreview";

export const useRecordDayCapture = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToastInfo();
  const { postRecordDayPreview } = usePostRecordsDayPreview();
  const [hasPersisted, setHasPersisted] = useState(false);

  const handlePersist = async () => {
    const payload = {
      id: uuidv4(),
      generated_at: new Date().toLocaleString("pt-BR"),
    };

    await persistImageWithCanvas({
      ref: containerRef,
      payload,
      persistFn: (data) => postRecordDayPreview(data),
      onSuccess: () => {
        showToast({ type: "success", message: "Registros do dia capturados com sucesso!" });
        setHasPersisted(true);
      },
      onError: () => {
        showToast({
          type: "error",
          message: "Erro ao capturar registros do dia!",
          description: "Tente novamente.",
        });
      },
    });

  };

  return {
    hasPersisted,
    containerRef,
    handlePersist,
  };
};