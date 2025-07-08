import { typographyPreset } from "@styles/typographyPreset";
import styled from "styled-components";

export const ErrorWrapper = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[150]};
  text-align: center;

  > svg {
    width: ${({ theme }) => theme.spacing[600]};
    height: ${({ theme }) => theme.spacing[600]};
    stroke: ${({ theme }) => theme.colors.secondary.red};
    stroke-width: 2;
  }
`;

export const ErrorTitle = styled.h2`
  ${typographyPreset[2]}
  color: ${({ theme }) => theme.colors.grey[500]};
`;

export const ErrorDescription = styled.p`
  ${typographyPreset[3]};
  color: ${({ theme }) => theme.colors.grey[300]};
  max-width: 400px;
`;
