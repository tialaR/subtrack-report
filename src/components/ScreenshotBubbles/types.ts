import type { ScreenshotMarker } from '@services/hooks/generalMapSreenshots/types';

export type ScreenshotBubblesProps = {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  screenshots: ScreenshotMarker[];
  onUpdateScreenshot: (updated: ScreenshotMarker) => void;
  onDeleteScreenshot: (id: string) => void;
};