import styled from "styled-components";
import { typographyPreset } from "@styles/typographyPreset";

export const List = styled.ul`
  margin-top: ${({ theme }) => theme.spacing[400]};
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[300]} 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.grey[100]};
  }
`;

export const AvatarWithName = styled.div`
    display: flex;
    align-items: center;
`;

export const Avatar = styled.img`
  width: ${({ theme }) => theme.spacing[500]};
  height: ${({ theme }) => theme.spacing[500]};
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const IconCircle = styled.span`
  width: ${({ theme }) => theme.spacing[500]};
  height: ${({ theme }) => theme.spacing[500]};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grey[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;
`;

export const Name = styled.span`
    display: flex;
    margin-left: ${({ theme }) => theme.spacing[200]};
    ${typographyPreset[4.1]};
    color: ${({ theme }) => theme.colors.grey[900]};
`;

type AmountAndDateProps = {
    $positive: boolean
}

export const AmountAndDate = styled.div<AmountAndDateProps>`
  display: flex;
  align-items: end;
  flex-direction: column;

  .amount {
    ${typographyPreset[4.1]}
    color: ${({ theme, $positive }) => $positive 
        ? theme.colorsMap.green 
        : theme.colors.grey[900]};
    flex-shrink: 0;
  }

  .date {
    ${typographyPreset[5]};
    color: ${({ theme }) => theme.colors.grey[500]};
    margin-top: ${({ theme }) => theme.spacing[50]};
  }
`;