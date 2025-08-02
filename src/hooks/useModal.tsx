import { createContext, useContext, useState, useCallback } from 'react';
import { Modal as ModalBase } from '@components/Modal';
import type { ReactNode, FC } from 'react';
import type { ModalSize } from '@components/Modal/types';

interface CreateModalParams {
  children: ReactNode;
  size?: ModalSize;
  disableOnClose?: boolean;
}

interface ModalContextProps {
  openModal: () => void;
  closeModal: () => void;
  createModal: (params: CreateModalParams) => void;
  Modal: ReactNode;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<CreateModalParams | null>(null);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const createModal = useCallback(
    ({ children, size = 'regular', disableOnClose = false }: CreateModalParams) => {
      setModalProps({ children, size, disableOnClose });
    },
    []
  );

  const Modal = modalProps?.children ? (
    <ModalBase
      isOpen={isOpen}
      onClose={() => (modalProps.disableOnClose ? null : closeModal())}
      size={modalProps.size}
    >
      {modalProps.children}
    </ModalBase>
  ) : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, createModal, Modal }}>
      {children}
      {Modal}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
