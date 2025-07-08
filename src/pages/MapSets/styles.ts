import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh; 
`;

export const MapWrapper = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  user-select: none;
`;

export const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill; 
  display: block;
  user-select: none;
  pointer-events: none;
  outline: none;
`;

export const PositionedBubble = styled.div`
  position: absolute;
  will-change: transform, top, left;
  pointer-events: all;
  z-index: 5;
`;
