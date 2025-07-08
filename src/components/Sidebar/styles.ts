import styled, { css } from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

type CollapseProps = { 
  $expanded: boolean;
  $active?: boolean;
};

/* helper */
const hideWhenCollapsed = css<CollapseProps>`
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  pointer-events: ${({ $expanded }) => ($expanded ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

export const SidebarContainer = styled.aside<CollapseProps>`
  height: 100vh;
  width: ${({ $expanded }) => ($expanded ? '20%' : '5%')};
  background: ${({ theme }) => theme.colors.grey[900]};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: ${({ theme }) => theme.spacing[300]};
  border-top-right-radius: ${({ theme }) => theme.spacing[150]};
  border-bottom-right-radius: ${({ theme }) => theme.spacing[150]};
  overflow: hidden; /* esconde textos quando recolhido */

  > div {
    padding-top: ${({ theme }) => theme.spacing[500]};
  }
`;

export const Brand = styled.div<CollapseProps>`
  display: flex;
  padding-left: ${({ theme }) => theme.spacing[500]};
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  gap: ${({ theme }) => theme.spacing[250]};
`;

export const Toggle = styled.button<CollapseProps>`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  gap: ${({ $expanded, theme }) =>
    $expanded ? theme.spacing[200] : 0};
  padding-left: ${({ theme }) => `${theme.spacing[400]}`};
  padding-left: ${({ theme }) => `${theme.spacing[400]}`};
  padding-top: ${({ theme }) => `${theme.spacing[200]}`};
  padding-bottom: ${({ theme }) => `${theme.spacing[200]}`};
  margin-bottom: ${({ theme }) => `${theme.spacing[500]}`};
  color: ${({ theme }) => theme.colors.grey[300]};
  cursor: pointer;

  transition: color 0.3s ease;

  > svg {
    transform: ${({ $expanded }) => ($expanded ? 'rotate(0deg)' : 'rotate(180deg)')};
    transition: transform 0.3s ease;
    font-size: ${({ theme }) => theme.spacing[300]};
    flex-shrink: 0;
  }

  > span {
    ${typographyPreset[3.1]};
    ${hideWhenCollapsed};
    white-space: nowrap;
  }

  &:not(.active) {
    color: ${({ theme }) => theme.colors.grey[300]};
    &:hover {
      color: ${({ theme }) => theme.colors.beige[100]};       
    }
  }
`;
