export type InputTextProps = {
  label: string;
  icon?: React.ReactNode;
  prefixItem?: React.ReactNode;
  helperText?: string;
  required?: boolean;
  onIconClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;
