import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';
import { typographyPreset } from '@styles/typographyPreset';

export const Container= styled.div`
    display: flex;
    flex-direction: column;
`

export const Description = styled.span`
  ${typographyPreset[4]}
  color: ${({ theme }) => theme.colors.grey[900]};
`;

export const ImageBoxWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[500]};
  margin-top: ${({ theme }) => theme.spacing[400]};
  flex-wrap: wrap;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 25rem;
  height: 25rem;
  border: 2px dashed ${({ theme }) => theme.colors.grey[300]};;
  border-radius: ${({ theme }) => theme.spacing[150]};
  background: ${({ theme }) => theme.colors.grey[100]};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const PreviewImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  `

export const DeleteIcon = styled(FiTrash2)`
    position: absolute;
    top: ${({ theme }) => theme.spacing[200]};
    right: ${({ theme }) => theme.spacing[150]};
    font-size: ${({ theme }) => theme.spacing[300]};
    color: ${({ theme }) => theme.colors.secondary.red};
    cursor: pointer;
  `

export const UploadBox = styled.label`
    position: relative;
    width: 25rem;
    height: 25rem;
    border-radius: ${({ theme }) => theme.spacing[50]};
    background-color: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.grey[500]};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    transition: background-color 0.3s;

    &:hover {
      filter: brightness(0.95); /* 80% do brilho original */
    }

    > input {
      display: none;
    }
`
