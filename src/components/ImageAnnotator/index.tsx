import { useEffect, useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import { MarkerToolbox } from "@components/MarkerToolBox";
import { MainDescription } from "@components/MainDescription";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import type { ImageAnnotatorProps, Point, MarkerOption, ImageAnnotatorData } from "./types";
import * as S from "./styles";

export const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({
  id,
  title,
  image,
  markers,
  updateMarkers,
  onSnapshotReady,
}) => {
  const [scale, setScale] = useState(1);
  const [history, setHistory] = useState<Point[][]>([]);
  const [redoStack, setRedoStack] = useState<Point[][]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerOption | null>(null);
  const [isToolbarHidden, setIsToolbarHidden] = useState(false);
  const [manualHide, setManualHide] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

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

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setIsToolbarHidden(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsToolbarHidden(false), 1200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pushToHistory = useCallback(
    (newPoints: Point[]) => {
      setHistory((prev) => [...prev, markers]);
      setRedoStack([]);
      updateMarkers(newPoints);
    },
    [markers, updateMarkers]
  );

  const undoAction = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setRedoStack((r) => [markers, ...r]);
    updateMarkers(last);
    setHistory((h) => h.slice(0, -1));
  }, [history, markers, updateMarkers]);

  const redoAction = useCallback(() => {
    if (redoStack.length === 0) return;
    const [next, ...rest] = redoStack;
    setHistory((h) => [...h, markers]);
    updateMarkers(next);
    setRedoStack(rest);
  }, [redoStack, markers, updateMarkers]);

  const clearMarkers = useCallback(() => pushToHistory([]), [pushToHistory]);

  const handleSnapshot = useCallback(async () => {
    if (!renderAreaRef.current || markers.length === 0) return;

    const container = renderAreaRef.current.getBoundingClientRect();
    const marginX = 80;
    const marginY = 80;

const minX = Math.max(
      0,
      Math.min(...markers.map((p) => p.x)) * scale - marginX
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

    const snapshot: ImageAnnotatorData = {
      id: id || uuidv4(),
      x: minX,
      y: minY,
      rotation: 0,
      snapshotImg: dataURL,
      timestamp,
      isNewPosition: true,
    };

    onSnapshotReady(snapshot);
  }, [markers, scale, id, onSnapshotReady]);

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
    if (isDragging.current && containerRef.current && lastMousePosition.current) {
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
    if (!selectedMarker?.value || !imageElementRef.current || !renderAreaRef.current) return;

    const zoomRect = renderAreaRef.current.getBoundingClientRect();
    const offsetX = containerRef.current
      ? (e.clientX - zoomRect.left + containerRef.current.scrollLeft) / scale
      : 0;
    const offsetY = containerRef.current
      ? (e.clientY - zoomRect.top + containerRef.current.scrollTop) / scale
      : 0;

    if (offsetX < 0 || offsetY < 0 || offsetX > imageSize.width || offsetY > imageSize.height) return;

    const radius = 8;
    const index = markers.findIndex(
      (p) => Math.abs(p.x - offsetX) < radius && Math.abs(p.y - offsetY) < radius
    );

    const newPoints =
      index !== -1
        ? markers.filter((_, i) => i !== index)
        : [...markers, { x: offsetX, y: offsetY, color: selectedMarker.value }];

    pushToHistory(newPoints);
  };

  return (
    <>
      <MainDescription>
        {`${title.toLocaleUpperCase()} DE LOCALIZAÇÃO – DETALHAMENTO DOS LOCAIS INSPECIONADOS`}
      </MainDescription>

      <S.FloatingToolbarWrapper>
        <S.ToggleButtonArea>
          <ButtonIcon
            size="large"
            isToggle
            title={manualHide ? "Mostrar barra de ferramentas" : "Ocultar barra de ferramentas"}
            variant={manualHide ? "filled" : "outlined"}
            iconType={manualHide ? "chevronsRight" : "chevronsLeft"}
            onClick={() => setManualHide((prev) => !prev)}
          />
        </S.ToggleButtonArea>

        <S.FloatingToolbar $hidden={isToolbarHidden || manualHide}>
          <Button title="Zoom In" variant="secondary" iconType="zoomIn" showIcon onClick={zoomIn}>
            Zoom In
          </Button>
          <Button title="Zoom Out" variant="secondary" iconType="zoomOut" showIcon onClick={zoomOut}>
            Zoom Out
          </Button>
          <Button title="Resetar Zoom" variant="secondary" iconType="rotate" showIcon onClick={resetZoom}>
            Reset Zoom
          </Button>
          <Button title="Desfazer Ação" variant="secondary" iconType="cornerBack" showIcon onClick={undoAction}>
            Desfazer
          </Button>
          <Button title="Refazer Ação" variant="secondary" iconType="cornerForward" showIcon onClick={redoAction}>
            Refazer
          </Button>
          <Button title="Limpar Marcadores" variant="secondary" iconType="deleteAlt" showIcon onClick={clearMarkers}>
            Limpar Marcadores
          </Button>
          <Button title="Capturar Snapshot" variant="secondary" iconType="camera" showIcon onClick={handleSnapshot}>
            Capturar Snapshot
          </Button>
        </S.FloatingToolbar>
      </S.FloatingToolbarWrapper>

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

            <MarkerToolbox
              markersOptions={[]}
              onSelectMarker={(selectMarker) =>
                setSelectedMarker((prev) =>
                  prev?.value === selectMarker.value ? prev : selectMarker
                )
              }
            />
          </S.ZoomWrapper>
        </S.ImageContainer>
      </S.ImageAnnotatorWrapper>
    </>
  );
};
