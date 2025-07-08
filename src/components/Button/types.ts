export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destroy';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  iconType?: keyof typeof import('@utils/iconsHelper').iconMap;
  showIcon?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}
