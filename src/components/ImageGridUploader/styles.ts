import styled, { css, keyframes } from 'styled-components';

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

// Spin Loader
const spin = keyframes`
  0% {
    transform: rotate(0deg) scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: rotate(180deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(0.95);
    opacity: 0.7;
  }
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Loader = styled.div`
  border: 0.25rem solid ${({ theme }) => theme.colors.beige[500]};
  border-top: 0.25rem solid ${({ theme }) => theme.colors.grey[800]};
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  animation: ${spin} 4s ease-in-out infinite;
`;
