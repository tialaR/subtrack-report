import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonIconSize = 'small' | 'regular' | 'medium' | 'large';

export type ButtonIconType = 'filled' | 'outlined';

export type ButtonIconProps = {
  iconType?: ButtonIconType;
  icon: ReactNode;
  size?: ButtonIconSize;
  color?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;