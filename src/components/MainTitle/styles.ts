import { typographyPreset } from "@styles/typographyPreset";
import styled from "styled-components";

export const MainTitleContainer = styled.h1`
    ${typographyPreset[1]};
    padding-top: ${({ theme }) => theme.spacing[100]};
    padding-bottom: ${({ theme }) => theme.spacing[150]};
    color: ${({ theme }) => theme.colors.grey[900]};
`;