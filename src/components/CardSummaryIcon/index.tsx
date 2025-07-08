import * as S from './styles';
import type { IconType } from 'react-icons';

interface CardSummaryIconProps {
    title: string;
    amount: string;
    icon: IconType;
}

const CardSummaryIcon: React.FC<CardSummaryIconProps> = ({
    title,
    amount,
    icon,
}) => {
  const IconComponent = icon;

  return (
    <S.Summary>
    <IconComponent />
        <div>
            <span>{title}</span>
            <h3>{amount}</h3>
        </div>
    </S.Summary>
  );
}

export { CardSummaryIcon };