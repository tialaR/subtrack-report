import * as S from './styles';

type Variant = 'primary' | 'default';

interface CardSummaryProps {
  title: string;
  amount: string | number;
  variant?: Variant;
}

export const CardSummary: React.FC<CardSummaryProps> = ({
  title,
  amount,
  variant = 'default',
}) => (
  <S.Card $variant={variant}>
    <S.Title $variant={variant}>{title}</S.Title>
    <S.Amount>{amount}</S.Amount>
  </S.Card>
);
