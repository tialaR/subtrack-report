import { CardDefault } from '@components/CardDefault';
import { CardHeader } from '@components/CardHeader';
import type { ColorsMapKey } from '@styles/colorsMap';

import * as S from './styles';

interface RecurringBillSummaryProps {
  label: string;
  amount: number;
  color: ColorsMapKey; 
}

interface RecurringBillsSummaryProps {
  bills: RecurringBillSummaryProps[];
  maxVisible?: number;
}

export const RecurringBillsSummary: React.FC<RecurringBillsSummaryProps> = ({
  bills,
  maxVisible = 3,
}) => {
  const visibleBills = bills?.slice(0, maxVisible);

  return (
    <CardDefault area='recurring' isList>
      <CardHeader title="Recurring Bills" buttomText="See Details" />

      <S.List>
        {visibleBills?.map((bill) => (
          <S.Item key={bill?.label} $color={bill?.color}>
            <S.Label>{bill?.label}</S.Label>
            <S.Amount>{`$${bill?.amount?.toFixed(2)}`}</S.Amount>
          </S.Item>
        ))}
      </S.List>
    </CardDefault>
  );
};
