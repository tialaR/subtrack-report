import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[250]};
`;