import { ButtonIcon } from "@components/ButtonIcon";
import type { ModalProps } from "./types";
import * as S from "./styles";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = "regular",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer size={size} onClick={(e) => e.stopPropagation()}>
        <S.CloseButtonWrapper>
          <ButtonIcon
            onClick={(e) => {
              onClose();
              e.stopPropagation();
            }}
            iconType="close"
            variant="outlined"
            size="medium"
          />
        </S.CloseButtonWrapper>
        <S.ModalContent>{children}</S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export { Modal };
