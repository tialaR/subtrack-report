import styled, { css } from 'styled-components';

export const ImageBoxWrapper = styled.div`
  display: flex;
 gap: ${({ theme }) => theme.spacing[500]};
  margin-top: ${({ theme }) => theme.spacing[400]};
  flex-wrap: wrap;
  gap: 16px;
`;

type ImageBoxProps = {
  $hasImage: boolean;
}

export const ImageBox = styled.div<ImageBoxProps>`
  cursor: pointer;
  position: relative;
  width: 25rem;
  height: 25rem;
  border-radius: ${({ theme }) => theme.spacing[150]};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${({ $hasImage, theme }) => css`
    border: ${$hasImage
      ? `2px solid ${theme.colors.grey[300]}`
      : `2px dashed ${theme.colors.grey[300]}`};
    background-color: ${$hasImage ? theme.colors.grey[900] : theme.colors.grey[100]};
  `}
`;

export const UploadBox = styled.label<ImageBoxProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 25rem;
  height: 25rem;
  border-radius: ${({ theme }) => theme.spacing[150]};
  color: ${({ theme }) => theme.colors.grey[500]};
  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.3s ease, filter 0,3 ease;

  ${({ $hasImage, theme }) =>
    !$hasImage &&
    css`
      &:hover {
        cursor: pointer;
        background-color: ${theme.colors.grey[100]};
        filter: brightness(0.95);
      }
    `}

  > input {
    display: none;
  }
`;

export const PreviewImage = styled.img`
    width: 25rem;
    height: 25rem;
    object-fit: contain;
`

export const ButtonIconWrapper = styled.div`
    position: absolute;
    top: ${({ theme }) => theme.spacing[200]};
    right: ${({ theme }) => theme.spacing[150]};

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing[100]};
    }
  `
