import { ImageAnnotator } from "@components/ImageAnnotator";
import { useSnapshotStorage } from "@hooks/useSnapshotStorage";
import { useToastInfo } from "@hooks/useToastInfo";
import type { ImageAnnotatorData, Point } from "@components/ImageAnnotator/types";
import type { SubMapProps } from "./types";

const SubMap: React.FC<SubMapProps> = ({ id, title, image, markers }) => {
  const { saveSingleSnapshot } = useSnapshotStorage();
  const { showToast } = useToastInfo();

  const handleSnapshotReady = (data: ImageAnnotatorData) => {
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
  };

  const updateMarkers = (newMarkers: Point[]) => {
    // Aqui você pode implementar lógica para atualizar markers externamente se necessário.
    console.log("Markers atualizados:", newMarkers);
  };

  return (
    <ImageAnnotator
      id={id}
      image={image}
      title={title}
      markers={markers}
      updateMarkers={updateMarkers}
      onSnapshotReady={handleSnapshotReady}
    />
  );
};

export { SubMap };
