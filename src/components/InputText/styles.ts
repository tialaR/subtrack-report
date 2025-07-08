import styled from "styled-components";
import { typographyPreset } from "@styles/typographyPreset";

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[50]};
  width: 100%;
`;

export const Label = styled.label`
  ${typographyPreset[5.1]};
  color: ${({ theme }) => theme.colors.grey[500]};
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.secondary.red};
  margin-left: ${({ theme }) => theme.spacing[50]};
`;

export const InputWrapper = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing[150]} ${({ theme }) => theme.spacing[250]};
  border: 1px solid ${({ theme }) => theme.colors.beige[500]}; //mudar no onFocus
  border-radius: ${({ theme }) => theme.spacing[100]};
  background: ${({ theme }) => theme.colors.white};
  transition: border-color 0.3s;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.secondary.green};
  }
`;

export const Icon = styled.span`
  display: flex;
  margin-left: ${({ theme }) => theme.spacing[200]};
  align-items: center;
  color: ${({ theme }) => theme.colors.grey[900]};
  font-size: ${({ theme }) => theme.spacing[200]};
`;

export const IconButton = styled.button`
  cursor: pointer;
  all: unset;
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing[200]};
  color: ${({ theme }) => theme.colors.grey[900]};
  font-size: ${({ theme }) => theme.spacing[200]};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary.green};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary.green};
    border-radius: ${({ theme }) => theme.spacing[50]};
  }
`;

export const Prefix = styled.span`
  display: flex;
  margin-right: ${({ theme }) => theme.spacing[150]};
  align-items: center;
  color: ${({ theme }) => theme.colors.beige[500]};
  font-size: ${({ theme }) => theme.spacing[200]};
`;

export const StyledInput = styled.input`
  flex: 1;
  ${typographyPreset[4]};
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.grey[900]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.beige[500]};
  }
`;

export const HelperText = styled.span`
  ${typographyPreset[5]};
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.grey[500]};
`;
