import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import { typographyPreset } from "@styles/typographyPreset";

export const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing[300]};
`;

export const ToggleButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  ${typographyPreset[2]};
  gap: ${({ theme }) => theme.spacing[200]};
  padding: ${({ theme }) => theme.spacing[250]} 0;
`;

type ChevronProps = {
  open: boolean;
}

export const Chevron  = styled(FiChevronDown)<ChevronProps>`
  transition: transform 0.3s ease;
  transform: rotate(${props => (props?.open ? '180deg' : '0deg')});
`;

export const Grid = styled.div`
  margin-top: ${({ theme }) => theme.spacing[200]};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[250]};
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[250]};
  padding: ${({ theme }) => theme.spacing[100]} ${({ theme }) => theme.spacing[250]};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.spacing[150]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Emoji = styled.span`
  font-size: ${({ theme }) => theme.spacing[350]};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.span`
  ${typographyPreset[3.1]};
  color: ${({ theme }) => theme.colors.grey[500]};
`;