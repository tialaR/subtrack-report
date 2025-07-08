import styled, { css } from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

type CardProps = {
  $variant: 'primary' | 'default';
}

/* helpers */
const primaryStyles = css`
  background: ${({ theme }) => theme.colors.grey[900]};
  color: ${({ theme }) => theme.colors.white};
`;

const defaultStyles = css`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.grey[900]};
`;

export const Card = styled.div<CardProps>`
  ${({ $variant }) => ($variant === 'primary' ? primaryStyles : defaultStyles)};
  border-radius: ${({ theme }) => theme.spacing[150]};
  padding: ${({ theme }) => theme.spacing[300]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[150]};
  flex: 1;                       /* ocupa largura disponível no desktop */
  min-width: 0;                  /* evita overflow de flex */

  /* tablet */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1 1 0;
    min-width: 13.375rem;  /* encolhe até esse limite        */
  }

  /* mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 0 0 100%;
  }
`;

export const Title = styled.span<CardProps>`
  ${({ $variant, theme }) =>
    $variant === 'default' &&
    css`
      color: ${theme.colors.grey[500]};
    `}
    overflow-wrap: break-word;
`;

export const Amount = styled.span`
  ${typographyPreset[1]};
  overflow-wrap: break-word;
`;
