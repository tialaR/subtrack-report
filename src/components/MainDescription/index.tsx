import type { MainDescriptionProps } from './types';
import * as S from './styles';

const MainDescription: React.FC<MainDescriptionProps> = ({ children }) => {
  return (
    <S.MainDescriptionContainer>
      <span>{children}</span>
    </S.MainDescriptionContainer>
  );
}

export { MainDescription };