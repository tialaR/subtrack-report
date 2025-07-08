export type ScreenshotMarker = {
    id: string;
    title: string;
    image: string;
    x: number;
    y: number;
    rotation: number;
    timestamp: number;
    is_new_position: boolean;
}

export type GeneralMapScreenshotMarker = {
  id: string;
  title: string;
  content: string;
  screenshot_markers: ScreenshotMarker[];
};