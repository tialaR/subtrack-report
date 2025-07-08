import styled from 'styled-components';

export const SummaryGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[300]};
  grid-template-columns: repeat(3, 1fr);
  padding-top: ${({ theme }) => theme.spacing[400]};
  padding-bottom: ${({ theme }) => theme.spacing[400]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(${({ theme }) => theme.dimensions.minColumnWidth}, 1fr)
    );
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const OverviewGrid = styled.section`
  flex: 1; // ocupa o espaço restante
  min-height: 0; // evita estourar o espaço

  display: grid;
  gap: ${({ theme }) => theme.spacing[300]};
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr 0.8fr 1.4fr;
  grid-template-areas:
  'pots         budgets'
  'transactions budgets'
  'transactions recurring'
  'transactions recurring';

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'pots'
      'transactions'
      'budgets'
      'recurring';
  }
`;



