import type { LoadingScreenProps } from './types';
import * as S from './styles';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  title = 'Carregando...',
  description = 'Por favor, aguarde enquanto carregamos os dados.',
}) => {
  return (
    <S.Wrapper>
      <S.Spinner />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
};
