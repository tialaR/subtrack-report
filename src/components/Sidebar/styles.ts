import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
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
  width: ${({ $expanded }) => ($expanded ? '20%' : '7%')};
  background: ${({ theme }) => theme.colors.grey[900]};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: ${({ theme }) => theme.spacing[300]};
  border-top-right-radius: ${({ theme }) => theme.spacing[150]};
  border-bottom-right-radius: ${({ theme }) => theme.spacing[150]};
  overflow: hidden; /* esconde textos quando recolhido */
`;

export const Brand = styled.h1<CollapseProps>`
  ${typographyPreset[2]};
  ${hideWhenCollapsed};
  color: ${({ theme }) => theme.colors.white};
  padding-bottom: ${({ theme }) => theme.spacing[500]};
  padding-top: ${({ theme }) => theme.spacing[500]};
  padding-left: ${({ theme }) => theme.spacing[400]};
  margin-bottom: ${({ theme }) => theme.spacing[300]};
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[50]};
`;

export const NavItem = styled(NavLink).withConfig({
  shouldForwardProp: (prop) => prop !== '$expanded',
})<CollapseProps>`
  position: relative;                              
  display: flex;
  align-items: center;
  gap: ${({ $expanded, theme }) =>
    $expanded ? theme.spacing[200] : 0};
  padding-left: ${({ theme }) => `${theme.spacing[400]}`};
  padding-left: ${({ theme }) => `${theme.spacing[400]}`};
  padding-top: ${({ theme }) => `${theme.spacing[200]}`};
  padding-bottom: ${({ theme }) => `${theme.spacing[200]}`};
  border-top-right-radius: ${({ theme }) => theme.spacing[100]};
  border-bottom-right-radius: ${({ theme }) => theme.spacing[100]};
  background: transparent;
  cursor: pointer;

  transition: opacity 0.3s ease;

  > svg {
    font-size: ${({ theme }) => theme.spacing[300]};
    flex-shrink: 0;
  }

  > span {
    ${typographyPreset[3]};
    ${hideWhenCollapsed};
    white-space: nowrap;
  }

  &.active {
    color: ${({ theme }) => theme.colors.grey[900]};
    background-color: ${({ theme }) => theme.colors.beige[100]};

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: ${({ theme }) => theme.spacing[50]};
      background-color: ${({ theme }) => theme.colors.secondary.green};
    }

    &:hover {
      opacity: 0.60;          
    }
  }

  &:not(.active) {
    color: ${({ theme }) => theme.colors.grey[300]};
    &:hover {
      color: ${({ theme }) => theme.colors.beige[100]};       
    }
  }
`;

type NavItemButtonProps = {
  $expanded: boolean; 
  $active?: boolean
}

export const NavItemButton = styled.button<NavItemButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ $expanded, theme }) =>
    $expanded ? theme.spacing[200] : 0};
  padding-left: ${({ theme }) => theme.spacing[400]};
  padding-top: ${({ theme }) => theme.spacing[200]};
  padding-bottom: ${({ theme }) => theme.spacing[200]};
  width: 100%;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.beige[100] : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.grey[900] : theme.colors.grey[300]};
  border-top-right-radius: ${({ theme }) => theme.spacing[100]};
  border-bottom-right-radius: ${({ theme }) => theme.spacing[100]};
  cursor: pointer;
  transition: all 0.3s ease;

  > svg {
    font-size: ${({ theme }) => theme.spacing[300]};
    flex-shrink: 0;
  }

  > span {
    ${typographyPreset[3]};
    ${hideWhenCollapsed};
    white-space: nowrap;
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${theme.spacing[50]};
        background-color: ${theme.colors.secondary.green};
      }

      &:hover {
        opacity: 0.6;
      }
    `}

  ${({ $active, theme }) =>
    !$active &&
    css`
      &:hover {
        color: ${theme.colors.beige[100]};
      }
    `}
`;

export const SubNav = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing[500]};
  margin-top: ${({ theme }) => theme.spacing[50]};
`;

export const SubNavItem = styled(NavLink)`
  ${typographyPreset[4]};
  color: ${({ theme }) => theme.colors.grey[300]};
  padding: ${({ theme }) => theme.spacing[150]} 0;

  transition: color 0.3s ease;

  &.active {
    ${typographyPreset[4.1]};
    color: ${({ theme }) => theme.colors.white}; 
  }

  &:hover {
    color: ${({ theme }) => theme.colors.beige[100]};       
  }

  /* > span {
    margin-left: 0.5rem;
  } */
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
    ${typographyPreset[3]};
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
