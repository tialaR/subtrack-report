import { useEffect, useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import { MarkerToolbox } from "@components/MarkerToolBox";
import { MainDescription } from "@components/MainDescription";
import { Button } from "@components/Button";
import { markersOptions } from "@utils/marker";
import { delay } from "@utils/delayHelper";
import type { ScreenshotMarker } from "@services/hooks/generalMapSreenshots/types";
import type { ImageAnnotatorProps, Point, MarkerOption } from "./types";
import * as S from "./styles";
import { StyleHeaderPageWrapper } from "@styles/StyleComponets";
import { TogglePanel } from "../TogglePanel";

export const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({
  id,
  title,
  image,
  markers,
  markersHistory,
  onUpdateMarkersHistory,
  onSnapshotReady,
  onUpdateImage,
}) => {
  const [scale, setScale] = useState(1);
  const [history, setHistory] = useState<Point[][]>([]);
  const [redoStack, setRedoStack] = useState<Point[][]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerOption | null>(
    null
  );
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [hideToolbox, setHideToolbox] = useState(false);

  const renderAreaRef = useRef<HTMLDivElement | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const lastMousePosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (imageElementRef.current) {
      const img = imageElementRef.current as HTMLImageElement;
      const handleLoad = () =>
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      if (img.complete) handleLoad();
      else {
        img.addEventListener("load", handleLoad);
        return () => img.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  const pushToHistory = useCallback((newPoints: Point[]) => {
    setHistory((prev): Point[][] => {
      onUpdateMarkersHistory({
        markers: newPoints,
        markersHistory: [...prev, newPoints || []],
      });

      return [...prev, newPoints || []];
    });
    setRedoStack((redo): Point[][] => {
      return [newPoints, ...redo];
    });
  }, []);

  const initializedRef = useRef(false);

  useEffect(() => {
    const hasValidHistory = markersHistory && markersHistory.length > 0;
    const hasValidMarkers = markers && markers.length > 0;

    if (initializedRef.current || (!hasValidHistory && !hasValidMarkers))
      return;

    initializedRef.current = true;

    const initialHistory = hasValidHistory ? markersHistory : [[...markers]];
    setHistory(initialHistory);
    setRedoStack([]); // inicia redo vazio ao montar
    onUpdateMarkersHistory({
      markers,
      markersHistory: initialHistory,
    });
  }, [markers, markersHistory, onUpdateMarkersHistory]);

  const undoAction = useCallback(() => {
    if ([markersHistory].length === 0) return;

    const newRedoStack = [markers, ...redoStack];
    const newHistory = history.slice(0, -1);
    const newMarkers = history[history.length - 2];

    setRedoStack(newRedoStack);
    setHistory(newHistory);

    // Atualiza backend imediatamente
    onUpdateMarkersHistory({
      markers: newMarkers,
      markersHistory: newHistory,
    });
  }, [history, redoStack, markers, onUpdateMarkersHistory]);

  const redoAction = useCallback(() => {
    if (redoStack.length === 0) return;

    const [next, ...rest] = redoStack;
    const newHistory = [...history, next];

    setHistory(newHistory);
    setRedoStack(rest);

    // Atualiza backend imediatamente
    onUpdateMarkersHistory({
      markers: next,
      markersHistory: newHistory,
    });
  }, [redoStack, history, onUpdateMarkersHistory]);

  const clearMarkers = useCallback(() => pushToHistory([]), [pushToHistory]);

  const handleSnapshot = useCallback(async () => {
    if (!renderAreaRef.current || (markers && markers?.length === 0)) return;

    const container = renderAreaRef.current.getBoundingClientRect();
    const marginX = 80;
    const marginY = 80;

    const minX = Math.max(
      0,
      Math.min(...markers?.map((p) => p.x)) * scale - marginX
    );
    const minY = Math.max(
      0,
      Math.min(...markers.map((p) => p.y)) * scale - marginY
    );
    const maxX = Math.min(
      container.width,
      Math.max(...markers.map((p) => p.x)) * scale + marginX
    );
    const maxY = Math.min(
      container.height,
      Math.max(...markers.map((p) => p.y)) * scale + marginY
    );

    setHideToolbox(true); // Esconde toolbox
    await delay(100); // Espera o DOM atualizar

    const canvas = await html2canvas(renderAreaRef.current, {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
      backgroundColor: null,
      scale: 1,
    });

    const dataURL = canvas.toDataURL();
    const timestamp = Date.now();

    const snapshot: ScreenshotMarker = {
      id: uuidv4(),
      title: title,
      x: minX,
      y: minY,
      rotation: 0,
      image: dataURL,
      timestamp,
      is_new_position: true,
    };

    onSnapshotReady(snapshot);

    setHideToolbox(false); // Restaura toolbox
  }, [markers, title, scale, onSnapshotReady]);

  const handleUpdateImage = useCallback(async () => {
    if (!renderAreaRef.current || markers.length === 0) return;

    setHideToolbox(true); // Esconde toolbox
    await delay(100); // Espera o DOM atualizar

    const canvas = await html2canvas(renderAreaRef.current, {
      backgroundColor: null,
      scale: 1,
    });

    const dataURL = canvas.toDataURL();

    const snapshotImg = dataURL;
    onUpdateImage({ image: snapshotImg });

    setHideToolbox(false); // Restaura toolbox
  }, [markers, id, onUpdateImage]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setScale(1);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedMarker) {
      isDragging.current = true;
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      isDragging.current &&
      containerRef.current &&
      lastMousePosition.current
    ) {
      const dx = e.clientX - lastMousePosition.current.x;
      const dy = e.clientY - lastMousePosition.current.y;
      containerRef.current.scrollLeft -= dx;
      containerRef.current.scrollTop -= dy;
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    lastMousePosition.current = null;
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !selectedMarker?.value ||
      !imageElementRef.current ||
      !renderAreaRef.current
    )
      return;

    const zoomRect = renderAreaRef.current.getBoundingClientRect();
    const offsetX = containerRef.current
      ? (e.clientX - zoomRect.left + containerRef.current.scrollLeft) / scale
      : 0;
    const offsetY = containerRef.current
      ? (e.clientY - zoomRect.top + containerRef.current.scrollTop) / scale
      : 0;

    if (
      offsetX < 0 ||
      offsetY < 0 ||
      offsetX > imageSize.width ||
      offsetY > imageSize.height
    )
      return;

    const radius = 8;
    const index = markers.findIndex(
      (p) =>
        Math.abs(p.x - offsetX) < radius && Math.abs(p.y - offsetY) < radius
    );

    const newPoints =
      index !== -1
        ? markers.filter((_, i) => i !== index)
        : [
            ...markers,
            {
              id: uuidv4(),
              x: offsetX,
              y: offsetY,
              color: selectedMarker.value,
            },
          ];

    pushToHistory(newPoints);
  };

  return (
    <>
      <StyleHeaderPageWrapper>
        <MainDescription>
          {`${title.toLocaleUpperCase()} DE LOCALIZAÇÃO – DETALHAMENTO DOS LOCAIS INSPECIONADOS`}
        </MainDescription>

        <TogglePanel>
          <Button
            title="Zoom In"
            variant="secondary"
            iconType="zoomIn"
            showIcon
            onClick={zoomIn}
          >
            Zoom In
          </Button>
          <Button
            title="Zoom Out"
            variant="secondary"
            iconType="zoomOut"
            showIcon
            onClick={zoomOut}
          >
            Zoom Out
          </Button>
          <Button
            title="Resetar Zoom"
            variant="secondary"
            iconType="rotate"
            showIcon
            onClick={resetZoom}
          >
            Reset Zoom
          </Button>
          <Button
            title="Desfazer Ação"
            variant="secondary"
            iconType="cornerBack"
            showIcon
            onClick={undoAction}
          >
            Desfazer
          </Button>
          <Button
            title="Refazer Ação"
            variant="secondary"
            iconType="cornerForward"
            showIcon
            onClick={redoAction}
          >
            Refazer
          </Button>
          <Button
            title="Limpar Marcadores"
            variant="secondary"
            iconType="deleteAlt"
            showIcon
            onClick={clearMarkers}
          >
            Limpar Marcadores
          </Button>
          <Button
            title="Capturar Snapshot"
            variant="secondary"
            iconType="camera"
            showIcon
            onClick={handleSnapshot}
          >
            Capturar Snapshot
          </Button>
          <Button
            title="Salvar Atualizações"
            variant="secondary"
            iconType="upload"
            showIcon
            onClick={handleUpdateImage}
          >
            Salvar Atualizações
          </Button>
        </TogglePanel>
      </StyleHeaderPageWrapper>

      <S.ImageAnnotatorWrapper
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <S.ImageContainer>
          <S.ZoomWrapper
            ref={renderAreaRef}
            $width={imageSize.width}
            $height={imageSize.height}
            $scale={scale}
            $isSelecting={!!selectedMarker?.value}
            onClick={handleImageClick}
          >
            <img
              ref={imageElementRef}
              src={image}
              alt="Mapa da imagem para marcadores"
            />

            {markers?.map((point, i) => (
              <S.Marker
                key={i}
                style={{
                  left: point.x * scale,
                  top: point.y * scale,
                  backgroundColor: point.color,
                }}
              />
            ))}

            {!hideToolbox && (
              <MarkerToolbox
                markersOptions={markersOptions}
                onSelectMarker={(selectMarker) =>
                  setSelectedMarker((prev) =>
                    prev?.value === selectMarker.value ? prev : selectMarker
                  )
                }
              />
            )}
          </S.ZoomWrapper>
        </S.ImageContainer>
      </S.ImageAnnotatorWrapper>
    </>
  );
};
