import type { SnapshotItem } from "@components/SnapshotBubble/types";

export type SnapshotBubblesProps = {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  snapshots: SnapshotItem[];
  onUpdate: (updated: SnapshotItem) => void;
  onDelete: (id: string) => void;
};