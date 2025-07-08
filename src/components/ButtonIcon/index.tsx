import { iconMap } from '@utils/iconsHelper';
import type { ButtonIconProps } from './types';
import * as S from './styles';

export const ButtonIcon: React.FC<ButtonIconProps> = ({ 
  iconType, 
  isToggle = false,
  color, 
  size = 'regular', 
  variant = 'outlined', 
  ...rest 
}) => {
  const IconComponent = iconType ? iconMap[iconType] : null;

  return (
    <S.IconButton
      $size={size}
      $color={color}
      $iconType={iconType}
      $isToggle={isToggle}
      variant={variant}
      {...rest}
    >
      {IconComponent && <IconComponent aria-hidden />}
    </S.IconButton>
  );
};
