import { useEffect, useRef, useState, useCallback } from 'react';
import type { ScreenshotMarker } from '@services/hooks/generalMapSreenshots/types';
import {
  useGetGeneralMapScreenshotMarkers,
  usePostGeneralMapScreenshotMarker,
  usePatchGeneralMapScreenshotMarkerById,
  usePutGeneralMapScreenshotMarker,
  useDeleteGeneralMapScreenshotMarkerById,
  useDeleAllteGeneralMapScreenshotMarkers
} from '@services/hooks/generalMapSreenshots';

export const useScreenshotGeneralMapStorage = () => {
  const [screenshots, setScreenshots] = useState<ScreenshotMarker[]>([]);
  const initializedRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, getGeneralMapScreenshotMarkers } = useGetGeneralMapScreenshotMarkers();
  const { postGeneralMapScreenshotMarker } = usePostGeneralMapScreenshotMarker();
  const { patchGeneralMapScreenshotMarkerById } = usePatchGeneralMapScreenshotMarkerById();
  const { putGeneralMapScreenshotMarker } = usePutGeneralMapScreenshotMarker();
  const { deleteGeneralMapScreenshotMarkerById } = useDeleteGeneralMapScreenshotMarkerById();
  const { deleteAllGeneralMapScreenshotMarkers } = useDeleAllteGeneralMapScreenshotMarkers();

  const applyInitialPositioning = useCallback(
    (items: ScreenshotMarker[], wrapper: HTMLDivElement | null): ScreenshotMarker[] => {
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
      setScreenshots(positioned);
      initializedRef.current = true;
    }
  }, [data, applyInitialPositioning]);

  const updateScreenshot = useCallback(
    (updated: ScreenshotMarker) => {
      patchGeneralMapScreenshotMarkerById(updated.id, updated);
      setScreenshots((prev) => {
        const updatedList = prev.map((s) => (s.id === updated.id ? updated : s));
        const sorted = [...updatedList].sort((a, b) => a.timestamp - b.timestamp);
        return sorted;
      });
    },
    []
  );

  const saveNewScreenshot = useCallback((screenshot: ScreenshotMarker) => {
      postGeneralMapScreenshotMarker(screenshot);
      setScreenshots((prev) => [...prev, screenshot]
    )}, 
  []);

  const removeScreenshotById = useCallback((id: string) => {
      deleteGeneralMapScreenshotMarkerById(id);
      setScreenshots((prev) => prev.filter((s) => s.id !== id)
    )},
  []);

  const removeAllScreenshots = useCallback(() => {
    deleteAllGeneralMapScreenshotMarkers();
    setScreenshots([]);
  }, []);

  const resetScreenshotsPosition = useCallback(async () => {
    if (wrapperRef.current) {
      const repositioned = applyInitialPositioning(screenshots, wrapperRef.current);
      await Promise.all(
        repositioned.map((item) => putGeneralMapScreenshotMarker(item.id, item))
      );
      setScreenshots(repositioned);
    }
  }, [screenshots, applyInitialPositioning, putGeneralMapScreenshotMarker]);

  return {
    screenshots,
    updateScreenshot,
    saveNewScreenshot,
    removeScreenshotById,
    removeAllScreenshots,
    resetScreenshotsPosition,
    wrapperRef,
  };
};
