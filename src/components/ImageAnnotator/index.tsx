import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";
import {
  FiCamera,
  FiZoomIn,
  FiZoomOut,
  FiRotateCw,
  FiTrash2,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { MarkerToolbox } from "@components/MarkerToolBox";
import { MainDescription } from "@components/MainDescription";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { theme } from "@styles/theme";
import { usePersistentMarkers } from "@hooks/usePersistentMarkers";
import type { ImageAnnotatorProps, ImageAnnotatorData, Point, MarkerOption } from "./types";
import * as S from "./styles";

export const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({
  imageSrc,
  markersOptions,
  onSnapshotReady,
}) => {
  const { markerData, markers, updateMarkers } = usePersistentMarkers(
    imageSrc,
    "set-1",
    false
  );

  const [scale, setScale] = useState(1);
  const [history, setHistory] = useState<Point[][]>([]);
  const [redoStack, setRedoStack] = useState<Point[][]>([]);

  const [selectedMarker, setSelectedMarker] =
    useState<MarkerOption | null>(null);
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

    const imageAnnotatorData: ImageAnnotatorData = {
      id: markerData?.id || uuidv4(),
      x: minX,
      y: minY,
      rotation: 0,
      snapshotImg: dataURL,
      timestamp,
      isNewPosition: true,
    };

    onSnapshotReady(imageAnnotatorData);
  }, [markers, onSnapshotReady, scale, markerData]);

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
        : [...markers, { x: offsetX, y: offsetY, color: selectedMarker.value }];

    pushToHistory(newPoints);
  };

  return (
    <>
      <MainDescription>
        SUB MAPA DE LOCALIZAÇÃO – DETALHAMENTO DOS LOCAIS INSPECIONADOS
      </MainDescription>

      <S.FloatingToolbarWrapper>
        <S.ToggleButtonArea>
          <ButtonIcon
            icon={manualHide ? <FiChevronsRight /> : <FiChevronsLeft />}
            title={manualHide ? "Mostrar barra" : "Ocultar barra"}
            onClick={() => setManualHide((prev) => !prev)}
            size="large"
            iconType={manualHide ? "filled" : "outlined"}
            color={theme.colors.grey[900]}
          />
        </S.ToggleButtonArea>

        <S.FloatingToolbar $hidden={isToolbarHidden || manualHide}>
          <Button
            variant="secondary-with-icon"
            icon={<FiZoomIn />}
            onClick={zoomIn}
          >
            Zoom In
          </Button>
          <Button
            variant="secondary-with-icon"
            icon={<FiZoomOut />}
            onClick={zoomOut}
          >
            Zoom Out
          </Button>
          <Button
            variant="secondary-with-icon"
            icon={<FiRotateCw />}
            onClick={resetZoom}
          >
            Reset Zoom
          </Button>
          <Button
            variant="secondary-with-icon"
            icon={<FiCornerUpLeft />}
            onClick={undoAction}
          >
            Desfazer
          </Button>
          <Button
            variant="secondary-with-icon"
            icon={<FiCornerUpRight />}
            onClick={redoAction}
          >
            Refazer
          </Button>
          <Button
            variant="secondary-with-icon"
            icon={<FiTrash2 />}
            onClick={clearMarkers}
          >
            Limpar Marcadores
          </Button>
          <Button
            variant="secondary-with-icon"
            icon={<FiCamera />}
            onClick={handleSnapshot}
          >
            Salvar Snapshot
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
              src={imageSrc}
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
              markersOptions={markersOptions}
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
