import { ScreenshotBubble } from "@components/ScreenshotBubble";
import type { ScreenshotBubblesProps } from "./types";

const ScreenshotBubbles: React.FC<ScreenshotBubblesProps> = ({
  wrapperRef,
  screenshots,
  onUpdateScreenshot,
  onDeleteScreenshot,
  hideButtonsActions = false
}) => {
  return (
    <>
      {screenshots?.map((screenshot, index) => (
        <ScreenshotBubble
          key={screenshot?.id}
          title={screenshot?.title || `Screenshot ${index + 1}`}
          screenshot={screenshot}
          wrapperRef={wrapperRef}
          initialOffsetIndex={index}
          totalScreenshots={screenshots?.length}
          onUpdateScreenshot={onUpdateScreenshot}
          onRemoveScreenshot={() => onDeleteScreenshot(screenshot?.id)}
          hideButtonsActions={hideButtonsActions}
        />
      ))}
    </>
  );
};

export { ScreenshotBubbles };
