import styled from 'styled-components';

export const Body = styled.main`
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: ${({ theme }) => theme.spacing[250]};
  align-items: start;

  margin-top: ${({ theme }) => theme.spacing[250]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

/* —— Lista de Pots ———————————————————————————— */
export const List = styled.div`
  display: grid;
  align-self: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, minmax(0, 0.8fr));
  row-gap: ${({ theme }) => theme.spacing[200]};
  column-gap: ${({ theme }) => theme.spacing[200]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;
