import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: crosshair;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[100]};
  margin-top: ${({ theme }) => theme.spacing[400]};
  margin-bottom: ${({ theme }) => theme.spacing[400]};
  background: ${({ theme }) => theme.colors.grey[500]};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  ${typographyPreset[3]}
  cursor: pointer;

  > svg {
    margin-left: ${({ theme }) => theme.spacing[100]};
  }

  &:hover {
    opacity: 0.85;
  }
`;

export const ToolbarWrapper = styled.div`
  position: absolute;
  z-index: 20;
  transition: left 0.1s ease, top 0.1s ease;
`;

export const ToolbarToggle = styled.button`
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.grey[900]};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[150]};
  ${typographyPreset[2]}
  cursor: move;

  > div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[200]};
  }

  svg {
    font-size: 16px;
  }

  &:hover {
    opacity: 0.85;
  }
`;

export const Toolbar = styled.div`
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  padding: 16px;
  border-radius: 8px;
  min-width: 260px;
`;

export const LegendBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

export const ColorDot = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 4px;
`;

export const ColorLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey[900]};
`;

export const Marker = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid white;
  z-index: 5;
`;