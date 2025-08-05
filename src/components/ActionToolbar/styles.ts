import styled from "styled-components";

type ActionToolbarContainerProps = { 
    $vertical: boolean 
};

export const ActionToolbarContainer = styled.div<ActionToolbarContainerProps>`
  display: flex;
  align-items: flex-start;
`;

type ActionToolbarWrapperProps = { 
    $hidden: boolean; 
    $vertical: boolean 
};

export const ActionToolbarWrapper = styled.div<ActionToolbarWrapperProps>`
  position: relative;
  display: flex;
  align-items: flex-start;
  z-index: 100;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  gap: ${({ theme }) => theme.spacing[100]};

  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 0.5s ease;
`;

export const ToggleButtonArea = styled.div`
  position: relative;
  z-index: 110;
`;

type ActionToolbarProps = { 
    $hidden: boolean; 
    $vertical: boolean; 
}

export const ActionToolbar = styled.div<ActionToolbarProps>`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'column' : 'row')};
  align-items: ${({ $vertical }) => ($vertical ? 'stretch' : 'center')};
  width: 100%;
  box-sizing: border-box; // evita overflow oculto por padding interno

  transform: ${({ $hidden, $vertical }) =>
    $hidden
      ? $vertical
        ? "translateY(-120%)"
        : "translateX(-120%)"
      : "translate(0, 0)"};
  transition: transform 0.5s ease, max-height 0.5s ease;
  gap: ${({ theme }) => theme.spacing[150]};
  z-index: 100;
`;

