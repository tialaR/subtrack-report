import { iconMap } from '@utils/iconsHelper';
import type { ButtonIconProps } from './types';
import * as S from './styles';

export const ButtonIcon: React.FC<ButtonIconProps> = ({ 
  iconType, 
  isToggle = false,
  color, 
  size = 'regular', 
  variant = 'outlined', 
  isLoading = false,
  showLoadingOverlay = false,
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
      isLoading={isLoading}
      showLoadingOverlay={showLoadingOverlay}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {IconComponent && <IconComponent aria-hidden />}
    </S.IconButton>
  );
};
