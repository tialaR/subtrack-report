import { useRef } from "react";
import { ImageUploadCard } from "./ImageUploadCard";
import { AddImageCard } from "./AddImageCard";
import type { ImageGridUploaderProps } from "./types";
import * as S from "./styles";

export const ImageGridUploader: React.FC<ImageGridUploaderProps> = ({
  recordsDay,
  onAddImage,
  onReplaceImage,
  onDeleteImage,
  maxImages = 4,
}) => {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const canAddMoreImages = recordsDay.length < maxImages;

  const handleReplaceClick = (id: string) => {
    inputRefs.current[id]?.click();
  };

  return (
    <S.ImageBoxWrapper>
      {recordsDay.map((record, index) => (
        <div key={record.id}>
          <input
            type="file"
            accept="image/*"
            ref={(el) => {
              inputRefs.current[record.id] = el;
            }}
            style={{ display: "none" }}
            onChange={(e) => onReplaceImage({ id: record.id, file: e.target.files?.[0] })}
          />

          <ImageUploadCard
            id={`upload-${index}`}
            image={record.image}
            title={record.title}
            hasImage={!!record.image}
            onDelete={() => onDeleteImage(record.id)}
            onReplaceClick={() => handleReplaceClick(record.id)}
          />
        </div>
      ))}

      {canAddMoreImages && (
        <AddImageCard
          onAdd={(e) => onAddImage(e.target.files?.[0])}
        />
      )}
    </S.ImageBoxWrapper>
  );
};
