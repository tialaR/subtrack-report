import styled from "styled-components";

export const ToggleToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 100;
`;

export const ToggleButtonArea = styled.div`
  position: relative;
  z-index: 110;
`;

type ToggleToolbarProps = {
    $hidden: boolean;
}

export const ToggleToolbar = styled.div<ToggleToolbarProps>`
  display: flex;
  align-items: center;
  transform: translateX(${({ $hidden }) => ($hidden ? '-100%' : '0')});
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  padding: ${({ theme }) => theme.spacing[200]} ${({ theme }) => theme.spacing[300]};
  gap: ${({ theme }) => theme.spacing[200]};
  z-index: 100;
`;