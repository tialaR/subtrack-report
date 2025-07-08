import { ImageAnnotator } from "@components/ImageAnnotator";
import { markersOptions } from "@utils/marker";
import { useSnapshotStorage } from "@hooks/useSnapshotStorage";
import { useToastInfo } from "@hooks/useToastInfo";
import type { SubMapProps } from "./types";

const SubMap: React.FC<SubMapProps> = ({ imageSrc, title }) => {
  const { saveSingleSnapshot } = useSnapshotStorage();
  const { showToast } = useToastInfo();

  return (
    <ImageAnnotator
      imageSrc={imageSrc}
      markersOptions={markersOptions}
      onSnapshotReady={(data) => {
        try {
          saveSingleSnapshot({ snapshotItem: data, title });
          showToast({
            type: "success",
            message: "Snapshot salvo com sucesso!",
            description: `O marcador do ${title} foi adicionado ao mapa.`,
          });
        } catch {
          showToast({
            type: "error",
            message: "Erro ao salvar snapshot",
            description: `Tente novamente para o ${title}.`,
          });
        }
      }}
    />
  );
};

export { SubMap };
