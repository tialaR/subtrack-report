export type ButtonIconSize = 'small' | 'regular' | 'medium' | 'large';

export type ButtonIconVariant = 'filled' | 'outlined';

export type ButtonIconProps = {
  variant?: ButtonIconVariant;
  isToggle?: boolean;
  iconType?: keyof typeof import('@utils/iconsHelper').iconMap;
  size?: ButtonIconSize;
  color?: string;
  isLoading?: boolean;
  showLoadingOverlay?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// Quando isLoading={true} e showLoadingOverlay={true}, o botão exibe um efeito de 
// skeleton animado por cima do ícone, sem esconder o conteúdo visual.
// O botão é desativado automaticamente durante o carregamento.
