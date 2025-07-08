export type ButtonIconSize = 'small' | 'regular' | 'medium' | 'large';

export type ButtonIconVariant = 'filled' | 'outlined';

export type ButtonIconProps = {
  variant?: ButtonIconVariant;
  isToggle?: boolean;
  iconType?: keyof typeof import('@utils/iconsHelper').iconMap;
  size?: ButtonIconSize;
  color?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;