import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
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

type InputWrapperProps = {
  isOpen: boolean;
};

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.secondary.red};
  margin-left: ${({ theme }) => theme.spacing[50]};
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[150]} ${({ theme }) => theme.spacing[250]};
  border: 1px solid
    ${({ isOpen, theme }) =>
      isOpen ? theme.colors.secondary.green : theme.colors.beige[500]};
  border-radius: ${({ theme }) => theme.spacing[100]};
  background: ${({ theme }) => theme.colors.white};
  transition: border-color 0.3s;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.secondary.green};
  }
`;

export const Icon = styled.span`
  display: flex;
  margin-right: ${({ theme }) => theme.spacing[200]};
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary.green};
  font-size: ${({ theme }) => theme.spacing[200]};
`;

type SelectedValueProps = {
  $placeholder: boolean;
};

export const SelectedValue = styled.span<SelectedValueProps>`
  display: flex;
  flex: 1;
  ${typographyPreset[4]};
  color: ${({ theme, $placeholder }) =>
    $placeholder ? theme.colors.beige[500] : theme.colors.grey[900]};
`;

type ChevronProps = {
  isOpen: boolean;
};

export const Chevron = styled(FiChevronDown)<ChevronProps>`
  margin-left: ${({ theme }) => theme.spacing[200]};
  transition: transform 0.3s ease;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});

  stroke: ${({ theme }) => theme.colors.grey[900]};
  width: ${({ theme }) => theme.spacing[200]};
  height: ${({ theme }) => theme.spacing[200]};
`;

export const OptionList = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: ${({ theme }) => theme.spacing[100]};
  z-index: 10;
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  padding: 0 ${({ theme }) => theme.spacing[200]};
  max-height: 12.5rem;
  overflow-y: auto;

  > li {
    padding: ${({ theme }) => theme.spacing[150]} ${({ theme }) => theme.spacing[250]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
    border-radius: ${({ theme }) => theme.spacing[100]};
  }
`;

type OptionItemProps = {
  isSelected: boolean;
};

export const OptionItem = styled.li<OptionItemProps>`
  cursor: pointer;
  ${typographyPreset[4]};
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.grey[100] : theme.colors.white};
  color: ${({ theme }) => theme.colors.grey[500]};

  &:hover {
    background: ${({ theme }) => theme.colors.grey[50]};
  }
`;

export const HelperText = styled.span`
  ${typographyPreset[5]};
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.grey[500]};
`;
