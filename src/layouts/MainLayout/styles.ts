import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;              
  width: 100%;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; // permite que filhos com overflow-y funcionem

  overflow-y: auto;
  background: #F2F3F7;

  padding: ${({ theme }) => theme.spacing[400]} ${({ theme }) => theme.spacing[500]};
`;
