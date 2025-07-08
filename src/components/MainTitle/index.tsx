import type { ReactNode } from 'react';
import * as S from './styles';

type MainTitleProps = {
  children: ReactNode;
}

const MainTitle: React.FC<MainTitleProps> = ({ children }) => {
  return (
    <S.MainTitleContainer>{children}</S.MainTitleContainer>
  );
}

export { MainTitle };