import styled, { css } from 'styled-components';
import { theme } from '@styles/theme';
import type { ButtonIconProps, ButtonIconType } from './types';

type StyledProps = {
  $size?: ButtonIconProps['size'];
  $color?: string;
  $iconType?: ButtonIconType;
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
  shouldForwardProp: (prop) => !['$size', '$color', '$iconType'].includes(prop),
})<StyledProps>`
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

  ${({ $iconType = 'outlined', $color, theme }) => {
    const color = $color || theme.colors.secondary.purple;

    if ($iconType === 'filled') {
      return css`
        background-color: ${color};

        > svg {
          stroke: ${theme.colors.white};
        }

        &:hover:not(:disabled) {
          opacity: 0.9;
        }
      `;
    }

    // outlined
    return css`
      background-color: transparent;

      > svg {
        stroke: ${color};
      }

      &:hover:not(:disabled) {
        background-color: ${color};

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
`;
