import { SnapshotBubble } from "@components/SnapshotBubble";
import type { SnapshotBubblesProps } from "./types";

const SnapshotBubbles: React.FC<SnapshotBubblesProps> = ({
  wrapperRef,
  snapshots,
  onUpdate,
  onDelete,
}) => {
  return (
    <>
      {snapshots?.map((snapshot, index) => (
        <SnapshotBubble
          key={snapshot?.id}
          id={snapshot?.id}
          title={snapshot?.title || `Snapshot ${index + 1}`}
          snapshot={snapshot}
          wrapperRef={wrapperRef}
          initialOffsetIndex={index}
          totalSnapshots={snapshots?.length}
          onUpdate={onUpdate}
          onRemove={() => onDelete(snapshot?.id)}
        />
      ))}
    </>
  );
};

export { SnapshotBubbles };
