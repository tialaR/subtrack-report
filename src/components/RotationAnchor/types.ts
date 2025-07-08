export type AnchorPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type RotationAnchorProps = {
  position: AnchorPosition;
  icon?: React.ReactNode;
  onPointerDown: (e: React.PointerEvent) => void;
};