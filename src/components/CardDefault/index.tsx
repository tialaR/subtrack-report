import type { ReactNode } from 'react';
import * as S from './styles';

interface CardDefaultProps {
  children: ReactNode;
  area?: string;
  isList?: boolean;
}

export const CardDefault: React.FC<CardDefaultProps> = ({
  children,
  area,
  isList,
}) => (<S.Card $area={area} >
        <S.ScrollWrapper $isList={isList}>
          {children}
        </S.ScrollWrapper>
      </S.Card>);
