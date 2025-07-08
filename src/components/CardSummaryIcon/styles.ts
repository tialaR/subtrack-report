import styled from "styled-components";
import { typographyPreset } from "@styles/typographyPreset";

export const Summary = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[250]} ${({ theme }) => theme.spacing[300]};
  gap: ${({ theme }) => theme.spacing[150]};
  background: ${({ theme }) => theme.colors.beige[100]};
  border-radius: ${({ theme }) => theme.spacing[150]};

  > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[150]};
      > span {
        ${({ theme }) => theme.typography.presets.text4};
        color: ${({ theme }) => theme.colors.grey[500]};
      }
      > h3 {
        ${typographyPreset[1]};
        color: ${({ theme }) => theme.colors.grey[900]};
      }
  }

  > svg {
    font-size: ${({ theme }) => theme.spacing[500]};
    color: ${({ theme }) => theme.colors.secondary.green};
  }
`;
