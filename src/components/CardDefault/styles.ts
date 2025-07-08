import styled, { css } from 'styled-components';

type CardProps = {
  $area?: string;
  $isList?: boolean;
};

export const Card = styled.section<CardProps>`
  ${({ $area }) =>
    $area &&
    css`
      grid-area: ${$area};
    `}

  /* Mantém o border-radius visível, mas impede scroll lateral */
  overflow-x: clip; /*  não cria gutter */
  overflow-y: visible; /* Y fica por conta da ScrollWrapper */

  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.spacing[150]};
  background: ${({ theme }) => theme.colors.white};
`;

export const ScrollWrapper = styled.div<CardProps>`
  flex: 1;
  min-height: 0; /* permite encolher dentro de flex/grid */

  overflow-y: ${({ $isList }) => ($isList ? 'auto' : 'visible')};
  overflow-x: clip; /* garante que não haja scroll lateral */

  padding: ${({ theme }) => theme.spacing[400]};

  /* Mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[300]};
  }
`;
