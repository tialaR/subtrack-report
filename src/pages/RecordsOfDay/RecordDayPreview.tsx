import { forwardRef } from "react";
import type { RecordDay } from "@services/hooks/recordsDay/types";
import * as S from "./styles";

export type RecordDayPreviewProps = {
  recordsDay: RecordDay[];
  isHidden?: boolean; // controla visibilidade para renderização oculta
};

export const RecordDayPreview = forwardRef<
  HTMLDivElement,
  RecordDayPreviewProps
>(({ recordsDay, isHidden = false }, ref) => {
  return (
    <S.PreviewWrapper
      ref={ref}
      style={
        isHidden
          ? { visibility: "hidden", position: "absolute", top: 0, left: 0 }
          : {}
      }
    >
      <S.PreviewTitle>Registros do dia</S.PreviewTitle>
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
  );
});

RecordDayPreview.displayName = "RecordDayPreview";
