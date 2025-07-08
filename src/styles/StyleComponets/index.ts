import styled from "styled-components";

export const StyleButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  gap: ${({ theme }) => theme.spacing[200]};
`;

export const StyleButtonsWrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: ${({ theme }) => theme.spacing[200]};
`;