import styled from "styled-components";
import { typographyPreset } from "@styles/typographyPreset";
import type { ColorsMapKey } from "@styles/colorsMap";

export const StatWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[200]};

  > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[50]};
    
    > span {
      ${typographyPreset[5]};
      color: ${({ theme }) => theme.colors.grey[500]};
    }
    > h4 {
      ${typographyPreset[3]};
      color: ${({ theme }) => theme.colors.grey[900]};
    }
  }

`;

type ColorBarProps = {
    $color: ColorsMapKey;
}

export const ColorBar = styled.span<ColorBarProps>`
  width: ${({ theme }) => theme.spacing[50]};
  align-self: stretch;                        
  border-radius: ${({ theme }) => theme.spacing[50]};
  background: ${({ $color, theme }) => theme.colorsMap[$color]};
`;