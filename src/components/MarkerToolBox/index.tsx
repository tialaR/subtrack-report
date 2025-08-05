import { useEffect, useRef, useState } from "react";
import { FiMove } from "react-icons/fi";
import type { MarkersOption, MarkerToolboxProps } from "./types";
import * as S from "./styles";

const MarkerToolbox: React.FC<MarkerToolboxProps> = ({
  markersOptions,
  onSelectMarker,
}) => {
  const [currentMarker, setCurrentMarker] = useState<MarkersOption | null>(
    null
  );
  const [toolbarPos, setToolbarPos] = useState({ x: 16, y: 60 });
  const [showToolbar, setShowToolbar] = useState(false);
  const [dragging, setDragging] = useState(false);

  const toolboxRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const lastMouseDown = useRef(0);
  const dragDistance = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    lastMouseDown.current = Date.now();
    dragDistance.current = 0;
    offset.current = {
      x: e.clientX - toolbarPos.x,
      y: e.clientY - toolbarPos.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !toolboxRef.current || !toolboxRef.current.parentElement)
      return;

    const parent = toolboxRef.current.parentElement;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;

    const deltaX = newX - toolbarPos.x;
    const deltaY = newY - toolbarPos.y;
    dragDistance.current += Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const container = parent.getBoundingClientRect();
    const toolbox = toolboxRef.current.getBoundingClientRect();

    const maxX = container.width - toolbox.width;
    const maxY = container.height - toolbox.height;

    setToolbarPos({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleToggleToolbar = () => {
    setShowToolbar((prev) => !prev);
  };

  return (
    <S.ToolbarWrapper
      onClick={(e) => e.stopPropagation()}
      title="Marcadores"
      ref={toolboxRef}
      style={{ left: toolbarPos.x, top: toolbarPos.y }}
    >
      <S.ToolbarWrapperButtons>
        <S.IconButton onMouseDown={handleMouseDown}>
          <FiMove />
        </S.IconButton>

        <S.ToolbarToggle onClick={handleToggleToolbar}>
          <div>
            Marcadores
            {currentMarker?.value && (
              <S.ColorDot
                style={{
                  backgroundColor: currentMarker?.value,
                  border: currentMarker?.value,
                }}
              />
            )}
          </div>
        </S.ToolbarToggle>
      </S.ToolbarWrapperButtons>

      {showToolbar && (
        <S.Toolbar>
          <S.LegendBox>
            {markersOptions?.map((markerOption) => (
              <S.ColorRow
                key={markerOption?.value}
                onClick={() => {
                  onSelectMarker(
                    currentMarker?.value === markerOption.value
                      ? currentMarker
                      : markerOption
                  );
                  setCurrentMarker((prev) =>
                    prev?.value === markerOption.value ? prev : markerOption
                  );
                }}
              >
                <S.ColorDot
                  style={{
                    backgroundColor: markerOption.value,
                    border:
                      currentMarker?.value === markerOption.value
                        ? "2px solid black"
                        : "1px solid #999",
                  }}
                />
                <S.ColorLabel>{markerOption.label}</S.ColorLabel>
              </S.ColorRow>
            ))}
          </S.LegendBox>
        </S.Toolbar>
      )}
    </S.ToolbarWrapper>
  );
};

export { MarkerToolbox };
