import styled from "styled-components";
import { typographyPreset } from "@styles/typographyPreset";

export const ToolbarWrapper = styled.div`
  position: absolute;
  z-index: 20;
  transition: left 0.1s ease, top 0.1s ease;
  padding: 0 ${({ theme }) => theme.spacing[200]};
  border-radius: ${({ theme }) => theme.spacing[150]};
`;

export const ToolbarWrapperButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[100]};
  padding: 0 ${({ theme }) => theme.spacing[200]};
  background-color: ${({ theme }) => theme.colors.grey[900]};
  border-radius: ${({ theme }) => theme.spacing[150]};
  width: fit-content; /* só ocupa o necessário */
  max-width: 100%; /* evita overflow */
`;

export const IconButton = styled.button`
  cursor: grabbing;
  height: 3.5rem;
  width: auto;
  border: none;
  padding: 0 ${({ theme }) => theme.spacing[50]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  background-color: transparent;

  > svg {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.spacing[300]};
  }

  &:hover {
    opacity: 0.85;
  }
`;

export const ToolbarToggle = styled.button`
  cursor: pointer;
  height: 3.5rem;
  width: auto;
  padding: ${({ theme }) => theme.spacing[50]};
  border: none;
  color: ${({ theme }) => theme.colors.white};
  ${typographyPreset[3.1]};
  transition: opacity 0.3s ease;
  background-color: transparent;

  > div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[200]};
  }

  &:hover {
    opacity: 0.85;
  }
`;

export const Toolbar = styled.div`
  margin-top: ${({ theme }) => theme.spacing[100]};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  padding: ${({ theme }) => theme.spacing[200]};
  border-radius: ${({ theme }) => theme.spacing[150]};
  min-width: 16.25rem; /* 260px */
`;

export const LegendBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[150]};
`;

export const ColorRow = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[150]};
  border-radius: ${({ theme }) => theme.spacing[150]};
  padding: ${({ theme }) => theme.spacing[100]};

  &:hover {
    background: ${({ theme }) => theme.colors.grey[50]};
  }
`;

export const ColorDot = styled.div`
  width: ${({ theme }) => theme.spacing[350]};
  height: ${({ theme }) => theme.spacing[350]};
  border-radius: ${({ theme }) => theme.spacing[50]};
`;

export const ColorLabel = styled.span`
  ${typographyPreset[4]};
  color: ${({ theme }) => theme.colors.grey[900]};
`;
