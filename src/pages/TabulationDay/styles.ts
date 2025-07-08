import styled from "styled-components";

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(24, 1fr);
  border-bottom: 1px solid #ccc;
`;

export const Cell = styled.div`
  padding: 8px;
  text-align: center;
  font-size: 0.9rem;
  border-right: 1px solid #eee;
`;

export const LabelCell = styled(Cell)`
  background-color: #f0f0f0;
  font-weight: bold;
`;