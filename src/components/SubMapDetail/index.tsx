import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSubMapsContext } from "@hooks/useSubMapsContext";
import { ImageAnnotator } from "@components/ImageAnnotator";
import type { SubMap } from "@services/hooks/subMaps/types";
import type { Point } from "@components/ImageAnnotator/types";
import { usePatchSubMapById } from "@services/hooks/subMaps/usePatchSubMap";
import type { ScreenshotMarker } from "@services/hooks/generalMapSreenshots/types";
import { useScreenshotGeneralMapStorage } from "@hooks/useScreenshotGeneralMapStorage";
import { MainTitle } from "@components/MainTitle";

export const SubMapDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { subMaps, isSubMapsLoading } = useSubMapsContext();
  const { patchSubMapById } = usePatchSubMapById();
  const { saveNewScreenshot } = useScreenshotGeneralMapStorage();

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

  const onSnapshotReady = async (snapshot: ScreenshotMarker) => {
    if (subMap && subMap?.id === id) {
      saveNewScreenshot(snapshot);
    }
  };

  const onUpdateMarkersHistory = ({
    markers,
    markersHistory,
  }: {
    markers: Point[];
    markersHistory: Point[][];
  }) => {
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
      <MainTitle>Inspeção granular: {subMap.title}</MainTitle>
      {subMap.image && (
        <ImageAnnotator
          key={subMap.id}
          id={subMap.id}
          title={subMap.title}
          image={subMap.image}
          markers={markers}
          markersHistory={markerHistory}
          onUpdateMarkersHistory={onUpdateMarkersHistory}
          onSnapshotReady={onSnapshotReady}
          onUpdateImage={onUpdateImage}
        />
      )}
    </div>
  );
};
