import styled, { css } from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';
import type { ButtonProps } from './types';

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[150]};

  padding: ${({ theme }) => theme.spacing[200]};
  border-radius: ${({ theme }) => theme.spacing[100]};
  border: none;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};

  ${typographyPreset[3.1]}; // Default typography preset 16px

  transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.grey[900]};
          color: ${theme.colors.white};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.grey[500]};
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

          &:hover:not(:disabled) {
            filter: brightness(0.85);
            color: ${theme.colors.grey[500]};
            border: 1px solid ${theme.colors.grey[500]};
          }

          &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        `;
      case 'secondary-with-icon':
        return css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.grey[900]};
          border: 1px solid ${theme.colors.grey[900]};
          padding-right: ${theme.spacing[250]};

          > svg {
            width: ${theme.spacing[200]};
            height: ${theme.spacing[200]};
            stroke: ${theme.colors.grey[900]};
            stroke-width: 3; // traço mais grosso
          }

          &:hover:not(:disabled) {
            filter: brightness(0.85);
            color: ${theme.colors.grey[500]};
            border: 1px solid ${theme.colors.grey[500]};
            > svg {
              stroke: ${theme.colors.grey[500]};
            }
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
          ${typographyPreset[4]};

          &:hover:not(:disabled) {
            color: ${theme.colors.grey[900]};
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `;
      case 'destroy':
        return css`
          background-color: ${theme.colors.secondary.red};
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
      case 'with-icon':
        return css`
          background-color: ${theme.colors.grey[900]};
          color: ${theme.colors.white};
          padding-right: ${theme.spacing[250]};

          > svg {
            width: ${theme.spacing[200]};
            height: ${theme.spacing[200]};
            stroke: ${theme.colors.white};
            stroke-width: 3; // traço mais grosso
          }

          &:hover:not(:disabled) {
            background-color: ${theme.colors.grey[500]};
            > svg {
              stroke: ${theme.colors.white};
              opacity: 0.8;
            }
          }

          &:disabled {
            background-color: ${theme.colors.grey[500]};
            opacity: 0.5;
            cursor: not-allowed;
          }
        `;
      default:
        return '';
    }
  }}
`;
