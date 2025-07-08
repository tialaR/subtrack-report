import React, { useRef, useState, useEffect } from 'react';
import { FiRotateCcw, FiTrash } from 'react-icons/fi';
import * as S from './styles';

type SnapshotBubbleProps = {
  title: string;
  imageSrc: string;
  onRemove: () => void;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  initialOffsetIndex: number;
};

export const SnapshotBubble: React.FC<SnapshotBubbleProps> = ({
  title,
  imageSrc,
  onRemove,
  initialOffsetIndex,
  wrapperRef
}) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  // Posicao inicial do conjunto
  useEffect(() => {
  if (!wrapperRef.current) return;
  const wrapper = wrapperRef.current;

  const bubbleWidth = 160;
  const bubbleSpacing = 50; // espaço entre balões empilhados
  const x = wrapper.offsetWidth - bubbleWidth - 16; // 16px de margem da direita
  const y = 16 + initialOffsetIndex * bubbleSpacing; // empilha verticalmente

  setPosition({ x, y });
}, [wrapperRef, initialOffsetIndex]);



  const startDrag = (e: React.PointerEvent) => {
    if (!bubbleRef.current) return;
    setIsDragging(true);
    const rect = bubbleRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    bubbleRef.current.setPointerCapture(e.pointerId);
  };

  const onDrag = (e: PointerEvent) => {
    if (!isDragging || !wrapperRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const newX = e.clientX - wrapperRect.left - offset.current.x;
    const newY = e.clientY - wrapperRect.top - offset.current.y;

    const maxX = wrapperRect.width - (bubbleRef.current?.offsetWidth ?? 0);
    const maxY = wrapperRect.height - (bubbleRef.current?.offsetHeight ?? 0);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const stopDrag = (e: PointerEvent) => {
    setIsDragging(false);
    bubbleRef.current?.releasePointerCapture(e.pointerId);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 45) % 360);
  };

  useEffect(() => {
    window.addEventListener('pointermove', onDrag);
    window.addEventListener('pointerup', stopDrag);
    return () => {
      window.removeEventListener('pointermove', onDrag);
      window.removeEventListener('pointerup', stopDrag);
    };
  }, [isDragging]);

  return (
    <S.BubbleWrapper
      ref={bubbleRef}
      style={{ left: position.x, top: position.y }}
      $rotation={rotation}
      onPointerDown={startDrag}
    >
      <S.BubbleHeader>
        <span>{title}</span>
        <div>
          <S.IconButton
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleRotate}
            title="Girar"
          >
            <FiRotateCcw />
          </S.IconButton>

          <S.IconButton
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onRemove}
            title="Remover"
          >
            <FiTrash />
          </S.IconButton>
        </div>
      </S.BubbleHeader>

      <S.BubbleImage src={imageSrc} alt={title} />
    </S.BubbleWrapper>
  );
};
