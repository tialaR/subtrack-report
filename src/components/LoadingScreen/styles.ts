import styled, { keyframes } from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Wrapper = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[150]};
  text-align: center;
`;

export const Spinner = styled.div`
  width: ${({ theme }) => theme.spacing[600]};
  height: ${({ theme }) => theme.spacing[600]};
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${({ theme }) => theme.colors.secondary.purple};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

export const Title = styled.h2`
  ${typographyPreset[2]};
  color: ${({ theme }) => theme.colors.grey[500]};
`;

export const Description = styled.p`
  ${typographyPreset[3]};
  color: ${({ theme }) => theme.colors.grey[300]};
  max-width: 280px;
`;
