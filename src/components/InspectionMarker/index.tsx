import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';
import { FiMove, FiCamera } from 'react-icons/fi';
import * as S from './styles';

const colors = [
  { label: 'Estaca Concluída – Sem Patologia', value: '#8BC34A' },
  { label: 'Estaca Não Concluída – Sem Patologia', value: '#DCEDC8' },
  { label: 'Estaca Não Concluída – Com Patologia', value: '#FFC107' },
  { label: 'Estaca Concluída – Com Patologia', value: '#F44336' }
];

type Point = {
  x: number;
  y: number;
  color: string;
};

type InspectionMarkerProps = {
  setImage: string;
};

const InspectionMarker: React.FC<InspectionMarkerProps> = ({ setImage }) => {
  const location = useLocation();

  const [showToolbar, setShowToolbar] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);

  const [toolbarPos, setToolbarPos] = useState({ x: 16, y: 60 });
  const [dragging, setDragging] = useState(false);

  const renderAreaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const wasDragged = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedColor || !imageRef.current) return;

    // Clique fora da imagem
    if (
      !imageRef.current.isSameNode(e.target as Node) &&
      !(e.target instanceof HTMLImageElement)
    ) return;

    const { left, top } = imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const radius = 8;
    const index = points.findIndex(
      (p) => Math.abs(p.x - x) < radius && Math.abs(p.y - y) < radius
    );

    if (index !== -1) {
      setPoints(points.filter((_, i) => i !== index));
    } else {
      setPoints([...points, { x, y, color: selectedColor }]);
    }
  };

  const handleMouseDownToolbar = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    wasDragged.current = false;
    offset.current = {
      x: e.clientX - toolbarPos.x,
      y: e.clientY - toolbarPos.y
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !imageRef.current || !toolbarRef.current) return;

    wasDragged.current = true;

    const container = imageRef.current.getBoundingClientRect();
    const toolbar = toolbarRef.current.getBoundingClientRect();

    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;

    const maxX = container.width - toolbar.width;
    const maxY = container.height - toolbar.height;

    setToolbarPos({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const saveSnapshot = async () => {
    if (!renderAreaRef.current || points.length === 0) return;

    const container = renderAreaRef.current.getBoundingClientRect();
    const marginX = 80;
    const marginY = 80;

    const minX = Math.max(0, Math.min(...points.map(p => p.x)) - marginX);
    const minY = Math.max(0, Math.min(...points.map(p => p.y)) - marginY);
    const maxX = Math.min(container.width, Math.max(...points.map(p => p.x)) + marginX);
    const maxY = Math.min(container.height, Math.max(...points.map(p => p.y)) + marginY);

    const canvas = await html2canvas(renderAreaRef.current, {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
      backgroundColor: null
    });

    const dataURL = canvas.toDataURL();
    const pathParts = location.pathname.split('/');
    const lastSegment = pathParts[pathParts.length - 1];
    const routeKey = `@subtrack-report:snapshot-${lastSegment}`;
    localStorage.setItem(routeKey, dataURL);
  };

  return (
    <S.Wrapper>
      <S.SaveButton onClick={saveSnapshot}>
        Salvar snapshot <FiCamera />
      </S.SaveButton>
      <S.ImageContainer ref={imageRef} onClick={handleImageClick}>
        <div ref={renderAreaRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img src={setImage} alt="Imagem de inspeção" />

          {points.map((p, i) => (
            <S.Marker
              key={i}
              style={{
                left: p.x,
                top: p.y,
                backgroundColor: p.color
              }}
            />
          ))}

          <S.ToolbarWrapper
            ref={toolbarRef}
            style={{ left: toolbarPos.x, top: toolbarPos.y }}
          >
            <S.ToolbarToggle
              onMouseDown={handleMouseDownToolbar}
              onClick={() => {
                if (!wasDragged.current) setShowToolbar(prev => !prev);
              }}
            >
              <div>
                <FiMove /> Marcadores
                {selectedColor && (
                  <S.ColorDot
                    style={{
                      backgroundColor: selectedColor,
                      border: selectedColor
                    }}
                  />
                )}
              </div>
            </S.ToolbarToggle>

            {showToolbar && (
              <S.Toolbar>
                <S.LegendBox>
                  {colors.map((c) => (
                    <S.ColorRow
                      key={c.value}
                      onClick={() =>
                        setSelectedColor((prev) => (prev === c.value ? null : c.value))
                      }
                    >
                      <S.ColorDot
                        style={{
                          backgroundColor: c.value,
                          border: selectedColor === c.value ? '2px solid black' : '1px solid #999'
                        }}
                      />
                      <S.ColorLabel>{c.label}</S.ColorLabel>
                    </S.ColorRow>
                  ))}
                </S.LegendBox>
              </S.Toolbar>
            )}
          </S.ToolbarWrapper>
        </div>
      </S.ImageContainer>
    </S.Wrapper>
  );
};

export { InspectionMarker };
