import { useEffect, useRef, useState, useCallback } from 'react';
import type { ScreenshotMarker as SnapshotItem } from '@services/hooks/generalMapSreenshots/types';
import {
  useGetGeneralMapScreenshotMarkers,
  usePostGeneralMapScreenshotMarkers,
  usePatchGeneralMapScreenshotMarkers,
  usePutGeneralMapScreenshotMarkers,
  useDeleteGeneralMapScreenshotMarkers,
} from '@services/hooks/generalMapSreenshots';

export const useSnapshotStorage = () => {
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>([]);
  const initializedRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, getGeneralMapScreenshotMarkers } = useGetGeneralMapScreenshotMarkers();
  const { postGeneralMapScreenshotMarkers } = usePostGeneralMapScreenshotMarkers();
  const { patchGeneralMapScreenshotMarkers } = usePatchGeneralMapScreenshotMarkers();
  const { putGeneralMapScreenshotMarkers } = usePutGeneralMapScreenshotMarkers();
  const { deleteGeneralMapScreenshotMarkers } = useDeleteGeneralMapScreenshotMarkers();

  const applyInitialPositioning = useCallback(
    (items: SnapshotItem[], wrapper: HTMLDivElement | null): SnapshotItem[] => {
      if (!wrapper) return items;

      const spacing = 50;
      const marginRight = 16;
      const bubbleWidth = 250;
      const total = items.length;

      return items.map((item, index) => {
        const invertedIndex = total - 1 - index;
        const x = wrapper.offsetWidth - bubbleWidth - marginRight;
        const y = 16 + invertedIndex * spacing;

        return {
          ...item,
          x,
          y,
          rotation: 0,
          timestamp: item.timestamp ?? Date.now(),
          is_new_position: true,
        };
      });
    },
    []
  );

  useEffect(() => {
    if (!initializedRef.current && wrapperRef.current) {
      getGeneralMapScreenshotMarkers();
    }
  }, []);

  useEffect(() => {
    if (!initializedRef.current && data && data.length > 0 && wrapperRef.current) {
      const shouldReposition = data.some((s) => s.is_new_position !== false);
      const positioned = shouldReposition
        ? applyInitialPositioning(data, wrapperRef.current)
        : data;
      setSnapshots(positioned);
      initializedRef.current = true;
    }
  }, [data, applyInitialPositioning]);

  const updateSnapshot = useCallback(
    (updated: SnapshotItem) => {
      patchGeneralMapScreenshotMarkers(updated.id, updated);
      setSnapshots((prev) => {
        const updatedList = prev.map((s) => (s.id === updated.id ? updated : s));
        const sorted = [...updatedList].sort((a, b) => a.timestamp - b.timestamp);
        return sorted;
      });
    },
    []
  );

  const saveSingleSnapshot = useCallback(
    async ({ snapshotItem, title }: { snapshotItem: SnapshotItem; title: string }) => {
      const newSnapshot: SnapshotItem = {
        ...snapshotItem,
        title,
        timestamp: snapshotItem.timestamp ?? Date.now(),
        is_new_position: true,
        image: snapshotItem.image,
      };
      const response = await postGeneralMapScreenshotMarkers(newSnapshot);
      setSnapshots((prev) => [...prev, response]);
    },
    [postGeneralMapScreenshotMarkers]
  );

  const removeSnapshot = useCallback(
    async (id: string) => {
      await deleteGeneralMapScreenshotMarkers(id);
      setSnapshots((prev) => prev.filter((s) => s.id !== id));
    },
    [deleteGeneralMapScreenshotMarkers]
  );

  const removeAllSnapshots = useCallback(async () => {
    await Promise.all(snapshots.map((s) => deleteGeneralMapScreenshotMarkers(s.id)));
    setSnapshots([]);
  }, [snapshots, deleteGeneralMapScreenshotMarkers]);

  const resetSnapshots = useCallback(async () => {
    if (wrapperRef.current) {
      const repositioned = applyInitialPositioning(snapshots, wrapperRef.current);
      await Promise.all(
        repositioned.map((item) => putGeneralMapScreenshotMarkers(item.id, item))
      );
      setSnapshots(repositioned);
    }
  }, [snapshots, applyInitialPositioning, putGeneralMapScreenshotMarkers]);

  return {
    snapshots,
    updateSnapshot,
    saveSingleSnapshot,
    removeSnapshot,
    removeAllSnapshots,
    resetSnapshots,
    wrapperRef,
  };
};
