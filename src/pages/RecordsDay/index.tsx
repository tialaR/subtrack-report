import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import * as S from './styles'

const MAX_IMAGES = 4;
const STORAGE_KEY = '@subtrack-report:recordsDayImages';

const RecordsDay: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>(Array(MAX_IMAGES).fill(null));

  // Carrega imagens do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as (string | null)[];
      const filled = parsed.concat(Array(MAX_IMAGES - parsed.length).fill(null)).slice(0, MAX_IMAGES);
      setImages(filled);
    }
  }, []);

  // Salva imagens e valida mínimo
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  }, [images]);

  const handleFileChange = (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = e => {
      const updated = [...images];
      updated[index] = e.target?.result as string;
      setImages(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (index: number) => {
    const updated = [...images];
    updated[index] = null;
    setImages(updated);
  };

  const renderImageBoxes = Array.from({ length: MAX_IMAGES }).map((_, index) => {
    const src = images[index];

    return (
        <S.ImageBox key={index}>
          <input
            type="file"
            accept="image/*"
            id={`upload-${index}`}
            style={{ display: 'none' }}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file, index);
            }}
          />

          {src && (
            <>
              <S.PreviewImage src={src} alt={`imagem-${index}`} />
              <S.DeleteIcon onClick={() => handleDelete(index)} />
            </>
          )}

          {!src && (
            <S.UploadBox htmlFor={`upload-${index}`}>
              <FiPlus size={48} />
            </S.UploadBox>
          )}
        </S.ImageBox>
    );
  });

  return (
      <S.Container>
        <S.Description>
          É necessário inserir pelo menos uma imagem para continuar.
        </S.Description>
        
        <S.ImageBoxWrapper>
          {renderImageBoxes}
        </S.ImageBoxWrapper>
      </S.Container>
  );
};

export { RecordsDay };
