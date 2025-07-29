export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destroy';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  iconType?: keyof typeof import('@utils/iconsHelper').iconMap;
  showIcon?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  /**
   * Exibe um efeito de skeleton/gradiente por cima do botão durante o carregamento,
   * sem esconder o conteúdo original (texto e ícone).
   */
  showLoadingOverlay?: boolean;
}
