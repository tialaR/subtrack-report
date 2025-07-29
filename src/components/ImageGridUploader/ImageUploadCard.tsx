import { ButtonIcon } from "@components/ButtonIcon";
import type { ImageUploadCardProps } from "./types";
import * as S from "./styles";

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  id,
  image,
  title = "",
  hasImage,
  onDelete,
  onReplace,
}) => {
  return (
    <S.ImageBox $hasImage={hasImage}>
      <S.UploadBox htmlFor={id} $hasImage={hasImage}>
        {hasImage ? <S.PreviewImage src={image} alt={title} /> : null}
        <S.ButtonIconWrapper>
          <div>
            <ButtonIcon
              size="large"
              title="Atualizar imagem"
              variant="filled"
              iconType="refresh"
              onClick={onReplace}
              disabled={!hasImage}
            />
            <ButtonIcon
              size="large"
              title="Remover imagem"
              variant="filled"
              iconType="delete"
              onClick={onDelete}
            />
          </div>
        </S.ButtonIconWrapper>
      </S.UploadBox>
    </S.ImageBox>
  );
};

export { ImageUploadCard };
