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


/* Record day preview */
export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[350]};
`;

export const ImageBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;    
  gap: ${({ theme }) => theme.spacing[500]};
  background-color: red;
  width: 100%;
  box-sizing: border-box;
`;

export const PreviewTitle = styled.h2`
  ${typographyPreset[1]};
  color: ${({ theme }) => theme.colors.grey[900]};
`

export const ImageBox = styled.div`
  width: 25rem;
  height: 25rem;
  border-radius: ${({ theme }) => theme.spacing[150]};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grey[900]};

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PreviewImage = styled.img`
    width: 25rem;
    height: 25rem;
    object-fit: contain;
`

