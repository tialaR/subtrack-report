import styled, { css, keyframes } from 'styled-components';
import { theme } from '@styles/theme';
import type { ButtonIconProps } from './types';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

type StyledProps = {
  $size?: ButtonIconProps['size'];
  $isToggle?: boolean;
  $color?: string;
  $iconType?: keyof typeof import('@utils/iconsHelper').iconMap;
  variant?: ButtonIconProps['variant'];
  isLoading?: boolean;
  showLoadingOverlay?: boolean;
};

const sizeMap = {
  small: theme.spacing[100],
  regular: theme.spacing[400],
  medium: theme.spacing[500],
  large: theme.spacing[550],
};

const iconSizeMap = {
  small: theme.spacing[150],
  regular: theme.spacing[200],
  medium: theme.spacing[250],
  large: theme.spacing[300],
};

export const IconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$size', '$color', '$iconType', 'variant', 'isLoading', 'showLoadingOverlay'].includes(prop),
})<StyledProps>`
  position: relative;
  cursor: pointer;
  border: none;
  padding: ${({ theme }) => theme.spacing[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  width: ${({ $size = 'regular' }) => sizeMap[$size]};
  height: ${({ $size = 'regular' }) => sizeMap[$size]};

  > svg {
    width: ${({ $size = 'regular' }) => iconSizeMap[$size]};
    height: ${({ $size = 'regular' }) => iconSizeMap[$size]};
    stroke-width: 3;
    transition: stroke 0.3s ease;
  }

  ${({ variant = 'outlined', $color, $iconType, $isToggle, theme }) => {
    const isDeleteIcon = $iconType === 'delete' || $iconType === 'deleteAlt';

    let resolveFilledColor;
    if (isDeleteIcon) {
      resolveFilledColor = theme.colors.secondary.red;
    } else if ($isToggle) {
      resolveFilledColor = theme.colors.white;
    } else {
      resolveFilledColor = $color || theme.colors.secondary.green;
    }

    let resolvedOutlinedColor;
    if (isDeleteIcon) {
      resolvedOutlinedColor = theme.colors.secondary.red;
    } else {
      resolvedOutlinedColor = $color || theme.colors.grey[900];
    }

    if (variant === 'filled') {
      return css`
        background-color: ${theme.colors.grey[900]};

        > svg {
          stroke: ${theme.colors.white};
        }

        &:hover:not(:disabled) {
          > svg {
            stroke: ${resolveFilledColor};
          }
        }
      `;
    }

    return css`
      background-color: transparent;

      > svg {
        stroke: ${resolvedOutlinedColor};
      }

      &:hover:not(:disabled) {
        background-color: ${resolvedOutlinedColor};

        > svg {
          stroke: ${theme.colors.white};
        }
      }
    `;
  }}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey[500]};
    opacity: 0.3;
    cursor: not-allowed;
  }

  ${({ isLoading, showLoadingOverlay }) =>
    isLoading && showLoadingOverlay && css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 75%);
        background-size: 200% 100%;
        animation: ${shimmer} 1.2s ease-in-out infinite;
        z-index: 1;
      }
    `}
`;

export const LoaderSkeleton = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
`;
