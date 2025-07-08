import styled, { css } from "styled-components";
import { typographyPreset } from "@styles/typographyPreset";

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
  padding-left: ${({ theme }) => theme.spacing[500]};
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
    ${typographyPreset[3.1]};
    white-space: nowrap;
    ${({ $expanded }) => !$expanded && css`
      display: none;
    `}
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
        width: ${theme.spacing[100]};
        background-color: ${theme.colors.secondary.green};
      }

      > svg {
        stroke: ${theme.colors.secondary.green};
        stroke-width: 3;
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

type CaretProps = {
  $open: boolean;
} 

export const Caret = styled.div<CaretProps>`
  margin-left: auto;
  padding-right: ${({ theme }) => theme.spacing[250]};

  > svg {
   font-size: ${({ theme }) => theme.spacing[250]};
   flex-shrink: 0;
   transition: transform 0.3s ease;
   transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;