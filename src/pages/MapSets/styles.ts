import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Description = styled.span`
  ${typographyPreset[4]};
  color: ${({ theme }) => theme.colors.grey[900]};
  display: block;
  padding: ${({ theme }) => theme.spacing[300]};
`;

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 200px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MapImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
`;