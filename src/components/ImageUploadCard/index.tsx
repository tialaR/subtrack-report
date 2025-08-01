import { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { ButtonIcon } from "@components/ButtonIcon";
import { delay } from "@utils/delayHelper";
import type { ImageUploadCardProps } from "./types";
import * as S from "./styles";
import { InputText } from "../InputText";

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  id,
  image,
  title = "",
  onDelete,
  required = false,
  isLoading = false,
  onAdd,
  label,
}) => {
  const [hasImage, setHasImage] = useState(!!image);
  const [localImage, setLocalImage] = useState<string | null>(image ?? null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setHasImage(!!image);
    setLocalImage(image ?? null);
  }, [image]);

  const isAddCard = !hasImage && !!onAdd;

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await delay(300);
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setLocalImage(preview);
      setHasImage(true);
    }
    onAdd?.(e);
  };

  const handleReplace = async () => {
    await delay(300);
    inputRef.current?.click();
  };

  const handleDelete = async () => {
    await delay(300);
    if (inputRef.current) inputRef.current.value = "";
    setHasImage(false);
    setLocalImage(null);
    onDelete?.();
  };

  return (
    <div>
      {label && (
        <S.Label>
          {label}
          {required && <S.RequiredMark>*</S.RequiredMark>}
        </S.Label>
      )}
      <S.ImageBox $hasImage={hasImage}>
        {isAddCard ? (
          <>
            <input
              type="file"
              accept="image/*"
              id="upload-new"
              style={{ display: "none" }}
              onChange={handleAdd}
              ref={inputRef}
            />
            <S.UploadBox htmlFor="upload-new" $hasImage={false}>
              {isLoading ? (
                <S.LoaderWrapper>
                  <S.Loader />
                </S.LoaderWrapper>
              ) : (
                <FiPlus size={48} />
              )}
            </S.UploadBox>
          </>
        ) : (
          <>
          <InputText value={image} alt={image} label={""} onChange={(e) => setLocalImage(e.target.value)} />
            <input
              type="file"
              accept="image/*"
              id={id}
              style={{ display: "none" }}
              onChange={handleAdd}
              ref={inputRef}
            />
            <S.UploadBox htmlFor={id} $hasImage={hasImage}>
              {hasImage && localImage && !isLoading && (
                <S.PreviewImage src={localImage} alt={title} />
              )}
              {isLoading && (
                <S.LoaderWrapper>
                  <S.Loader />
                </S.LoaderWrapper>
              )}
              <S.ButtonIconWrapper>
                <div>
                  <ButtonIcon
                    size="large"
                    title="Atualizar imagem"
                    variant="filled"
                    iconType="refresh"
                    showLoadingOverlay
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={handleReplace}
                  />
                  <ButtonIcon
                    size="large"
                    title="Remover imagem"
                    variant="filled"
                    iconType="delete"
                    showLoadingOverlay
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={handleDelete}
                  />
                </div>
              </S.ButtonIconWrapper>
            </S.UploadBox>
          </>
        )}
      </S.ImageBox>
    </div>
  );
};

export { ImageUploadCard };
