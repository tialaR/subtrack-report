import { FiTrash2, FiRefreshCcw } from 'react-icons/fi';
import { IconButton, LoaderSkeleton } from './styles';
import type { ButtonIconProps } from './types';

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
  const renderIcon = () => {
    switch (iconType) {
      case 'delete':
        return <FiTrash2 />;
      case 'refresh':
        return <FiRefreshCcw />;
      default:
        return null;
    }
  };

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
        renderIcon()
      )}
    </IconButton>
  );
};
