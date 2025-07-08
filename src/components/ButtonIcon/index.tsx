import type { ButtonIconProps } from './types';
import * as S from './styles';

export const ButtonIcon: React.FC<ButtonIconProps> = ({ 
  icon, 
  color, 
  size = 'regular', 
  iconType = 'outlined', 
  ...rest 
}) => {
  return <S.IconButton $size={size} $color={color} $iconType={iconType} {...rest}>{icon}</S.IconButton>;
};