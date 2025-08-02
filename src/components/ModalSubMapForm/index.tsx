import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@components/Button";
import { InputText } from "@components/InputText";
import { ImageUploadCard } from "@components/ImageUploadCard";
import { StyleButtonsWrapper } from "@styles/StyleComponets";
import { MainDescription } from "@components/MainDescription";
import { MainTitle } from "@components/MainTitle";
import { usePostSubMap } from "@services/hooks/subMaps/usePostSubMap";
import type { SubMap } from "@services/hooks/subMaps/types";
import type { ModalSubMapFormProps } from "./types";
import * as S from "./styles";

export const ModalSubMapForm: React.FC<ModalSubMapFormProps> = ({
    onClose = () => {},
}) => {
  const { postSubMap, data: subMapData, loading: isPostSubMapLoading } = usePostSubMap();

  const [image, setImage] = useState<string>("");
  const [subMapName, setSubMapName] = useState<string>("");

  const isSubmitDisabled = isPostSubMapLoading || !subMapName.trim() || !image;

  const handleDeleteImage = () => {
    setImage("");
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubMapName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const payload: SubMap = {
    id: uuidv4(),
    title: subMapName,
    image,
  };

  await postSubMap(payload);

  if (subMapData) {
    setSubMapName("");
    setImage("");
    onClose()
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <S.ModalContainer>
        <MainTitle>Crie um novo sub mapa</MainTitle>
        <MainDescription>
          Especificando o campo de inspeção de atuação granular preenchendo os
          campos abaixo:
        </MainDescription>

        <InputText
          label="Nome completo"
          required
          placeholder="Digite seu nome"
          value={subMapName}
          onChange={handleChange}
          helperText="Preencha com seu nome completo"
        />

        <ImageUploadCard
          id="image-upload-1"
          title="Adicione a foto do sub mapa"
          required
          image={image ?? ""}
          onAdd={handleAddImage}
          onDelete={handleDeleteImage}
          //   isLoading={isLoading}
          label="Adicione a foto do sub mapa"
        />

        <StyleButtonsWrapper>
          <Button
            variant="primary"
            type="submit"
            isLoading={isSubmitDisabled}
            disabled={isSubmitDisabled}
          >
            Criar sub mapa
          </Button>
        </StyleButtonsWrapper>
      </S.ModalContainer>
    </form>
  );
};
