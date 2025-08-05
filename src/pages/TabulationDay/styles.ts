import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

export const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[200]};
  padding-bottom: ${({ theme }) => theme.spacing[200]} 0;
`;

export const WeatherCard = styled.div`
  cursor: pointer;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.spacing[150]};
  padding: ${({ theme }) => theme.spacing[200]} ${({ theme }) => theme.spacing[250]};
  display: flex;
  flex-direction: column;
  min-width: 8rem;
  gap: ${({ theme }) => theme.spacing[100]};
`;

export const Time = styled.div`
  ${typographyPreset[2]}
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[100]};
  color: ${({ theme }) => theme.colors.other.deepTeal};
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.spacing[500]};
  color: ${({ theme }) => theme.colors.other.steelBlue};
`;

export const Temp = styled.div`
  display: flex;
  align-items: center;
  ${typographyPreset[3.1]}
  color: ${({ theme }) => theme.colors.other.terracotta};
  gap: ${({ theme }) => theme.spacing[100]};
`;

export const Precip = styled.div`
  display: flex;
  align-items: center;
  ${typographyPreset[3.1]}
  color: ${({ theme }) => theme.colors.other.jadeGreen};
  gap: ${({ theme }) => theme.spacing[100]};
`;

export const Pressure = styled.div`
  display: flex;
  align-items: center;
  ${typographyPreset[3.1]}
  color: ${({ theme }) => theme.colors.other.oceanBlue};
  gap: ${({ theme }) => theme.spacing[100]};
`;

export const Message = styled.p`
  ${typographyPreset[2]}
  text-align: center;
  color: ${({ theme }) => theme.colors.grey[500]};
`;

// Tabulation -> Image Preview
export const PreviewWrapper = styled.div`
  text-align: center;
`;

export const PreviewTitle = styled.h2`
  ${typographyPreset[2]};
  color: ${({ theme }) => theme.colors.grey[900]};
`;

export const PreviewMeta = styled.p`
  ${typographyPreset[3]};
  color: ${({ theme }) => theme.colors.grey[500]};
  margin-top: ${({ theme }) => theme.spacing[200]};
`;

export const PreviewImage = styled.img`
  margin-top: ${({ theme }) => theme.spacing[600]};
  width: 100%;
  height: auto;
`;
