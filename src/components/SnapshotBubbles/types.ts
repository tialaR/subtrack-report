import type { ScreenshotMarker } from '@services/hooks/generalMapSreenshots/types';

export type SnapshotBubblesProps = {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  snapshots: ScreenshotMarker[];
  onUpdate: (updated: ScreenshotMarker) => void;
  onDelete: (id: string) => void;
};