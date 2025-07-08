import { FiPlus, FiTrash } from "react-icons/fi";
import { ButtonIcon } from "@components/ButtonIcon";
import { theme } from "@styles/theme";
import type { ImageGridUploaderProps } from "./types";
import * as S from "./styles";

const ImageGridUploader: React.FC<ImageGridUploaderProps> = ({
  images,
  onUpload,
  onDeleteById,
  maxImages = 4,
}) => {
  const canAddMoreImages = images?.length < maxImages;
  const newUploadInputId = `upload-${images.length}`;

  const handleImageChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onUpload(file, index);
    };

  const handleDeleteImage = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteById(id);
  };

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file, images.length);
  };

  return (
    <S.ImageBoxWrapper>
      {images?.map((storedImage, index) => {
        const hasImage = !!storedImage?.image;
        const imageSrc = storedImage?.image ?? "";
        const storedImageId = storedImage?.id;
        const uploadInputId = `upload-${index}`;
        const altImageText = `imagem-${index}`;

        return (
          <S.ImageBox $hasImage key={storedImageId}>
            <input
              type="file"
              accept="image/*"
              id={uploadInputId}
              style={{ display: "none" }}
              onChange={handleImageChange(index)}
            />

            <S.UploadBox $hasImage={hasImage} htmlFor={uploadInputId}>
              <S.PreviewImage src={imageSrc} alt={altImageText} />
              <S.ButtonIconWrapper>
                <ButtonIcon
                  icon={<FiTrash />}
                  iconType="filled"
                  size="large"
                  color={theme.colors.secondary.red}
                  onClick={handleDeleteImage(storedImageId)}
                />
              </S.ButtonIconWrapper>
            </S.UploadBox>
          </S.ImageBox>
        );
      })}

      {canAddMoreImages && (
        <S.ImageBox $hasImage={false}>
          <input
            type="file"
            accept="image/*"
            id={newUploadInputId}
            style={{ display: "none" }}
            onChange={handleAddImageChange}
          />
          <S.UploadBox $hasImage={false} htmlFor={newUploadInputId}>
            <FiPlus size={48} />
          </S.UploadBox>
        </S.ImageBox>
      )}
    </S.ImageBoxWrapper>
  );
};

export { ImageGridUploader };
