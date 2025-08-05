import { IconButton, LoaderSkeleton } from './styles';
import type { ButtonIconProps } from './types';
import { iconMap } from '@utils/iconsHelper';

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  iconType,
  size = 'regular',
  variant = 'outlined',
  isLoading = false,
  showLoadingOverlay = false,
  isToggle = false,
  color,
  ...rest
}) => {
  const IconComponent = iconType && iconMap[iconType];
  
  return (
    <IconButton
      type="button"
      $iconType={iconType}
      $size={size}
      variant={variant}
      isLoading={isLoading}
      showLoadingOverlay={showLoadingOverlay}
      $isToggle={isToggle}
      $color={color}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <LoaderSkeleton />
      ) : (
        <>{IconComponent && <IconComponent aria-hidden />}</>
      )}
    </IconButton>
  );
};
