import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

type CollapseProps = { 
  $expanded: boolean;
};

/* helper */
const hideWhenCollapsed = css<CollapseProps>`
  white-space: nowrap;
  transition: opacity 0.3s ease;
`;

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const StyledLink = styled(NavLink)<CollapseProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[200]};
  margin-left: ${({ theme }) => theme.spacing[400]};
  text-decoration: none;

  gap: ${({ $expanded, theme }) =>
    $expanded ? theme.spacing[150] : 0};

  > svg {
    width: ${({ theme }) => theme.spacing[200]};
    height: ${({ theme }) => theme.spacing[200]};
    stroke: ${({ theme }) => theme.colors.grey[300]};
    stroke-width: 2;
    flex-shrink: 0;
  }

  > span {
    color: ${({ theme }) => theme.colors.grey[300]};
    ${hideWhenCollapsed};
    ${typographyPreset[4]};
    white-space: nowrap;
  }

  &.active {
    > span {
      color: ${({ theme }) => theme.colors.white};
      ${typographyPreset[4.1]}
    }

    > svg {
      stroke: ${({ theme }) => theme.colors.white};
      stroke-width: 3;
    }
  }

  &:hover {
    > span {
      color: ${({ theme }) => theme.colors.white};
    }
    > svg {
      stroke: ${({ theme }) => theme.colors.white};
    }
  }
`;