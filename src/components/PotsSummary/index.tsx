import { FiDollarSign } from "react-icons/fi";
import { CardDefault } from '@components/CardDefault';
import { CardHeader } from '../CardHeader';
import { StatWithBar } from '../StatWithBar';
import { CardSummaryIcon } from '../CardSummaryIcon';
import type{ ColorsMapKey } from '@styles/colorsMap';
import * as S from './styles';

export interface PotItem {
  label: string;
  amount: string;
  color: ColorsMapKey;     
}

interface PotsSummaryProps {
  total: string;
  items: PotItem[];
}

export const PotsSummary: React.FC<PotsSummaryProps> = ({
  items,
  total,
}) => (
  <CardDefault area="pots">
    <CardHeader 
      title="Pots" 
      buttomText="See Details"
    />

    <S.Body>
      <CardSummaryIcon
        icon={FiDollarSign}
        title="Total Saved"
        amount={total}
      />

      <S.List>
        {items?.map(({ label, amount, color }) => (
          <StatWithBar 
            key={label}
            label={label}
            amount={amount}
            color={color}
          />
        ))}
      </S.List>
    </S.Body>
  </CardDefault>
);
