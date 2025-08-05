import styled from 'styled-components';

export const ImageAnnotatorWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: relative;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  outline: none;
  user-select: none;
`;

export const ZoomWrapper = styled.div<{
  $width: number;
  $height: number;
  $scale: number;
  $isSelecting: boolean;
}>`
  position: relative;
  width: ${({ $width, $scale }) => `${$width * $scale}px`};
  height: ${({ $height, $scale }) => `${$height * $scale}px`};
  cursor: ${({ $isSelecting }) => ($isSelecting ? 'crosshair' : 'grab')};

  > img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
    pointer-events: none;
  }
`;

export const Marker = styled.div`
  position: absolute;
  width: ${({ theme }) => theme.spacing[200]};
  height: ${({ theme }) => theme.spacing[200]};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid white;
  z-index: 5;
`;

export const FloatingToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 100;
`;

export const ToggleButtonArea = styled.div`
  position: relative;
  z-index: 110;
`;

export const FloatingToolbar = styled.div<{ $hidden: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  transform: translateX(${({ $hidden }) => ($hidden ? '-100%' : '0')});
  transition: transform 0.3s ease;
  gap: ${({ theme }) => theme.spacing[200]};
  z-index: 100;
`;

export const MarkerToolboxWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[200]};
  left: ${({ theme }) => theme.spacing[200]};
  z-index: 10;
`;
