import styled, { css } from "styled-components";
import { typographyPreset } from "@styles/typographyPreset";

type ToastWrapperProps = {
    visible: boolean;
};

type ToastInfoContainerProps = {
    $type: "success" | "error" | "info";
};

export const ToastWrapper = styled.div<ToastWrapperProps>`
    position: fixed;
    top: 6.8rem;
    right: 3rem;
    display: flex;
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
    transform: ${({ visible }) => (visible ? "translateX(0)" : "translateX(100%)")};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    z-index: 9999;
`;

export const ToastInfoContainer = styled.div<ToastInfoContainerProps>`
    border-width: 3px;
    border-style: solid;
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing[300]};
    border-radius: ${({ theme }) => theme.spacing[150]};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[200]};
    box-shadow: ${({ theme }) => theme.shadows.md};

    ${({ $type, theme }) => {
        if ($type === "success") {
            return css`
                border-color: ${theme.colors.secondary.green};
                > svg {
                    stroke: ${theme.colors.secondary.green};
                }
            `;
        }
        if ($type === "error") {
            return css`
                border-color: ${theme.colors.secondary.red};
                > svg {
                    stroke: ${theme.colors.secondary.green};
                }
            `;
        }
        return css`
            border-color: ${theme.colors.secondary.purple};
            > svg {
                stroke: ${theme.colors.secondary.green};
            }
        `;
  }}
`;

export const ToastInfoContent = styled.div`
    display: flex;
    flex-direction: column;

    > p {
        margin: 0;
        ${typographyPreset[3]}
        color: ${({ theme }) => theme.colors.grey[900]};
    }

    > small {
        ${typographyPreset[4.1]}
        color: ${({ theme }) => theme.colors.grey[500]};
    }
`;