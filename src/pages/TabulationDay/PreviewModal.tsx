// @components/PreviewModal.tsx
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { HeaderPrint } from "./HeaderPrint";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  date: string;
  timezone: string;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  image,
  title,
  date,
  timezone,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContent>
        <CloseButton onClick={onClose} aria-label="Fechar modal">
          <FiX />
        </CloseButton>

        <HeaderPrint title={title} date={date} timezone={timezone} />

        <ImagePreview src={image} alt="Imagem da Tabulação" />
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
