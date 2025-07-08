import styled from "styled-components";

type RotationAnchorWrapperProps = {
  $position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

export const RotationAnchorWrapper = styled.div<RotationAnchorWrapperProps>`
  cursor: grab;
  position: absolute;
  width: ${({ theme }) => theme.spacing[350]};
  height: ${({ theme }) => theme.spacing[350]};
  border-radius: 50%;
  background-color: rgba(128, 128, 128, 0.1);
  transition: background-color 0.3s ease;
  z-index: 3;
  user-select: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    stroke: ${({ theme }) => theme.colors.grey[300]};
    width: ${({ theme }) => theme.spacing[200]};
    height: ${({ theme }) => theme.spacing[200]};
    stroke-width: 2; /* traço normal */
    pointer-events: none;
    transition: stroke 0.3s ease, stroke-width 0.3s ease;
  }

  &:hover > svg {
    stroke: ${({ theme }) => theme.colors.white};
    stroke-width: 3; /* traço mais grosso */
  }

  &:hover {
    background-color: rgba(128, 128, 128, 0.5);
  }

  ${({ $position }) => {
    switch ($position) {
      case 'top-left':
        return 'top: 0; left: 0;';
      case 'top-right':
        return 'top: 0; right: 0;';
      case 'bottom-left':
        return 'bottom: 0; left: 0;';
      case 'bottom-right':
        return 'bottom: 0; right: 0;';
      default:
        return '';
    }
  }}

  &:active {
    cursor: grabbing;
  }
`;