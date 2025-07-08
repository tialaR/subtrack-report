import { FiChevronRight } from 'react-icons/fi';

import * as S from './styles';
import type { ButtonHTMLAttributes } from 'react';

interface CardHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    buttomText: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    buttomText,
    ...rest
}) => {
  return (
    <S.Header>
      <h2>{title}</h2>
      <S.ButtonContainer
        {...rest}
      >
        {buttomText} <FiChevronRight />
      </S.ButtonContainer>
    </S.Header>
  );
}

export { CardHeader };