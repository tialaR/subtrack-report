import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';
import type { HTMLAttributes } from 'react';

type BubbleWrapperProps = {
  $rotation: number;
} & HTMLAttributes<HTMLDivElement>;

export const BubbleWrapper = styled.div<BubbleWrapperProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.grey[900]};
  border-radius: ${({ theme }) => theme.spacing[150]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transform: ${({ $rotation }) => `rotate(${$rotation}deg)`};
  transform-origin: center;
  transition: transform 0.15s ease;
  cursor: grab;

  /* Remove o foco azul ao clicar */
  outline: none;

  /* Impede seleção de texto/imagem */
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    bottom: -34px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 22px solid transparent;
    border-right: 22px solid transparent;
    border-top: 34px solid ${({ theme }) => theme.colors.grey[900]};
    z-index: 1;
  }

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
    border-top: 32px solid ${({ theme }) => theme.colors.white};
    z-index: 2;
  }
`;

export const BubbleImage = styled.img`
  width: 15.625rem;
  height: auto;
  border-radius: ${({ theme }) => theme.spacing[150]};
  pointer-events: none;
  user-select: none;
  outline: none;
`;

export const BubbleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${typographyPreset[3]}
  padding: ${({ theme }) => theme.spacing[250]} ${({ theme }) => theme.spacing[350]};
  gap: ${({ theme }) => theme.spacing[50]};
  user-select: none;

  > span {
    padding-right: ${({ theme }) => theme.spacing[50]};
  }
`;
