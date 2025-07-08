import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

export const Container= styled.div`
    display: flex;
    flex-direction: column;
`

export const Description = styled.span`
  ${typographyPreset[4]}
  color: ${({ theme }) => theme.colors.grey[900]};
`;

