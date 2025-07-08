export type ModalSize = "regular" | "medium" | "large";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  children: React.ReactNode;
};