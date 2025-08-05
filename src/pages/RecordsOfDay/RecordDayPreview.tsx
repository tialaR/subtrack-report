import { forwardRef } from "react";
import type { RecordDayPreviewProps } from "@services/hooks/recordsDay/types";
import * as S from "./styles";

export const RecordDayPreview = forwardRef<
  HTMLDivElement,
  RecordDayPreviewProps
>(({ recordsDay, isHidden = false }, ref) => {
  const hiddenStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    right: 0,
    width: "auto",
    height: "auto",
    opacity: 0,
    pointerEvents: "none",
    zIndex: -1,
  };

  return (
    <div style={isHidden ? hiddenStyles : undefined}>
      <S.PreviewWrapper ref={ref}>
        <S.ImageBoxWrapper>
          {recordsDay?.map((record) => (
            <div key={record?.id}>
              <S.ImageBox>
                <S.PreviewImage src={record?.image} alt={record?.title} />
              </S.ImageBox>
            </div>
          ))}
        </S.ImageBoxWrapper>
      </S.PreviewWrapper>
    </div>
  );
});

RecordDayPreview.displayName = "RecordDayPreview";
