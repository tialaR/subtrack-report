import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

type ContentProps = {
  visible: boolean;
}

export const Content = styled.div<ContentProps>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  ${typographyPreset[4]};
  background-color: ${({ theme }) => theme.colors.grey[900]};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[100]} ${({ theme }) => theme.spacing[150]};
  border-radius: ${({ theme }) => theme.spacing[150]};
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.shadows.md};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: all 0.2s ease-in-out;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -${({ theme }) => theme.spacing[200]};
    border-width: ${({ theme }) => theme.spacing[200]};
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.grey[900]} transparent transparent transparent;
  }
`;