import { useEffect, useRef, useState, useCallback } from 'react';
import type { SnapshotItem } from '@components/SnapshotBubble/types';

const STORAGE_KEY_SNAPSHOT_PREFIX = '@maptrack-report:snapshot-';

export const useSnapshotStorage = () => {
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>([]);
  const initializedRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const loadSnapshots = useCallback(() => {
    const loaded: SnapshotItem[] = [];

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_KEY_SNAPSHOT_PREFIX)) {
        try {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed.id && parsed.timestamp) loaded.push(parsed);
          }
        } catch (err) {
          console.error(`Erro ao carregar snapshot: ${key}`, err);
        }
      }
    });

    return loaded.sort((a, b) => a.timestamp - b.timestamp);
  }, []);

  const saveSnapshots = useCallback((items: SnapshotItem[]) => {
    items.forEach((item) => {
      const key = `${STORAGE_KEY_SNAPSHOT_PREFIX}${item.title}-${item.id}`;
      localStorage.setItem(key, JSON.stringify(item));
    });
  }, []);

  const saveSingleSnapshot = useCallback(({ snapshotItem, title }: { snapshotItem: SnapshotItem, title: string }) => {
    if (!snapshotItem || !title) return;
    const key = `${STORAGE_KEY_SNAPSHOT_PREFIX}${title}-${snapshotItem.id}`;

    const snapshot: SnapshotItem = {
      id: snapshotItem.id,
      x: snapshotItem.x,
      y: snapshotItem.y,
      rotation: snapshotItem.rotation,
      title: title,
      snapshotImg: snapshotItem.snapshotImg,
      timestamp: snapshotItem.timestamp ?? Date.now(),
      isNewPosition: snapshotItem.isNewPosition ?? true,
    };

    localStorage.setItem(key, JSON.stringify(snapshot));
  }, []);

  const applyInitialPositioning = useCallback(
    (items: SnapshotItem[], wrapper: HTMLDivElement | null) => {
      if (!wrapper) return items;

      const spacing = 50;
      const marginRight = 16;
      const bubbleWidth = 250;
      const total = items.length;

      const positioned = items.map((item, index) => {
        const invertedIndex = total - 1 - index;
        const x = wrapper.offsetWidth - bubbleWidth - marginRight;
        const y = 16 + invertedIndex * spacing;

        return {
          ...item,
          x,
          y,
          rotation: 0,
          isNewPosition: true,
          timestamp: item.timestamp ?? Date.now(),
        };
      });

      saveSnapshots(positioned);
      return positioned;
    },
    [saveSnapshots]
  );

  useEffect(() => {
    if (!initializedRef.current && wrapperRef.current) {
      const loaded = loadSnapshots();
      const shouldReposition = loaded.some((s) => s.isNewPosition !== false);
      const positioned = shouldReposition
        ? applyInitialPositioning(loaded, wrapperRef.current)
        : loaded;
      setSnapshots(positioned);
      initializedRef.current = true;
    }
  }, [loadSnapshots, applyInitialPositioning]);

  const updateSnapshot = useCallback(
    (updated: SnapshotItem) => {
      setSnapshots((prev) => {
        const updatedList = prev.map((s) => (s.id === updated.id ? updated : s));
        const sorted = [...updatedList].sort((a, b) => a.timestamp - b.timestamp);
        saveSnapshots(sorted);
        return sorted;
      });
    },
    [saveSnapshots]
  );

  const removeSnapshot = useCallback((id: string) => {
    setSnapshots((prev) => {
      const target = prev.find((s) => s.id === id);
      if (target) {
        const key = `${STORAGE_KEY_SNAPSHOT_PREFIX}${target.title}-${target.id}`;
        localStorage.removeItem(key);
      }
      return prev.filter((s) => s.id !== id);
    });
  }, []);

  const removeAllSnapshots = useCallback(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_KEY_SNAPSHOT_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    setSnapshots([]);
  }, []);

  const resetSnapshots = useCallback(() => {
    if (wrapperRef.current) {
      const loaded = loadSnapshots();
      const repositioned = applyInitialPositioning(loaded, wrapperRef.current);
      setSnapshots(repositioned);
    }
  }, [loadSnapshots, applyInitialPositioning]);

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
