import type { ColorsMapKey } from "@styles/colorsMap";
import * as S from './styles';

interface StstWithBarProps {
    label: string;
    amount: string;
    color: ColorsMapKey;
}

const StatWithBar: React.FC<StstWithBarProps> = ({
    label,
    amount,
    color,
}) => {
  return (
    <S.StatWrapper>
        <S.ColorBar $color={color} />
        <div>
            <span>{label}</span>
            <h4>{amount}</h4>
        </div>
    </S.StatWrapper>
  )
}

export { StatWithBar };