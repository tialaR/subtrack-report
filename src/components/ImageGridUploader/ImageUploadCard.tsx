import { ButtonIcon } from "@components/ButtonIcon";
import type { ImageUploadCardProps } from "./types";
import * as S from "./styles";
import { delay } from "@utils/delayHelper"; 

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  id,
  image,
  title = "",
  hasImage,
  onDelete,
  onReplace,
  isLoading = false,
}) => {
  return (
    <S.ImageBox $hasImage={hasImage}>
      <S.UploadBox htmlFor={id} $hasImage={hasImage}>
        {hasImage && !isLoading && <S.PreviewImage src={image} alt={title} />}
        {isLoading && <S.LoaderWrapper><S.Loader /></S.LoaderWrapper>}
        <S.ButtonIconWrapper>
          <div>
            <ButtonIcon
              size="large"
              title="Atualizar imagem"
              variant="filled"
              iconType="refresh"
              showLoadingOverlay
              isLoading={!hasImage || isLoading}
              disabled={!hasImage || isLoading}
              onClick={async () => {
                await delay(300); // Adiciona um pequeno delay no clique
                onReplace();
              }}
            />
            <ButtonIcon
              size="large"
              title="Remover imagem"
              variant="filled"
              iconType="delete"
              showLoadingOverlay
              isLoading={isLoading}
              disabled={isLoading}
              onClick={async () => {
                await delay(300); // Adiciona um pequeno delay no clique
                onDelete();
              }}
            />
          </div>
        </S.ButtonIconWrapper>
      </S.UploadBox>
    </S.ImageBox>
  );
};

export { ImageUploadCard };
