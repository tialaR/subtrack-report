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
  small: css`
    width: 40%;
    height: 40%;
  `,
  regular: css`
    width: 50%;
    height: 50%;
  `,
  medium: css`
    width: 60%;
    height: 60%;
  `,
  large: css`
    width: 80%;
    height: 80%;
  `,
  auto: css`
    width: auto;
    height: auto;
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
