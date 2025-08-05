import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSubMapsContext } from "@hooks/useSubMapsContext";
import { usePatchGeneralMapScreenshotMarkers } from "@services/hooks/generalMapSreenshots/usePatchGeneralMapScreenshotMarkers";
import { usePostGeneralMapScreenshotMarkers } from "@services/hooks/generalMapSreenshots/usePostGeneralMapScreenshotMarkers";
import { ImageAnnotator } from "@components/ImageAnnotator";
import type { SubMap } from "@services/hooks/subMaps/types";
import type { Point } from "@components/ImageAnnotator/types";
import { usePatchSubMapById } from "@services/hooks/subMaps/usePatchSubMap";

export const SubMapDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { subMaps, isSubMapsLoading } = useSubMapsContext();
  const { patchSubMapById, data: subMapUpdated } = usePatchSubMapById();
  const { patch } = usePatchGeneralMapScreenshotMarkers();
  const { create } = usePostGeneralMapScreenshotMarkers();

  const [subMap, setSubMap] = useState<SubMap | null>(null);
  const [markers, setMarkers] = useState<Point[]>([]);
  const [markerHistory, setMarkerHistory] = useState<Point[][]>([]);

  useEffect(() => {
    const found = subMaps.find((s) => s.id === id);
    if (found) {
      setSubMap(found);
      setMarkers(found.markers || []);
      setMarkerHistory(found.marker_history || []);
    }
  }, [subMaps, id]);

  const onSnapshotReady = async (snapshot: any) => {
    if (!subMap) return;

    const payload = {
      ...snapshot,
      subMapId: subMap.id,
      title: subMap.title,
    };

    try {
      // 1. Salva o snapshot na rota geral
      await create(payload);

      // 2. Atualiza a imagem no objeto do subMap e persiste
      const updatedSubMap: SubMap = {
        ...subMap,
        image: snapshot.snapshotImg,
      };

      await patch(subMap?.id, payload);

      setSubMap(updatedSubMap);
      console.log("Snapshot salvo e subMap atualizado com sucesso");
    } catch (err) {
      console.error("Erro ao salvar snapshot e atualizar subMap:", err);
    }
  };

  const handleUpdateMarkersHistory = ({ markers, markersHistory }: { markers: Point[]; markersHistory: Point[][] }) => {
    if (subMap && subMap?.id === id) {
      const payload = {
        ...subMap,
        markers,
        marker_history: markersHistory,
      };
      setMarkers(markers);
      setMarkerHistory(markersHistory);
      patchSubMapById(subMap?.id, payload);
    }
  };

  const onUpdateImage = ({ image }: { image: string }) => {
    // Sempre que mudar de rota e houver markers, salva o estado atual no JSON Server
    if (subMap && subMap?.id === id) {
      const payload = {
        id: subMap?.id,
        image,
      };
      patchSubMapById(subMap?.id, payload);
      // TO-DO - Disparar mensagem de sucesso aqui
    }
  };

  if (isSubMapsLoading || !subMap) return <p>Carregando sub mapa...</p>;

  return (
    <div>
      <h1>{subMap.title}</h1>
      {subMap.image && (
        <ImageAnnotator
          key={subMap.id}
          id={subMap.id}
          title={subMap.title}
          image={subMap.image}
          markers={markers}
          markersHistory={markerHistory}
          onUpdateMarkersHistory={handleUpdateMarkersHistory}
          onSnapshotReady={onSnapshotReady}
          onUpdateImage={onUpdateImage}
        />
      )}
    </div>
  );
};
