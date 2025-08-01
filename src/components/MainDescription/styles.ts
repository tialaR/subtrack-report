import styled from "styled-components";
import { typographyPreset } from "@styles/typographyPreset";

export const MainDescriptionContainer = styled.div`
  > span {
    ${typographyPreset[4]};
    color: ${({ theme }) => theme.colors.grey[900]};
    display: block;
    user-select: none;
  }
`;
