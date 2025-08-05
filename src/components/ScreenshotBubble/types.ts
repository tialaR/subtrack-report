import type { ScreenshotMarker } from "@services/hooks/generalMapSreenshots/types";

export type ScreenshotBubbleProps = {
  title: string;
  screenshot: ScreenshotMarker;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  initialOffsetIndex: number;
  totalScreenshots: number;
  onUpdateScreenshot: (updated: ScreenshotMarker) => void;
  onRemoveScreenshot: () => void;
};
