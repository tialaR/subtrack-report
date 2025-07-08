import styled from "styled-components";

export const StyleButtonsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[200]};
  margin-bottom: ${({ theme }) => theme.spacing[300]};
`;