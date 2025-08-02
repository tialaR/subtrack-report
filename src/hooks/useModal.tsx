import { useState, useCallback } from 'react';
import { Modal as ModalBase } from '@components/Modal';
import type { ModalSize } from '@components/Modal/types';

type CreateModalParams = {
  children: React.ReactNode;
  size?: ModalSize;
  disableOnClose?: boolean;
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<CreateModalParams | null>(null);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const createModal = useCallback(({ children, size = 'regular', disableOnClose = false }: CreateModalParams) => {
    setModalProps({ children, size, disableOnClose });
  }, []);

  const Modal = modalProps?.children ? (
    <ModalBase isOpen={isOpen} onClose={() => modalProps.disableOnClose ? null : closeModal()} size={modalProps.size}>
      {modalProps.children}
    </ModalBase>
  ) : null;

  return {
    openModal,
    closeModal,
    createModal,
    Modal,
  };
};
