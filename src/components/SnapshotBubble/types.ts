import type { ScreenshotMarker } from "@services/hooks/generalMapSreenshots/types";

export type SnapshotBubbleProps = {
  id: string;
  title: string;
  snapshot: ScreenshotMarker;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  initialOffsetIndex: number;
  totalSnapshots: number;
  onUpdate: (updated: ScreenshotMarker) => void;
  onRemove: () => void;
};
