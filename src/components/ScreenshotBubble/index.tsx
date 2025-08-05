import { useEffect, useRef, useState } from "react";
import { FiRotateCcw } from "react-icons/fi";
import { ButtonIcon } from "@components/ButtonIcon";
import { RotationAnchors } from "@components/RotationAnchors";
import * as S from "./styles";
import type { ScreenshotBubbleProps } from "./types";

const ScreenshotBubble: React.FC<ScreenshotBubbleProps> = ({
  title,
  screenshot,
  wrapperRef,
  initialOffsetIndex,
  totalScreenshots,
  onUpdateScreenshot,
  onRemoveScreenshot,
}) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const [rotation, setRotation] = useState(screenshot.rotation ?? 0);
  const [position, setPosition] = useState({ x: screenshot.x, y: screenshot.y });
  const [isDragging, setIsDragging] = useState(false);

  const isRotating = useRef(false);
  const centerRef = useRef({ x: 0, y: 0 });
  const lastPointerAngleRef = useRef(0);

  useEffect(() => {
    setPosition({ x: screenshot.x, y: screenshot.y });
    setRotation(screenshot.rotation);
  }, [screenshot.x, screenshot.y, screenshot.rotation]);

  const startDrag = (e: React.PointerEvent) => {
    if (!bubbleRef.current) return;
    setIsDragging(true);
    const rect = bubbleRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    bubbleRef.current.setPointerCapture(e.pointerId);
  };

  const onDrag = (e: PointerEvent | React.PointerEvent) => {
    if (!isDragging || !wrapperRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const newX = e.clientX - wrapperRect.left - offset.current.x;
    const newY = e.clientY - wrapperRect.top - offset.current.y;
    const maxX = wrapperRect.width - (bubbleRef.current?.offsetWidth ?? 0);
    const maxY = wrapperRect.height - (bubbleRef.current?.offsetHeight ?? 0);

    const clampedX = Math.max(0, Math.min(newX, maxX));
    const clampedY = Math.max(0, Math.min(newY, maxY));

    if (clampedX !== position.x || clampedY !== position.y) {
      setPosition({ x: clampedX, y: clampedY });
      console.log({
        ...screenshot,
        x: clampedX,
        y: clampedY,
        rotation,
        is_new_position: false,
      })
      onUpdateScreenshot({
        ...screenshot,
        x: clampedX,
        y: clampedY,
        rotation,
        is_new_position: false,
      });
    }
  };

  const stopDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    bubbleRef.current?.releasePointerCapture(e.pointerId);
  };

  const startHandleRotation = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!bubbleRef.current) return;

    const rect = bubbleRef.current.getBoundingClientRect();
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const dx = e.clientX - centerRef.current.x;
    const dy = e.clientY - centerRef.current.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    lastPointerAngleRef.current = angle;
    isRotating.current = true;

    window.addEventListener("pointermove", onHandleRotateDrag);
    window.addEventListener("pointerup", stopHandleRotation);
  };

  const onHandleRotateDrag = (e: PointerEvent) => {
    if (!isRotating.current) return;

    const { x, y } = centerRef.current;
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    let currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (currentAngle < 0) currentAngle += 360;

    const previousAngle = lastPointerAngleRef.current;
    let delta = currentAngle - previousAngle;

    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    lastPointerAngleRef.current = currentAngle;

    setRotation((prev) => {
      const next = prev + delta;
      if (next !== prev) {
        onUpdateScreenshot({
          ...screenshot,
          rotation: next,
          is_new_position: false,
        });
      }
      return next;
    });
  };

  const stopHandleRotation = () => {
    isRotating.current = false;
    window.removeEventListener("pointermove", onHandleRotateDrag);
    window.removeEventListener("pointerup", stopHandleRotation);
  };

  const zIndex = totalScreenshots - initialOffsetIndex;

  return (
    <S.BubbleWrapper
      ref={bubbleRef}
      style={{ left: position.x, top: position.y, zIndex }}
      $rotation={rotation}
      onPointerDown={startDrag}
      onPointerMove={(e) => isDragging && onDrag(e)}
      onPointerUp={(e) => stopDrag(e)}
    >
      <S.BubbleHeader>
        <span>{title}</span>
        <ButtonIcon
          size="regular"
          variant="outlined"
          iconType="delete"
          title={`Remover sub-map-${title}`}
          onClick={onRemoveScreenshot}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </S.BubbleHeader>

      <S.BubbleImage src={screenshot?.image} alt={title} />

      <RotationAnchors
        icon={<FiRotateCcw />}
        onPointerDown={startHandleRotation}
      />
    </S.BubbleWrapper>
  );
};

export { ScreenshotBubble };
