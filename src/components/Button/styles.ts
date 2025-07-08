import styled, { css } from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';
import type { ButtonProps } from './types';

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[150]};

  border-radius: ${({ theme }) => theme.spacing[100]};
  border: none;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: 3.7rem;

  white-space: nowrap;

  ${typographyPreset[3.1]}; // Default typography preset 16px

  transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;

  ${({ variant, theme, iconType }) => {
  const isDeleteIcon = iconType === 'delete' || iconType === 'deleteAlt';

  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.grey[900]};
        color: ${theme.colors.white};
        padding: ${theme.spacing[200]};
        padding-right: ${theme.spacing[250]};

        > svg {
          width: ${theme.spacing[200]};
          height: ${theme.spacing[200]};
          stroke: ${theme.colors.white};
          stroke-width: 3;
        }

        &:hover:not(:disabled) {
          background-color: ${isDeleteIcon
            ? theme.colors.secondary.red
            : theme.colors.grey[800]};
          > svg {
            stroke: ${theme.colors.white};
          }
        }

        &:disabled {
          background-color: ${theme.colors.grey[500]};
          opacity: 0.5;
          cursor: not-allowed;
        }
      `;

    case 'secondary':
      return css`
        background-color: ${theme.colors.white};
        color: ${theme.colors.grey[900]};
        border: 1px solid ${theme.colors.grey[900]};
        padding: ${theme.spacing[200]};

        > svg {
          width: ${theme.spacing[200]};
          height: ${theme.spacing[200]};
          stroke: ${theme.colors.grey[900]};
          stroke-width: 3;
        }

        &:hover:not(:disabled) {
          background-color: ${theme.colors.grey[50]};
          ${isDeleteIcon
            ? css`
                color: ${theme.colors.secondary.red};
                border-color: ${theme.colors.secondary.red};
                > svg {
                  stroke: ${theme.colors.secondary.red};
                }
              `
            : css`
                color: ${theme.colors.secondary.green};
                border-color: ${theme.colors.secondary.green};
                > svg {
                  stroke: ${theme.colors.secondary.green};
                }
              `}
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `;

    case 'tertiary':
      return css`
        background-color: transparent;
        color: ${theme.colors.grey[500]};
        align-items: center;
        justify-content: flex-start;
        ${typographyPreset[4.1]};

        > svg {
          width: ${theme.spacing[200]};
          height: ${theme.spacing[200]};
          stroke: ${theme.colors.grey[500]};
          stroke-width: 2;
        }

        &:hover:not(:disabled) {
          ${isDeleteIcon
            ? css`
                color: ${theme.colors.secondary.red};
                > svg {
                  stroke: ${theme.colors.secondary.red};
                }
              `
            : css`
                color: ${theme.colors.secondary.green};
                > svg {
                  stroke: ${theme.colors.secondary.green};
                }
              `}
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `;

    case 'destroy':
      return css`
        background-color: ${theme.colors.secondary.red};
        padding: ${theme.spacing[200]};
        color: ${theme.colors.white};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary.red};
          opacity: 0.7;
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `;

    default:
      return '';
  }
}}
`;
