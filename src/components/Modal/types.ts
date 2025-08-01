export type ModalSize = "regular" | "medium" | "large" | "auto";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  children: React.ReactNode;
};