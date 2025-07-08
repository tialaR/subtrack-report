import type { MainTitleProps } from './types';
import * as S from './styles';

const MainTitle: React.FC<MainTitleProps> = ({ children }) => {
  return (
    <S.MainTitleContainer>{children}</S.MainTitleContainer>
  );
}

export { MainTitle };