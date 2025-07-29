import { iconMap } from "@utils/iconsHelper";
import type { ButtonProps } from "./types";
import * as S from "./styles";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  iconType,
  showIcon = false,
  fullWidth = false,
  isLoading = false,
  showLoadingOverlay = false,
  children,
  ...rest
}) => {
  const IconComponent = iconType && iconMap[iconType];

  return (
    <S.Button
      variant={variant}
      fullWidth={fullWidth}
      iconType={iconType}
      isLoading={isLoading}
      showLoadingOverlay={showLoadingOverlay}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {children}
      {showIcon && IconComponent && <IconComponent aria-hidden />}
    </S.Button>
  );
};

export { Button };
