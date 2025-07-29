import { FiPlus } from "react-icons/fi";
import { delay } from "@utils/delayHelper";
import type { AddImageCardProps } from "./types";
import * as S from "./styles";

const AddImageCard: React.FC<AddImageCardProps> = ({ onAdd, isLoading = false }) => {
  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await delay(300); // Adiciona um pequeno delay no clique
    onAdd(e);
  };

  return (
    <S.ImageBox $hasImage={false}>
      <input
        type="file"
        accept="image/*"
        id="upload-new"
        style={{ display: "none" }}
        onChange={handleAdd}
      />
      <S.UploadBox htmlFor="upload-new" $hasImage={false}>
        {isLoading ? <S.LoaderWrapper><S.Loader /></S.LoaderWrapper> : <FiPlus size={48} />}
      </S.UploadBox>
    </S.ImageBox>
  );
};

export { AddImageCard };
