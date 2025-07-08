import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

export const List = styled.ul`
  margin-top: ${({ theme }) => theme.spacing[400]};
`;

type ItemProps = {
  $color: string;
}

export const Item = styled.li<ItemProps>`
  background: ${({ theme }) => theme.colors.beige[100]};
  border-radius: ${({ theme }) => theme.spacing[150]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[300]} ${({ theme }) => theme.spacing[200]};
  border-left: 6px solid ${({ $color }) => $color};

  & + & {
    margin-top: ${({ theme }) => theme.spacing[150]};
  }
`;

export const Label = styled.span`
  ${typographyPreset[4]}
  color: ${({ theme }) => theme.colors.grey[500]};
`;

export const Amount = styled.span`
  ${typographyPreset[4.1]}
  color: ${({ theme }) => theme.colors.grey[900]};
`;