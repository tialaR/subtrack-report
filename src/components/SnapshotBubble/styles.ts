import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

type BubbleWrapperProps = {
  $rotation: number;
}

export const BubbleWrapper = styled.div<BubbleWrapperProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.grey[900]}; // ← Borda ao redor do balão
  border-radius: ${({ theme }) => theme.spacing[150]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  transform: ${({ $rotation }) => `rotate(${$rotation}deg)`};
  transform-origin: center;
  transition: transform 0.3s ease;
  
  cursor: grab;
  z-index: 10;

  // seta da borda (camada de fundo)
  &::before {
    content: '';
    position: absolute;
    bottom: -34px; /* ligeiramente abaixo da principal */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 22px solid transparent;
    border-right: 22px solid transparent;
    border-top: 34px solid ${({ theme }) => theme.colors.grey[900]}; /* mesma cor da borda */
    z-index: 1;
  }

  // seta branca sobreposta (balão)
  &::after {
    content: '';
    position: absolute;
    bottom: -32px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 32px solid ${({ theme }) => theme.colors.white}; /* mesma do fundo */
    z-index: 2;
  }
`;


export const BubbleImage = styled.img`
  width: 250px;
  height: auto;
  border-radius: ${({ theme }) => theme.spacing[150]};
  pointer-events: none;
`;

export const BubbleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${typographyPreset[2]}
  padding: ${({ theme }) => theme.spacing[100]};
  gap: ${({ theme }) => theme.spacing[50]};
`;

export const IconButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  padding: ${({ theme }) => theme.spacing[50]};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  > svg {
    color: ${({ theme }) => theme.colors.secondary.purple};
    font-size: 28px;
  }

  &:hover {
    opacity: 0.6;
  }
`;
