import { FiPlus } from 'react-icons/fi';
import type { AddImageCardProps } from './types';
import * as S from './styles';

const AddImageCard: React.FC<AddImageCardProps> = ({ onAdd }) => {
  return (
    <S.ImageBox $hasImage={false}>
      <input
        type="file"
        accept="image/*"
        id="upload-new"
        style={{ display: 'none' }}
        onChange={onAdd}
      />
      <S.UploadBox htmlFor="upload-new" $hasImage={false}>
        <FiPlus size={48} />
      </S.UploadBox>
    </S.ImageBox>
  );
};

export { AddImageCard };
