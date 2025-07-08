import { iconMap } from "@utils/iconsHelper";
import type { ButtonProps } from "./types";
import * as S from "./styles";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  iconType,
  showIcon = false,
  fullWidth = false,
  children,
  ...rest
}) => {
  const IconComponent = iconType && iconMap[iconType];

  return (
    <S.Button
      variant={variant}
      fullWidth={fullWidth}
      iconType={iconType}
      {...rest}
    >
      {children}
      {showIcon && IconComponent && <IconComponent aria-hidden />}
    </S.Button>
  );
};

export { Button };
