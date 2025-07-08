import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h2 {
    ${typographyPreset[2]};
    padding-right: ${({ theme }) => theme.spacing[50]};
  }
`;

export const ButtonContainer = styled.button`
  ${typographyPreset[4]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[50]};
  color: ${({ theme }) => theme.colors.grey[500]};
  background: none;
  border: none;
  cursor: pointer;

  > svg {
    overflow: visible; //Garante que o ícone apareça
  }

  &:hover {
    opacity: 0.60;          
  }
`;
