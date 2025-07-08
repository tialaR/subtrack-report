import { FiTrash } from "react-icons/fi";
import { useLocalImagesStorage } from "@hooks/useLocalImagesStorage";
import { MainDescription } from "@components/MainDescription";
import { ImageGridUploader } from "@components/ImageGridUploader";
import { StyleButtonsWrapper } from "@styles/StyleComponets";
import { Button } from "@components/Button";
import * as S from "./styles";

const MAX_IMAGES = 4;

const RecordsDay: React.FC = () => {
  const { images, updateImageAt, removeImageById, removeAllImages } = useLocalImagesStorage();

  return (
    <S.Container>
      <div>
        <MainDescription>
          {"É necessário inserir mo mínimo uma imagem e no máximo quatro imagens para continuar."?.toUpperCase()}
        </MainDescription>

        <StyleButtonsWrapper>
          <Button
            title="Excluir todas as imagens"
            variant="with-icon"
            icon={<FiTrash />}
            onClick={removeAllImages}
          >
            Excluir todas as imagens
          </Button>
        </StyleButtonsWrapper>
      </div>

      <ImageGridUploader
        images={images}
        onUpload={updateImageAt}
        onDeleteById={removeImageById}
        maxImages={MAX_IMAGES}
      />
    </S.Container>
  );
};

export { RecordsDay };
