import type { ButtonProps } from './types';
import * as S from './styles';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon = <></>,
  fullWidth = false,
  children,
  ...rest
}) => {
  return (
    <S.Button 
      variant={variant} 
      fullWidth={fullWidth} 
      {...rest}
    >
      {children}
      {icon && variant === 'with-icon' && icon}
      {icon && variant === 'secondary-with-icon' && icon}
    </S.Button>
  );
};

export { Button };
