import styled from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

export const Container= styled.div`
    display: flex;
    flex-direction: column;
`

export const Description = styled.span`
  ${typographyPreset[4]}
  color: ${({ theme }) => theme.colors.grey[900]};
`;

export const Message = styled.span`
  ${typographyPreset[4]}
  color: ${({ theme }) => theme.colors.grey[900]};
  margin-top: ${({ theme }) => theme.spacing[400]};
`;

/* Record day preview */
export const PrevieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[400]};
`;

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[350]};
`;

export const ImageBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3 colunas fixas
  gap: ${({ theme }) => theme.spacing[50]};
  width: 100%;
  box-sizing: border-box;
  justify-items: center;
  align-items: center;
`;

export const PreviewTitle = styled.h2`
  ${typographyPreset[1]};
  color: ${({ theme }) => theme.colors.grey[900]};
`

export const ImageBox = styled.div`
  width: 25rem;
  height: 25rem;
  background-color: ${({ theme }) => theme.colors.grey[900]};
  border-radius: ${({ theme }) => theme.spacing[150]};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;


export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

