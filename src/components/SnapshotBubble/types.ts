export type SnapshotItem = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  snapshotImg: string;
  title?: string;
  timestamp: number;
  isNewPosition: boolean;
};

export type SnapshotBubbleProps = {
  id: string;
  title: string;
  snapshot: SnapshotItem;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  initialOffsetIndex: number;
  totalSnapshots: number;
  onUpdate: (updated: SnapshotItem) => void;
  onRemove: () => void;
};
