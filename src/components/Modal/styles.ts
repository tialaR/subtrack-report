import styled, { css } from 'styled-components';
import type { ModalSize } from './types';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.shadows.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const sizeMap = {
  regular: css`
    width: 400px;
    height: 300px;
  `,
  medium: css`
    width: 600px;
    height: 450px;
  `,
  large: css`
    width: 80%;
    height: 80%;
  `,
};

type ModalContainerProps = {
  size: ModalSize;
}

export const ModalContainer = styled.div<ModalContainerProps>`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.spacing[150]};
  padding: ${({ theme }) => theme.spacing[600]};
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.modal};
  ${({ size }) => sizeMap[size]}
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[400]};
  right: ${({ theme }) => theme.spacing[400]};
`;

export const ModalContent = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;
